#!/bin/bash

cat << 'EOF'
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🔧 FIXING RENDER DEPLOYMENT ISSUE                          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

📊 ISSUE ANALYSIS (From Your Screenshot):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ netflix-clone-api: FAILED
   Status: Exited with status 1 while running your code
   Error: MongoDB connection error (Invalid connection string)
   
✅ netflix-clone-db: Available (PostgreSQL 16)
   ⚠️  PROBLEM: Your code needs MongoDB, not PostgreSQL!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 ROOT CAUSE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ❌ Wrong database created (PostgreSQL instead of MongoDB)
2. ❌ render.yaml tried to use the PostgreSQL connection string
3. ❌ Backend code expects MongoDB connection format
4. ❌ Connection string format mismatch

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ SOLUTION: Use MongoDB Atlas (External)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Why? Render's free tier doesn't include MongoDB.
Best practice: Use MongoDB Atlas (FREE cloud MongoDB)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 STEP-BY-STEP FIX:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: Setup MongoDB Atlas (5 minutes)
═══════════════════════════════════════════════════════════════

1. Visit: https://cloud.mongodb.com

2. Sign Up / Login
   - Use Google/GitHub sign in (fastest)

3. Create FREE Cluster:
   - Click "Build a Database"
   - Choose: M0 (FREE tier)
   - Provider: AWS
   - Region: Oregon (us-west-2) - closest to your Render app
   - Cluster Name: netflix-clone

4. Create Database User:
   - Security → Database Access
   - Add New Database User
   - Authentication: Password
   - Username: netflixadmin
   - Password: Generate secure password OR use: NetflixClone2026!
   - Database User Privileges: Read and write to any database
   - Click "Add User"

5. Network Access:
   - Security → Network Access
   - Add IP Address
   - Click "Allow Access from Anywhere"
   - IP Address: 0.0.0.0/0
   - Click "Confirm"

6. Get Connection String:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: Node.js
   - Version: 4.1 or later
   - Copy the connection string
   
   Format:
   mongodb+srv://netflixadmin:<password>@netflix-clone.xxxxx.mongodb.net/?retryWrites=true&w=majority

   Replace <password> with your actual password
   Add database name at the end: /netflix-clone

   Final format:
   mongodb+srv://netflixadmin:NetflixClone2026!@netflix-clone.xxxxx.mongodb.net/netflix-clone?retryWrites=true&w=majority

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 2: Fix Render Service (3 minutes)
═══════════════════════════════════════════════════════════════

In Render Dashboard:

1. Click on "netflix-clone-api" service

2. Go to "Environment" tab

3. Find MONGODB_URI variable

4. Edit the value:
   - Delete the current PostgreSQL connection string
   - Paste your MongoDB Atlas connection string
   
   Should look like:
   mongodb+srv://netflixadmin:NetflixClone2026!@netflix-clone.xxxxx.mongodb.net/netflix-clone?retryWrites=true&w=majority

5. Click "Save Changes"

6. Service will automatically redeploy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 3: Wait for Deployment (5-10 minutes)
═══════════════════════════════════════════════════════════════

1. Watch the "Events" tab in your service

2. Look for "Deploy succeeded" message

3. Status should change from "Failed" to "Live" (green)

4. You'll get a URL like:
   https://netflix-clone-api-xxxx.onrender.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 4: Verify Backend Works
═══════════════════════════════════════════════════════════════

After deployment succeeds, test:

curl https://your-backend-url.onrender.com/health

Should return:
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 5: Update Frontend (2 minutes)
═══════════════════════════════════════════════════════════════

After backend is live:

1. Get your backend URL from Render
   Example: https://netflix-clone-api-xxxx.onrender.com

2. Update Vercel environment variable:

   vercel env add VITE_BACKEND_URL production
   
   When prompted, enter:
   https://netflix-clone-api-xxxx.onrender.com/api

3. Redeploy frontend:
   vercel --prod

Or via Vercel Dashboard:
1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Edit VITE_BACKEND_URL
3. Set to: https://netflix-clone-api-xxxx.onrender.com/api
4. Redeploy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 6: Create Demo User
═══════════════════════════════════════════════════════════════

In Render Dashboard:
1. Go to your service
2. Click "Shell" tab
3. Run:
   cd server && npm run seed

Should see:
✅ Demo user created successfully
Email: demo@netflix.com
Password: demo123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 OPTIONAL: Delete PostgreSQL Database
═══════════════════════════════════════════════════════════════

Since you're not using it:

1. In Render Dashboard
2. Find "netflix-clone-db" (PostgreSQL)
3. Settings → Delete Database

This cleans up unused resources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ AFTER COMPLETION CHECKLIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Render MONGODB_URI updated
- [ ] Backend deployment succeeded
- [ ] Backend health check passes
- [ ] Frontend VITE_BACKEND_URL updated
- [ ] Frontend redeployed
- [ ] Demo user created
- [ ] Can login with demo@netflix.com / demo123
- [ ] Watchlist features work

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 KEY POINT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The issue is that render.yaml tried to create a PostgreSQL database,
but your Node.js backend expects MongoDB (mongoose).

Solution: Use external MongoDB Atlas (free) instead of Render's database.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏱️  ESTIMATED TIME: 15-20 minutes total

🆘 Need help? Run: ./check-backend.sh after fixing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EOF
