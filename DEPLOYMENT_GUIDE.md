# 🚀 Deployment Guide - Netflix Clone

## Current Deployment Status

### Live URLs:
- **Frontend (Vercel)**: https://netflix-clone-hh1d.vercel.app
- **Backend (Render)**: https://netflix-clone-api-hjqe.onrender.com
- **Database**: MongoDB Atlas (Cluster0)

---

## 📦 How to Deploy Updates

### **Automatic Deployment** (Recommended)

Both Vercel and Render are configured for **automatic deployment from GitHub**. When you push changes to the `main` branch, they will automatically deploy!

#### Step 1: Commit Your Changes
```bash
git add .
git commit -m "your commit message"
```

#### Step 2: Push to GitHub
```bash
git push origin main
```

#### Step 3: Wait for Deployment
- **Vercel**: Takes ~1-2 minutes
- **Render**: Takes ~3-5 minutes (backend builds are slower)

That's it! Your changes are now live! 🎉

---

## 🔍 Monitoring Deployments

### Vercel (Frontend)
1. Go to: https://vercel.com/dashboard
2. Click on your "netflix-clone" project
3. Click "Deployments" tab
4. You'll see:
   - ✅ Green checkmark = Deployed successfully
   - 🔄 Building = In progress
   - ❌ Red X = Failed (click to see logs)

### Render (Backend)
1. Go to: https://dashboard.render.com
2. Click on "netflix-clone-api" service
3. Click "Events" tab
4. You'll see:
   - ✅ "Deploy live" = Success
   - 🔄 "Build in progress" = Building
   - ❌ "Deploy failed" = Error (check logs)

---

## 📝 Recent Deployments Log

### Latest Commits Deployed:
```
✅ ec3cdda - chore: update server package-lock.json
✅ c8b06fd - style: reduce hero text width and center trailer navigation dots
✅ 1e52420 - feat: enhance UX with visible close button and auto-rotating hero trailers
✅ fc33b26 - refactor: remove all emojis for professional appearance
✅ 03f7d13 - docs: concise and engaging README with essential info
```

### Features Now Live:
1. ✅ Auto-rotating hero section with live trailers (15-second intervals)
2. ✅ Enhanced movie modal close button (more visible)
3. ✅ Centered trailer navigation dots
4. ✅ Reduced hero text width for better visual balance
5. ✅ Professional appearance (no emojis)
6. ✅ Improved README documentation

---

## ⚙️ Environment Variables

### Vercel (Frontend) - Already Set ✅
In Vercel Dashboard → Settings → Environment Variables:
```
VITE_TMDB_API_KEY = [your_tmdb_key]
VITE_TMDB_BASE_URL = https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL = https://image.tmdb.org/t/p
VITE_BACKEND_URL = https://netflix-clone-api-hjqe.onrender.com
```

### Render (Backend) - Already Set ✅
In Render Dashboard → Environment:
```
MONGODB_URI = [your_mongodb_connection_string]
JWT_SECRET = [your_jwt_secret]
TMDB_API_KEY = [your_tmdb_key]
CORS_ORIGIN = https://netflix-clone-hh1d.vercel.app
NODE_ENV = production
```

---

## 🐛 Troubleshooting Deployments

### Frontend (Vercel) Issues

#### Build Failed?
1. Check build logs in Vercel dashboard
2. Common issues:
   - TypeScript errors → Fix in code and push again
   - Missing environment variables → Add in Vercel settings
   - Import errors → Check file paths

#### Fix:
```bash
# Test build locally first
npm run build

# If successful, push
git push origin main
```

### Backend (Render) Issues

#### Build Failed?
1. Check "Logs" tab in Render dashboard
2. Common issues:
   - MongoDB connection failed → Check MONGODB_URI
   - Missing dependencies → Update package.json
   - TypeScript compilation errors → Fix and push

#### Health Check Failed?
```bash
# Test if backend is responding
curl https://netflix-clone-api-hjqe.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-02-01T...",
  "uptime": 123.45
}
```

---

## 🔄 Manual Deployment (If Needed)

### Trigger Vercel Deployment Manually
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Click "..." on latest deployment
4. Click "Redeploy"

### Trigger Render Deployment Manually
1. Go to Render Dashboard
2. Click "Manual Deploy" button (top right)
3. Select "Clear build cache & deploy"

---

## 📊 Deployment Checklist

Before pushing updates, ensure:

- [ ] Code builds locally: `npm run build`
- [ ] No TypeScript errors: `npm run type-check` (if available)
- [ ] No linting errors: `npm run lint` (if available)
- [ ] Environment variables are set in dashboards
- [ ] Git commit has clear message
- [ ] Changes are tested locally

---

## 🎯 Quick Commands

### Deploy Everything:
```bash
# From project root
git add .
git commit -m "feat: your feature description"
git push origin main

# Both Vercel and Render will auto-deploy!
```

### Check Deployment Status:
```bash
# Check latest commit
git log --oneline -1

# Verify it's pushed
git status
```

### Rollback to Previous Version:
```bash
# Find commit to rollback to
git log --oneline -10

# Rollback
git revert <commit-hash>
git push origin main
```

---

## 🌐 Testing Deployed Site

### Frontend Tests:
1. Visit: https://netflix-clone-hh1d.vercel.app
2. Check:
   - [ ] Hero section with auto-rotating trailers
   - [ ] Navigation dots centered
   - [ ] Movie cards loading
   - [ ] Search working
   - [ ] Modal opens/closes properly

### Backend Tests:
```bash
# Health check
curl https://netflix-clone-api-hjqe.onrender.com/health

# Register (should work)
curl -X POST https://netflix-clone-api-hjqe.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}'
```

---

## 📱 Mobile Testing

After deployment, test on:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad/Android)
- [ ] Desktop (Chrome, Firefox, Safari)

---

## 🎉 Deployment Complete!

Your Netflix Clone is now live with all the latest updates:

- ✅ **Frontend**: Auto-deploys from GitHub to Vercel
- ✅ **Backend**: Auto-deploys from GitHub to Render  
- ✅ **Database**: MongoDB Atlas (always running)

**No manual intervention needed!** Just push to `main` branch and both platforms will automatically build and deploy your changes.

---

## 📞 Support Links

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas
- **TMDB API**: https://developers.themoviedb.org

---

**Last Updated**: February 1, 2026  
**Latest Deployment**: ec3cdda
