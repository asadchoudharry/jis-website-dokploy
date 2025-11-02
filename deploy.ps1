# --- CONFIGURATION ---
$SSH_USER = "u881431039"
$SSH_HOST = "151.106.115.247"
# IMPORTANT: Check your Hostinger hPanel > SSH Access for the correct port. It is often 65002.
$SSH_PORT = 65002 
$REMOTE_DOMAIN_ROOT = "/home/u881431039/domains/jis-saudi.com"
$REMOTE_FRONTEND_DIR = "$REMOTE_DOMAIN_ROOT/public_html/staging"
$REMOTE_BACKEND_DIR = "$REMOTE_DOMAIN_ROOT/backend_app"
$REMOTE_PRIVATE_DIR = "$REMOTE_DOMAIN_ROOT/private"
# --- END CONFIGURATION ---

$ProjectRoot = $PSScriptRoot
$SSH_TARGET = "$SSH_USER@$SSH_HOST"

Write-Host "Starting deployment from: $ProjectRoot" -ForegroundColor Cyan

# 1. Build Frontend & Backend
Write-Host "Building frontend..." -ForegroundColor Green
Set-Location $ProjectRoot
npm install
npm run build

$BackendPath = Join-Path $ProjectRoot "backend"
Write-Host "Building backend..." -ForegroundColor Green
Set-Location $BackendPath
npm install
npm run build
Set-Location $ProjectRoot

# 2. Prepare local package directory
$BUILD_DIR = Join-Path $ProjectRoot "deploy_package"
Write-Host "Preparing package in '$BUILD_DIR'..." -ForegroundColor Green
if (Test-Path $BUILD_DIR) { Remove-Item -Recurse -Force $BUILD_DIR }
New-Item -ItemType Directory -Path $BUILD_DIR | Out-Null
New-Item -ItemType Directory -Path (Join-Path $BUILD_DIR "backend") | Out-Null

Copy-Item -Path (Join-Path $BackendPath "dist") -Destination (Join-Path $BUILD_DIR "backend") -Recurse
Copy-Item -Path (Join-Path $BackendPath "package.json") -Destination (Join-Path $BUILD_DIR "backend")
Copy-Item -Path (Join-Path $BackendPath "package-lock.json") -Destination (Join-Path $BUILD_DIR "backend")
Copy-Item -Path (Join-Path $BackendPath "db.json") -Destination $BUILD_DIR

# 3. Connect and Upload
Write-Host "Connecting to $SSH_TARGET on port $SSH_PORT..." -ForegroundColor Cyan
Write-Host "You will be prompted for your SSH password." -ForegroundColor Yellow

# Create remote directories
Write-Host "Creating remote directories..." -ForegroundColor Green
ssh -p $SSH_PORT $SSH_TARGET "mkdir -p $REMOTE_FRONTEND_DIR $REMOTE_BACKEND_DIR $REMOTE_PRIVATE_DIR"

# Upload frontend files
Write-Host "Uploading frontend files..." -ForegroundColor Green
scp -P $SSH_PORT -r (Join-Path $ProjectRoot "dist\*") "$SSH_TARGET`:$REMOTE_FRONTEND_DIR"

# Upload backend files
Write-Host "Uploading backend files..." -ForegroundColor Green
scp -P $SSH_PORT -r (Join-Path $BUILD_DIR "backend\*") "$SSH_TARGET`:$REMOTE_BACKEND_DIR"
scp -P $SSH_PORT (Join-Path $BUILD_DIR "db.json") "$SSH_TARGET`:$REMOTE_PRIVATE_DIR"

# Clean up local package
Write-Host "Cleaning up local package directory..." -ForegroundColor Green
Remove-Item -Recurse -Force $BUILD_DIR

Write-Host "`nDeployment complete!" -ForegroundColor Green
Write-Host "----------------------------------------"
Write-Host "NEXT STEPS in Hostinger hPanel:" -ForegroundColor Yellow
Write-Host "1. Go to 'Websites' > 'Manage' > 'Advanced' > 'Node.js'."
Write-Host "2. Create a new application."
Write-Host "   - Application root: $REMOTE_BACKEND_DIR"
Write-Host "   - Application startup file: dist/index.js"
Write-Host "3. After creating, click 'Install Dependencies' in the hPanel interface."
Write-Host "4. Add Environment Variables:"
Write-Host "   - NODE_ENV=production"
Write-Host "   - PORT=3001 (or as assigned by Hostinger)"
Write-Host "   - DB_PATH=$REMOTE_PRIVATE_DIR/db.json"
Write-Host "   - JWT_SECRET=your-super-secret-key-here"
Write-Host "5. Start the application from the hPanel."
Write-Host "----------------------------------------"
