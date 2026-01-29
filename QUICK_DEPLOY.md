# 🎬 GitHub & Deployment Quick Start

## 📌 GitHub Repository Setup

### Step 1: Create Repository on GitHub

1. Go to [GitHub.com](https://github.com/new)
2. Create repository named `netflix-clone`
3. Choose "Public" for visibility
4. Do NOT initialize with README (we already have one)
5. Click "Create repository"

### Step 2: Push Your Code

```bash
cd /Users/nageshwaranmanikumar/Desktop/netflix-clone

# Add remote (replace with your username)
git remote add origin https://github.com/YOUR_USERNAME/netflix-clone.git

# Rename branch and push
git branch -M main
git push -u origin main
```

### Step 3: Verify on GitHub
- Go to https://github.com/YOUR_USERNAME/netflix-clone
- Should see all your files
- Click on README.md to verify project description

---

## 🚀 Recommended Deployment Stack

### Frontend: **Vercel** (Easiest)
- Auto-deploys on push to GitHub
- Free tier suitable
- Built-in analytics
- Environment variables UI

### Backend: **Render.com** or **Railway.app**
- Free tier available
- Easy MongoDB integration
- Auto-deploys from GitHub
- Environment variable management

### Database: **MongoDB Atlas**
- Free M0 tier (512 MB)
- Cloud-based, no setup
- Can scale easily
- Included with Railway

---

## ⚡ Quick Deployment (15 minutes)

### 1. Deploy Backend First (5 min)

#### Using Render.com (Easiest):
```bash
# 1. Go to https://render.com
# 2. Sign in with GitHub
# 3. Click "New" → "Web Service"
# 4. Connect your GitHub repo
# 5. Configure:
#    - Name: netflix-clone-api
#    - Root Directory: server
#    - Build Command: npm install && npm run build
#    - Start Command: npm start
# 6. Add Environment Variables:
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_random_secret_32_chars_minimum
TMDB_API_KEY=your_tmdb_api_key
CORS_ORIGIN=https://your-frontend-url.vercel.app
# 7. Deploy!
```

Get your Backend URL: `https://your-api-name.onrender.com`

### 2. Deploy Frontend (5 min)

#### Using Vercel (Easiest):
```bash
# 1. Go to https://vercel.com
# 2. Sign in with GitHub
# 3. Click "Import Project"
# 4. Select your netflix-clone repo
# 5. Configure Project:
#    - Framework: Vite
#    - Build Command: npm run build
#    - Output Directory: dist
# 6. Add Environment Variables:
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_BACKEND_URL=https://your-api-name.onrender.com/api
# 7. Deploy!
```

Get your Frontend URL: `https://netflix-clone-username.vercel.app`

### 3. Update Backend CORS

Go back to Render dashboard and update:
```
CORS_ORIGIN=https://netflix-clone-username.vercel.app
```

---

## 📋 What You Need Ready

### 1. **GitHub Account**
   - Already have yours? Great!
   - Create at [github.com](https://github.com)

### 2. **TMDB API Key**
   - Get free key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Just get the "API Key (v3 auth)"

### 3. **MongoDB Atlas Account**
   - Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create M0 free cluster
   - Get connection string
   - Add IP whitelist: 0.0.0.0/0 (or specific IP ranges)

### 4. **Deployment Platform Accounts**
   - Vercel: https://vercel.com (sign in with GitHub)
   - Render: https://render.com (sign in with GitHub)

---

## 🔄 Complete Deployment Walkthrough

### A. MongoDB Setup (5 min)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new project "netflix-clone"
3. Create M0 free cluster
4. Click "Clusters" → "Connect"
5. Choose "Connect your application"
6. Copy connection string like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/netflix-clone
   ```

### B. Backend Deployment (5 min)

1. Go to [Render.com](https://render.com)
2. Sign in with GitHub
3. New Web Service → Select your GitHub repo
4. Fill in:
   ```
   Name: netflix-clone-api
   Environment: Node
   Build: npm install && cd server && npm install && npm run build
   Start: cd server && npm start
   ```
5. Click "Advanced" → Add Environment Variables:
   ```
   PORT=5001
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/netflix-clone
   JWT_SECRET=generate_a_random_32_char_string_here
   TMDB_API_KEY=your_tmdb_key
   TMDB_BASE_URL=https://api.themoviedb.org/3
   CORS_ORIGIN=https://your-frontend.vercel.app  (add later)
   ```
6. Deploy!
7. Wait for build to complete
8. Copy your backend URL: `https://netflix-clone-api.onrender.com`

### C. Frontend Deployment (5 min)

1. Go to [Vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Select your netflix-clone repo
5. Framework Preset: Vite
6. Root Directory: ./
7. Build Command: `npm run build`
8. Output Directory: `dist`
9. Add Environment Variables:
   ```
   VITE_TMDB_API_KEY=your_tmdb_key
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   VITE_BACKEND_URL=https://netflix-clone-api.onrender.com/api
   ```
10. Deploy!
11. Copy your frontend URL: `https://netflix-clone-username.vercel.app`

### D. Update Backend CORS (1 min)

1. Go back to Render dashboard
2. Select your netflix-clone-api service
3. Go to Environment
4. Update CORS_ORIGIN:
   ```
   CORS_ORIGIN=https://netflix-clone-username.vercel.app
   ```
5. Service will auto-redeploy

### E. Create Demo User (1 min)

The demo user might not exist on production yet. You have two options:

**Option 1: Create via API**
```bash
curl -X POST https://netflix-clone-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Demo User",
    "email": "demo@netflix.com",
    "password": "demo123"
  }'
```

**Option 2: Register new account**
- Go to your live site
- Click "Sign Up"
- Create account
- Test login/watchlist

---

## ✅ Post-Deployment Checklist

- [ ] Frontend loads at Vercel URL
- [ ] Backend API responds (GET https://your-api.onrender.com/health)
- [ ] Can login with demo account
- [ ] Can add movies to watchlist
- [ ] Watchlist persists after logout/login
- [ ] No CORS errors in console
- [ ] Mobile responsive working
- [ ] Search functionality works
- [ ] Movie modals display trailers
- [ ] Chatbot responds

---

## 🐛 Common Issues & Fixes

### ❌ "CORS error" or "blocked by CORS"
**Fix**: Update `CORS_ORIGIN` in Render backend to match your Vercel URL

### ❌ "Cannot connect to backend"
**Fix**: Verify `VITE_BACKEND_URL` in Vercel matches your Render backend URL

### ❌ "MongoDB connection failed"
**Fix**: Check connection string, add `0.0.0.0/0` to IP whitelist in MongoDB Atlas

### ❌ "Cannot login"
**Fix**: Create demo user manually via API or signup form

### ❌ "Infinite loading on login"
**Fix**: Check browser console for errors, verify backend is running

---

## 📈 Next Steps After Deployment

1. **Test thoroughly** on different devices
2. **Share your live demo** with friends/portfolio
3. **Monitor** backend logs for errors
4. **Collect feedback** from users
5. **Add features** (email verification, password reset, etc.)
6. **Optimize** performance if needed
7. **Consider paid tier** if traffic increases

---

## 🎯 You Now Have:

✅ **Live Frontend**: Demo your Netflix clone to the world
✅ **Live Backend**: Real authentication & persistent storage
✅ **Live Database**: MongoDB Atlas cloud database
✅ **GitHub Repository**: Version control & collaboration
✅ **CI/CD Pipeline**: Auto-deploy on push (Vercel/Render)

---

## 📞 Support Resources

- **Vercel Issues**: https://vercel.com/support
- **Render Issues**: https://render.com/docs
- **MongoDB Issues**: https://docs.mongodb.com/manual/
- **Stack Overflow**: Tag questions with `vercel` `render` `mongodb`

---

## 🎉 That's It!

You now have a **fully deployed Netflix clone** with:
- User authentication
- Persistent watchlist
- Real movie data
- Professional UI
- Live demo to share!

**Enjoy your live deployment!** 🚀🎬

---

**Questions?** Check DEPLOYMENT.md for detailed setup guide!
