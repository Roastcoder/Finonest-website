-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create page components table
CREATE TABLE IF NOT EXISTS page_components (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  component_type TEXT NOT NULL,
  component_data JSONB NOT NULL DEFAULT '{}',
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content blocks table
CREATE TABLE IF NOT EXISTS content_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  content_type TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'html', 'image', 'video', 'json')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create theme settings table
CREATE TABLE IF NOT EXISTS theme_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media library table
CREATE TABLE IF NOT EXISTS media_library (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default pages
INSERT INTO pages (slug, title, meta_description) VALUES
('home', 'Home', 'Welcome to our financial services platform'),
('about', 'About Us', 'Learn more about our company and mission'),
('services', 'Services', 'Explore our financial services and products'),
('contact', 'Contact', 'Get in touch with our team'),
('apply', 'Apply Now', 'Apply for loans and financial services')
ON CONFLICT (slug) DO NOTHING;

-- Insert default theme settings
INSERT INTO theme_settings (key, value, category) VALUES
('primary_color', '{"value": "#3B82F6"}', 'colors'),
('secondary_color', '{"value": "#10B981"}', 'colors'),
('accent_color', '{"value": "#F59E0B"}', 'colors'),
('background_color', '{"value": "#FFFFFF"}', 'colors'),
('text_color', '{"value": "#1F2937"}', 'colors'),
('font_family', '{"value": "Inter, sans-serif"}', 'typography'),
('font_size_base', '{"value": "16px"}', 'typography'),
('header_height', '{"value": "80px"}', 'layout'),
('footer_background', '{"value": "#1F2937"}', 'layout')
ON CONFLICT (key) DO NOTHING;

-- Insert default content blocks
INSERT INTO content_blocks (key, title, content, content_type) VALUES
('hero_title', 'Hero Title', '{"text": "Your Financial Partner for Life"}', 'text'),
('hero_subtitle', 'Hero Subtitle', '{"text": "Get the best loans and financial services with competitive rates"}', 'text'),
('company_name', 'Company Name', '{"text": "FinoNest"}', 'text'),
('contact_phone', 'Contact Phone', '{"text": "+91 9876543210"}', 'text'),
('contact_email', 'Contact Email', '{"text": "info@finonest.com"}', 'text'),
('footer_text', 'Footer Text', '{"text": "© 2024 FinoNest. All rights reserved."}', 'text')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin full access" ON admin_users FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON page_components FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON content_blocks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON theme_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON media_library FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for public read access
CREATE POLICY "Public read access" ON pages FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON page_components FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read access" ON content_blocks FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON theme_settings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON media_library FOR SELECT USING (true);

-- Create functions for updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_components_updated_at BEFORE UPDATE ON page_components FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON content_blocks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_theme_settings_updated_at BEFORE UPDATE ON theme_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();