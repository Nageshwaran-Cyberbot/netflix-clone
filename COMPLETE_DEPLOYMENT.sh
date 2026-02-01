#!/bin/bash

# 🎯 NETFLIX CLONE - DEPLOYMENT COMPLETION GUIDE
# Run this script anytime: ./COMPLETE_DEPLOYMENT.sh

clear

echo "╔════════════════════════════════════════════════════════════╗"
echo "║          🎬 NETFLIX CLONE - FINAL DEPLOYMENT STEPS         ║"
echo "╔════════════════════════════════════════════════════════════╗"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}📦 Current Status:${NC}"
echo ""
echo -e "  ✅ Security fixes applied (credentials removed)"
echo -e "  ✅ Render build command fixed (TypeScript types)"
echo -e "  ✅ Vercel configuration updated"
echo -e "  🔄 Waiting for your input to complete deployment"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Function to check if URL is accessible
check_url() {
    local url=$1
    local status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    echo "$status"
}

# Check frontend
echo -e "${BLUE}Step 1: Verify Frontend${NC}"
echo ""
FRONTEND_URL="https://netflix-clone-hh1d.vercel.app"
FRONTEND_STATUS=$(check_url "$FRONTEND_URL")

if [ "$FRONTEND_STATUS" = "200" ]; then
    echo -e "  ✅ Frontend is ${GREEN}LIVE${NC}"
    echo -e "  🔗 $FRONTEND_URL"
else
    echo -e "  ⚠️  Frontend status: HTTP $FRONTEND_STATUS"
fi
echo ""

# Render instructions
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Step 2: Check Render Build Status${NC}"
echo ""
echo "  1. Open: ${CYAN}https://dashboard.render.com${NC}"
echo "  2. Click: ${YELLOW}netflix-clone-api${NC}"
echo "  3. Go to: ${YELLOW}Logs${NC} tab"
echo ""
echo -e "  ${GREEN}Expected:${NC}"
echo "     ✓ Build completed successfully"
echo "     ✓ TypeScript compiled without errors"
echo ""
echo -e "  ${RED}Then:${NC}"
echo "     ✗ Server will fail to start (MongoDB not configured)"
echo "     ✗ This is NORMAL - continue to next step"
echo ""
read -p "Press ENTER when build completes (success or MongoDB error)..."
echo ""

# MongoDB setup
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Step 3: Get MongoDB Connection String${NC}"
echo ""
echo "  1. Open: ${CYAN}https://cloud.mongodb.com${NC}"
echo "  2. Find your ${YELLOW}Cluster0${NC}"
echo "  3. Click: ${YELLOW}Connect${NC} button"
echo "  4. Choose: ${YELLOW}Connect your application${NC}"
echo "  5. Select: ${YELLOW}Node.js${NC} driver"
echo "  6. Copy the connection string"
echo ""
echo -e "  ${YELLOW}Important:${NC}"
echo "     • Replace <password> with your actual password"
echo "     • Add /netflix-clone before the ?"
echo ""
echo -e "  ${GREEN}Format:${NC}"
echo "     mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/netflix-clone?retryWrites=true&w=majority"
echo ""
read -p "Press ENTER when you have your connection string..."
echo ""

# Network access
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Step 4: Configure Network Access${NC}"
echo ""
echo "  In MongoDB Atlas:"
echo "  1. Click: ${YELLOW}Network Access${NC} (left sidebar)"
echo "  2. Click: ${YELLOW}Add IP Address${NC}"
echo "  3. Select: ${YELLOW}Allow Access from Anywhere${NC}"
echo "  4. This adds: ${GREEN}0.0.0.0/0${NC}"
echo "  5. Click: ${YELLOW}Confirm${NC}"
echo ""
echo -e "  ${RED}Without this, Render cannot connect!${NC}"
echo ""
read -p "Press ENTER when network access is configured..."
echo ""

# Update Render
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Step 5: Update Render Environment Variable${NC}"
echo ""
echo "  In Render Dashboard:"
echo "  1. Go to: ${YELLOW}Environment${NC} tab"
echo "  2. Find: ${YELLOW}MONGODB_URI${NC}"
echo "  3. Click: ${YELLOW}Edit${NC} (pencil icon)"
echo "  4. ${RED}Delete${NC} the PostgreSQL string"
echo "  5. ${GREEN}Paste${NC} your MongoDB connection string"
echo "  6. Click: ${YELLOW}Save Changes${NC}"
echo ""
echo -e "  ${CYAN}Render will automatically redeploy${NC}"
echo ""
read -p "Press ENTER when MONGODB_URI is updated..."
echo ""

