# 🗄️ MongoDB Atlas Setup - Complete Guide

## Current Status
- **Cluster**: Cluster0 (exists in MongoDB Atlas)
- **User**: bugbountyp1_db_user
- **Password**: NetflixClone2026
- **Database**: netflix-clone
- **Connection**: ❌ Not configured in Render

## 🎯 Step-by-Step Instructions

### Step 1: Access MongoDB Atlas
1. Go to: https://cloud.mongodb.com
2. Log in with your credentials
3. You should see your cluster "Cluster0"

### Step 2: Verify Cluster is Active
Look for the cluster status:
- ✅ **Green indicator** = Active and ready
- ⏳ **Yellow indicator** = Still being created
- ❌ **Red indicator** = Error

**If not active**: Wait a few minutes for cluster creation to complete.

### Step 3: Configure Network Access
1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. This adds `0.0.0.0/0` (required for Render to connect)
5. Click **"Confirm"**

**Important**: Without this, Render cannot connect even with correct credentials.

### Step 4: Get Connection String
1. Go back to **"Database"** view
2. Click **"Connect"** button on Cluster0
3. Choose **"Connect your application"**
4. Select:
   - **Driver**: Node.js
   - **Version**: 5.5 or later
5. Copy the connection string

**Example format**:
```
mongodb+srv://bugbountyp1_db_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 5: Format Connection String
Replace `<password>` with your actual password and add database name:

```
mongodb+srv://bugbountyp1_db_user:NetflixClone2026@cluster0.XXXXX.mongodb.net/netflix-clone?retryWrites=true&w=majority
```

**Replace**:
- `<password>` → `NetflixClone2026`
- `XXXXX` → Your actual cluster ID (from the string you copied)
- Add `/netflix-clone` before the `?` to specify database name

**✅ Correct Example**:
```
mongodb+srv://bugbountyp1_db_user:NetflixClone2026@cluster0.t4bdata.mongodb.net/netflix-clone?retryWrites=true&w=majority
```

### Step 6: Update Render Environment Variable
1. Go to: https://dashboard.render.com
2. Click on your **"netflix-clone-api"** service
3. Go to **"Environment"** tab
4. Find **"MONGODB_URI"**
5. Click the **edit icon** (pencil)
6. Paste your formatted connection string
7. Click **"Save Changes"**

### Step 7: Redeploy Backend
After saving the MongoDB URI:
1. Stay in Render dashboard
2. Click **"Manual Deploy"** dropdown (top right)
3. Select **"Deploy latest commit"**
4. Watch the logs for successful deployment

## 🔍 Verification

### Check MongoDB Connection
Once deployed, the Render logs should show:
```
✅ Connected to MongoDB
✅ Database: netflix-clone
✅ Server running on port 5001
```

### Test Health Endpoint
```bash
curl https://your-backend-url.onrender.com/health
```

**Expected response**:
```json
{
  "status": "ok",
  "timestamp": "2024-12-21T...",
  "environment": "production"
}
```

## ⚠️ Common Issues

### Issue 1: "querySrv ENOTFOUND"
**Cause**: Incorrect connection string or cluster not active
**Solution**: 
- Verify cluster is active (green indicator)
- Double-check connection string format
- Ensure you replaced `<password>` and `XXXXX` correctly

### Issue 2: "Authentication failed"
**Cause**: Wrong username or password
**Solution**: 
- Username: `bugbountyp1_db_user`
- Password: `NetflixClone2026`
- Verify these in MongoDB Atlas under "Database Access"

### Issue 3: "No DNS entries"
**Cause**: Cluster still being created OR typo in cluster ID
**Solution**: 
- Wait for cluster creation to complete
- Verify cluster ID matches exactly (case-sensitive)

### Issue 4: "Connection timeout"
**Cause**: Network access not configured
**Solution**: 
- Add `0.0.0.0/0` to Network Access in MongoDB Atlas
- Wait 2-3 minutes after adding for changes to propagate

## 📝 Checklist

Before proceeding, ensure:
- [ ] MongoDB Atlas account created
- [ ] Cluster0 is **active** (green indicator)
- [ ] Database user exists (bugbountyp1_db_user)
- [ ] Network Access configured (0.0.0.0/0)
- [ ] Connection string copied from Atlas
- [ ] Password replaced in connection string
- [ ] Database name added to connection string
- [ ] MONGODB_URI updated in Render
- [ ] Backend redeployed on Render

## 🎉 Success Indicators

After successful configuration:

### 1. Render Logs Show
```
[INFO] Starting server...
[INFO] Connected to MongoDB: netflix-clone
[INFO] Server listening on port 5001
[INFO] Health check endpoint: /health
```

### 2. No Error Messages
No more "querySrv ENOTFOUND" errors

### 3. Backend URL is Live
Can access health endpoint successfully

### 4. Collections Created
MongoDB Atlas shows these collections:
- users
- watchlists

## 📞 Need Help?

If you're stuck:
1. Check the exact error message in Render logs
2. Verify every step in the checklist above
3. Try the connection string in a MongoDB client first
4. Ensure no typos in password or cluster ID

## 🔗 Quick Links
- MongoDB Atlas: https://cloud.mongodb.com
- Render Dashboard: https://dashboard.render.com
- Backend Logs: https://dashboard.render.com/web/netflix-clone-api/logs
- Network Access: https://cloud.mongodb.com/v2/PROJECT_ID#/security/network/accessList

---

**Important**: Save the connection string securely. You'll need it for local development too.

**Last Updated**: December 21, 2024
