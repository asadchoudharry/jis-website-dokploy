# --- CONFIGURATION ---
$SSH_USER = "u881431039"
$SSH_HOST = "staging.jis-saudi.com"
# IMPORTANT: Check your Hostinger hPanel > SSH Access for the correct port. It is often 65002.
$SSH_PORT = 65002 
$REMOTE_PUBLIC_DIR = "/home/u881431039/domains/jis-saudi.com/public_html/staging"
# --- END CONFIGURATION ---

$ProjectRoot = $PSScriptRoot

# 1. Build Frontend
Write-Host "Building frontend..." -ForegroundColor Green
Set-Location $ProjectRoot
# Update .env.production to point to your future backend URL
# For example, if you use Render, it might be "https://jis-backend.onrender.com"
# For now, we'll use the api subdomain we plan to create.
Set-Content -Path (Join-Path $ProjectRoot ".env.production") -Value "VITE_API_BASE_URL=https://api.staging.jis-saudi.com"

npm install
npm run build

# 2. Upload Frontend Files
$SSH_TARGET = "$SSH_USER@$SSH_HOST"
Write-Host "Uploading frontend files to $REMOTE_PUBLIC_DIR..." -ForegroundColor Green

# Create remote directory
ssh -p $SSH_PORT $SSH_TARGET "mkdir -p $REMOTE_PUBLIC_DIR"

# Upload all contents of the local 'dist' folder to the remote directory
scp -P $SSH_PORT -r (Join-Path $ProjectRoot "dist\*") "$SSH_TARGET`:$REMOTE_PUBLIC_DIR"

Write-Host "`nFrontend deployment complete!" -ForegroundColor Green
Write-Host "----------------------------------------"
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Deploy your 'backend' folder to a service like Render.com (they have a free tier)."
Write-Host "2. In Hostinger's DNS settings, create a CNAME record:"
Write-Host "   - Host: api.staging"
Write-Host "   - Points to: [Your Render service URL, e.g., jis-backend.onrender.com]"
Write-Host "3. Your website should now be live at https://staging.jis-saudi.com"
Write-Host "----------------------------------------"
