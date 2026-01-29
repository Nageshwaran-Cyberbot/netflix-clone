#!/bin/bash

echo "🎬 Netflix Clone - Complete Testing Script"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check servers
echo "📡 Checking Servers..."
echo "--------------------"

if lsof -ti:5173 >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend running on port 5173${NC}"
else
    echo -e "${RED}❌ Frontend NOT running on port 5173${NC}"
    echo "   Start with: npm run dev"
fi

if lsof -ti:5001 >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend running on port 5001${NC}"
else
    echo -e "${RED}❌ Backend NOT running on port 5001${NC}"
    echo "   Start with: cd server && npm start"
fi

echo ""

# Test backend API
echo "🔐 Testing Authentication API..."
echo "--------------------------------"

# Test login endpoint
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@netflix.com","password":"demo123"}')

if echo "$LOGIN_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Login API working${NC}"
    
    # Extract token
    TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    
    if [ ! -z "$TOKEN" ]; then
        echo -e "${GREEN}✅ JWT token generated${NC}"
        echo "   Token preview: ${TOKEN:0:50}..."
        
        # Test get current user
        USER_RESPONSE=$(curl -s http://localhost:5001/api/auth/me \
          -H "Authorization: Bearer $TOKEN")
        
        if echo "$USER_RESPONSE" | grep -q '"success":true'; then
            echo -e "${GREEN}✅ Get current user working${NC}"
        else
            echo -e "${RED}❌ Get current user failed${NC}"
        fi
        
        # Test watchlist
        WATCHLIST_RESPONSE=$(curl -s http://localhost:5001/api/watchlist \
          -H "Authorization: Bearer $TOKEN")
        
        if echo "$WATCHLIST_RESPONSE" | grep -q '"success":true'; then
            echo -e "${GREEN}✅ Watchlist API working${NC}"
        else
            echo -e "${RED}❌ Watchlist API failed${NC}"
        fi
    else
        echo -e "${RED}❌ Token not found in response${NC}"
    fi
else
    echo -e "${RED}❌ Login API failed${NC}"
    echo "   Response: $LOGIN_RESPONSE"
fi

echo ""

# Check frontend
echo "🌐 Testing Frontend..."
echo "---------------------"

FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173)
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Homepage accessible${NC}"
else
    echo -e "${RED}❌ Homepage not accessible (HTTP $FRONTEND_STATUS)${NC}"
fi

LOGIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/login)
if [ "$LOGIN_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Login page accessible${NC}"
else
    echo -e "${RED}❌ Login page not accessible (HTTP $LOGIN_STATUS)${NC}"
fi

REGISTER_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/register)
if [ "$REGISTER_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Register page accessible${NC}"
else
    echo -e "${RED}❌ Register page not accessible (HTTP $REGISTER_STATUS)${NC}"
fi

echo ""

# Check MongoDB
echo "🗄️  Checking MongoDB..."
echo "----------------------"

if pgrep -x "mongod" > /dev/null; then
    echo -e "${GREEN}✅ MongoDB process running${NC}"
else
    echo -e "${YELLOW}⚠️  MongoDB process not detected${NC}"
    echo "   Check with: brew services list | grep mongodb"
fi

echo ""

# Summary
echo "📊 Summary"
echo "=========="
echo ""
echo "Demo Account:"
echo "  Email: demo@netflix.com"
echo "  Password: demo123"
echo ""
echo "URLs:"
echo "  Frontend: http://localhost:5173"
echo "  Login: http://localhost:5173/login"
echo "  Register: http://localhost:5173/register"
echo "  Backend: http://localhost:5001"
echo ""
echo "Test Steps:"
echo "  1. Open http://localhost:5173/login"
echo "  2. Click 'Use Demo Account' button"
echo "  3. Click 'Sign In'"
echo "  4. Should redirect to homepage with navbar showing profile"
echo "  5. Click profile icon to see dropdown"
echo "  6. Add a movie to watchlist (click + icon)"
echo "  7. Go to 'My List' in navbar"
echo "  8. See your watchlist items"
echo "  9. Click - to remove from watchlist"
echo "  10. Click 'Logout' in profile dropdown"
echo ""
echo "✅ Testing script complete!"
