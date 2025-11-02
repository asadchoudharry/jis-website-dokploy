# This script commits and pushes your latest changes to GitHub to trigger a Dokploy deployment.

$ProjectRoot = $PSScriptRoot

Write-Host "Starting Dokploy deployment workflow..." -ForegroundColor Cyan

# 1. Git Push to GitHub
Write-Host "Pushing latest changes to the 'main' branch on GitHub..." -ForegroundColor Green
Set-Location $ProjectRoot
git add .

# Only create a new commit if there are staged changes
if (-not (git diff --cached --quiet)) {
    $commitMessage = "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git commit -m $commitMessage
    Write-Host "Created new commit: '$commitMessage'"
} else {
    Write-Host "No new changes to commit."
}

git push origin main
Write-Host "Git push complete." -ForegroundColor Green

Write-Host "`n----------------------------------------"
Write-Host "NEXT STEPS in your Dokploy Dashboard:" -ForegroundColor Yellow
Write-Host "1. Go to your Dokploy dashboard and navigate to your application."
Write-Host "2. Check the 'Deployments' tab. A new deployment should have started automatically."
Write-Host "3. If it didn't start automatically, click the 'Deploy' button to trigger it manually."
Write-Host "----------------------------------------"
