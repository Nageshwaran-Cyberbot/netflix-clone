#!/bin/bash

# Netflix Clone - Start Script
# This script helps you start the application

echo "🎬 Netflix Clone - Startup Script"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "Choose your setup:"
echo ""
echo "1) Frontend Only (No MongoDB required) - RECOMMENDED"
echo "2) Full Stack (Frontend + Backend - requires MongoDB)"
echo "3) Backend Only"
echo "4) Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting Frontend Only..."
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "✅ No database required"
        echo "✅ Uses TMDB API directly"
        echo "✅ My List stored in browser"
        echo "📱 Opening: http://localhost:5173"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo "🔍 Checking MongoDB..."
        
        # Check if MongoDB is running
        if ! pgrep -x "mongod" > /dev/null 2>&1; then
            echo "⚠️  MongoDB is not running!"
            echo ""
            echo "Please start MongoDB first:"
            echo "  • Local MongoDB: brew services start mongodb-community"
            echo "  • Or use MongoDB Atlas (cloud)"
            echo ""
            read -p "Do you want to continue anyway? (y/n): " continue
            if [ "$continue" != "y" ]; then
                exit 0
            fi
        else
            echo "✅ MongoDB is running"
        fi
        
        echo ""
        echo "🚀 Starting Full Stack..."
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "📡 Backend: http://localhost:5000"
        echo "📱 Frontend: http://localhost:5173"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        
        # Start backend in background
        echo "Starting backend..."
        cd server
        npm run dev &
        BACKEND_PID=$!
        cd ..
        
        # Wait a moment for backend to start
        sleep 3
        
        # Start frontend
        echo "Starting frontend..."
        npm run dev
        
        # Kill backend when frontend stops
        kill $BACKEND_PID
        ;;
    3)
        echo ""
        echo "🚀 Starting Backend Only..."
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "📡 Backend: http://localhost:5000"
        echo "📊 Health: http://localhost:5000/health"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        cd server
        npm run dev
        ;;
    4)
        echo ""
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo ""
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac
