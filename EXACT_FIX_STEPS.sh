#!/bin/bash

cat << 'EOF'
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📋 EXACT STEPS TO FIX YOUR BACKEND                         ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

✅ GOOD NEWS: All environment variables are correct EXCEPT one!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 THE FIX (Follow in Order):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1: Open MongoDB Atlas (Do this now)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open in browser: https://cloud.mongodb.com

→ Click "Sign Up" (or "Try Free")
→ Use Google/GitHub sign-in (fastest option)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2: Create FREE Cluster
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After logging in:

1. Click: "Build a Database" (or "+ Create" if you have an account)

2. Choose: "M0 FREE" tier
   ✓ No credit card needed
   ✓ 512 MB storage
   ✓ Perfect for this project

3. Cloud Provider & Region:
   Provider: AWS
   Region: Oregon (us-west-2) ← Important! Closest to your Render app
   
4. Cluster Name: netflix-clone

5. Click: "Create Cluster" (wait 1-3 minutes)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3: Create Database User (Security Setup)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You'll see a "Security Quickstart" screen:

1. Username: netflixadmin
   
2. Password: Click "Autogenerate Secure Password"
   → COPY THIS PASSWORD! You'll need it in a moment
   → Or use: NetflixClone2026!
   
3. Click: "Create User"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4: Network Access (Allow Render to Connect)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Still in Security Quickstart:

1. Add IP Address: 0.0.0.0/0
   (This means "allow from anywhere" - required for Render)
   
2. Description: "Render Backend"

3. Click: "Add Entry"

4. Click: "Finish and Close"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 5: Get Connection String
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Click: "Connect" button (on your cluster)

2. Choose: "Connect your application"

3. Driver: Node.js
   Version: 4.1 or later

4. You'll see a connection string like:
   mongodb+srv://netflixadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

5. COPY this string

6. Replace <password> with your actual password

7. Add /netflix-clone before the ?

Final format should be:
mongodb+srv://netflixadmin:YourPasswordHere@cluster0.xxxxx.mongodb.net/netflix-clone?retryWrites=true&w=majority

EXAMPLE:
mongodb+srv://netflixadmin:NetflixClone2026!@netflix-clone.abc123.mongodb.net/netflix-clone?retryWrites=true&w=majority

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 6: Update Render Environment Variable
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IN YOUR RENDER DASHBOARD (the screen you showed me):

1. You're already on the Environment tab ✓

2. Find: MONGODB_URI row

3. Click the 🖊️ pencil icon (Edit button) on that row

4. DELETE the PostgreSQL string:
   postgresql://netflix_clone_db_skt3_user:...

5. PASTE your MongoDB Atlas connection string:
   mongodb+srv://netflixadmin:YourPassword@cluster0.xxxxx.mongodb.net/netflix-clone?retryWrites=true&w=majority

6. Click: "Save Changes"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 7: Watch Deployment (Automatic)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After saving:

1. Render will automatically redeploy
   → You'll see "Deploying..." message

2. Click "Logs" tab to watch progress

3. Wait 5-8 minutes

4. Look for:
   ✓ "MongoDB connected"
   ✓ "Server is running on port 5001"
   ✓ Status changes to "Live" (green)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 8: Get Your Backend URL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Once deployment succeeds:

1. At the top of the page, you'll see your backend URL:
   https://netflix-clone-api-[something].onrender.com

2. COPY this URL (you'll need it next)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 9: Test Backend (Verify it works)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open in browser or use curl:

https://your-backend-url.onrender.com/health

Should return:
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-02-01T..."
}

✅ If you see this, backend is working!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 10: Connect Frontend to Backend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Method A: Vercel CLI (if installed)
────────────────────────────────────
vercel env add VITE_BACKEND_URL production

When prompted, enter:
https://your-backend-url.onrender.com/api

Then redeploy:
vercel --prod


Method B: Vercel Dashboard
──────────────────────────
1. Go to: https://vercel.com
2. Find your project: netflix-clone-hh1d
3. Settings → Environment Variables
4. Find: VITE_BACKEND_URL
5. Edit value to: https://your-backend-url.onrender.com/api
6. Click "Save"
7. Redeploy: Deployments → ... menu → Redeploy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 11: Create Demo User
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In Render Dashboard:

1. Click "Shell" tab (top navigation)

2. Wait for shell to connect (~10 seconds)

3. Run this command:
   cd server && npm run seed

4. Should see:
   ✅ Demo user created successfully
   Email: demo@netflix.com
   Password: demo123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 12: Test Everything!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Open: https://netflix-clone-hh1d.vercel.app

2. Click "Login"

3. Use demo account:
   Email: demo@netflix.com
   Password: demo123

4. Should successfully login! ✅

5. Browse movies

6. Add a movie to "My List"

7. Check "My List" page - should see your saved movie

8. Logout and login again - your list should persist!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ COMPLETION CHECKLIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- [ ] MongoDB Atlas account created
- [ ] FREE M0 cluster created
- [ ] Database user created (username + password)
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained
- [ ] Render MONGODB_URI updated
- [ ] Backend deployment succeeded (green "Live" status)
- [ ] Backend health check returns 200
- [ ] Backend URL obtained
- [ ] Frontend env variable updated
- [ ] Frontend redeployed
- [ ] Demo user created
- [ ] Login works
- [ ] Watchlist features work

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏱️  ESTIMATED TIME: 15-20 minutes

🎯 START HERE: https://cloud.mongodb.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 TIPS:

✓ Save your MongoDB password somewhere safe
✓ The cluster takes 1-3 minutes to initialize
✓ The Render redeploy takes 5-8 minutes
✓ Test the /health endpoint before connecting frontend
✓ If password has special characters, URL encode them

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🆘 IF YOU GET STUCK:

Run this after completing steps:
./check-backend.sh

Or test your connection string locally:
cd server && npm run dev

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EOF
