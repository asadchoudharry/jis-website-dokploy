#!/usr/bin/env bash
set -euo pipefail

# --- EDIT THESE BEFORE RUNNING ---
SSH_USER="u881431039"                  # <-- replace with your SSH username
SSH_HOST="151.106.115.247" # <-- replace if different
SSH_PORT=65002
SITE_DOMAIN="staging.jis-saudi.com"
# --------------------------------

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="$PROJECT_ROOT/jis-deploy-temp"
# FRONTEND source may be in dist/ or staging/ or project root (index.html)
POSSIBLE_FRONTEND_DIRS=("$PROJECT_ROOT/dist" "$PROJECT_ROOT/staging" "$PROJECT_ROOT")
FRONTEND_DIST=""
BACKEND_DIR="$PROJECT_ROOT/backend"
REMOTE_BASE_DIR="/home/$SSH_USER"
REMOTE_PUBLIC_DIR="$REMOTE_BASE_DIR/public_html"
REMOTE_BACKEND_DIR="$REMOTE_BASE_DIR/backend_app"
REMOTE_PRIVATE_DIR="$REMOTE_BASE_DIR/private"

SSH_CONN="$SSH_USER@$SSH_HOST -p $SSH_PORT"

echo "Running deploy script from: $PROJECT_ROOT"
echo "Remote host: $SSH_HOST (user: $SSH_USER)"
echo

# Preconditions
command -v ssh >/dev/null 2>&1 || { echo "ssh not found; install OpenSSH client"; exit 1; }
command -v scp >/dev/null 2>&1 || { echo "scp not found; install scp"; exit 1; }
command -v tar >/dev/null 2>&1 || { echo "tar not found; install tar"; exit 1; }

# detect frontend source
for d in "${POSSIBLE_FRONTEND_DIRS[@]}"; do
  if [ -d "$d" ]; then
    # prefer a directory containing index.html or typical assets
    if [ -f "$d/index.html" ] || [ -d "$d/assets" ] || [ "$(basename "$d")" = "dist" ] || [ "$(basename "$d")" = "staging" ]; then
      FRONTEND_DIST="$d"
      break
    fi
  fi
done

if [ -z "$FRONTEND_DIST" ]; then
  echo "Error: Could not find frontend build. Looked in: ${POSSIBLE_FRONTEND_DIRS[*]}"
  echo "Place your built frontend files in dist/ or staging/ or ensure index.html exists in project root."
  exit 1
fi

echo "Using frontend source: $FRONTEND_DIST"

# 1) Local build (backend only) — skip frontend build since you already moved built files
echo "1) Preparing backend build locally..."
if [ -d "$BACKEND_DIR" ]; then
  cd "$BACKEND_DIR"
  echo "- Installing backend dependencies..."
  npm install
  echo "- Building backend..."
  npm run build
  cd "$PROJECT_ROOT"
else
  echo "Warning: backend directory not found at $BACKEND_DIR. Skipping backend build."
fi

# 2) Prepare package
echo "2) Preparing deploy package..."
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/frontend" "$BUILD_DIR/backend" "$BUILD_DIR/meta"

# copy frontend source (files only)
echo "- Copying frontend files from $FRONTEND_DIST ..."
rsync -a --delete "$FRONTEND_DIST"/ "$BUILD_DIR/frontend/" >/dev/null 2>&1 || cp -r "$FRONTEND_DIST"/. "$BUILD_DIR/frontend/"

# copy backend build + runtime files
if [ -d "$BACKEND_DIR/dist" ]; then
  cp -r "$BACKEND_DIR/dist" "$BUILD_DIR/backend/"
  cp "$BACKEND_DIR/package.json" "$BUILD_DIR/backend/" || true
  cp "$BACKEND_DIR/package-lock.json" "$BUILD_DIR/backend/" 2>/dev/null || true
  # copy db.json locally (it will be moved to private on remote)
  if [ -f "$BACKEND_DIR/db.json" ]; then
    cp "$BACKEND_DIR/db.json" "$BUILD_DIR/" 
  fi
else
  echo "Warning: backend dist/ not found. Backend may not be built; continuing with frontend only."
fi

# include .htaccess if present (either in project_root/public or at project root)
if [ -f "$PROJECT_ROOT/public/.htaccess" ]; then
  cp "$PROJECT_ROOT/public/.htaccess" "$BUILD_DIR/frontend/.htaccess"
elif [ -f "$PROJECT_ROOT/.htaccess" ]; then
  cp "$PROJECT_ROOT/.htaccess" "$BUILD_DIR/frontend/.htaccess"
fi

# create tarballs
cd "$BUILD_DIR"
tar -czf frontend.tar.gz -C frontend .
tar -czf backend.tar.gz -C backend . || true
cd "$PROJECT_ROOT"

echo "Packages created at $BUILD_DIR/frontend.tar.gz and $BUILD_DIR/backend.tar.gz"

# 3) Upload to remote
echo "3) Uploading packages to remote..."
scp -P "$SSH_PORT" "$BUILD_DIR/frontend.tar.gz" "$SSH_USER@$SSH_HOST:~/frontend.tar.gz"
# upload backend only if present
if [ -f "$BUILD_DIR/backend/dist/index.js" ] || [ -f "$BUILD_DIR/backend/package.json" ]; then
  scp -P "$SSH_PORT" "$BUILD_DIR/backend.tar.gz" "$SSH_USER@$SSH_HOST:~/backend.tar.gz"
