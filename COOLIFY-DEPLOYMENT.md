# 🚀 COOLIFY DEPLOYMENT GUIDE

## 📋 SETUP CHECKLIST

### 1️⃣ FRONTEND APPLICATION (Vite/React)

**Repository:** Same repo  
**Build Pack:** Node.js  

**Environment Variables:**
```
VITE_API_URL=https://your-backend-domain.com
NODE_ENV=production
```

**Build Command:**
```bash
cp frontend-package.json package.json && npm install && npm run build
```

**Start Command:**
```bash
npm run preview -- --port 3000 --host
```

**Port:** 3000

---

### 2️⃣ BACKEND APPLICATION (Node.js API)

**Repository:** Same repo  
**Build Pack:** Node.js  

**Environment Variables:**
```
DB_HOST=10.0.1.8
DB_PORT=3306
DB_USER=root
DB_PASSWORD=Finonestssuper@admin
DB_NAME=finonest
NODE_ENV=production
JWT_SECRET=your-jwt-secret-here
```

**Build Command:**
```bash
cp backend-package.json package.json && npm install
```

**Start Command:**
```bash
node server/production.js
```

**Port:** 5000

---

## ✅ VERIFICATION

### Frontend Logs Should Show:
```
Vite ready in xxx ms
Local: http://localhost:3000
```

### Backend Logs Should Show:
```
🧪 DB ENV CHECK { DB_HOST: '10.0.1.8', ... }
✅ Database connected (MySQL)
🚀 Finonest API running on port 5000
```

---

## 🚨 TROUBLESHOOTING

**If you see DB errors in frontend logs:**
- ❌ Frontend has database env vars (remove them)
- ❌ Frontend is running `node server/production.js` (change start command)

**If backend won't connect:**
- ✅ Check all DB_* environment variables are set
- ✅ Verify MySQL is accessible from backend container
- ✅ Check backend logs for retry attempts

---

## 🎯 FINAL ARCHITECTURE

```
Frontend (Port 3000) → API calls → Backend (Port 5000) → MySQL (10.0.1.8:3306)
```

Frontend serves static React app  
Backend handles all database operations  
Clean separation of concerns