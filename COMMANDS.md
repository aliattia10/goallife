# 🎯 Quick Command Reference

## 🚀 Push to GitHub

### First Time Setup

```bash
# 1. Initialize Git
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: AI-Powered Life Tracker"

# 4. Create GitHub repository
# Go to: https://github.com/new
# Name: life-tracker-app
# DO NOT initialize with README

# 5. Connect and push
git remote add origin https://github.com/YOUR_USERNAME/life-tracker-app.git
git branch -M main
git push -u origin main
```

### Subsequent Updates

```bash
# Add changes
git add .

# Commit with message
git commit -m "Your commit message here"

# Push to GitHub
git push
```

## 🌐 Deploy to Netlify

### Option 1: Netlify Website (Easiest)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Select `life-tracker-app` repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables (see below)
7. Click "Deploy site"

### Option 2: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Or deploy directly
netlify deploy --prod
```

## 🔑 Environment Variables for Netlify

Add these in Netlify dashboard (Site settings → Environment variables):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
```

## 🗄️ Supabase Setup

```bash
# 1. Create account at https://supabase.com
# 2. Create new project
# 3. Go to SQL Editor
# 4. Copy contents of supabase-schema.sql
# 5. Paste and run
# 6. Get credentials from Settings → API
```

## 🤖 Get API Keys

### Groq (AI Coach)
```bash
# 1. Go to https://console.groq.com
# 2. Create account
# 3. Generate API key
# 4. Copy key (starts with gsk_)
```

### Hugging Face (Speech AI)
```bash
# 1. Go to https://huggingface.co
# 2. Create account
# 3. Settings → Access Tokens
# 4. Create new token
# 5. Copy token (starts with hf_)
```

## 💻 Local Development

```bash
# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local

# Edit .env.local with your credentials
# (Use your favorite text editor)

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

## 🔧 Useful Commands

### Build & Test Locally
```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Git Commands
```bash
# Check status
git status

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull

# View remote URL
git remote -v
```

### Netlify Commands
```bash
# Check deployment status
netlify status

# View site info
netlify sites:list

# Open site in browser
netlify open

# View function logs
netlify functions:log

# Set environment variable
netlify env:set KEY "value"

# List environment variables
netlify env:list
```

## 🐛 Troubleshooting Commands

### Clear Git Cache
```bash
git rm -r --cached .
git add .
git commit -m "Clear cache"
```

### Reset to Last Commit
```bash
git reset --hard HEAD
```

### View Build Logs (Netlify)
```bash
netlify logs
```

### Test Functions Locally
```bash
netlify dev
```

## 📦 Package Management

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm update package-name
```

### Clean Install
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## 🚨 Emergency Commands

### Rollback Netlify Deployment
```bash
# Via CLI
netlify rollback

# Or via dashboard:
# Deploys → Click on previous deploy → Publish deploy
```

### Force Push (Use with caution!)
```bash
git push --force origin main
```

### Delete Git History
```bash
# Create new orphan branch
git checkout --orphan new-main

# Add all files
git add .

# Commit
git commit -m "Fresh start"

# Delete old main branch
git branch -D main

# Rename current branch to main
git branch -m main

# Force push
git push -f origin main
```

## 📊 Monitoring Commands

### Check Supabase Usage
```bash
# Go to Supabase dashboard
# Settings → Usage
```

### Check Netlify Usage
```bash
# Go to Netlify dashboard
# Team settings → Usage
```

### Check Groq Usage
```bash
# Go to https://console.groq.com
# View usage dashboard
```

## 🎯 Quick Deploy Checklist

```bash
# 1. Commit changes
git add .
git commit -m "Update features"

# 2. Push to GitHub
git push

# 3. Netlify auto-deploys!
# Check status at https://app.netlify.com

# 4. Verify deployment
# Visit your site URL
```

## 💡 Pro Tips

```bash
# Create alias for common commands (add to ~/.bashrc or ~/.zshrc)
alias gp="git add . && git commit -m 'Update' && git push"
alias nd="netlify deploy --prod"
alias dev="npm run dev"

# Then just run:
gp  # Quick commit and push
nd  # Quick deploy
dev # Start dev server
```

---

**Need more help?** Check `SETUP.md` or `DEPLOYMENT.md`
