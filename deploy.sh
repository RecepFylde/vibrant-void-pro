#!/bin/bash

# Deployment script for vibrant-void-pro
# This script deploys the project to the remote server

SERVER_IP="159.65.50.61"
SERVER_USER="root"
SERVER_PASSWORD="5bpdd5^^7hPg5GR"
DEPLOY_PATH="/var/www/vibrant-void-pro"
REPO_URL="https://github.com/RecepFylde/vibrant-void-pro.git"

echo "Starting deployment to $SERVER_IP..."

# Create SSH command with password
# Note: This requires expect or sshpass to be installed
# For macOS without sshpass, use SSH key authentication instead

# Alternative: Use SSH key-based authentication
# ssh -i ~/.ssh/id_rsa root@$SERVER_IP << 'EOF'

# For now, create a deployment guide
cat > DEPLOYMENT_GUIDE.md << 'GUIDE'
# Deployment Guide

## Prerequisites
- SSH access to server: root@159.65.50.61
- Node.js and npm installed on server
- Git installed on server

## Deployment Steps

### 1. Connect to Server
```bash
ssh root@159.65.50.61
```

### 2. Clone Repository
```bash
cd /var/www
git clone https://github.com/RecepFylde/vibrant-void-pro.git
cd vibrant-void-pro
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Build Project
```bash
npm run build
```

### 5. Setup Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local with your SMTP settings
nano .env.local
```

### 6. Setup Web Server (Nginx)
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/vibrant-void-pro

# Add the following configuration:
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/vibrant-void-pro/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7. Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/vibrant-void-pro /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 8. Setup SSL (Let's Encrypt)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 9. Setup Node.js API Server (PM2)
```bash
npm install -g pm2
pm2 start api/contact.js --name "vibrant-api"
pm2 startup
pm2 save
```

### 10. Update DNS
Point your domain to the server IP: 159.65.50.61

## Updating Deployment
```bash
cd /var/www/vibrant-void-pro
git pull origin main
npm install
npm run build
sudo systemctl restart nginx
```

## Troubleshooting
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Check PM2 logs: `pm2 logs`
- Check Node.js API: `curl http://localhost:3000/api/contact`

GUIDE

echo "Deployment guide created: DEPLOYMENT_GUIDE.md"
echo "Please follow the steps in DEPLOYMENT_GUIDE.md to deploy to your server"
