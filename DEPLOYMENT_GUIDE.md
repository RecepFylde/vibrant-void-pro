# Deployment Guide - Vibrant Void Pro

## Server Information
- **IP Address**: 159.65.50.61
- **User**: root
- **Deploy Path**: /var/www/vibrant-void-pro

## Prerequisites
- SSH access to server
- Node.js 18+ and npm installed on server
- Git installed on server
- Nginx web server
- PM2 for Node.js process management

## Step-by-Step Deployment

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
nano .env.local
```

**Required Environment Variables:**
```env
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@example.com
CONTACT_EMAIL=recephaylu@gmail.com
```

### 6. Setup Nginx Configuration

Create Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/vibrant-void-pro
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL certificates (will be added by certbot)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Root directory
    root /var/www/vibrant-void-pro/dist;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
```

### 7. Enable Nginx Site
```bash
sudo ln -s /etc/nginx/sites-available/vibrant-void-pro /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site if needed
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

### 8. Setup SSL Certificate (Let's Encrypt)
```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 9. Setup Node.js API Server with PM2

Install PM2 globally:
```bash
npm install -g pm2
```

Create PM2 ecosystem file:
```bash
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'vibrant-api',
    script: './api/contact.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
EOF
```

Start API server:
```bash
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### 10. Setup Auto-Renewal for SSL
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 11. Update DNS Records
Point your domain to the server IP:
```
A record: your-domain.com -> 159.65.50.61
A record: www.your-domain.com -> 159.65.50.61
```

## Verification

### Check Nginx Status
```bash
sudo systemctl status nginx
sudo nginx -t
```

### Check PM2 Status
```bash
pm2 status
pm2 logs
```

### Test API Endpoint
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "company": "Test Co",
    "industry": "Technology",
    "budget": "$5K - $15K",
    "message": "Test message"
  }'
```

### Test Website
Visit: https://your-domain.com

## Updating Deployment

When you push new changes to GitHub:

```bash
cd /var/www/vibrant-void-pro
git pull origin main
npm install
npm run build
sudo systemctl restart nginx
```

## Troubleshooting

### Nginx Issues
```bash
# Check error logs
sudo tail -f /var/log/nginx/error.log

# Check access logs
sudo tail -f /var/log/nginx/access.log

# Test configuration
sudo nginx -t
```

### PM2 Issues
```bash
# View logs
pm2 logs

# Restart API
pm2 restart vibrant-api

# Check process status
pm2 status
```

### SSL Certificate Issues
```bash
# Renew certificate manually
sudo certbot renew --dry-run

# Check certificate expiration
sudo certbot certificates
```

### Email Not Sending
1. Check SMTP credentials in `.env.local`
2. Verify firewall allows outbound SMTP (port 587 or 465)
3. Check PM2 logs for errors: `pm2 logs`
4. Test SMTP connection:
```bash
telnet smtp.gmail.com 587
```

## Security Recommendations

1. **Firewall Configuration**
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

2. **Fail2Ban Setup** (Prevent brute force attacks)
   ```bash
   sudo apt-get install fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

3. **Regular Updates**
   ```bash
   sudo apt-get update
   sudo apt-get upgrade
   ```

4. **Backup Strategy**
   - Backup `/var/www/vibrant-void-pro` regularly
   - Backup `.env.local` file securely
   - Use version control (GitHub) for code

## Performance Optimization

1. **Enable Gzip Compression** in Nginx
2. **Setup CDN** for static assets
3. **Monitor Server Resources**
   ```bash
   top
   df -h
   free -h
   ```

## Support

For issues or questions:
- Check logs: `pm2 logs` and `sudo tail -f /var/log/nginx/error.log`
- Review GitHub repository: https://github.com/RecepFylde/vibrant-void-pro
- Contact: recephaylu@gmail.com
