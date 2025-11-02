#!/bin/bash

# SSH connection details
SSH_USER="u881431039"
SSH_HOST="151.106.115.247"
REMOTE_ROOT="/home/u881431039/domains/jis-saudi.com"

# Create deployment package
echo "Creating deployment package..."
cd backend
npm install
npm run build
cd ..

# Create directory structure on remote
ssh ${SSH_USER}@${SSH_HOST} "mkdir -p ${REMOTE_ROOT}/private ${REMOTE_ROOT}/backend"

# Upload backend files
scp -r backend/dist ${SSH_USER}@${SSH_HOST}:${REMOTE_ROOT}/backend/
scp backend/package*.json ${SSH_USER}@${SSH_HOST}:${REMOTE_ROOT}/backend/
scp backend/.env ${SSH_USER}@${SSH_HOST}:${REMOTE_ROOT}/backend/

# Upload database to private directory
scp backend/db.json ${SSH_USER}@${SSH_HOST}:${REMOTE_ROOT}/private/

# Install dependencies on remote
ssh ${SSH_USER}@${SSH_HOST} "cd ${REMOTE_ROOT}/backend && npm install --production"

echo "Deployment complete. Use Hostinger hPanel to set up Node.js app:"
echo "App directory: ${REMOTE_ROOT}/backend"
echo "Start command: node dist/index.js"
