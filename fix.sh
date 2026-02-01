#!/bin/bash

# Netflix Clone - Quick Fix Script
# Fixes common issues before deployment

set -e

echo "🔧 Netflix Clone - Quick Fix Script"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Fixing Common Issues...${NC}"
echo ""

# Fix 1: Remove node_modules and reinstall
echo "1. Cleaning and reinstalling dependencies..."
rm -rf node_modules package-lock.json
rm -rf server/node_modules server/package-lock.json
npm install
cd server && npm install && cd ..
echo -e "${GREEN}✅ Dependencies reinstalled${NC}"
echo ""

# Fix 2: Clear build caches
echo "2. Clearing build caches..."
rm -rf dist
rm -rf server/dist
rm -rf .vite
echo -e "${GREEN}✅ Build caches cleared${NC}"
echo ""

# Fix 3: Rebuild TypeScript
echo "3. Rebuilding TypeScript..."
npm run build
cd server && npm run build && cd ..
echo -e "${GREEN}✅ TypeScript rebuilt${NC}"
echo ""

# Fix 4: Verify environment variables
echo "4. Checking environment files..."
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  Creating .env.local from example${NC}"
    cp .env.example .env.local
fi

if [ ! -f "server/.env" ]; then
    echo -e "${YELLOW}⚠️  Creating server/.env from example${NC}"
    cp server/.env.example server/.env
fi
echo -e "${GREEN}✅ Environment files checked${NC}"
echo ""

# Fix 5: Check for TypeScript errors
echo "5. Checking for TypeScript errors..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ No TypeScript errors${NC}"
else
    echo -e "${RED}❌ TypeScript errors found (see above)${NC}"
fi
echo ""

# Fix 6: Verify port configuration
echo "6. Verifying port configuration..."
if grep -q "PORT=5001" server/.env.example; then
    echo -e "${GREEN}✅ Server port correctly set to 5001${NC}"
else
    echo -e "${YELLOW}⚠️  Updating server port to 5001${NC}"
    sed -i.bak 's/PORT=5000/PORT=5001/g' server/.env.example
fi
echo ""

echo -e "${GREEN}🎉 All fixes applied!${NC}"
echo ""
echo "Next steps:"
echo "1. Run: npm run dev (for frontend)"
echo "2. Run: cd server && npm run dev (for backend)"
echo "3. Or use: ./start.sh (interactive startup)"
echo ""
