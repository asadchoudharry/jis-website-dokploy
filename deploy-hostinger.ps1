# ...existing code...
# Configuration
$SSH_USER = "u881431039"
$SSH_HOST = "151.106.115.247" # Using IP directly
$SSH_PORT = 65002             # The correct SSH port for Hostinger
$REMOTE_ROOT = "/home/u881431039/domains/jis-saudi.com"

# ...existing code...
# Upload to server
Write-Host "Uploading to Hostinger..." -ForegroundColor Green
ssh -p $SSH_PORT ${SSH_USER}@${SSH_HOST} "mkdir -p ${REMOTE_ROOT}/private ${REMOTE_ROOT}/backend"

# Upload backend files
scp -P $SSH_PORT -r "$DEPLOY_TEMP\dist\*" "${SSH_USER}@${SSH_HOST}:${REMOTE_ROOT}/backend/"
scp -P $SSH_PORT "$DEPLOY_TEMP\package*.json" "${SSH_USER}@${SSH_HOST}:${REMOTE_ROOT}/backend/"

# Upload database if exists
if (Test-Path "$DEPLOY_TEMP\db.json") {
    scp -P $SSH_PORT "$DEPLOY_TEMP\db.json" "${SSH_USER}@${SSH_HOST}:${REMOTE_ROOT}/private/"
}
# ...existing code...