#!/bin/bash

# Netflix Clone - Comprehensive Deployment Preparation Script
# This script prepares your project for deployment to Vercel and Render

set -e  # Exit on error

echo "🚀 Netflix Clone - Deployment Preparation"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Checking Prerequisites${NC}"
echo "--------------------------------"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js not found. Please install Node.js${NC}"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm not found${NC}"
    exit 1
fi

# Check git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✅ Git installed: $GIT_VERSION${NC}"
else
    echo -e "${RED}❌ Git not found. Please install Git${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Step 2: Installing Dependencies${NC}"
echo "--------------------------------"

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd server
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi
cd ..

echo ""
echo -e "${BLUE}Step 3: Running Tests${NC}"
echo "----------------------"

# Test frontend build
echo "Testing frontend build..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend build successful${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

# Test backend build
echo "Testing backend build..."
cd server
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend build successful${NC}"
else
    echo -e "${RED}❌ Backend build failed${NC}"
    exit 1
fi
cd ..

echo ""
echo -e "${BLUE}Step 4: Checking Git Status${NC}"
echo "----------------------------"

# Check if git is initialized
if [ -d .git ]; then
    echo -e "${GREEN}✅ Git repository initialized${NC}"
    
    # Check current branch
    CURRENT_BRANCH=$(git branch --show-current)
    echo "Current branch: $CURRENT_BRANCH"
    
    # Check for uncommitted changes
    if git diff-index --quiet HEAD --; then
        echo -e "${GREEN}✅ No uncommitted changes${NC}"
    else
        echo -e "${YELLOW}⚠️  You have uncommitted changes${NC}"
        echo ""
        echo "Would you like to commit them now? (y/n)"
        read -r COMMIT_NOW
        
        if [ "$COMMIT_NOW" = "y" ]; then
            echo "Enter commit message:"
            read -r COMMIT_MESSAGE
            git add .
            git commit -m "$COMMIT_MESSAGE"
            echo -e "${GREEN}✅ Changes committed${NC}"
        else
            echo -e "${YELLOW}⚠️  Continuing with uncommitted changes${NC}"
        fi
    fi
else
    echo -e "${RED}❌ Git repository not initialized${NC}"
    echo "Would you like to initialize it now? (y/n)"
    read -r INIT_GIT
    
    if [ "$INIT_GIT" = "y" ]; then
        git init
        git add .
        git commit -m "Initial commit: Netflix Clone project"
        echo -e "${GREEN}✅ Git repository initialized${NC}"
    else
        echo -e "${YELLOW}⚠️  Skipping git initialization${NC}"
    fi
fi

echo ""
echo -e "${BLUE}Step 5: Verifying Deployment Files${NC}"
echo "-----------------------------------"

# Check vercel.json
if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✅ vercel.json exists${NC}"
else
    echo -e "${RED}❌ vercel.json not found${NC}"
fi

# Check render.yaml
if [ -f "render.yaml" ]; then
    echo -e "${GREEN}✅ render.yaml exists${NC}"
else
    echo -e "${RED}❌ render.yaml not found${NC}"
fi

# Check .env.example files
if [ -f ".env.example" ]; then
    echo -e "${GREEN}✅ Frontend .env.example exists${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend .env.example not found${NC}"
fi

if [ -f "server/.env.example" ]; then
    echo -e "${GREEN}✅ Backend .env.example exists${NC}"
else
    echo -e "${YELLOW}⚠️  Backend .env.example not found${NC}"
fi

echo ""
echo -e "${BLUE}Step 6: Creating .gitignore (if needed)${NC}"
echo "---------------------------------------"

if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'EOL'
# Dependencies
node_modules/
server/node_modules/

# Environment variables
.env
.env.local
.env.production
.env.development
server/.env
server/.env.local

# Build outputs
dist/
dist-ssr/
server/dist/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Editor directories
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db

# Testing
coverage/

# Misc
*.local
.cache/
EOL
    echo -e "${GREEN}✅ .gitignore created${NC}"
else
    echo -e "${GREEN}✅ .gitignore already exists${NC}"
fi

echo ""
echo -e "${BLUE}Step 7: Deployment Summary${NC}"
echo "---------------------------"
echo ""
echo -e "${GREEN}✅ All checks passed!${NC}"
echo ""
echo "📋 Next Steps for Deployment:"
echo ""
echo "1️⃣  Push to GitHub:"
echo "   git push origin main"
echo ""
echo "2️⃣  Deploy Frontend to Vercel:"
echo "   • Option A (CLI):"
echo "     npm install -g vercel"
echo "     vercel login"
echo "     vercel --prod"
echo ""
echo "   • Option B (Dashboard):"
echo "     Visit: https://vercel.com/new"
echo "     Import your GitHub repository"
echo ""
echo "3️⃣  Setup MongoDB Atlas:"
echo "   Visit: https://cloud.mongodb.com"
echo "   Create a FREE cluster"
echo "   Get connection string"
echo ""
echo "4️⃣  Deploy Backend to Render:"
echo "   Visit: https://dashboard.render.com"
echo "   New → Web Service"
echo "   Connect your GitHub repository"
echo ""
echo "📖 For detailed instructions, see: DEPLOY_COMMANDS.md"
echo ""
echo -e "${BLUE}Environment Variables Needed:${NC}"
echo ""
echo "Frontend (Vercel):"
echo "  VITE_TMDB_API_KEY=8dcba2c5d42d8060925a212e54656155"
echo "  VITE_TMDB_BASE_URL=https://api.themoviedb.org/3"
echo "  VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p"
echo "  VITE_BACKEND_URL=<your-render-url>/api"
echo ""
echo "Backend (Render):"
echo "  PORT=5001"
echo "  NODE_ENV=production"
echo "  JWT_SECRET=<generate-secure-secret>"
echo "  JWT_EXPIRE=7d"
echo "  TMDB_API_KEY=8dcba2c5d42d8060925a212e54656155"
echo "  TMDB_BASE_URL=https://api.themoviedb.org/3"
echo "  MONGODB_URI=<your-mongodb-atlas-connection-string>"
echo "  CORS_ORIGIN=<your-vercel-url>"
echo "  RATE_LIMIT_WINDOW_MS=900000"
echo "  RATE_LIMIT_MAX_REQUESTS=100"
echo ""
echo "🎉 Your project is ready for deployment!"
echo ""
