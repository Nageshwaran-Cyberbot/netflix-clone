# 🤖 GitHub Actions - Fixed Deployment Guide

## ✅ Fixed Issues

The GitHub Actions workflow has been fixed with:
- ✅ Proper Vercel deployment using official action
- ✅ Simplified Render deployment via deploy hook
- ✅ Proper secret handling and error checking
- ✅ Better logging and status messages

---

## Setup Instructions

### STEP 1: Get Your Vercel Tokens

1. Go to: https://vercel.com/account/tokens
2. Create a new token named `github-actions-vercel`
3. Copy the token (save for later)

### STEP 2: Get Your Vercel Project IDs

1. Go to: https://vercel.com/dashboard
2. Select your `netflix-clone` project
3. Go to **Settings** → **General**
4. Copy: **Project ID** and **Org ID** (if organization)

### STEP 3: Get Your Render Deploy Hook

1. Go to: https://dashboard.render.com
2. Select your `netflix-clone-api` service
3. Go to **Settings** → **Deploy Hook**
4. Copy the Deploy Hook URL (starts with https://api.render.com/deploy...)

### STEP 4: Add GitHub Secrets

1. Go to: https://github.com/Nageshwaran-Cyberbot/netflix-clone
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret** for each:

#### Secret 1: VERCEL_TOKEN
- Name: `VERCEL_TOKEN`
- Value: (your Vercel token from STEP 1)
- Click "Add secret"

#### Secret 2: VERCEL_ORG_ID
- Name: `VERCEL_ORG_ID`
- Value: (your Organization ID from STEP 2, or leave blank if personal)
- Click "Add secret"

#### Secret 3: VERCEL_PROJECT_ID
- Name: `VERCEL_PROJECT_ID`
- Value: (your Project ID from STEP 2)
- Click "Add secret"

#### Secret 4: RENDER_DEPLOY_HOOK
- Name: `RENDER_DEPLOY_HOOK`
- Value: (your Render Deploy Hook URL from STEP 3)
- Click "Add secret"

---

## How to Use

### Automatic Deployment

Just push your code to GitHub:
```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

GitHub Actions will automatically:
1. ✅ Deploy frontend to Vercel
2. ✅ Trigger backend deployment on Render
3. ✅ Notify when complete

### Check Deployment Status

1. Go to your GitHub repository
2. Click **Actions** tab (top menu)
3. See all deployments and their status
4. Click on a deployment to see detailed logs

---

## First Time Setup

Before automatic deployments work:

1. **Deploy backend manually to Render** (create the service first)
2. **Deploy frontend manually to Vercel** (create the project first)
3. **Get the Deploy Hook** from Render settings
4. **Add secrets to GitHub** (follow STEP 4 above)
5. **Create demo user** (run seed script in Render shell)

After this, all future pushes will auto-deploy!

---

## URLs After Deployment

- **Frontend:** https://netflix-clone-xxx.vercel.app
- **Backend:** https://netflix-clone-api.onrender.com
- **GitHub:** https://github.com/Nageshwaran-Cyberbot/netflix-clone

---

## Demo Credentials

```
Email: demo@netflix.com
Password: demo123
```

---

## Troubleshooting

**Deployment failed in GitHub Actions?**
- Check Actions logs for error messages
- Verify all 4 secrets are added correctly
- Check Vercel and Render dashboards for issues

**Secrets not working?**
- Names are case-sensitive: `VERCEL_TOKEN` not `vercel_token`
- Regenerate tokens if expired
- Delete and re-add secrets if needed

**No automatic deployment happening?**
- Push to `main` branch (not other branches)
- Check Actions tab for workflow runs
- Verify secrets are set correctly

---

## Manual Deployment (Alternative)

If GitHub Actions doesn't work, deploy manually:

**Frontend to Vercel:**
```bash
npm run build
vercel --prod
```

**Backend to Render:**
- Push to GitHub
- Render will auto-deploy from your repo

---

✅ **Fully automated CI/CD pipeline is ready!**

