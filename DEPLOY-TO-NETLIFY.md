# 🌐 Deploy to Netlify - Step by Step

## ✅ Prerequisites

- [ ] Code pushed to GitHub (see `PUSH-TO-GITHUB.md`)
- [ ] Supabase project created with schema deployed
- [ ] API keys obtained (Groq, Hugging Face)

## 🚀 Deployment Steps

### Step 1: Create Netlify Account

1. Go to https://netlify.com
2. Click "Sign up"
3. Choose "Sign up with GitHub"
4. Authorize Netlify to access your GitHub

### Step 2: Import Your Repository

1. Click "Add new site" button
2. Select "Import an existing project"
3. Click "GitHub"
4. Find and click on `life-tracker-app` repository
5. Click on it to select

### Step 3: Configure Build Settings

Netlify should auto-detect Next.js. Verify these settings:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: `netlify/functions`

### Step 4: Add Environment Variables

Click "Show advanced" → "New variable"

Add each of these (one at a time):

#### Variable 1: Supabase URL
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co
```
(Get from Supabase → Settings → API)

#### Variable 2: Supabase Anon Key
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
(Get from Supabase → Settings → API)

#### Variable 3: Groq API Key
```
Key: GROQ_API_KEY
Value: gsk_xxxxxxxxxxxxxxxxxxxxx
```
(Get from https://console.groq.com → API Keys)

#### Variable 4: Hugging Face API Key
```
Key: HUGGING_FACE_API_KEY
Value: hf_xxxxxxxxxxxxxxxxxxxxx
```
(Get from https://huggingface.co → Settings → Access Tokens)

#### Variable 5: App URL (Temporary)
```
Key: NEXT_PUBLIC_APP_URL
Value: https://temp.netlify.app
```
(We'll update this after deployment)

### Step 5: Deploy!

1. Click "Deploy site"
2. Wait 2-3 minutes for build to complete
3. Watch the deploy log for any errors

### Step 6: Get Your Site URL

Once deployed, you'll see:
- **Site URL**: `https://random-name-123.netlify.app`

Copy this URL!

### Step 7: Update App URL

1. Go to "Site settings"
2. Click "Environment variables"
3. Find `NEXT_PUBLIC_APP_URL`
4. Click "Edit"
5. Replace with your actual Netlify URL
6. Click "Save"

### Step 8: Redeploy

1. Go to "Deploys" tab
2. Click "Trigger deploy"
3. Select "Deploy site"
4. Wait for new deployment

### Step 9: Configure Supabase Redirect URLs

1. Go to your Supabase project
2. Navigate to Authentication → URL Configuration
3. Add these URLs:

**Site URL**:
```
https://your-site-name.netlify.app
```

**Redirect URLs** (add both):
```
https://your-site-name.netlify.app/auth/callback
http://localhost:3000/auth/callback
```

4. Click "Save"

### Step 10: Test Your Deployment! 🎉

1. Visit your Netlify URL
2. Click "Sign Up"
3. Create an account
4. Check your email for confirmation
5. Confirm and login
6. Test all features:
   - [ ] Create a goal
   - [ ] Add a habit
   - [ ] Log exercise
   - [ ] Log meal
   - [ ] Take progress snapshot
   - [ ] Try AI Coach
   - [ ] Test voice features

## 🎨 Customize Your Site

### Change Site Name

1. Site settings → Site details
2. Click "Change site name"
3. Enter new name: `my-life-tracker`
4. Your URL becomes: `https://my-life-tracker.netlify.app`

### Add Custom Domain (Optional)

1. Buy domain from Namecheap, Google Domains, etc.
2. Site settings → Domain management
3. Click "Add custom domain"
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

## 📊 Monitor Your Deployment

### View Logs

1. Go to "Deploys" tab
2. Click on latest deploy
3. View build log for errors

### Check Functions

1. Go to "Functions" tab
2. See AI function invocations
3. View function logs

### Analytics (Optional)

1. Enable Netlify Analytics (paid feature)
2. Or integrate Google Analytics
3. Or use Plausible/Fathom (privacy-friendly)

## 🔄 Continuous Deployment

Now whenever you push to GitHub:

```bash
git add .
git commit -m "Update features"
git push
```

Netlify automatically:
1. Detects the push
2. Builds your app
3. Deploys new version
4. Updates your site

## 🐛 Troubleshooting

### Build Fails

**Check build log for errors**:
1. Go to Deploys → Failed deploy
2. Click "Deploy log"
3. Look for error messages

**Common fixes**:
```bash
# Test build locally first
npm run build

# If successful, push to GitHub
git add .
git commit -m "Fix build"
git push
```

### Environment Variables Not Working

1. Check spelling (case-sensitive!)
2. Ensure `NEXT_PUBLIC_` prefix for client-side vars
3. Redeploy after changing env vars
4. Clear cache: Site settings → Build & deploy → Clear cache

### Functions Timeout

**First request takes 20-30 seconds** (model loading)
- This is normal for Hugging Face models
- Subsequent requests are fast
- Check function logs for details

### 404 Errors

1. Check `netlify.toml` is in root directory
2. Verify redirects are configured
3. Clear cache and redeploy

### Authentication Issues

**"Invalid redirect URL" error**:
1. Add Netlify URL to Supabase redirect URLs
2. Include `/auth/callback` path
3. Wait a few minutes for changes to propagate

## 🎯 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Netlify site created
- [ ] All environment variables added
- [ ] First deployment successful
- [ ] App URL updated
- [ ] Supabase redirect URLs configured
- [ ] Site tested and working
- [ ] Custom domain added (optional)

## 🚀 You're Live!

Congratulations! Your AI-powered Life Tracker is now live! 🎉

**Share your app**:
- Tweet about it
- Share on LinkedIn
- Show friends and family
- Post on Reddit/Product Hunt

## 📞 Need Help?

- **Netlify Docs**: https://docs.netlify.com
- **Netlify Support**: https://answers.netlify.com
- **Community**: Netlify Discord

---

**Total Deployment Time**: ~15 minutes
**Monthly Cost**: $0 💰

Happy deploying! 🚀
