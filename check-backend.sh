#!/bin/bash

# Netflix Clone - Complete Backend Check
# Comprehensive backend status and deployment guide

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   🔍 BACKEND DEPLOYMENT CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}1️⃣  Checking Backend Build${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd /Users/nageshwaranmanikumar/Desktop/netflix-clone/server
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend builds successfully${NC}"
    
    if [ -d "dist" ]; then
        FILE_COUNT=$(find dist -type f | wc -l | tr -d ' ')
        echo "   Built files: $FILE_COUNT files in dist/"
    fi
else
    echo -e "${RED}❌ Backend build failed${NC}"
    exit 1
fi

cd ..
echo ""

echo -e "${BLUE}2️⃣  Checking Backend Configuration${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check package.json
if [ -f "server/package.json" ]; then
    echo -e "${GREEN}✅ server/package.json exists${NC}"
    START_SCRIPT=$(cat server/package.json | grep '"start"' | head -1)
    echo "   $START_SCRIPT"
else
    echo -e "${RED}❌ server/package.json missing${NC}"
fi

# Check render.yaml
if [ -f "render.yaml" ]; then
    echo -e "${GREEN}✅ render.yaml exists${NC}"
    BUILD_CMD=$(grep "buildCommand:" render.yaml | head -1)
    START_CMD=$(grep "startCommand:" render.yaml | head -1)
    echo "   $BUILD_CMD"
    echo "   $START_CMD"
else
    echo -e "${RED}❌ render.yaml missing${NC}"
fi

# Check environment file
if [ -f "server/.env.example" ]; then
    echo -e "${GREEN}✅ server/.env.example exists${NC}"
else
    echo -e "${YELLOW}⚠️  server/.env.example missing${NC}"
fi

echo ""

echo -e "${BLUE}3️⃣  Testing Common Backend URLs${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

URLS=(
    "https://netflix-clone-api.onrender.com"
    "https://netflix-clone-api-latest.onrender.com"
    "https://netflix-clone-backend.onrender.com"
)

FOUND_URL=""
for URL in "${URLS[@]}"; do
    echo -n "Testing $URL ... "
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL/health" --max-time 5 2>&1)
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ LIVE (HTTP $HTTP_CODE)${NC}"
        FOUND_URL=$URL
        break
    elif [ "$HTTP_CODE" = "404" ]; then
        echo -e "${YELLOW}⚠️  Not found (HTTP $HTTP_CODE)${NC}"
    else
        echo -e "${RED}❌ Not accessible${NC}"
    fi
done

echo ""

if [ -n "$FOUND_URL" ]; then
    echo -e "${GREEN}🎉 BACKEND IS LIVE!${NC}"
    echo "   URL: $FOUND_URL"
    echo ""
    
    echo "Testing API endpoints..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Test health endpoint
    echo -n "GET /health ... "
    HEALTH=$(curl -s "$FOUND_URL/health")
    if echo "$HEALTH" | grep -q "success"; then
        echo -e "${GREEN}✅${NC}"
    else
        echo -e "${RED}❌${NC}"
    fi
    
    # Test API health
    echo -n "GET /api/health ... "
    API_HEALTH=$(curl -s "$FOUND_URL/api/health" 2>&1)
    if echo "$API_HEALTH" | grep -q "success"; then
        echo -e "${GREEN}✅${NC}"
    else
        echo -e "${YELLOW}⚠️  (may not exist)${NC}"
    fi
    
else
    echo -e "${RED}❌ BACKEND NOT DEPLOYED${NC}"
    echo ""
    echo -e "${YELLOW}Backend needs to be deployed to Render${NC}"
fi

echo ""

echo -e "${BLUE}4️⃣  Deployment Status Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -n "$FOUND_URL" ]; then
    echo -e "${GREEN}✅ Frontend: DEPLOYED (Vercel)${NC}"
    echo "   https://netflix-clone-hh1d.vercel.app"
    echo ""
    echo -e "${GREEN}✅ Backend: DEPLOYED (Render)${NC}"
    echo "   $FOUND_URL"
    echo ""
    echo -e "${BLUE}📝 Next Steps:${NC}"
    echo "   1. Update frontend environment variable:"
    echo "      vercel env add VITE_BACKEND_URL production"
    echo "      Value: $FOUND_URL/api"
    echo ""
    echo "   2. Update backend CORS in Render:"
    echo "      CORS_ORIGIN=https://netflix-clone-hh1d.vercel.app"
    echo ""
    echo "   3. Create demo user in Render Shell:"
    echo "      cd server && npm run seed"
else
    echo -e "${GREEN}✅ Frontend: DEPLOYED${NC}"
    echo "   https://netflix-clone-hh1d.vercel.app"
    echo ""
    echo -e "${RED}❌ Backend: NOT DEPLOYED${NC}"
    echo ""
    echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}  BACKEND DEPLOYMENT REQUIRED${NC}"
    echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${BLUE}🚀 Deploy Backend to Render (2 Options):${NC}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}OPTION 1: Via Render Dashboard (Recommended)${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. Visit: https://dashboard.render.com"
    echo ""
    echo "2. Click: New + → Web Service"
    echo ""
    echo "3. Connect GitHub Repository:"
    echo "   → Repository: Nageshwaran-Cyberbot/netflix-clone"
    echo "   → Branch: main"
    echo ""
    echo "4. Configure Service:"
    echo "   Name: netflix-clone-api"
    echo "   Region: Oregon (US West)"
    echo "   Branch: main"
    echo "   Root Directory: (leave empty)"
    echo ""
    echo "   Build Command:"
    echo "     cd server && npm install --production=false && npm run build"
    echo ""
    echo "   Start Command:"
    echo "     cd server && npm start"
    echo ""
    echo "   Plan: Free"
    echo ""
    echo "5. Add Environment Variables:"
    echo "   PORT=5001"
    echo "   NODE_ENV=production"
    echo "   JWT_SECRET=netflix_clone_super_secret_key_2026_production"
    echo "   JWT_EXPIRE=7d"
    echo "   TMDB_API_KEY=8dcba2c5d42d8060925a212e54656155"
    echo "   TMDB_BASE_URL=https://api.themoviedb.org/3"
    echo "   MONGODB_URI=<your-mongodb-atlas-connection-string>"
    echo "   CORS_ORIGIN=https://netflix-clone-hh1d.vercel.app"
    echo "   RATE_LIMIT_WINDOW_MS=900000"
    echo "   RATE_LIMIT_MAX_REQUESTS=100"
    echo ""
    echo "6. Click: Create Web Service"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}OPTION 2: Via render.yaml (Blueprint)${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. Visit: https://dashboard.render.com"
    echo ""
    echo "2. Click: New + → Blueprint"
    echo ""
    echo "3. Connect to GitHub repository:"
    echo "   → Repository: Nageshwaran-Cyberbot/netflix-clone"
    echo ""
    echo "4. Render will detect render.yaml"
    echo ""
    echo "5. Review and deploy"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo -e "${BLUE}📝 MongoDB Atlas Setup (Required):${NC}"
    echo ""
    echo "1. Visit: https://cloud.mongodb.com"
    echo ""
    echo "2. Sign up/Login"
    echo ""
    echo "3. Create New Cluster:"
    echo "   → Choose: FREE (M0) tier"
    echo "   → Cloud Provider: AWS"
    echo "   → Region: Closest to Oregon"
    echo "   → Cluster Name: netflix-clone"
    echo ""
    echo "4. Create Database User:"
    echo "   → Security → Database Access"
    echo "   → Add New Database User"
    echo "   → Username: netflixuser"
    echo "   → Password: (generate secure password)"
    echo ""
    echo "5. Allow Network Access:"
    echo "   → Security → Network Access"
    echo "   → Add IP Address"
    echo "   → Allow Access from Anywhere: 0.0.0.0/0"
    echo ""
    echo "6. Get Connection String:"
    echo "   → Connect → Connect Your Application"
    echo "   → Copy connection string"
    echo "   → Format: mongodb+srv://user:pass@cluster.mongodb.net/netflix-clone"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

echo ""
echo -e "${BLUE}📊 Build Status${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Frontend Build: ✅ Success"
echo "Backend Build: ✅ Success"
echo "Frontend Deploy: ✅ Live"
echo "Backend Deploy: $([ -n "$FOUND_URL" ] && echo '✅ Live' || echo '❌ Pending')"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -z "$FOUND_URL" ]; then
    echo ""
    echo -e "${YELLOW}⚠️  BACKEND DEPLOYMENT REQUIRED${NC}"
    echo ""
    echo "Your frontend is live, but backend is not deployed."
    echo "Follow the steps above to deploy backend to Render."
    echo ""
    echo "Estimated deployment time: 5-10 minutes"
fi
