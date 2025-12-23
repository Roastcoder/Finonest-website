import { supabase } from '../integrations/supabase/client';

// Admin Authentication
export const adminAuth = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  }
};

// Pages Management
export const pagesAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single();
    return { data, error };
  },

  async create(page: { slug: string; title: string; meta_description?: string }) {
    const { data, error } = await supabase
      .from('pages')
      .insert(page)
      .select()
      .single();
    return { data, error };
  },

  async update(id: string, updates: Partial<{ title: string; meta_description: string; is_active: boolean }>) {
    const { data, error } = await supabase
      .from('pages')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id);
    return { error };
  }
};

// Page Components Management
export const componentsAPI = {
  async getByPageId(pageId: string) {
    const { data, error } = await supabase
      .from('page_components')
      .select('*')
      .eq('page_id', pageId)
      .order('order_index', { ascending: true });
    return { data, error };
  },

  async create(component: {
    page_id: string;
    component_type: string;
    component_data: any;
    order_index?: number;
  }) {
    const { data, error } = await supabase
      .from('page_components')
      .insert(component)
      .select()
      .single();
    return { data, error };
  },

  async update(id: string, updates: {
    component_data?: any;
    order_index?: number;
    is_visible?: boolean;
  }) {
    const { data, error } = await supabase
      .from('page_components')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('page_components')
      .delete()
      .eq('id', id);
    return { error };
  },

  async reorder(components: { id: string; order_index: number }[]) {
    const updates = components.map(comp => 
      supabase
        .from('page_components')
        .update({ order_index: comp.order_index })
        .eq('id', comp.id)
    );
    
    const results = await Promise.all(updates);
    return results;
  }
};

// Content Blocks Management
export const contentAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('content_blocks')
      .select('*')
      .order('key', { ascending: true });
    return { data, error };
  },

  async getByKey(key: string) {
    const { data, error } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('key', key)
      .single();
    return { data, error };
  },

  async create(content: {
    key: string;
    title: string;
    content: any;
    content_type?: string;
  }) {
    const { data, error } = await supabase
      .from('content_blocks')
      .insert(content)
      .select()
      .single();
    return { data, error };
  },

  async update(id: string, updates: {
    title?: string;
    content?: any;
    is_active?: boolean;
  }) {
    const { data, error } = await supabase
      .from('content_blocks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('content_blocks')
      .delete()
      .eq('id', id);
    return { error };
  }
};

// Theme Settings Management
export const themeAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('theme_settings')
      .select('*')
      .order('category', { ascending: true });
    return { data, error };
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('theme_settings')
      .select('*')
      .eq('category', category);
    return { data, error };
  },

  async update(key: string, value: any) {
    const { data, error } = await supabase
      .from('theme_settings')
      .upsert({ key, value })
      .select()
      .single();
    return { data, error };
  },

  async bulkUpdate(settings: { key: string; value: any }[]) {
    const { data, error } = await supabase
      .from('theme_settings')
      .upsert(settings)
      .select();
    return { data, error };
  }
};

// Media Library Management
export const mediaAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('media_library')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async upload(file: File, altText?: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) return { data: null, error: uploadError };

    // Save file info to database
    const { data, error } = await supabase
      .from('media_library')
      .insert({
        filename: fileName,
        original_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        alt_text: altText || ''
      })
      .select()
      .single();

    return { data, error };
  },

  async delete(id: string) {
    // Get file info first
    const { data: fileData } = await supabase
      .from('media_library')
      .select('file_path')
      .eq('id', id)
      .single();

    if (fileData) {
      // Delete from storage
      await supabase.storage
        .from('media')
        .remove([fileData.file_path]);
    }

    // Delete from database
    const { error } = await supabase
      .from('media_library')
      .delete()
      .eq('id', id);

    return { error };
  },

  getPublicUrl(filePath: string) {
    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);
    return data.publicUrl;
  }
};

// Analytics and Stats
export const analyticsAPI = {
  async getDashboardStats() {
    const [pagesCount, componentsCount, contentCount, mediaCount] = await Promise.all([
      supabase.from('pages').select('id', { count: 'exact' }),
      supabase.from('page_components').select('id', { count: 'exact' }),
      supabase.from('content_blocks').select('id', { count: 'exact' }),
      supabase.from('media_library').select('id', { count: 'exact' })
    ]);

    return {
      pages: pagesCount.count || 0,
      components: componentsCount.count || 0,
      content: contentCount.count || 0,
      media: mediaCount.count || 0
    };
  }
};

// Component Templates
export const componentTemplates = {
  hero: {
    type: 'hero',
    name: 'Hero Section',
    defaultData: {
      title: 'Welcome to Our Platform',
      subtitle: 'Your success is our mission',
      backgroundImage: '',
      ctaText: 'Get Started',
      ctaLink: '/apply'
    }
  },
  services: {
    type: 'services',
    name: 'Services Grid',
    defaultData: {
      title: 'Our Services',
      services: [
        { title: 'Personal Loans', description: 'Quick and easy personal loans', icon: 'user' },
        { title: 'Home Loans', description: 'Affordable home financing', icon: 'home' },
        { title: 'Car Loans', description: 'Drive your dream car', icon: 'car' }
      ]
    }
  },
  testimonials: {
    type: 'testimonials',
    name: 'Testimonials',
    defaultData: {
      title: 'What Our Customers Say',
      testimonials: [
        { name: 'John Doe', text: 'Excellent service!', rating: 5 },
        { name: 'Jane Smith', text: 'Highly recommended!', rating: 5 }
      ]
    }
  },
  contact: {
    type: 'contact',
    name: 'Contact Form',
    defaultData: {
      title: 'Get In Touch',
      fields: ['name', 'email', 'phone', 'message']
    }
  },
  stats: {
    type: 'stats',
    name: 'Statistics',
    defaultData: {
      stats: [
        { label: 'Happy Customers', value: '10,000+' },
        { label: 'Loans Approved', value: '₹500Cr+' },
        { label: 'Years Experience', value: '15+' }
      ]
    }
  }
};