# Wait for deployment
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Step 6: Wait for Backend Deployment${NC}"
echo ""
echo "  Watch the ${YELLOW}Logs${NC} tab in Render"
echo ""
echo -e "  ${GREEN}Success indicators:${NC}"
echo "     ✓ Connected to MongoDB: netflix-clone"
echo "     ✓ Server listening on port 5001"
echo "     ✓ Status: Live (green circle)"
echo ""
echo -e "  ${CYAN}This takes 5-8 minutes...${NC}"
echo ""
read -p "Press ENTER when backend shows 'Live' status..."
echo ""

# Get backend URL
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Step 7: Copy Backend URL${NC}"
echo ""
echo "  In Render Dashboard:"
echo "  1. Look at the top of the page"
echo "  2. Find URL like: ${CYAN}https://netflix-clone-api-xxxx.onrender.com${NC}"
echo "  3. Click to copy it"
echo ""
echo -n "Paste your backend URL here: "
read BACKEND_URL
echo ""

if [ -z "$BACKEND_URL" ]; then
    echo -e "${RED}No URL provided. You can continue manually.${NC}"
    BACKEND_URL="YOUR_BACKEND_URL"
fi

# Test backend
if [ "$BACKEND_URL" != "YOUR_BACKEND_URL" ]; then
    echo "  Testing backend..."
    HEALTH_STATUS=$(check_url "$BACKEND_URL/health")
    if [ "$HEALTH_STATUS" = "200" ]; then
        echo -e "  ✅ Backend is ${GREEN}LIVE and HEALTHY${NC}"
    else
        echo -e "  ⚠️  Backend status: HTTP $HEALTH_STATUS"
    fi
fi
echo ""

# Update Vercel
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Step 8: Update Frontend Backend URL${NC}"
echo ""
echo "  1. Open: ${CYAN}https://vercel.com/dashboard${NC}"
echo "  2. Select: ${YELLOW}netflix-clone-hh1d${NC} project"
echo "  3. Go to: ${YELLOW}Settings${NC} → ${YELLOW}Environment Variables${NC}"
echo "  4. Find: ${YELLOW}VITE_BACKEND_URL${NC}"
echo "  5. Update to: ${GREEN}${BACKEND_URL}/api${NC}"
echo "  6. Click: ${YELLOW}Save${NC}"
echo ""
read -p "Press ENTER when environment variable is updated..."
echo ""

# Redeploy frontend
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Step 9: Redeploy Frontend${NC}"
echo ""
echo "  In Vercel Dashboard:"
echo "  1. Go to: ${YELLOW}Deployments${NC} tab"
echo "  2. Find latest deployment"
echo "  3. Click: ${YELLOW}⋯${NC} (three dots)"
echo "  4. Click: ${YELLOW}Redeploy${NC}"
echo "  5. Click: ${YELLOW}Redeploy${NC} again to confirm"
echo ""
read -p "Press ENTER when frontend is redeploying..."
echo ""

# Create demo user
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Step 10: Create Demo User (Optional)${NC}"
echo ""
echo "  In Render Dashboard:"
echo "  1. Go to: ${YELLOW}Shell${NC} tab"
echo "  2. Wait for shell to load"
echo "  3. Run: ${GREEN}cd server && npm run seed${NC}"
echo ""
echo "  This creates a test user you can use to login"
echo ""
read -p "Press ENTER when done (or skip)..."
echo ""

# Final verification
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Step 11: Test Everything${NC}"
echo ""
echo "  1. Visit: ${CYAN}$FRONTEND_URL${NC}"
echo "  2. Browse movies and TV shows"
echo "  3. Try login/register"
echo "  4. Add items to watchlist"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo ""
echo "Your Netflix Clone is now live at:"
echo -e "${CYAN}$FRONTEND_URL${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Quick Reference:"
echo ""
echo "  Frontend: $FRONTEND_URL"
echo "  Backend:  $BACKEND_URL"
echo "  Health:   ${BACKEND_URL}/health"
echo ""
echo "  Render Dashboard:  https://dashboard.render.com"
echo "  Vercel Dashboard:  https://vercel.com/dashboard"
echo "  MongoDB Atlas:     https://cloud.mongodb.com"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo ""
echo "  • Backend sleeps after 15min (Render free tier)"
echo "  • First request may take 30-60 seconds to wake up"
echo "  • Get your own TMDB API key: https://www.themoviedb.org"
echo "  • Monitor logs in Render/Vercel dashboards"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}Need help? Check:${NC}"
echo "  • CRITICAL_FIXES_APPLIED.md"
echo "  • MONGODB_SETUP_GUIDE.md"
echo "  • BUILD_FIX_APPLIED.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
