#!/bin/bash

# Portfolio Website Deployment Script
# This script helps deploy your portfolio to GitHub Pages

echo "🚀 Portfolio Deployment Script"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not found!"
    echo "Initializing git repository..."
    git init
    git remote add origin https://github.com/LeadbyCode/nileshvernekar.git
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "📝 Uncommitted changes detected. Committing..."
    git add .
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Update portfolio website"
    fi
    git commit -m "$commit_msg"
else
    echo "✅ No uncommitted changes"
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
echo ""
echo "Choose authentication method:"
echo "1) SSH (recommended if set up)"
echo "2) HTTPS (requires token)"
echo "3) Skip push (I'll do it manually)"
read -p "Enter choice (1-3): " auth_choice

case $auth_choice in
    1)
        echo "Using SSH..."
        git remote set-url origin git@github.com:LeadbyCode/nileshvernekar.git
        git push -u origin main
        ;;
    2)
        echo "Using HTTPS..."
        git remote set-url origin https://github.com/LeadbyCode/nileshvernekar.git
        echo "You'll need to enter your GitHub username and Personal Access Token"
        git push -u origin main
        ;;
    3)
        echo "Skipping push. Push manually with: git push -u origin main"
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/LeadbyCode/nileshvernekar"
echo "2. Click Settings > Pages"
echo "3. Select 'main' branch as source"
echo "4. Wait 1-2 minutes"
echo "5. Your site will be live at: https://leadbycode.github.io/nileshvernekar/"
echo ""
echo "🎉 Happy coding!"
