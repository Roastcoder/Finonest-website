# 🚀 Finonest Deployment Guide
## GitHub → Coolify Docker Deployment

### 📋 Prerequisites
- GitHub repository
- Coolify server access
- Domain name (optional)

---

## 🔧 Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "feat: production-ready Finonest platform with Docker support"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/finonest.git

# Push to GitHub
git push -u origin main
```

---

## 🗄️ Step 2: Database & Backend Setup (Supabase)

### A. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Choose organization and region
4. Set database password (save securely)

### B. Run Database Migrations
```sql
-- Execute in Supabase SQL Editor
-- File: supabase/migrations/20241223_admin_cms.sql

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pages table
CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create components table
CREATE TABLE components (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  props JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loan_applications table
CREATE TABLE loan_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  loan_type TEXT NOT NULL,
  amount DECIMAL(15,2),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  employment_type TEXT,
  monthly_income DECIMAL(15,2),
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### C. Setup Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE components ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public pages are viewable by everyone" ON pages
  FOR SELECT USING (status = 'published');

CREATE POLICY "Users can view own applications" ON loan_applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications" ON loan_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### D. Create Admin User
```sql
-- Insert admin user (replace with your details)
INSERT INTO admin_users (email, password_hash, role)
VALUES ('admin@finonest.com', crypt('your_secure_password', gen_salt('bf')), 'super_admin');
```

### E. Get Supabase Credentials
```bash
# From Supabase Dashboard → Settings → API
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key (keep secret)
```

---

## 🐳 Step 3: Coolify Setup

### A. Create New Project in Coolify
1. Login to your Coolify dashboard
2. Click **"New Project"**
3. Select **"Git Repository"**
4. Connect your GitHub repository

### B. Configure Application
```yaml
# Application Settings
Name: finonest-production
Repository: https://github.com/yourusername/finonest.git
Branch: main
Build Pack: Docker
Dockerfile: Dockerfile.prod
```

### C. Environment Variables
```env
NODE_ENV=production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### D. Domain Configuration
```
Domain: finonest.com (or your domain)
SSL: Auto (Let's Encrypt)
Port: 80
```

---

## ⚙️ Step 4: GitHub Secrets (Optional - for webhook)

1. Go to GitHub Repository → Settings → Secrets
2. Add secret: `COOLIFY_WEBHOOK_URL`
3. Value: Your Coolify webhook URL from project settings

---

## 🚀 Step 5: Deploy

### Manual Deploy
1. In Coolify dashboard
2. Go to your project
3. Click **"Deploy"**

### Auto Deploy (with webhook)
- Pushes to `main` branch trigger automatic deployment
- GitHub Actions will notify Coolify
- Coolify pulls latest code and rebuilds

---

## 📊 Step 6: Verify Deployment

### Database Checks
- **Supabase Dashboard**: Check tables created
- **Admin Login**: `https://yourdomain.com/admin/login`
- **API Health**: Test Supabase connection

### Health Checks
- **Health Endpoint**: `https://yourdomain.com/health`
- **Main Site**: `https://yourdomain.com`
- **Admin Panel**: `https://yourdomain.com/admin`

### Performance Checks
```bash
# Test build locally
npm run build

# Test Docker build
docker build -f Dockerfile.prod -t finonest .
docker run -p 3000:80 finonest
```

---

## 🔍 Troubleshooting

### Common Issues
1. **Build Fails**: Check `package.json` dependencies
2. **Images Not Loading**: Verify asset paths in production
3. **API Errors**: Check environment variables
4. **SSL Issues**: Ensure domain DNS points to Coolify server

### Logs Access
```bash
# In Coolify dashboard
Project → Logs → Application Logs
Project → Logs → Build Logs
```

---

## 📈 Production Checklist

- [x] Docker configuration ready
- [x] Environment variables set
- [x] Health checks implemented
- [x] Error boundaries added
- [x] Security headers configured
- [x] Asset optimization enabled
- [x] Database migrations ready
- [x] Backup strategy planned

---

## 🎯 Next Steps

1. **Monitor**: Set up monitoring and alerts
2. **Scale**: Configure auto-scaling if needed
3. **Backup**: Regular database backups
4. **Updates**: Plan for rolling updates
5. **Security**: Regular security audits

---

**🎉 Your Finonest platform is now production-ready!**