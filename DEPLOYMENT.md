# 🚀 Deployment Guide - Netflix Clone

This guide covers deploying the Netflix Clone to production on various platforms.

## 📋 Prerequisites

- GitHub repository created
- Node.js v18+ installed
- MongoDB account (Atlas recommended)
- TMDB API key (free account)
- Deployment platform account (Vercel, Netlify, Render, Railway, etc.)

---

## 🌐 Frontend Deployment

### Option 1: **Vercel** (Recommended - Easiest)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
# From project root
vercel
```

#### Step 3: Configure Environment Variables
In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

#### Step 4: Point to Backend
Update `src/services/api/axios.config.ts` to use your production backend URL:
```typescript
const BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: BACKEND_URL,
  // ...
});
```

### Option 2: **Netlify**

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Deploy
```bash
npm run build
netlify deploy --prod --dir=dist
```

#### Step 3: Configure in Netlify Dashboard
1. Site settings → Build & Deploy
2. Add environment variables (same as Vercel)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Option 3: **GitHub Pages**

```bash
# Update vite.config.ts base
export default {
  base: '/netflix-clone/',
  // ...
}

# Build and deploy
npm run build
gh-pages -d dist
```

---

## 🏗️ Backend Deployment

### Option 1: **Render.com** (Recommended - Free Tier)

#### Step 1: Create Render Account
- Go to [render.com](https://render.com)
- Sign in with GitHub
- Create new Web Service

#### Step 2: Configure Service
```
Name: netflix-clone-backend
Runtime: Node
Build command: npm install && cd server && npm install && npm run build
Start command: cd server && npm start
```

#### Step 3: Add Environment Variables
In Render Dashboard:
```
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-clone
JWT_SECRET=your_secure_random_jwt_secret_here
JWT_EXPIRE=7d
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

#### Step 4: Deploy
Push to GitHub - Render will auto-deploy

### Option 2: **Railway.app**

#### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

#### Step 2: Initialize and Deploy
```bash
railway init
railway up
```

#### Step 3: Add Services
- Add MongoDB (Railway provides free tier)
- Link to your service

### Option 3: **Heroku** (Limited Free Tier)

```bash
# Install Heroku CLI
brew install heroku/brew/heroku

# Login
heroku login

# Create app
heroku create netflix-clone-api

# Add environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=...
heroku config:set CORS_ORIGIN=https://your-frontend.vercel.app

# Deploy
git push heroku main
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

#### Step 1: Create Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a new Cluster (M0 free tier)
4. Choose region close to you

#### Step 2: Get Connection String
1. Click "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<username>` and `<password>`

#### Step 3: Add to Backend `.env`
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-clone
```

#### Step 4: Create Demo User
```bash
cd server
npm run seed
```

---

## 📝 Environment Variables Checklist

### Frontend (.env.production)
```bash
VITE_TMDB_API_KEY=your_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
VITE_BACKEND_URL=https://your-backend-api.railway.app/api
```

### Backend (.env.production)
```bash
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/netflix-clone
JWT_SECRET=your_very_secure_random_secret_key_here
JWT_EXPIRE=7d
TMDB_API_KEY=your_key
TMDB_BASE_URL=https://api.themoviedb.org/3
CORS_ORIGIN=https://your-frontend.vercel.app
```

---

## 🔄 GitHub Setup

### Step 1: Create Repository
```bash
# Initialize if not done
git init

# Add remote
git remote add origin https://github.com/yourusername/netflix-clone.git

# Push
git branch -M main
git push -u origin main
```

### Step 2: GitHub Secrets (Optional - for CI/CD)
Go to Settings → Secrets and variables → Actions

Add:
```
VITE_TMDB_API_KEY=your_key
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
```

---

## ✅ Pre-Deployment Checklist

### Frontend
- [ ] `.env.local` not committed (added to .gitignore)
- [ ] `npm run build` works without errors
- [ ] No TypeScript errors: `npm run lint`
- [ ] Tested on mobile devices
- [ ] TMDB API key valid
- [ ] Backend URL configured

### Backend
- [ ] `.env` not committed (added to .gitignore)
- [ ] MongoDB Atlas connection tested
- [ ] `npm run build` works
- [ ] Demo user created: `npm run seed`
- [ ] All env vars configured
- [ ] CORS origin set correctly
- [ ] Rate limiting configured

### General
- [ ] Updated README with deployment info
- [ ] All documentation in place
- [ ] Git history clean
- [ ] No console errors/warnings
- [ ] Responsive design tested
- [ ] All features working

---

## 🚀 Deployment Order

1. **Setup MongoDB Atlas** ← Start here
2. **Deploy Backend** (Render, Railway, etc.)
3. **Get Backend URL**
4. **Update Frontend env vars with Backend URL**
5. **Deploy Frontend** (Vercel, Netlify, etc.)
6. **Run seed script on backend** (create demo user)
7. **Test live application**

---

## 🧪 Post-Deployment Testing

### 1. Test Backend API
```bash
# Health check
curl https://your-backend-api.railway.app/health

# Register
curl -X POST https://your-backend-api.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","name":"Test User"}'

# Login
curl -X POST https://your-backend-api.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@netflix.com","password":"demo123"}'
```

### 2. Test Frontend
1. Open deployed frontend URL
2. Test login/register
3. Add movie to watchlist
4. Check MongoDB data
5. Test logout and login again

### 3. Check Performance
- Use Lighthouse in Chrome DevTools
- Check bundle size
- Monitor API response times

---

## 🐛 Troubleshooting

### Issue: CORS Errors
**Solution**: Update `CORS_ORIGIN` in backend `.env` to match frontend URL

### Issue: "Cannot find module"
**Solution**: Run `npm install` in both frontend and backend

### Issue: MongoDB Connection Failed
**Solution**: Check connection string, ensure IP whitelist in MongoDB Atlas

### Issue: 404 on Watchlist API
**Solution**: Verify authentication token is being sent in headers

### Issue: Long Build Times
**Solution**: 
- Optimize images
- Remove unused dependencies
- Check build logs for warnings

---

## 📊 Monitoring

### Recommended Tools
- **Vercel/Netlify Analytics** - for frontend metrics
- **Render/Railway Logs** - for backend errors
- **MongoDB Atlas Charts** - for database metrics
- **Sentry.io** - for error tracking (optional)

---

## 🔐 Security Checklist

- [ ] JWT_SECRET is secure random string (32+ chars)
- [ ] Environment variables not in code
- [ ] `.env` files in `.gitignore`
- [ ] CORS restricted to your domain
- [ ] HTTPS enforced
- [ ] Rate limiting enabled
- [ ] Helmet.js security headers active
- [ ] MongoDB IP whitelist configured
- [ ] API keys rotated regularly

---

## 📞 Support & Resources

### Deployment Platforms
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)

### Database
- [MongoDB Atlas Docs](https://docs.mongodb.com/atlas)

### APIs
- [TMDB API Docs](https://developers.themoviedb.org/3)

---

## 🎉 You're Live!

Once deployed, your Netflix Clone will be live and accessible to the world! 🚀

**Live URLs:**
- Frontend: `https://your-app-name.vercel.app`
- Backend: `https://your-backend-api.railway.app`

Share your demo with others and enjoy your full-stack application! 🎬

---

**Happy Deploying!** 🚀
