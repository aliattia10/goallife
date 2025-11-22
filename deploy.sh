#!/bin/bash

# Life Tracker App - Deployment Script
# This script helps you deploy to GitHub and Netlify

echo "🚀 Life Tracker App - Deployment Helper"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}✓ Git initialized${NC}"
else
    echo -e "${GREEN}✓ Git already initialized${NC}"
fi

# Check for .env.local
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠ Warning: .env.local not found${NC}"
    echo "Please create .env.local with your API keys before deploying"
    echo "Copy .env.example to .env.local and fill in your credentials"
    echo ""
    read -p "Do you want to continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Add all files
echo ""
echo "📦 Adding files to Git..."
git add .

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}No changes to commit${NC}"
else
    # Commit
    echo ""
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Update: Life Tracker App"
    fi
    
    git commit -m "$commit_msg"
    echo -e "${GREEN}✓ Changes committed${NC}"
fi

# Check if remote exists
if git remote | grep -q "origin"; then
    echo -e "${GREEN}✓ Remote 'origin' already configured${NC}"
    
    # Push to existing remote
    echo ""
    echo "📤 Pushing to GitHub..."
    git push origin main || git push origin master
    echo -e "${GREEN}✓ Pushed to GitHub${NC}"
else
    echo ""
    echo -e "${YELLOW}No remote repository configured${NC}"
    echo ""
    echo "Please create a GitHub repository first:"
    echo "1. Go to https://github.com/new"
    echo "2. Repository name: life-tracker-app"
    echo "3. DO NOT initialize with README"
    echo "4. Create repository"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url
    
    if [ -z "$repo_url" ]; then
        echo -e "${RED}✗ No repository URL provided${NC}"
        exit 1
    fi
    
    git remote add origin "$repo_url"
    git branch -M main
    git push -u origin main
    echo -e "${GREEN}✓ Pushed to GitHub${NC}"
fi

echo ""
echo "========================================"
echo -e "${GREEN}✓ Deployment to GitHub complete!${NC}"
echo "========================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Set up Supabase:"
echo "   - Go to https://supabase.com"
echo "   - Create new project"
echo "   - Run supabase-schema.sql in SQL Editor"
echo "   - Get API credentials"
echo ""
echo "2. Get API Keys:"
echo "   - Groq: https://console.groq.com"
echo "   - Hugging Face: https://huggingface.co/settings/tokens"
echo ""
echo "3. Deploy to Netlify:"
echo "   - Go to https://netlify.com"
echo "   - Import from GitHub"
echo "   - Add environment variables"
echo "   - Deploy!"
echo ""
echo "📖 See SETUP.md for detailed instructions"
echo ""
