# Quick Start - Vibrant Void Pro Deployment

## 📋 Prerequisites

- Server: 159.65.50.61 (root user)
- Server Password: 5bpdd5^^7hPg5GR
- Domain: recephaylu.co.uk
- Local machine with SSH access
- Git installed

## 🚀 Quick Deployment Steps

### Step 1: Setup SSH Key Authentication

```bash
# SSH public key is already generated at ~/.ssh/id_rsa.pub
# Add it to your server:

ssh root@159.65.50.61
# Enter password: 5bpdd5^^7hPg5GR

# On server, run:
mkdir -p ~/.ssh
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDVB0NGrVQmS8E5ZdnLirOEgWRY0ISoAh/sbpAe/BUaZOq58OyNFdq4AUhf01+ZG+zi45P5JW4QLF70xAenaHHYiOZJR6lIWZVn+/y7Lf2+bly3NwMg2PZDz9lJwnYuMDvspJgveAFu6knWzpgA2g5lW7OZzj9nBDhtzOkT9IFGu5IwlSXhc92jZMUV7wzb2q0wZXeAJJxpm2bXkkKQQELxpBNi+DldeqzlxqhoOLe0OoCle3Qr60d7otfDdGVlgBXMVYwaypfpHk9iOpw9kKSqBs4sySDWcIN7GkAtDogH2a+NW4aqNka7hBhoROwn4liLTjS+mi6755xzPSrZCEtnfbp6khW1cl8OFgil5gvz8XR/5SKd1+d5cEPFUNAFEovBAoI7zGfGkXRJ1gD8nIQSp+DDhDfbzo+FKSoLNCYSPyDj+snh7nHN5ctOXXQPO1N1lvEbI4ODsrUA5Nwhc7c+CULg5xXlTdQStJG1X8vPisGGxJc/JNtWuo1QgEwWXgxZGyNdSd4JtMXwuMxCIIseX7YjcZkuLOm0hNBlFS6WXnwh9Tf8sJdg6++hsPSxgG+SS9jJhk6RQ2yCXuVvvkciYi15oNJM1UQl9TqI/uSij9drW1EMna6bXc44V9IjVgMwHABeZb4XInFx50J5MVud5bntSfbahDRO+7vUCuu3Nw== recephaylu@MacBookAir.Home" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
exit
```

### Step 2: Deploy Project

```bash
# From your local machine:
cd /Users/recephaylu/Desktop/vibrant-void-pro-main
bash server-deploy.sh
```

### Step 3: Configure Environment

```bash
# SSH into server
ssh root@159.65.50.61

# Edit environment variables
nano /var/www/vibrant-void-pro/.env.local

# Add your SMTP settings:
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-email@gmail.com
# SMTP_PASSWORD=your-app-password
# SMTP_FROM_EMAIL=noreply@example.com
# CONTACT_EMAIL=recephaylu@gmail.com
```

### Step 4: Setup Nginx

```bash
# On server:
sudo nano /etc/nginx/sites-available/vibrant-void-pro

# Copy configuration from DEPLOYMENT_GUIDE.md
# Domain is already set to: recephaylu.co.uk

# Enable site:
sudo ln -s /etc/nginx/sites-available/vibrant-void-pro /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Setup SSL Certificate

```bash
# On server:
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d recephaylu.co.uk -d www.recephaylu.co.uk
```

### Step 6: Start API Server

```bash
# On server:
cd /var/www/vibrant-void-pro
npm install -g pm2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### Step 7: Update DNS

Point your domain to: **159.65.50.61**

```
A record: recephaylu.co.uk -> 159.65.50.61
A record: www.recephaylu.co.uk -> 159.65.50.61
```

## ✅ Verification

### Check Deployment
```bash
# On server:
ls -la /var/www/vibrant-void-pro/
ls -la /var/www/vibrant-void-pro/dist/
```

### Check Nginx
```bash
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### Check API Server
```bash
pm2 status
pm2 logs
curl http://localhost:3000/api/contact
```

### Test Website
Visit: https://recephaylu.co.uk

## 📚 Documentation

- **SSH Setup**: See `SSH_SETUP.md`
- **Full Deployment**: See `DEPLOYMENT_GUIDE.md`
- **Contact Form**: See `CONTACT_FORM_SETUP.md`

## 🔧 Troubleshooting

### SSH Connection Issues
```bash
# Test SSH connection
ssh -v root@159.65.50.61

# If still using password, check SSH_SETUP.md
```

### Nginx Not Working
```bash
# Check configuration
sudo nginx -t

# Check logs
sudo tail -f /var/log/nginx/error.log

# Restart
sudo systemctl restart nginx
```

### API Not Responding
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs

# Restart API
pm2 restart vibrant-api
```

### Email Not Sending
```bash
# Check .env.local
cat /var/www/vibrant-void-pro/.env.local

# Check PM2 logs
pm2 logs

# Test SMTP
telnet smtp.gmail.com 587
```

## 📞 Support

For detailed information, refer to:
- `DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `SSH_SETUP.md` - SSH configuration
- `CONTACT_FORM_SETUP.md` - Email setup

## 🎯 Next Steps

1. ✅ Setup SSH key authentication
2. ✅ Run deployment script
3. ✅ Configure environment variables
4. ✅ Setup Nginx
5. ✅ Setup SSL certificate
6. ✅ Start API server
7. ✅ Update DNS records
8. ✅ Test website

Your Vibrant Void Pro portfolio will be live at your domain!
