# Easy One-Click Startup Script for PeerLink
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Starting PeerLink P2P Study Platform (C++ & React)     " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Compile C++ if needed
if (-not (Test-Path "peer_engine.exe")) {
    Write-Host "peer_engine.exe not found. Compiling C++ bridge..." -ForegroundColor Yellow
    & .\scripts\compile.ps1
}

# 2. Check Node packages
if (-not (Test-Path "server\node_modules")) {
    Write-Host "Installing server dependencies..." -ForegroundColor Cyan
    npm --prefix server install
}
if (-not (Test-Path "client\node_modules")) {
    Write-Host "Installing client dependencies..." -ForegroundColor Cyan
    npm --prefix client install
}

# 3. Start services
Write-Host "Starting Express API bridge (port 5000)..." -ForegroundColor Green
$serverJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    node server/server.js
}

Write-Host "Starting Vite React frontend (port 5173)..." -ForegroundColor Green
Start-Process "http://localhost:5173"

try {
    Set-Location client
    npm run dev
} finally {
    Write-Host "Stopping backend server job..." -ForegroundColor Yellow
    Stop-Job $serverJob
    Remove-Job $serverJob
}