fi
if [ -f "$BUILD_DIR/db.json" ]; then
  scp -P "$SSH_PORT" "$BUILD_DIR/db.json" "$SSH_USER@$SSH_HOST:~/db.json.tmp"
fi
if [ -f "$BUILD_DIR/frontend/.htaccess" ]; then
  scp -P "$SSH_PORT" "$BUILD_DIR/frontend/.htaccess" "$SSH_USER@$SSH_HOST:~/htaccess.tmp"
fi

# 4) Remote setup & extract
echo "4) Remote: creating directories and extracting packages..."
ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" bash -s <<EOF
set -euo pipefail
echo "Remote: creating necessary directories..."
mkdir -p "$REMOTE_PUBLIC_DIR"
mkdir -p "$REMOTE_BACKEND_DIR"
mkdir -p "$REMOTE_PRIVATE_DIR"
mkdir -p "$REMOTE_PUBLIC_DIR/uploads"

echo "Remote: extracting frontend into $REMOTE_PUBLIC_DIR ..."
tar -xzf ~/frontend.tar.gz -C "$REMOTE_PUBLIC_DIR"
rm -f ~/frontend.tar.gz

# extract backend if uploaded
if [ -f ~/backend.tar.gz ]; then
  echo "Remote: extracting backend into $REMOTE_BACKEND_DIR ..."
  tar -xzf ~/backend.tar.gz -C "$REMOTE_BACKEND_DIR"
  rm -f ~/backend.tar.gz
fi

# if db.json was uploaded, move it to private and create symlink for backend
if [ -f ~/db.json.tmp ]; then
  echo "Remote: moving db.json to private directory..."
  mv ~/db.json.tmp "$REMOTE_PRIVATE_DIR/db.json"
  chmod 600 "$REMOTE_PRIVATE_DIR/db.json"
  # create symlink inside backend dir so code can access backend/db.json
  if [ -d "$REMOTE_BACKEND_DIR" ]; then
    if [ -f "$REMOTE_BACKEND_DIR/db.json" ]; then
      rm -f "$REMOTE_BACKEND_DIR/db.json"
    fi
    ln -sf "$REMOTE_PRIVATE_DIR/db.json" "$REMOTE_BACKEND_DIR/db.json"
  fi
fi

# move htaccess into public_html if provided
if [ -f ~/htaccess.tmp ]; then
  mv ~/htaccess.tmp "$REMOTE_PUBLIC_DIR/.htaccess"
fi

# set permissions
echo "Remote: setting permissions for public_html..."
find "$REMOTE_PUBLIC_DIR" -type d -exec chmod 755 {} \;
find "$REMOTE_PUBLIC_DIR" -type f -exec chmod 644 {} \;
chmod -R 755 "$REMOTE_PUBLIC_DIR/uploads" || true

echo "Remote: deployment files placed."
EOF

# 5) Attempt to install and start backend (best-effort)
echo
echo "5) Attempting to start backend on remote (best-effort). This step may fail on shared hosting."
ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" bash -s <<'EOF'
set -euo pipefail
REMOTE_BACKEND_DIR="$HOME/backend_app"
if [ ! -d "$REMOTE_BACKEND_DIR" ]; then
  echo "Backend directory not present on remote. Skipping start."
  exit 0
fi

cd "$REMOTE_BACKEND_DIR" || { echo "Backend directory not found"; exit 0; }

echo "Remote: checking for node..."
if ! command -v node >/dev/null 2>&1; then
  echo "Node not found on remote. Skipping automatic backend start. Use Hostinger hPanel Node.js app or a managed host."
  exit 0
fi

echo "Remote: installing backend production dependencies..."
if [ -f package.json ]; then
  npm install --production --no-audit --no-fund
fi

# start with pm2 if available or attempt to install pm2
if command -v pm2 >/dev/null 2>&1; then
  echo "pm2 found. Starting backend with pm2..."
  pm2 start dist/index.js --name jis-backend --update-env || pm2 restart jis-backend --update-env || pm2 start dist/index.js --name jis-backend --update-env
  pm2 save || true
  echo "pm2 status:"
  pm2 status | sed -n '1,200p'
else
  echo "pm2 not installed. Attempting to install pm2 globally (may fail without permissions)..."
  if npm i -g pm2 >/dev/null 2>&1; then
    pm2 start dist/index.js --name jis-backend --update-env || true
    pm2 save || true
    echo "pm2 installed and backend started (best-effort)."
  else
    echo "Could not install pm2. Start backend manually or use Hostinger Node.js app. Example command:"
    echo "  cd ~/backend_app && npm install --production && node dist/index.js"
  fi
fi
EOF

echo
echo "Deployment finished. Next steps (if needed):"
echo "- If backend did not start, either use Hostinger hPanel Node.js App (point to ~/backend_app and start 'node dist/index.js')"
echo "- Create DNS CNAME for api.$SITE_DOMAIN to your backend host if you are using a managed Node host."
echo "- Enable SSL via Hostinger hPanel for $SITE_DOMAIN."
echo "- Verify frontend: https://$SITE_DOMAIN"
echo "- Verify API (if running on remote): https://api.$SITE_DOMAIN/api/settings  (or http://$SSH_HOST:PORT if not proxied)."
echo
echo "Important security notes:"
echo "- db.json was moved to $REMOTE_PRIVATE_DIR on the remote and a symlink created in backend_app for runtime access."
echo "- Do NOT commit secrets (JWT, API keys) to repository. Use environment variables in the hosting panel."
echo
echo "If any step failed, copy the terminal output and share it so I can help troubleshoot."
