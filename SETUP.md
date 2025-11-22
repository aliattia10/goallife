# 🚀 Quick Setup & Deployment Guide

## Step 1: Initialize Git and Push to GitHub

Run these commands in your terminal:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: AI-Powered Life Tracker App"

# Create a new repository on GitHub
# Go to https://github.com/new
# Repository name: life-tracker-app
# Description: AI-Powered Life Transformation Tracking System
# Public or Private: Your choice
# DO NOT initialize with README, .gitignore, or license

# After creating the repo, connect and push:
git remote add origin https://github.com/YOUR_USERNAME/life-tracker-app.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up Supabase (5 minutes)

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Click "Start your project"
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Name: `life-tracker`
   - Database Password: Generate strong password (SAVE IT!)
   - Region: Choose closest to you
   - Click "Create new project" (wait ~2 minutes)

3. **Run Database Schema**
   - Go to SQL Editor in Supabase dashboard
   - Click "New Query"
   - Copy entire contents of `supabase-schema.sql` file
   - Paste and click "Run"
   - Wait for "Success" message

4. **Get API Credentials**
   - Go to Settings > API
   - Copy:
     - Project URL: `https://xxxxx.supabase.co`
     - anon/public key: `eyJhbGc...`

## Step 3: Get AI API Keys (5 minutes)

### Groq API (AI Coach)
1. Go to https://console.groq.com
2. Sign up/Login
3. Click "API Keys"
4. Create new key named "life-tracker"
5. Copy key (starts with `gsk_`)

### Hugging Face (Speech AI)
1. Go to https://huggingface.co
2. Sign up/Login
3. Settings > Access Tokens
4. Create new token named "life-tracker"
5. Copy token (starts with `hf_`)

## Step 4: Deploy to Netlify (5 minutes)

### Option A: Via Netlify Website (Recommended)

1. **Connect GitHub**
   - Go to https://netlify.com
   - Sign up with GitHub
   - Click "Add new site" > "Import an existing project"
   - Select GitHub
   - Choose your `life-tracker-app` repository

2. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Show advanced" > "New variable"

3. **Add Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
   GROQ_API_KEY = gsk_...
   HUGGING_FACE_API_KEY = hf_...
   NEXT_PUBLIC_APP_URL = https://your-site.netlify.app
   ```
   (You'll update NEXT_PUBLIC_APP_URL after first deploy)

4. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes
   - Copy your Netlify URL

5. **Update App URL**
   - Go to Site settings > Environment variables
   - Edit `NEXT_PUBLIC_APP_URL` with your Netlify URL
   - Trigger new deploy

### Option B: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Follow prompts:
# - Create & configure a new site
# - Team: Your team
# - Site name: life-tracker-app
# - Build command: npm run build
# - Publish directory: .next

# Add environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://xxxxx.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGc..."
netlify env:set GROQ_API_KEY "gsk_..."
netlify env:set HUGGING_FACE_API_KEY "hf_..."
netlify env:set NEXT_PUBLIC_APP_URL "https://your-site.netlify.app"

# Deploy
netlify deploy --prod
```

## Step 5: Configure Supabase Redirect URLs

1. Go back to Supabase project
2. Authentication > URL Configuration
3. Add redirect URLs:
   - `https://your-site.netlify.app/auth/callback`
   - `http://localhost:3000/auth/callback`

## Step 6: Test Your App! 🎉

1. Visit your Netlify URL
2. Sign up with email
3. Confirm email
4. Start tracking your life!

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your credentials

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📊 Monitor Your App

- **Netlify Dashboard**: View deployments, functions, analytics
- **Supabase Dashboard**: Monitor database, auth, storage
- **Groq Console**: Check API usage
- **Hugging Face**: Monitor inference requests

## 🆘 Troubleshooting

### Build Fails
```bash
# Test build locally
npm run build

# If successful, commit and push
git add .
git commit -m "Fix build issues"
git push
```

### Environment Variables Not Working
- Check spelling (case-sensitive!)
- Redeploy after changing env vars
- Clear cache: Site settings > Build & deploy > Clear cache

### AI Functions Timeout
- First request takes 20-30s (model loading)
- Subsequent requests are fast
- Check function logs in Netlify

## 🎯 Next Steps

- [ ] Customize branding
- [ ] Add custom domain
- [ ] Set up analytics
- [ ] Invite users
- [ ] Share on social media

## 📞 Need Help?

Check `DEPLOYMENT.md` for detailed troubleshooting guide.

---

**Total Setup Time: ~15 minutes**
**Monthly Cost: $0** 💰

Happy tracking! 🚀
