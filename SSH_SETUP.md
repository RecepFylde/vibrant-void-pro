# SSH Setup for Server Deployment

## SSH Public Key

Your SSH public key has been generated. Add this key to your server to enable password-less SSH access:

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDVB0NGrVQmS8E5ZdnLirOEgWRY0ISoAh/sbpAe/BUaZOq58OyNFdq4AUhf01+ZG+zi45P5JW4QLF70xAenaHHYiOZJR6lIWZVn+/y7Lf2+bly3NwMg2PZDz9lJwnYuMDvspJgveAFu6knWzpgA2g5lW7OZzj9nBDhtzOkT9IFGu5IwlSXhc92jZMUV7wzb2q0wZXeAJJxpm2bXkkKQQELxpBNi+DldeqzlxqhoOLe0OoCle3Qr60d7otfDdGVlgBXMVYwaypfpHk9iOpw9kKSqBs4sySDWcIN7GkAtDogH2a+NW4aqNka7hBhoROwn4liLTjS+mi6755xzPSrZCEtnfbp6khW1cl8OFgil5gvz8XR/5SKd1+d5cEPFUNAFEovBAoI7zGfGkXRJ1gD8nIQSp+DDhDfbzo+FKSoLNCYSPyDj+snh7nHN5ctOXXQPO1N1lvEbI4ODsrUA5Nwhc7c+CULg5xXlTdQStJG1X8vPisGGxJc/JNtWuo1QgEwWXgxZGyNdSd4JtMXwuMxCIIseX7YjcZkuLOm0hNBlFS6WXnwh9Tf8sJdg6++hsPSxgG+SS9jJhk6RQ2yCXuVvvkciYi15oNJM1UQl9TqI/uSij9drW1EMna6bXc44V9IjVgMwHABeZb4XInFx50J5MVud5bntSfbahDRO+7vUCuu3Nw== recephaylu@MacBookAir.Home
```

## Setup Instructions

### Option 1: Manual Setup (Recommended)

1. **SSH into your server:**
   ```bash
   ssh root@159.65.50.61
   ```
   (Use password: 5bpdd5^^7hPg5GR)

2. **Create .ssh directory if it doesn't exist:**
   ```bash
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   ```

3. **Add the public key to authorized_keys:**
   ```bash
   echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDVB0NGrVQmS8E5ZdnLirOEgWRY0ISoAh/sbpAe/BUaZOq58OyNFdq4AUhf01+ZG+zi45P5JW4QLF70xAenaHHYiOZJR6lIWZVn+/y7Lf2+bly3NwMg2PZDz9lJwnYuMDvspJgveAFu6knWzpgA2g5lW7OZzj9nBDhtzOkT9IFGu5IwlSXhc92jZMUV7wzb2q0wZXeAJJxpm2bXkkKQQELxpBNi+DldeqzlxqhoOLe0OoCle3Qr60d7otfDdGVlgBXMVYwaypfpHk9iOpw9kKSqBs4sySDWcIN7GkAtDogH2a+NW4aqNka7hBhoROwn4liLTjS+mi6755xzPSrZCEtnfbp6khW1cl8OFgil5gvz8XR/5SKd1+d5cEPFUNAFEovBAoI7zGfGkXRJ1gD8nIQSp+DDhDfbzo+FKSoLNCYSPyDj+snh7nHN5ctOXXQPO1N1lvEbI4ODsrUA5Nwhc7c+CULg5xXlTdQStJG1X8vPisGGxJc/JNtWuo1QgEwWXgxZGyNdSd4JtMXwuMxCIIseX7YjcZkuLOm0hNBlFS6WXnwh9Tf8sJdg6++hsPSxgG+SS9jJhk6RQ2yCXuVvvkciYi15oNJM1UQl9TqI/uSij9drW1EMna6bXc44V9IjVgMwHABeZb4XInFx50J5MVud5bntSfbahDRO+7vUCuu3Nw== recephaylu@MacBookAir.Home" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

4. **Exit and test SSH connection:**
   ```bash
   exit
   ssh root@159.65.50.61
   ```

### Option 2: Using ssh-copy-id (If available)

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub root@159.65.50.61
```

## After SSH Setup

Once SSH key authentication is working, run the deployment script:

```bash
bash server-deploy.sh
```

## Troubleshooting

### SSH Connection Refused
- Ensure server is running
- Check firewall allows port 22
- Verify IP address is correct

### Permission Denied
- Ensure public key is correctly added to ~/.ssh/authorized_keys
- Check file permissions: `chmod 600 ~/.ssh/authorized_keys`
- Check directory permissions: `chmod 700 ~/.ssh`

### Still Using Password?
- Disable password authentication after SSH key is working:
  ```bash
  sudo nano /etc/ssh/sshd_config
  # Set: PasswordAuthentication no
  sudo systemctl restart ssh
  ```

## Security Notes

1. **Keep private key safe:** `~/.ssh/id_rsa`
2. **Never share private key**
3. **Backup private key** in a secure location
4. **Disable root login** after setup (optional):
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   sudo systemctl restart ssh
   ```

## Next Steps

After SSH is configured:

1. Run deployment script:
   ```bash
   bash server-deploy.sh
   ```

2. Follow the deployment guide:
   - Edit environment variables
   - Setup Nginx
   - Configure SSL
   - Start API server

For detailed instructions, see: DEPLOYMENT_GUIDE.md
