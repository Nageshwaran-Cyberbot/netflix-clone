# 🚀 Complete Deployment Guide - Netflix Clone

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
- [CI/CD Setup (GitHub Actions)](#cicd-setup-github-actions)
- [Post-Deployment Tasks](#post-deployment-tasks)
- [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before deploying, ensure you have:
- [x] GitHub account with repository created
- [x] Vercel account (sign up at https://vercel.com)
- [x] Render account (sign up at https://render.com)
- [x] MongoDB Atlas account (sign up at https://www.mongodb.com/cloud/atlas)
- [x] TMDB API key (get from https://www.themoviedb.org/settings/api)

---

## 🎨 Frontend Deployment (Vercel)

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Connect to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository: `Nageshwaran-Cyberbot/netflix-clone`
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Step 2: Environment Variables
Add these environment variables in Vercel Dashboard → Settings → Environment Variables:

```bash
# TMDB API Configuration
VITE_TMDB_API_KEY=8dcba2c5d42d8060925a212e54656155
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# Backend API URL (update after deploying backend)
VITE_BACKEND_URL=https://your-backend-url.onrender.com/api
```

#### Step 3: Deploy
- Click **Deploy**
- Wait for build to complete (2-3 minutes)
- Your frontend will be live at: `https://your-app.vercel.app`

#### Step 4: Get Vercel Integration Details
For CI/CD setup, you'll need:
1. **Vercel Token**: Dashboard → Settings → Tokens → Create
2. **Vercel Org ID**: Found in team settings
3. **Vercel Project ID**: Project Settings → General

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Set environment variables
vercel env add VITE_TMDB_API_KEY
vercel env add VITE_TMDB_BASE_URL
vercel env add VITE_TMDB_IMAGE_BASE_URL
vercel env add VITE_BACKEND_URL
```

---

## 🔧 Backend Deployment (Render)

### Step 1: Create MongoDB Atlas Database First
**Important**: Complete the MongoDB setup before deploying backend!

### Step 2: Connect to Render

1. Go to https://dashboard.render.com/
2. Click **New +** → **Web Service**
3. Connect your GitHub repository: `Nageshwaran-Cyberbot/netflix-clone`

### Step 3: Configure Web Service

```yaml
Name: netflix-clone-api
Region: Oregon (US West)
Branch: main
Root Directory: ./
Runtime: Node
Build Command: cd server && npm install && npm run build
Start Command: cd server && npm start
```

### Step 4: Environment Variables

Add these in Render Dashboard → Environment:

```bash
PORT=5001
NODE_ENV=production
JWT_SECRET=your_super_secure_jwt_secret_key_change_this
JWT_EXPIRE=7d
TMDB_API_KEY=8dcba2c5d42d8060925a212e54656155
TMDB_BASE_URL=https://api.themoviedb.org/3
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-clone
CORS_ORIGIN=https://your-frontend-url.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 5: Deploy
- Click **Create Web Service**
- Wait for deployment (5-7 minutes)
- Your backend will be live at: `https://netflix-clone-api.onrender.com`

### Step 6: Update Frontend with Backend URL
1. Go back to Vercel Dashboard
2. Update `VITE_BACKEND_URL` with your Render URL
3. Redeploy frontend

### Step 7: Create Demo User
After deployment, run the seed script:

```bash
# In Render Shell (Dashboard → Shell tab)
cd server
npm run seed
```

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create Cluster

1. Go to https://cloud.mongodb.com
2. Click **Build a Database**
3. Choose **FREE** tier (M0 Sandbox)
4. Select **Cloud Provider**: AWS
5. Select **Region**: Closest to your backend (Oregon)
6. Cluster Name: `netflix-clone-cluster`
7. Click **Create**

### Step 2: Create Database User

1. Security → Database Access → Add New Database User
2. Authentication Method: **Password**
3. Username: `netflixuser`
4. Password: Generate a secure password (save it!)
5. Database User Privileges: **Read and write to any database**
6. Click **Add User**

### Step 3: Configure Network Access

1. Security → Network Access → Add IP Address
2. Click **Allow Access from Anywhere** (0.0.0.0/0)
3. Or add Render's IP addresses for better security
4. Click **Confirm**

### Step 4: Get Connection String

1. Click **Connect** on your cluster
2. Choose **Connect your application**
3. Driver: **Node.js**, Version: **4.1 or later**
4. Copy the connection string:
   ```
   mongodb+srv://netflixuser:<password>@netflix-clone-cluster.xxxxx.mongodb.net/netflix-clone
   ```
5. Replace `<password>` with your actual password
6. Add database name: `netflix-clone` at the end

### Step 5: Test Connection

```bash
# In your local terminal
cd server
# Update .env with your MongoDB URI
npm run dev
# Should see: ✅ MongoDB connected successfully
```

---

## ⚙️ CI/CD Setup (GitHub Actions)

### Step 1: Add GitHub Secrets

Go to GitHub repo → Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

```bash
# Vercel Secrets
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id

# Render Secret
RENDER_DEPLOY_HOOK=https://api.render.com/deploy/srv-xxxxx
```

### Step 2: Get Render Deploy Hook

1. Render Dashboard → Your Service → Settings
2. Scroll to **Deploy Hook**
3. Click **Create Deploy Hook**
4. Copy the URL and add to GitHub secrets

### Step 3: Verify Workflow

The `.github/workflows/deploy.yml` is already configured. On every push to `main`:
- ✅ Frontend deploys to Vercel
- ✅ Backend deploys to Render
- ✅ Notification logs success

### Step 4: Test Deployment

```bash
# Make a change and push
git add .
git commit -m "test: trigger deployment"
git push origin main

# Check GitHub Actions tab for progress
```

---

## ✅ Post-Deployment Tasks

### 1. Update CORS Origin

In Render environment variables, update:
```bash
CORS_ORIGIN=https://your-actual-frontend-url.vercel.app
```

### 2. Update Frontend Backend URL

In Vercel environment variables, update:
```bash
VITE_BACKEND_URL=https://your-actual-backend-url.onrender.com/api
```

### 3. Create Demo User

```bash
# Run in Render Shell
cd server
npm run seed
```

### 4. Test the Application

1. Visit your Vercel URL
2. Try to register a new user
3. Login with demo credentials:
   - Email: `demo@netflix.com`
   - Password: `demo123`
4. Test adding movies to watchlist
5. Test search functionality

### 5. Monitor Performance

**Vercel Analytics**:
- Dashboard → Analytics
- Check page load times
- Monitor traffic

**Render Logs**:
- Dashboard → Logs
- Check for errors
- Monitor API requests

---

## 🐛 Troubleshooting

### Frontend Issues

#### Build Fails on Vercel
```bash
# Check build logs in Vercel Dashboard
# Common issues:
- Missing environment variables
- TypeScript errors
- Dependency conflicts

# Solution:
1. Verify all env vars are set
2. Run `npm run build` locally first
3. Check Node.js version (should be 18+)
```

#### "Cannot connect to backend"
```bash
# Check:
1. VITE_BACKEND_URL is correct in Vercel
2. Backend is running on Render
3. CORS_ORIGIN matches frontend URL

# Verify in browser console
console.log(import.meta.env.VITE_BACKEND_URL)
```

### Backend Issues

#### Build Fails on Render
```bash
# Common issues:
- MongoDB connection string incorrect
- Missing dependencies
- TypeScript compilation errors

# Solution:
1. Check Render build logs
2. Verify MongoDB URI format
3. Ensure all dependencies in package.json
```

#### "MongoDB connection failed"
```bash
# Check:
1. MongoDB Atlas IP whitelist (0.0.0.0/0)
2. Connection string format
3. Username/password correct
4. Database name specified

# Test connection locally first
```

#### "CORS Error"
```bash
# In Render environment variables:
CORS_ORIGIN=https://your-exact-vercel-url.vercel.app

# Note: No trailing slash!
# Redeploy after changing
```

### Database Issues

#### "Authentication failed"
```bash
# MongoDB Atlas → Security → Database Access
1. Check user exists
2. Verify password
3. Ensure user has "Read and write to any database" role
```

#### "Connection timeout"
```bash
# MongoDB Atlas → Security → Network Access
1. Add 0.0.0.0/0 to allow all
2. Or add specific Render IPs
3. Wait 2-3 minutes for changes to propagate
```

---

## 🔗 Deployment URLs

After successful deployment, your application will be available at:

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend API**: `https://your-api-name.onrender.com`
- **API Health Check**: `https://your-api-name.onrender.com/health`

---

## 📊 Deployment Checklist

### Pre-Deployment
- [ ] Code is committed and pushed to GitHub
- [ ] All environment variables documented
- [ ] Build succeeds locally (`npm run build`)
- [ ] Backend builds successfully (`cd server && npm run build`)
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with correct permissions

### Frontend Deployment
- [ ] Vercel account connected to GitHub
- [ ] Project imported from GitHub
- [ ] Environment variables added
- [ ] Initial deployment successful
- [ ] Custom domain configured (optional)

### Backend Deployment
- [ ] Render account created
- [ ] Web service created from GitHub
- [ ] Environment variables added
- [ ] MongoDB URI configured
- [ ] Initial deployment successful
- [ ] Demo user created via seed script

### Post-Deployment
- [ ] Frontend can reach backend API
- [ ] User registration works
- [ ] User login works
- [ ] Watchlist CRUD operations work
- [ ] Search functionality works
- [ ] Movie details load correctly
- [ ] CI/CD pipeline configured
- [ ] GitHub secrets added
- [ ] Deploy hooks tested

---

## 🎉 Success!

Your Netflix Clone is now deployed and ready for the world! 🌍

### Next Steps:
1. **Share your project**: Add live URLs to README
2. **Monitor performance**: Check Vercel Analytics & Render Logs
3. **Add custom domain**: Vercel Settings → Domains
4. **Scale**: Upgrade plans if needed (Render Free tier sleeps after 15 min inactivity)
5. **Security**: Change JWT_SECRET to a stronger value

### Free Tier Limitations:
- **Vercel**: Unlimited deployments, 100GB bandwidth/month
- **Render**: 750 hours/month (sleeps after 15 min inactivity)
- **MongoDB Atlas**: 512MB storage

### Need Help?
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com/

---

**Built with ❤️ by Nageshwaran**
