#!/bin/bash

echo "Starting Dona✝e Application..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please download and install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js found!"
echo

# Install dependencies
echo "Installing dependencies..."
npm run install:all
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies!"
    exit 1
fi

echo
echo "Setting up environment..."
if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "Created .env file from template"
fi

echo
echo "Starting backend server..."
gnome-terminal --title="Backend Server" -- bash -c "npm run backend; exec bash" 2>/dev/null || \
xterm -title "Backend Server" -e "npm run backend; bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && npm run backend"' 2>/dev/null || \
echo "Please start backend manually: npm run backend"

echo
echo "Waiting 3 seconds for backend to start..."
sleep 3

echo
echo "Starting frontend..."
gnome-terminal --title="Frontend" -- bash -c "npm run frontend; exec bash" 2>/dev/null || \
xterm -title "Frontend" -e "npm run frontend; bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && npm run frontend"' 2>/dev/null || \
echo "Please start frontend manually: npm run frontend"

echo
echo "Application is starting!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo
echo "Press Enter to close this window..."
read 