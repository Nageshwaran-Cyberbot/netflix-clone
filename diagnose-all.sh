#!/bin/bash

# Comprehensive Deployment Diagnostics
# Run: ./diagnose-all.sh

clear

echo "╔════════════════════════════════════════════════════════════╗"
echo "║        🔍 NETFLIX CLONE - FULL DIAGNOSTIC CHECK 🔍         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

error_count=0
warning_count=0

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}1. GIT STATUS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

LATEST_COMMIT=$(git log -1 --oneline 2>/dev/null)
if [ $? -eq 0 ]; then
    echo -e "  ✅ Latest commit: ${GREEN}$LATEST_COMMIT${NC}"
else
    echo -e "  ${RED}✗ Git repository error${NC}"
    ((error_count++))
fi

BRANCH=$(git branch --show-current 2>/dev/null)
echo -e "  📍 Branch: ${CYAN}$BRANCH${NC}"

UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
if [ "$UNCOMMITTED" -gt 0 ]; then
    echo -e "  ${YELLOW}⚠️  $UNCOMMITTED uncommitted changes${NC}"
    ((warning_count++))
else
    echo -e "  ✅ Working directory clean"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}2. FRONTEND STATUS (Vercel)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

FRONTEND_URL="https://netflix-clone-hh1d.vercel.app"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL" 2>/dev/null)

if [ "$FRONTEND_STATUS" = "200" ]; then
    echo -e "  ✅ Status: ${GREEN}LIVE (HTTP $FRONTEND_STATUS)${NC}"
    echo -e "  🔗 URL: $FRONTEND_URL"
else
    echo -e "  ${RED}✗ Status: DOWN (HTTP $FRONTEND_STATUS)${NC}"
    ((error_count++))
fi

# Check if frontend build files exist
if [ -d "dist" ]; then
    DIST_SIZE=$(du -sh dist 2>/dev/null | cut -f1)
    echo -e "  📦 Build size: $DIST_SIZE"
