## 🔗 MONGODB CONNECTION STRING FORMAT

### Connection String Template

```
mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_ID>.mongodb.net/netflix-clone?retryWrites=true&w=majority
```

**Replace placeholders**:
- `<USERNAME>` → Your MongoDB Atlas username
- `<PASSWORD>` → Your MongoDB Atlas password  
- `<CLUSTER_ID>` → Your cluster ID (e.g., cluster0.xxxxx)

### How to Get Your Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Add `/netflix-clone` before the `?` to specify the database

---

## 📋 Where to Use This

### In Render Dashboard:

1. Go to: **netflix-clone-api** service
2. Click: **Environment** tab
3. Find: **MONGODB_URI** variable
4. Click: **Edit** (pencil icon)
5. **Delete** the PostgreSQL string
6. **Paste** the connection string above
7. Click: **Save Changes**
8. Wait 5-8 minutes for redeployment

---

## ✅ After Updating Render

Watch for these in the Logs:
```
✓ MongoDB connected
✓ Server is running on port 5001
✓ Status: Live (green)
```

---

## 🧪 Test Backend

Once deployed, test with:
```bash
curl https://netflix-clone-api-xxxx.onrender.com/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## 🔗 Next Steps

After backend is live:

1. **Get Backend URL** from Render
2. **Update Vercel** environment variable:
   - `VITE_BACKEND_URL` = `https://your-backend-url.onrender.com/api`
3. **Redeploy frontend**
4. **Create demo user** in Render Shell:
   ```bash
   cd server && npm run seed
   ```
5. **Test login** at https://netflix-clone-hh1d.vercel.app

---

**⚠️ IMPORTANT:** Keep this connection string secure! Don't commit it to GitHub.
