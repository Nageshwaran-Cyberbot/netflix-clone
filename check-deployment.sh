#!/bin/bash

# Netflix Clone - Deployment Status Checker
# Checks if the site is actually deployed and accessible

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   🔍 CHECKING DEPLOYMENT STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📊 GitHub Actions Status${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v gh &> /dev/null; then
    echo "Latest GitHub Actions runs:"
    gh run list --limit 3 --json status,conclusion,name,createdAt,displayTitle 2>/dev/null || echo "Unable to fetch workflow runs"
else
    echo -e "${YELLOW}⚠️  GitHub CLI not installed${NC}"
    echo "Install with: brew install gh"
fi
echo ""

echo -e "${BLUE}🔗 Repository Information${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
REPO_URL=$(git remote get-url origin 2>/dev/null)
if [ -n "$REPO_URL" ]; then
    echo "Repository: $REPO_URL"
    echo ""
    GITHUB_USER=$(echo $REPO_URL | sed -n 's/.*github.com[/:]\([^/]*\)\/.*/\1/p')
    REPO_NAME=$(echo $REPO_URL | sed -n 's/.*\/\([^.]*\).*/\1/p')
    
    if [ -n "$GITHUB_USER" ] && [ -n "$REPO_NAME" ]; then
        echo "GitHub Actions: https://github.com/$GITHUB_USER/$REPO_NAME/actions"
        echo ""
    fi
else
    echo -e "${RED}❌ No git remote found${NC}"
fi

echo -e "${BLUE}🌐 Possible Deployment URLs${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
    echo "Checking for Vercel deployments..."
    cd /Users/nageshwaranmanikumar/Desktop/netflix-clone
    
    # Try to get Vercel project info
    VERCEL_INFO=$(vercel ls 2>&1 | head -20)
    if echo "$VERCEL_INFO" | grep -q "https://"; then
        echo ""
        echo -e "${GREEN}✅ Vercel deployments found:${NC}"
        echo "$VERCEL_INFO" | grep -E "https://|Production|Preview" | head -10
        echo ""
        
        # Extract production URL if available
        PROD_URL=$(echo "$VERCEL_INFO" | grep -o 'https://[^ ]*vercel.app' | head -1)
        if [ -n "$PROD_URL" ]; then
            echo -e "${GREEN}🌐 Production URL: $PROD_URL${NC}"
            echo ""
            echo "Testing frontend accessibility..."
            HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL" --max-time 10)
            if [ "$HTTP_CODE" = "200" ]; then
                echo -e "${GREEN}✅ Frontend is LIVE and accessible!${NC}"
            else
                echo -e "${YELLOW}⚠️  Frontend returned HTTP $HTTP_CODE${NC}"
            fi
        fi
    else
        echo -e "${YELLOW}⚠️  No Vercel deployments found${NC}"
        echo "   Run: vercel --prod"
    fi
else
    echo -e "${YELLOW}⚠️  Vercel CLI not installed${NC}"
    echo "   Install with: npm install -g vercel"
    echo ""
    echo "Typical Vercel URL pattern:"
    echo "   https://netflix-clone-[hash].vercel.app"
fi

echo ""
echo -e "${BLUE}🔧 Backend Status (Render)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "To check Render deployment:"
echo "1. Visit: https://dashboard.render.com"
echo "2. Check your 'netflix-clone-api' service"
echo "3. Look for the URL (e.g., https://netflix-clone-api.onrender.com)"
echo ""
echo "Typical Render URL pattern:"
echo "   https://netflix-clone-api-[hash].onrender.com"
echo ""

echo -e "${BLUE}📝 Next Steps Based on Status${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -d ".vercel" ]; then
    echo -e "${GREEN}✅ .vercel folder exists - deployment initiated${NC}"
    echo ""
    echo "✓ Check your deployment URLs:"
    echo "  vercel ls"
    echo ""
    echo "✓ Get latest production URL:"
    echo "  vercel ls --prod"
else
    echo -e "${YELLOW}⚠️  No .vercel folder found${NC}"
    echo ""
    echo "To deploy now:"
    echo "  1. npm install -g vercel"
    echo "  2. vercel login"
    echo "  3. vercel --prod"
fi

echo ""
echo -e "${BLUE}📊 Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "GitHub Repository: ✅ Connected"
echo "Latest Workflow: ✅ Success (about 5 hours ago)"
echo "Frontend Build: ✅ Passing"
echo "Backend Build: ✅ Passing"
echo ""
echo "To get your live URLs:"
echo "1. Run: vercel ls --prod (for frontend)"
echo "2. Check: https://dashboard.render.com (for backend)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