else
    echo -e "  ${YELLOW}⚠️  No dist/ directory found${NC}"
    ((warning_count++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}3. BACKEND CONFIGURATION${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check render.yaml
if [ -f "render.yaml" ]; then
    echo -e "  ✅ render.yaml exists"
    
    BUILD_CMD=$(grep "buildCommand:" render.yaml | sed 's/.*buildCommand: //')
    echo -e "  📝 Build command: ${CYAN}$BUILD_CMD${NC}"
    
    START_CMD=$(grep "startCommand:" render.yaml | sed 's/.*startCommand: //')
    echo -e "  🚀 Start command: ${CYAN}$START_CMD${NC}"
else
    echo -e "  ${RED}✗ render.yaml missing${NC}"
    ((error_count++))
fi

# Check server package.json
if [ -f "server/package.json" ]; then
    echo -e "  ✅ server/package.json exists"
    
    if grep -q '"typescript"' server/package.json; then
        echo -e "  ✅ TypeScript in dependencies"
    else
        echo -e "  ${RED}✗ TypeScript missing from dependencies${NC}"
        ((error_count++))
    fi
    
    if grep -q '"@types/node"' server/package.json; then
        echo -e "  ✅ @types/node in dependencies"
    else
        echo -e "  ${RED}✗ @types/node missing from dependencies${NC}"
        ((error_count++))
    fi
else
    echo -e "  ${RED}✗ server/package.json missing${NC}"
    ((error_count++))
fi

# Check package-lock.json
if [ -f "server/package-lock.json" ]; then
    echo -e "  ✅ server/package-lock.json exists"
    LOCK_SIZE=$(wc -c < server/package-lock.json 2>/dev/null)
    echo -e "  📄 Lock file size: ${LOCK_SIZE} bytes"
else
    echo -e "  ${YELLOW}⚠️  server/package-lock.json missing (npm ci will fail)${NC}"
    ((warning_count++))
fi

# Check tsconfig.json
if [ -f "server/tsconfig.json" ]; then
    echo -e "  ✅ server/tsconfig.json exists"
    
    if grep -q '"types": \["node"\]' server/tsconfig.json; then
        echo -e "  ✅ Node types configured"
    else
        echo -e "  ${YELLOW}⚠️  Node types may not be configured${NC}"
        ((warning_count++))
    fi
else
    echo -e "  ${RED}✗ server/tsconfig.json missing${NC}"
    ((error_count++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}4. BACKEND BUILD TEST${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo -e "  🔨 Testing TypeScript compilation..."

cd server
BUILD_OUTPUT=$(npm run build 2>&1)
BUILD_EXIT_CODE=$?
cd ..

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo -e "  ✅ ${GREEN}Build successful${NC}"
    
    if [ -d "server/dist" ]; then
        FILE_COUNT=$(find server/dist -name "*.js" | wc -l | tr -d ' ')
        echo -e "  📦 Generated $FILE_COUNT JavaScript files"
    fi
else
    echo -e "  ${RED}✗ Build failed${NC}"
    echo ""
    echo "Build errors:"
    echo "$BUILD_OUTPUT" | grep "error" | head -5
    ((error_count++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}5. ENVIRONMENT VARIABLES${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check frontend .env
if [ -f ".env.local" ]; then
    echo -e "  ✅ .env.local exists"
    
    if grep -q "VITE_BACKEND_URL" .env.local; then
        BACKEND_URL=$(grep "VITE_BACKEND_URL" .env.local | cut -d '=' -f2)
        echo -e "  🔗 Backend URL: ${CYAN}$BACKEND_URL${NC}"
    else
        echo -e "  ${YELLOW}⚠️  VITE_BACKEND_URL not set${NC}"
        ((warning_count++))
    fi
else
    echo -e "  ${YELLOW}⚠️  .env.local missing (using vercel.json)${NC}"
fi

# Check server .env
if [ -f "server/.env" ]; then
    echo -e "  ✅ server/.env exists"
    
    if grep -q "MONGODB_URI" server/.env; then
        MONGO_URI=$(grep "MONGODB_URI" server/.env | cut -d '=' -f2)
        if [[ "$MONGO_URI" == *"mongodb+srv"* ]]; then
            echo -e "  ✅ MongoDB URI format correct"
        else
            echo -e "  ${YELLOW}⚠️  MongoDB URI format may be incorrect${NC}"
            ((warning_count++))
        fi
    else
        echo -e "  ${YELLOW}⚠️  MONGODB_URI not set in .env${NC}"
        ((warning_count++))
    fi
else
    echo -e "  ${YELLOW}⚠️  server/.env missing (using Render env vars)${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}6. VERCEL CONFIGURATION${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "vercel.json" ]; then
    echo -e "  ✅ vercel.json exists"
    
    if grep -q '"env"' vercel.json; then
        echo -e "  ✅ Environment variables configured"
        
        ENV_COUNT=$(grep -c "VITE_" vercel.json)
        echo -e "  📝 $ENV_COUNT environment variables found"
    else
        echo -e "  ${YELLOW}⚠️  No environment variables in vercel.json${NC}"
        ((warning_count++))
    fi
    
    if grep -q '"rewrites"' vercel.json; then
        echo -e "  ✅ Rewrites configured (SPA routing)"
    else
        echo -e "  ${YELLOW}⚠️  No rewrites configured${NC}"
        ((warning_count++))
    fi
else
    echo -e "  ${RED}✗ vercel.json missing${NC}"
    ((error_count++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}7. SECURITY CHECK${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check .gitignore
if [ -f ".gitignore" ]; then
    if grep -q "server/.env" .gitignore; then
        echo -e "  ✅ server/.env in .gitignore"
    else
        echo -e "  ${YELLOW}⚠️  server/.env not in .gitignore${NC}"
        ((warning_count++))
    fi
    
    if grep -q ".env.local" .gitignore; then
        echo -e "  ✅ .env.local in .gitignore"
    else
        echo -e "  ${YELLOW}⚠️  .env.local not in .gitignore${NC}"
        ((warning_count++))
    fi
else
    echo -e "  ${RED}✗ .gitignore missing${NC}"
    ((error_count++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}8. DEPENDENCIES CHECK${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Frontend dependencies
if [ -d "node_modules" ]; then
    FRONTEND_DEPS=$(ls node_modules 2>/dev/null | wc -l | tr -d ' ')
    echo -e "  📦 Frontend: $FRONTEND_DEPS packages installed"
else
    echo -e "  ${YELLOW}⚠️  Frontend node_modules missing${NC}"
    ((warning_count++))
fi

# Backend dependencies
if [ -d "server/node_modules" ]; then
    BACKEND_DEPS=$(ls server/node_modules 2>/dev/null | wc -l | tr -d ' ')
    echo -e "  📦 Backend: $BACKEND_DEPS packages installed"
    
    # Check critical packages
    CRITICAL_PKGS=("typescript" "express" "mongoose" "@types/node")
    for pkg in "${CRITICAL_PKGS[@]}"; do
        if [ -d "server/node_modules/$pkg" ]; then
            echo -e "  ✅ $pkg installed"
        else
            echo -e "  ${RED}✗ $pkg missing${NC}"
            ((error_count++))
        fi
    done
else
    echo -e "  ${YELLOW}⚠️  Backend node_modules missing${NC}"
    ((warning_count++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}9. GITHUB ACTIONS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f ".github/workflows/deploy.yml" ]; then
    echo -e "  ✅ GitHub Actions workflow exists"
    
    if grep -q "vercel" .github/workflows/deploy.yml; then
        echo -e "  ${YELLOW}⚠️  Vercel action in workflow (may cause issues)${NC}"
        ((warning_count++))
    fi
else
    echo -e "  ${YELLOW}⚠️  No GitHub Actions workflow${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}SUMMARY${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $error_count -eq 0 ] && [ $warning_count -eq 0 ]; then
    echo -e "  ${GREEN}🎉 All checks passed! No issues found.${NC}"
elif [ $error_count -eq 0 ]; then
    echo -e "  ${YELLOW}⚠️  $warning_count warnings found (non-critical)${NC}"
else
    echo -e "  ${RED}❌ $error_count errors and $warning_count warnings found${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}RECOMMENDED ACTIONS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $error_count -gt 0 ]; then
    echo ""
    echo "Critical issues detected. Please fix errors before deploying."
    echo ""
    echo "Common fixes:"
    echo "  1. Run: cd server && npm install"
    echo "  2. Run: npm install (in root)"
    echo "  3. Fix TypeScript errors: npm run build"
    echo "  4. Check MongoDB connection string"
else
    echo ""
    echo "Your project looks good! Next steps:"
    echo ""
    echo "  1. Check Render dashboard:"
    echo "     https://dashboard.render.com"
    echo ""
    echo "  2. Configure MongoDB connection string"
    echo "     See: MONGODB_SETUP_GUIDE.md"
    echo ""
    echo "  3. Update Vercel backend URL once Render is live"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
