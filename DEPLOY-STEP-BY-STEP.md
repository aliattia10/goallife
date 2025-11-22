# 🎯 DEPLOY TO NETLIFY - STEP BY STEP GUIDE

Your GitHub repo: https://github.com/aliattia10/goallife

## ⚡ FASTEST PATH: Deploy Without API Keys First

You can deploy now and add API keys later!

---

## 📝 STEP-BY-STEP INSTRUCTIONS

### STEP 1: Open Netlify
1. Open your browser
2. Go to: **https://app.netlify.com**
3. If not logged in:
   - Click "Sign up"
   - Choose "Sign up with GitHub"
   - Authorize Netlify

### STEP 2: Import Your Repository
1. You'll see the Netlify dashboard
2. Click the big **"Add new site"** button (top right)
3. Click **"Import an existing project"**
4. Click **"Deploy with GitHub"**
5. You'll see a list of your repositories
6. Find **"goallife"** in the list
7. Click on it

### STEP 3: Configure Build Settings
You should see a configuration page:

**Build settings** (should auto-detect):
- Base directory: (leave empty)
- Build command: `npm run build`
- Publish directory: `.next`
- Functions directory: `netlify/functions`

If these are not filled, enter them manually.

### STEP 4: Add Environment Variables (OPTIONAL - Can Skip for Now)

Click **"Show advanced"** button

Then click **"New variable"** for each:

**Variable 1:**
- Key: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://temp.supabase.co` (temporary)

**Variable 2:**
- Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: `temp-key` (temporary)

**Variable 3:**
- Key: `GROQ_API_KEY`
- Value: `temp-key` (temporary)

**Variable 4:**
- Key: `HUGGING_FACE_API_KEY`
- Value: `temp-key` (temporary)

**Variable 5:**
- Key: `NEXT_PUBLIC_APP_URL`
- Value: `https://lifegoal-ai.netlify.app`

**NOTE**: You can skip this step and add them later!

### STEP 5: Deploy!
1. Click **"Deploy [your-site-name]"** button at the bottom
2. Wait 2-3 minutes
3. You'll see build logs scrolling
4. Wait for "Site is live" message

### STEP 6: Change Site Name to "lifegoal-ai"
1. After deployment, you'll see your site URL (something like `random-name-123.netlify.app`)
2. Click **"Site settings"** (top navigation)
3. Under "Site information", click **"Change site name"**
4. Enter: `lifegoal-ai`
5. Click **"Save"**
6. Your URL is now: **https://lifegoal-ai.netlify.app**

### STEP 7: Update Environment Variables (If You Added Them)
1. Go to **"Site settings"** → **"Environment variables"**
2. Find `NEXT_PUBLIC_APP_URL`
3. Click **"Edit"**
4. Change value to: `https://lifegoal-ai.netlify.app`
5. Click **"Save"**
6. Go to **"Deploys"** tab
7. Click **"Trigger deploy"** → **"Deploy site"**

---

## 🎉 YOUR SITE IS LIVE!

Visit: **https://lifegoal-ai.netlify.app**

The app will work but AI features won't work until you add real API keys.

---

## 🔑 ADDING REAL API KEYS (Do This Later)

### Get Supabase Keys (5 minutes)

1. **Create Supabase Project**:
   - Go to https://supabase.com
   - Click "Start your project"
   - Sign in with GitHub
   - Click "New Project"
   - Name: `lifegoal`
   - Generate strong password (save it!)
   - Choose region closest to you
   - Click "Create new project"
   - Wait ~2 minutes

2. **Run Database Schema**:
   - In Supabase dashboard, click **"SQL Editor"**
   - Click **"New Query"**
   - Open the file `supabase-schema.sql` from your project
   - Copy ALL contents
   - Paste into SQL Editor
   - Click **"Run"** button
   - Wait for "Success" message

3. **Get API Credentials**:
   - Go to **Settings** (gear icon) → **API**
   - Copy these values:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon/public key**: `eyJhbGc...` (long string)

4. **Add to Netlify**:
   - Go to Netlify dashboard
   - Your site → **Site settings** → **Environment variables**
   - Edit `NEXT_PUBLIC_SUPABASE_URL` → paste Project URL
   - Edit `NEXT_PUBLIC_SUPABASE_ANON_KEY` → paste anon key
   - Click **"Save"**

5. **Configure Supabase Redirect URLs**:
   - Back in Supabase: **Authentication** → **URL Configuration**
   - Add these redirect URLs:
     - `https://lifegoal-ai.netlify.app/auth/callback`
     - `http://localhost:3000/auth/callback`
   - Click **"Save"**

### Get Groq API Key (2 minutes)

1. Go to https://console.groq.com
2. Sign up or login
3. Click **"API Keys"** in sidebar
4. Click **"Create API Key"**
5. Name it: `lifegoal-ai`
6. Copy the key (starts with `gsk_`)
7. In Netlify: Edit `GROQ_API_KEY` → paste key

### Get Hugging Face Token (2 minutes)

1. Go to https://huggingface.co
2. Sign up or login
3. Click your profile picture → **Settings**
4. Click **"Access Tokens"**
5. Click **"New token"**
6. Name: `lifegoal-ai`
7. Role: **Read**
8. Click **"Generate"**
9. Copy token (starts with `hf_`)
10. In Netlify: Edit `HUGGING_FACE_API_KEY` → paste token

### Redeploy

1. Go to **Deploys** tab in Netlify
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait 2-3 minutes
4. Done!

---

## ✅ VERIFICATION

Test your deployed app:

1. Visit https://lifegoal-ai.netlify.app
2. Click "Sign Up"
3. Enter email and password
4. Check your email for confirmation
5. Click confirmation link
6. Login and test features:
   - Create a goal
   - Add a habit
   - Log exercise
   - Log meal
   - Try AI Coach (if you added API keys)

---

## 🆘 TROUBLESHOOTING

### Build Failed
- Check build logs in Netlify
- Most common issue: Missing dependencies
- Solution: The `netlify.toml` file should handle this

### Can't Access Site
- Wait a few minutes after deployment
- Clear browser cache
- Try incognito/private mode

### Authentication Not Working
- Make sure you added Supabase redirect URLs
- Check that environment variables are set correctly
- Redeploy after adding variables

### AI Features Not Working
- Make sure you added all API keys
- First request to AI takes 20-30 seconds (model loading)
- Check Netlify function logs for errors

---

## 📞 NEED HELP?

If you get stuck:
1. Check the build logs in Netlify
2. Verify all environment variables are set
3. Make sure Supabase schema was run successfully
4. Try redeploying

---

## 🎯 SUMMARY

**What you did:**
✅ Pushed code to GitHub
✅ Connected GitHub to Netlify
✅ Deployed your app
✅ Changed site name to lifegoal-ai
✅ (Optional) Added API keys for full functionality

**Your live app:**
🌐 https://lifegoal-ai.netlify.app

**Cost:**
💰 $0/month

**Congratulations! Your AI-powered life tracker is live! 🎉**
