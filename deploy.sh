#!/bin/bash

# Build the frontend
echo "Building frontend..."
npm run build

# Create backend dist
echo "Building backend..."
cd backend
npm run build
cd ..

# Upload frontend files
echo "Uploading frontend..."
scp -r dist/* u123456789@your-domain.com:~/public_html/

# Create backend directory and upload
echo "Uploading backend..."
ssh u123456789@your-domain.com "mkdir -p ~/public_html/backend"
scp -r backend/dist/* backend/package.json backend/package-lock.json u123456789@your-domain.com:~/public_html/backend/

# Upload database
scp backend/db.json u123456789@your-domain.com:~/private/

# Upload environment file
scp .env.production u123456789@your-domain.com:~/public_html/backend/.env

echo "Deployment complete!"
