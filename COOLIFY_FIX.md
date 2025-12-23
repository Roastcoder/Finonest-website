# 🔧 Coolify GitHub Authentication Fix

## Error: "Failed to read Git source: fatal: could not read Username for 'https://github.com': No such device or address"

### 🎯 Solution Options

## Option 1: Use GitHub Personal Access Token (Recommended)

### A. Create GitHub Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token (classic)"**
3. Set expiration and select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
4. Copy the token (save it securely)

### B. Update Repository URL in Coolify
```bash
# Instead of: https://github.com/username/repo.git
# Use: https://TOKEN@github.com/username/repo.git

# Example:
https://ghp_xxxxxxxxxxxxxxxxxxxx@github.com/Roastcoder/remix-of-remix-of-site-refresh-project.git
```

### C. Configure in Coolify
1. Go to your project in Coolify
2. Edit **Repository URL**
3. Replace with: `https://YOUR_TOKEN@github.com/Roastcoder/remix-of-remix-of-site-refresh-project.git`
4. Save and redeploy

---

## Option 2: Use SSH Key Authentication

### A. Generate SSH Key in Coolify Server
```bash
# SSH into your Coolify server
ssh-keygen -t ed25519 -C "coolify@yourserver.com"
cat ~/.ssh/id_ed25519.pub
```

### B. Add SSH Key to GitHub
1. Copy the public key output
2. Go to GitHub → Settings → SSH and GPG keys
3. Click **"New SSH key"**
4. Paste the public key

### C. Update Repository URL
```bash
# Change from HTTPS to SSH
git@github.com:Roastcoder/remix-of-remix-of-site-refresh-project.git
```

---

## Option 3: Make Repository Public (Quick Fix)

### A. Make GitHub Repository Public
1. Go to your GitHub repository
2. Settings → General → Danger Zone
3. Click **"Change repository visibility"**
4. Select **"Make public"**

### B. Use HTTPS URL (No Authentication Needed)
```bash
https://github.com/Roastcoder/remix-of-remix-of-site-refresh-project.git
```

---

## 🚀 Quick Deploy Steps

### 1. Choose Option 1 (Personal Access Token)
```bash
# Repository URL in Coolify:
https://ghp_YOUR_TOKEN_HERE@github.com/Roastcoder/remix-of-remix-of-site-refresh-project.git
```

### 2. Coolify Configuration
```yaml
Repository: https://TOKEN@github.com/Roastcoder/remix-of-remix-of-site-refresh-project.git
Branch: main
Build Pack: Docker
Dockerfile: Dockerfile.prod
Port: 80
```

### 3. Environment Variables
```env
NODE_ENV=production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Deploy
- Click **"Deploy"** in Coolify dashboard
- Monitor build logs for success

---

## ✅ Verification

After fixing authentication:
1. **Build Success**: Check Coolify build logs
2. **Site Access**: Visit your deployed URL
3. **Health Check**: Test `/health` endpoint
4. **Admin Access**: Test `/admin/login`

---

**🎯 Recommended: Use Option 1 (Personal Access Token) for quickest setup!**