#!/bin/bash

echo "🔍 COMPLETE NETFLIX CLONE - DETAILED DIAGNOSTICS"
echo "=================================================="
echo ""

# Test 1: Check if services are running
echo "TEST 1: Service Status"
echo "---------------------"
FRONTEND=$(lsof -ti:5173 2>/dev/null | wc -l)
BACKEND=$(lsof -ti:5001 2>/dev/null | wc -l)

echo "Frontend running: $([ $FRONTEND -gt 0 ] && echo '✅ YES' || echo '❌ NO')"
echo "Backend running: $([ $BACKEND -gt 0 ] && echo '✅ YES' || echo '❌ NO')"
echo ""

if [ $BACKEND -eq 0 ]; then
    echo "⚠️  BACKEND NOT RUNNING - This is likely the issue!"
    echo "    Start backend with: cd server && npm start"
    exit 1
fi

if [ $FRONTEND -eq 0 ]; then
    echo "⚠️  FRONTEND NOT RUNNING"
    echo "    Start frontend with: npm run dev"
    exit 1
fi

# Test 2: Check API endpoints
echo "TEST 2: API Endpoint Checks"
echo "---------------------------"

echo "Testing POST /api/auth/login..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@netflix.com","password":"demo123"}')

echo "Response: $LOGIN_RESPONSE" | head -c 200
echo ""
echo ""

# Extract token if successful
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
if [ ! -z "$TOKEN" ]; then
    echo "✅ Token received: ${TOKEN:0:30}..."
    echo ""
    
    # Test 3: Check if token works
    echo "TEST 3: Token Validation"
    echo "------------------------"
    echo "Testing GET /api/auth/me..."
    USER_RESPONSE=$(curl -s http://localhost:5001/api/auth/me \
      -H "Authorization: Bearer $TOKEN")
    echo "Response: $USER_RESPONSE"
    echo ""
else
    echo "❌ No token received from login response"
    echo "Response was: $LOGIN_RESPONSE"
    echo ""
fi

# Test 4: Frontend page status
echo "TEST 4: Frontend Page Access"
echo "----------------------------"
echo "GET http://localhost:5173/login"
LOGIN_PAGE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/login)
echo "Status: $LOGIN_PAGE"
echo ""

echo "GET http://localhost:5173/"
HOME_PAGE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/)
echo "Status: $HOME_PAGE"
echo ""

# Test 5: Check for CORS errors
echo "TEST 5: CORS Configuration"
echo "--------------------------"
echo "Testing CORS headers..."
CORS_RESPONSE=$(curl -s -I http://localhost:5001/api/auth/login \
  -H "Origin: http://localhost:5173")
echo "$CORS_RESPONSE" | grep -i "access-control" || echo "⚠️  No CORS headers found"
echo ""

# Test 6: Check localStorage simulation
echo "TEST 6: Frontend Code Review"
echo "---------------------------"
echo "Checking if AuthContext properly updates state..."
grep -n "isAuthenticated" /Users/nageshwaranmanikumar/Desktop/netflix-clone/src/context/AuthContext.tsx | head -5
echo ""

echo "Checking if Login component has navigation..."
grep -n "navigate" /Users/nageshwaranmanikumar/Desktop/netflix-clone/src/pages/Login/Login.tsx | head -5
echo ""

# Test 7: Check build
echo "TEST 7: Frontend Build Status"
echo "-----------------------------"
if [ -d "/Users/nageshwaranmanikumar/Desktop/netflix-clone/dist" ]; then
    echo "✅ Build directory exists"
    echo "   Size: $(du -sh /Users/nageshwaranmanikumar/Desktop/netflix-clone/dist 2>/dev/null | cut -f1)"
else
    echo "❌ No build directory found"
fi
echo ""

# Test 8: TypeScript errors
echo "TEST 8: TypeScript Compilation"
echo "------------------------------"
cd /Users/nageshwaranmanikumar/Desktop/netflix-clone
npx tsc --noEmit 2>&1 | head -20
if [ $? -eq 0 ]; then
    echo "✅ No TypeScript errors"
else
    echo "❌ TypeScript errors found"
fi
echo ""

# Summary
echo "=================================================="
echo "DIAGNOSTICS COMPLETE"
echo "=================================================="
echo ""
echo "If you still see 'Login successful' but no redirect:"
echo "1. Check browser console (F12) for errors"
echo "2. Check Network tab for failed API calls"
echo "3. Look for CORS errors"
echo "4. Check if isAuthenticated state is updating"
echo ""
echo "Common issues:"
echo "❌ Backend not running → Start with: cd server && npm start"
echo "❌ CORS errors → Check backend server.ts configuration"
echo "❌ Token not being set → Check AuthContext login() function"
echo "❌ Navigation not happening → Check Login.tsx useEffect"
echo ""
