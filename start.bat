@echo off
echo Starting Dona✝e Application...
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found!
echo.

echo Installing dependencies...
call npm run install:all
if errorlevel 1 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo Setting up environment...
if not exist "backend\.env" (
    copy "backend\env.example" "backend\.env"
    echo Created .env file from template
)

echo.
echo Starting backend server...
start "Backend Server" cmd /k "npm run backend"

echo.
echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak >nul

echo.
echo Starting frontend...
start "Frontend" cmd /k "npm run frontend"

echo.
echo Application is starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul 