#!/bin/bash

echo "================================================"
echo "🔍 NETFLIX CLONE - DEPLOYMENT STATUS CHECKER"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Frontend Status
echo -e "${BLUE}Frontend (Vercel):${NC}"
FRONTEND_URL="https://netflix-clone-hh1d.vercel.app"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL")

if [ "$FRONTEND_STATUS" = "200" ]; then
    echo -e "  ✅ Status: ${GREEN}LIVE${NC}"
    echo -e "  🔗 URL: $FRONTEND_URL"
else
    echo -e "  ❌ Status: ${RED}DOWN (HTTP $FRONTEND_STATUS)${NC}"
fi

echo ""

# Backend Status
echo -e "${BLUE}Backend (Render):${NC}"
echo -e "  ⏳ Checking latest deployment..."
echo ""
echo -e "  ${YELLOW}Note:${NC} The backend URL isn't visible yet."
echo -e "  Please check your Render dashboard:"
echo -e "  👉 https://dashboard.render.com"
echo ""
echo -e "  Look for service: ${BLUE}netflix-clone-api${NC}"
echo ""

# Build Status Check
echo -e "${BLUE}Expected Build Outcome:${NC}"
echo -e "  1. ${GREEN}✅ Build Phase${NC} - TypeScript compilation should succeed"
echo -e "  2. ${RED}❌ Start Phase${NC} - Will fail until MongoDB is configured"
echo ""

# MongoDB Status
echo -e "${BLUE}MongoDB Atlas Status:${NC}"
echo -e "  ⚠️  Action Required: Configure connection string"
echo ""
echo -e "  Steps:"
echo -e "  1. Go to: https://cloud.mongodb.com"
echo -e "  2. Click ${BLUE}Connect${NC} on your cluster"
echo -e "  3. Choose ${BLUE}Connect your application${NC}"
echo -e "  4. Copy connection string"
echo -e "  5. Update ${BLUE}MONGODB_URI${NC} in Render dashboard"
echo ""

# Git Status
echo -e "${BLUE}Latest Commit:${NC}"
LATEST_COMMIT=$(git log -1 --oneline 2>/dev/null)
if [ $? -eq 0 ]; then
    echo -e "  📝 $LATEST_COMMIT"
else
    echo -e "  ${RED}Error reading git history${NC}"
fi

echo ""

# Instructions
echo "================================================"
echo "📋 NEXT ACTIONS"
echo "================================================"
echo ""
echo "1. ${YELLOW}Check Render Dashboard${NC}"
echo "   https://dashboard.render.com"
echo ""
echo "2. ${YELLOW}Watch Build Logs${NC}"
echo "   Click on 'netflix-clone-api' → Logs tab"
echo ""
echo "3. ${YELLOW}Fix MongoDB Connection${NC}"
echo "   See BUILD_FIX_APPLIED.md for detailed steps"
echo ""
echo "4. ${YELLOW}Test Deployment${NC}"
echo "   Once live, run: ./check-deployment.sh"
echo ""

echo "================================================"
echo "Run this script anytime: ./monitor-deployment.sh"
echo "================================================"
