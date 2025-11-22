# 🚀 Deployment Guide - Life Tracker App

Complete step-by-step guide to deploy your Life Tracker app for **FREE**!

## 📋 Prerequisites Checklist

Before starting, create free accounts on:
- [ ] [Supabase](https://supabase.com) - Database & Auth
- [ ] [Netlify](https://netlify.com) - Hosting & Functions
- [ ] [Groq](https://console.groq.com) - AI Coach (Llama 3)
- [ ] [Hugging Face](https://huggingface.co) - Speech AI
- [ ] [GitHub](https://github.com) - Code repository

## 🗄️ Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in:
   - **Name**: life-tracker
   - **Database Password**: (generate strong password - save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free
6. Click "Create new project" (takes ~2 minutes)

### 1.2 Run Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy entire contents of `supabase-schema.sql`
4. Paste into editor
5. Click "Run" (bottom right)
6. Wait for "Success" message

### 1.3 Get Supabase Credentials

1. Go to **Settings** > **API**
2. Copy these values (you'll need them later):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string)

### 1.4 Enable Email Auth

1. Go to **Authentication** > **Providers**
2. Ensure "Email" is enabled
3. (Optional) Enable Google OAuth:
   - Click "Google"
   - Follow setup instructions
   - Add authorized redirect URL

## 🤖 Step 2: Get AI API Keys

### 2.1 Groq API Key (AI Coach)

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up/Login
3. Click "API Keys" in sidebar
4. Click "Create API Key"
5. Name it "life-tracker"
6. Copy the key (starts with `gsk_...`)
7. **Save it securely** - you can't see it again!

### 2.2 Hugging Face Token (Speech AI)

1. Go to [huggingface.co](https://huggingface.co)
2. Sign up/Login
3. Click your profile picture > **Settings**
4. Click **Access Tokens**
5. Click "New token"
6. Name: "life-tracker"
7. Role: "Read"
8. Click "Generate"
9. Copy the token (starts with `hf_...`)

## 📦 Step 3: Prepare Your Code

### 3.1 Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Life Tracker App"

# Create GitHub repo (via GitHub website)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/life-tracker.git
git branch -M main
git push -u origin main
```

### 3.2 Create Environment File

Create `.env.local` in your project root:

```bash
# Supabase (from Step 1.3)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Groq API (from Step 2.1)
GROQ_API_KEY=gsk_...

# Hugging Face (from Step 2.2)
HUGGING_FACE_API_KEY=hf_...

# App URL (will update after deployment)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ IMPORTANT**: Never commit `.env.local` to GitHub!

## 🌐 Step 4: Deploy to Netlify

### 4.1 Connect GitHub to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up" > "Sign up with GitHub"
3. Authorize Netlify
4. Click "Add new site" > "Import an existing project"
5. Click "GitHub"
6. Find and select your `life-tracker` repository
7. Click on it

### 4.2 Configure Build Settings

Netlify should auto-detect Next.js. Verify:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: `netlify/functions`

### 4.3 Add Environment Variables

1. Click "Show advanced"
2. Click "New variable" for each:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
GROQ_API_KEY = gsk_...
HUGGING_FACE_API_KEY = hf_...
NEXT_PUBLIC_APP_URL = https://your-site.netlify.app
```

**Note**: For `NEXT_PUBLIC_APP_URL`, use your Netlify URL (you'll get it after deployment)

### 4.4 Deploy!

1. Click "Deploy site"
2. Wait 2-3 minutes for build
3. You'll get a URL like: `https://random-name-123.netlify.app`

### 4.5 Update App URL

1. Copy your Netlify URL
2. Go to **Site settings** > **Environment variables**
3. Edit `NEXT_PUBLIC_APP_URL`
4. Paste your Netlify URL
5. Click "Save"
6. Go to **Deploys** > Click "Trigger deploy" > "Deploy site"

## 🔧 Step 5: Configure Supabase Redirect URLs

1. Go back to Supabase project
2. Go to **Authentication** > **URL Configuration**
3. Add your Netlify URL to:
   - **Site URL**: `https://your-site.netlify.app`
   - **Redirect URLs**: Add:
     - `https://your-site.netlify.app/auth/callback`
     - `http://localhost:3000/auth/callback` (for local dev)

## ✅ Step 6: Test Your Deployment

### 6.1 Test Authentication

1. Visit your Netlify URL
2. Click "Sign Up"
3. Enter email and password
4. Check email for confirmation
5. Click confirmation link
6. You should be logged in!

### 6.2 Test Core Features

- [ ] Create a goal
- [ ] Add a habit
- [ ] Log an exercise
- [ ] Log a meal
- [ ] Take a progress snapshot
- [ ] View dashboard

### 6.3 Test AI Features

- [ ] Go to AI Coach page
- [ ] Send a message
- [ ] Wait for response (may take 20-30s first time)
- [ ] Try voice input (click microphone)
- [ ] Try voice output (click speaker)

## 🎨 Step 7: Customize Your Site

### 7.1 Custom Domain (Optional)

1. Buy domain from Namecheap, Google Domains, etc.
2. In Netlify: **Domain settings** > "Add custom domain"
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic, ~24 hours)

### 7.2 Update Site Name

1. In Netlify: **Site settings** > **Site details**
2. Click "Change site name"
3. Enter new name: `your-life-tracker`
4. Your URL becomes: `https://your-life-tracker.netlify.app`

## 📊 Step 8: Monitor Your App

### Netlify Dashboard

- **Functions**: See AI function invocations
- **Analytics**: View traffic (upgrade for detailed analytics)
- **Logs**: Debug issues

### Supabase Dashboard

- **Database**: View tables and data
- **Auth**: See user signups
- **Storage**: Monitor file uploads
- **Logs**: Check API requests

## 🐛 Troubleshooting

### Build Fails

**Error**: "Module not found"
```bash
# Locally, run:
npm install
npm run build

# If successful, commit and push:
git add .
git commit -m "Fix dependencies"
git push
```

### Environment Variables Not Working

1. Check spelling (case-sensitive!)
2. Ensure `NEXT_PUBLIC_` prefix for client-side vars
3. Redeploy after changing env vars

### AI Functions Timeout

**Error**: "Function execution timed out"
- Hugging Face models need warm-up (20-30s first time)
- Try again after a minute
- Check function logs in Netlify

### Supabase RLS Errors

**Error**: "Row level security policy violation"
1. Check you're logged in
2. Verify RLS policies in Supabase SQL Editor
3. Ensure policies allow user access

### Authentication Issues

**Error**: "Invalid redirect URL"
1. Add your Netlify URL to Supabase redirect URLs
2. Include `/auth/callback` path
3. Wait a few minutes for changes to propagate

## 🔄 Making Updates

### Code Changes

```bash
# Make changes locally
git add .
git commit -m "Description of changes"
git push

# Netlify auto-deploys from GitHub!
```

### Database Changes

1. Write migration SQL
2. Run in Supabase SQL Editor
3. Test thoroughly
4. Document in `migrations/` folder

## 📈 Scaling (When You Outgrow Free Tier)

### Supabase Pro ($25/month)
- 8GB database
- 100GB bandwidth
- 50GB file storage
- No pausing

### Netlify Pro ($19/month)
- 1TB bandwidth
- Background functions
- Analytics
- Team features

### Groq (Pay-as-you-go)
- Currently free
- Will add pricing later
- Very affordable

## 🎉 You're Live!

Congratulations! Your AI-powered Life Tracker is now live and accessible worldwide!

### Share Your App

- Tweet about it: "Just launched my AI life tracker! 🚀"
- Share on LinkedIn
- Show friends and family
- Get feedback and iterate

### Next Steps

- [ ] Add custom domain
- [ ] Set up analytics
- [ ] Create user documentation
- [ ] Build community (Discord, Reddit)
- [ ] Add more AI features
- [ ] Implement push notifications

## 📞 Need Help?

- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Groq**: [console.groq.com/docs](https://console.groq.com/docs)
- **Hugging Face**: [huggingface.co/docs](https://huggingface.co/docs)

---

**Happy Deploying! 🚀**

Remember: You're running a full-stack AI app with database, auth, and AI features for **$0/month**! 🎉
