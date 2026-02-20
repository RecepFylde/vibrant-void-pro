#!/bin/bash

# Automated Deployment Script for Vibrant Void Pro
# This script deploys the project to the production server
# Usage: bash server-deploy.sh

set -e  # Exit on error

# Configuration
SERVER_IP="159.65.50.61"
SERVER_USER="root"
DEPLOY_PATH="/var/www/vibrant-void-pro"
REPO_URL="https://github.com/RecepFylde/vibrant-void-pro.git"
NODE_VERSION="18"

echo "=========================================="
echo "Vibrant Void Pro - Server Deployment"
echo "=========================================="
echo ""
echo "Server: $SERVER_IP"
echo "Deploy Path: $DEPLOY_PATH"
echo "Repository: $REPO_URL"
echo ""

# Create SSH key if it doesn't exist
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "Creating SSH key..."
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
    echo "SSH key created. Please add the public key to your server:"
    echo "cat ~/.ssh/id_rsa.pub"
    exit 1
fi

# Test SSH connection
echo "Testing SSH connection..."
if ! ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "echo 'SSH connection successful'" 2>/dev/null; then
    echo "ERROR: Cannot connect to server via SSH"
    echo "Please ensure:"
    echo "1. SSH key is added to server: ssh-copy-id -i ~/.ssh/id_rsa.pub $SERVER_USER@$SERVER_IP"
    echo "2. Server is running and accessible"
    exit 1
fi

echo "✓ SSH connection successful"
echo ""

# Deploy script to run on server
DEPLOY_SCRIPT=$(cat <<'EOF'
#!/bin/bash
set -e

DEPLOY_PATH="/var/www/vibrant-void-pro"
REPO_URL="https://github.com/RecepFylde/vibrant-void-pro.git"

echo "Starting deployment..."
echo ""

# Create deploy directory if it doesn't exist
if [ ! -d "$DEPLOY_PATH" ]; then
    echo "Creating deploy directory..."
    mkdir -p $DEPLOY_PATH
fi

# Clone or update repository
if [ -d "$DEPLOY_PATH/.git" ]; then
    echo "Updating repository..."
    cd $DEPLOY_PATH
    git fetch origin
    git reset --hard origin/main
else
    echo "Cloning repository..."
    cd /var/www
    git clone $REPO_URL
    cd $DEPLOY_PATH
fi

echo "✓ Repository updated"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install --production
echo "✓ Dependencies installed"
echo ""

# Build project
echo "Building project..."
npm run build
echo "✓ Project built"
echo ""

# Create logs directory
mkdir -p $DEPLOY_PATH/logs

# Setup environment file if it doesn't exist
if [ ! -f "$DEPLOY_PATH/.env.local" ]; then
    echo "Creating .env.local file..."
    cp $DEPLOY_PATH/.env.example $DEPLOY_PATH/.env.local
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local with your SMTP settings:"
    echo "   nano $DEPLOY_PATH/.env.local"
    echo ""
fi

echo "=========================================="
echo "Deployment completed successfully!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Edit environment variables:"
echo "   nano $DEPLOY_PATH/.env.local"
echo ""
echo "2. Setup Nginx (if not already done):"
echo "   sudo nano /etc/nginx/sites-available/vibrant-void-pro"
echo "   (Copy configuration from DEPLOYMENT_GUIDE.md)"
echo ""
echo "3. Enable Nginx site:"
echo "   sudo ln -s /etc/nginx/sites-available/vibrant-void-pro /etc/nginx/sites-enabled/"
echo "   sudo nginx -t"
echo "   sudo systemctl restart nginx"
echo ""
echo "4. Setup SSL certificate:"
echo "   sudo certbot --nginx -d your-domain.com"
echo ""
echo "5. Start API server with PM2:"
echo "   cd $DEPLOY_PATH"
echo "   npm install -g pm2"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 startup"
echo "   pm2 save"
echo ""
echo "6. Update DNS records to point to: 159.65.50.61"
echo ""
EOF
)

# Execute deployment on server
echo "Executing deployment on server..."
echo ""

ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP bash -s <<'REMOTE_SCRIPT'
#!/bin/bash
set -e

DEPLOY_PATH="/var/www/vibrant-void-pro"
REPO_URL="https://github.com/RecepFylde/vibrant-void-pro.git"

echo "Starting deployment..."
echo ""

# Create deploy directory if it doesn't exist
if [ ! -d "$DEPLOY_PATH" ]; then
    echo "Creating deploy directory..."
    mkdir -p $DEPLOY_PATH
fi

# Clone or update repository
if [ -d "$DEPLOY_PATH/.git" ]; then
    echo "Updating repository..."
    cd $DEPLOY_PATH
    git fetch origin
    git reset --hard origin/main
else
    echo "Cloning repository..."
    cd /var/www
    git clone $REPO_URL
    cd $DEPLOY_PATH
fi

echo "✓ Repository updated"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install --production
echo "✓ Dependencies installed"
echo ""

# Build project
echo "Building project..."
npm run build
echo "✓ Project built"
echo ""

# Create logs directory
mkdir -p $DEPLOY_PATH/logs

# Setup environment file if it doesn't exist
if [ ! -f "$DEPLOY_PATH/.env.local" ]; then
    echo "Creating .env.local file..."
    cp $DEPLOY_PATH/.env.example $DEPLOY_PATH/.env.local
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local with your SMTP settings:"
    echo "   nano $DEPLOY_PATH/.env.local"
    echo ""
fi

echo "=========================================="
echo "Deployment completed successfully!"
echo "=========================================="
echo ""
echo "Project deployed to: $DEPLOY_PATH"
echo "Build output: $DEPLOY_PATH/dist"
echo ""
REMOTE_SCRIPT

echo ""
echo "=========================================="
echo "✓ Deployment completed successfully!"
echo "=========================================="
echo ""
echo "Server: $SERVER_IP"
echo "Deploy Path: $DEPLOY_PATH"
echo ""
echo "Next steps on server:"
echo "1. SSH into server: ssh root@$SERVER_IP"
echo "2. Edit environment: nano $DEPLOY_PATH/.env.local"
echo "3. Follow DEPLOYMENT_GUIDE.md for Nginx and SSL setup"
echo ""
