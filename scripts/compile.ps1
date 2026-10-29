# Compiles the C++ bridge into peer_engine.exe
$ErrorActionPreference = "Stop"

Write-Host "Searching for C++ compiler..." -ForegroundColor Cyan

$compilers = @(
    "g++",
    "C:\Program Files (x86)\Dev-Cpp\MinGW64\bin\g++.exe",
    "C:\Dev-Cpp\MinGW64\bin\g++.exe",
    "C:\MinGW\bin\g++.exe",
    "C:\msys64\mingw64\bin\g++.exe"
)

$selectedCompiler = $null
foreach ($c in $compilers) {
    try {
        $null = & $c --version 2>$null
        $selectedCompiler = $c
        break
    } catch {
        # continue
    }
}

if (-not $selectedCompiler) {
    Write-Host "Error: No suitable g++ compiler found on the system." -ForegroundColor Red
    Write-Host "Please ensure Dev-Cpp or MinGW is installed." -ForegroundColor Yellow
    exit 1
}

Write-Host "Using compiler: $selectedCompiler" -ForegroundColor Green
Write-Host "Compiling cpp_bridge.cpp -> peer_engine.exe..." -ForegroundColor Cyan

& $selectedCompiler -std=c++11 -O2 cpp_bridge.cpp -o peer_engine.exe

if ($LASTEXITCODE -eq 0) {
    Write-Host "Compilation SUCCESSFUL! Generated peer_engine.exe." -ForegroundColor Green
} else {
    Write-Host "Compilation FAILED with code $LASTEXITCODE." -ForegroundColor Red
    exit $LASTEXITCODE
}
