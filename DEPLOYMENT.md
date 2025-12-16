# Deployment Guide

## Quick Start - View Your Website Locally

Your portfolio website is already created and ready to view! Simply open the `index.html` file in your browser.

Or run a local server:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have it)
npx http-server
```

Then visit: `http://localhost:8000`

---

## Deploy to GitHub Pages (FREE & Recommended)

### Step 1: Push to GitHub

Since your repository is already connected to GitHub, you need to authenticate and push:

```bash
# Method 1: Use SSH instead of HTTPS (Recommended)
git remote set-url origin git@github.com:LeadbyCode/nileshvernekar.git
git push -u origin main
```

Or if you prefer HTTPS:

```bash
# Method 2: Use GitHub Personal Access Token
# 1. Go to GitHub.com > Settings > Developer settings > Personal access tokens
# 2. Generate new token with 'repo' permissions
# 3. Use token as password when pushing
git push -u origin main
# Username: your-github-username
# Password: your-personal-access-token
```

### Step 2: Enable GitHub Pages

1. Go to your repository: https://github.com/LeadbyCode/nileshvernekar
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: **https://leadbycode.github.io/nileshvernekar/**

🎉 Done! Your portfolio is now live on the internet!

---

## Alternative Deployment Options

### Option 1: Netlify (Easiest - No Git Required!)

1. Go to [netlify.com](https://netlify.com)
2. Sign up for free account
3. Drag and drop your entire project folder onto Netlify
4. Get instant live URL (e.g., `your-site.netlify.app`)
5. Optional: Add custom domain

**Pros**: Instant deployment, automatic HTTPS, custom domains, form handling
**Time**: 2 minutes

### Option 2: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Click Deploy
5. Live URL: `your-site.vercel.app`

**Pros**: Fast CDN, automatic deployments, custom domains
**Time**: 3 minutes

### Option 3: Render

1. Go to [render.com](https://render.com)
2. Sign up for free
3. Create new Static Site
4. Connect your GitHub repository
5. Deploy

**Pros**: Free HTTPS, custom domains, easy setup
**Time**: 3 minutes

---

## Setting Up SSH for GitHub (One-time Setup)

If you want to use SSH for easier pushing:

```bash
# Check if you have SSH keys
ls -la ~/.ssh

# If not, generate new SSH key
ssh-keygen -t ed25519 -C "nilesh.vernekar11@gmail.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard
cat ~/.ssh/id_ed25519.pub
# Copy the output

# Add to GitHub:
# 1. Go to GitHub.com > Settings > SSH and GPG keys
# 2. Click "New SSH key"
# 3. Paste your key
# 4. Save

# Update remote URL
git remote set-url origin git@github.com:LeadbyCode/nileshvernekar.git

# Push
git push -u origin main
```

---

## Custom Domain Setup (Optional)

### For GitHub Pages:

1. Buy a domain (e.g., from Namecheap, GoDaddy, Google Domains)
2. Add a `CNAME` file to your repository:
   ```bash
   echo "nileshvernekar.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```
3. In your domain registrar, add these DNS records:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153

   Type: A
   Host: @
   Value: 185.199.109.153

   Type: A
   Host: @
   Value: 185.199.110.153

   Type: A
   Host: @
   Value: 185.199.111.153

   Type: CNAME
   Host: www
   Value: leadbycode.github.io
   ```
4. Wait 24-48 hours for DNS propagation

---

## Updating Your Website

After making changes to your website:

```bash
# Add changes
git add .

# Commit
git commit -m "Update portfolio content"

# Push
git push

# GitHub Pages will automatically deploy your changes!
```

---

## Troubleshooting

### Push Authentication Failed?
- Use SSH instead of HTTPS
- Or create a Personal Access Token from GitHub

### Site Not Updating?
- Wait 1-2 minutes for GitHub Pages to rebuild
- Clear your browser cache (Cmd+Shift+R on Mac)
- Check GitHub Actions tab for deployment status

### Images Not Loading?
- Ensure image paths are relative (e.g., `./images/photo.jpg`)
- Check file names are correct (case-sensitive)

---

## Next Steps

1. ✅ Website created
2. ⏳ Push to GitHub
3. ⏳ Enable GitHub Pages
4. ⏳ Share your URL!

Your portfolio will be live at:
**https://leadbycode.github.io/nileshvernekar/**

Need help? Check the README.md or contact support.
