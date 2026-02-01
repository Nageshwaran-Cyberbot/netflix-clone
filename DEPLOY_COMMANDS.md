# 🚀 Quick Deployment Commands

## Prerequisites Check
```bash
# Ensure you're on the main branch
git branch

# Check if all changes are committed
git status

# Ensure builds work locally
npm run build
cd server && npm run build && cd ..
```

## 📦 Step 1: Prepare Repository

```bash
# Add all deployment files
git add .
git commit -m "chore: add deployment configuration for Vercel and Render"
git push origin main
```

## 🎨 Step 2: Deploy Frontend to Vercel

### Quick Deploy (Vercel CLI)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Set environment variables
vercel env add VITE_TMDB_API_KEY production
# Enter: 8dcba2c5d42d8060925a212e54656155

vercel env add VITE_TMDB_BASE_URL production
# Enter: https://api.themoviedb.org/3

vercel env add VITE_TMDB_IMAGE_BASE_URL production
# Enter: https://image.tmdb.org/t/p

vercel env add VITE_BACKEND_URL production
# Enter: (will add after backend is deployed)
```

### Or Deploy via Dashboard
1. Go to https://vercel.com/new
2. Import GitHub repo: `Nageshwaran-Cyberbot/netflix-clone`
3. Click Deploy
4. Add environment variables in Settings

## 🔧 Step 3: Setup MongoDB Atlas

```bash
# 1. Go to https://cloud.mongodb.com
# 2. Create FREE cluster
# 3. Create database user
# 4. Allow network access (0.0.0.0/0)
# 5. Get connection string:

# Format:
mongodb+srv://username:password@cluster.mongodb.net/netflix-clone
```

## 🌐 Step 4: Deploy Backend to Render

### Via Dashboard (Recommended)
1. Go to https://dashboard.render.com
2. New → Web Service
3. Connect GitHub repo
4. Configure:
   - **Name**: netflix-clone-api
   - **Region**: Oregon
   - **Branch**: main
   - **Build Command**: `cd server && npm install && npm run build`
   - **Start Command**: `cd server && npm start`
5. Add environment variables (see list below)
6. Click Create Web Service

### Environment Variables for Render:
```bash
PORT=5001
NODE_ENV=production
JWT_SECRET=netflix_clone_jwt_secret_2026_production_key
JWT_EXPIRE=7d
TMDB_API_KEY=8dcba2c5d42d8060925a212e54656155
TMDB_BASE_URL=https://api.themoviedb.org/3
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/netflix-clone
CORS_ORIGIN=https://your-vercel-url.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔄 Step 5: Link Frontend to Backend

```bash
# After Render deployment completes:
# 1. Copy your Render URL (e.g., https://netflix-clone-api.onrender.com)
# 2. Update Vercel environment variable:

vercel env add VITE_BACKEND_URL production
# Enter: https://your-render-url.onrender.com/api

# Or update in Vercel Dashboard:
# Settings → Environment Variables → Edit VITE_BACKEND_URL
# Value: https://your-render-url.onrender.com/api
```

## 🔄 Step 6: Update Backend CORS

```bash
# In Render Dashboard:
# 1. Go to Environment
# 2. Edit CORS_ORIGIN
# 3. Set to: https://your-vercel-url.vercel.app
# 4. Save and redeploy
```

## 👤 Step 7: Create Demo User

```bash
# In Render Dashboard → Shell tab:
cd server
npm run seed

# You should see:
# ✅ Demo user created successfully
# Email: demo@netflix.com
# Password: demo123
```

## 🤖 Step 8: Setup GitHub Actions (Optional)

```bash
# Add GitHub Secrets:
# Go to: GitHub repo → Settings → Secrets → Actions

# Add these secrets:
VERCEL_TOKEN              # From Vercel Settings → Tokens
VERCEL_ORG_ID            # From Vercel Team Settings
VERCEL_PROJECT_ID        # From Vercel Project Settings
RENDER_DEPLOY_HOOK       # From Render Service → Settings → Deploy Hook
```

## ✅ Step 9: Test Your Deployment

```bash
# 1. Visit your Vercel URL
# 2. Test registration: Create new account
# 3. Test login with demo user:
#    Email: demo@netflix.com
#    Password: demo123
# 4. Test adding movies to watchlist
# 5. Test search functionality
```

## 🎯 Quick Status Check

```bash
# Check frontend build
curl https://your-vercel-url.vercel.app

# Check backend health
curl https://your-render-url.onrender.com/health

# Check backend API
curl https://your-render-url.onrender.com/api/health
```

## 🐛 Common Issues & Quick Fixes

### Issue: "Cannot connect to backend"
```bash
# Solution:
1. Check VITE_BACKEND_URL in Vercel includes "/api" at the end
2. Verify backend is running on Render
3. Check browser console for CORS errors
```

### Issue: "MongoDB connection failed"
```bash
# Solution:
1. Verify MongoDB connection string format
2. Check IP whitelist (0.0.0.0/0)
3. Ensure password has no special chars or encode them
```

### Issue: "Build failed on Render"
```bash
# Solution:
1. Check build logs in Render Dashboard
2. Verify all dependencies are in package.json
3. Try clearing cache: Dashboard → Manual Deploy → Clear build cache
```

### Issue: "CORS Error"
```bash
# Solution:
1. Update CORS_ORIGIN in Render to exact Vercel URL
2. No trailing slash in URL
3. Redeploy backend after change
```

## 📊 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Render
- [ ] Environment variables configured
- [ ] Frontend connected to backend
- [ ] Backend CORS configured
- [ ] Demo user created
- [ ] GitHub Actions configured (optional)
- [ ] Application tested end-to-end

## 🎉 You're Done!

Your Netflix Clone is now live! 🚀

- Frontend: https://your-app.vercel.app
- Backend: https://your-api.onrender.com
- Demo: demo@netflix.com / demo123

## 📝 Next Actions

```bash
# Update README with live URLs
# Monitor logs:
# - Vercel: Dashboard → Logs
# - Render: Dashboard → Logs

# Scale if needed:
# - Render: Free tier sleeps after 15 min (upgrade to Starter)
# - Vercel: Unlimited on free tier

# Add custom domain (optional):
# Vercel: Settings → Domains → Add
```

---

**Need help? Check DEPLOYMENT_GUIDE.md for detailed instructions!**
