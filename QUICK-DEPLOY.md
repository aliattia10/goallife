# ⚡ QUICK DEPLOY TO NETLIFY

Your code is already on GitHub! Now deploy in 5 minutes:

## 🌐 Deploy via Netlify Website (FASTEST METHOD)

### Step 1: Go to Netlify
Open: https://app.netlify.com

### Step 2: Import Project
1. Click **"Add new site"**
2. Click **"Import an existing project"**
3. Click **"GitHub"**
4. Find and select **"goallife"** repository
5. Click on it

### Step 3: Configure Build
Settings should auto-detect:
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: `netlify/functions`

### Step 4: Add Environment Variables
Click **"Show advanced"** → **"New variable"**

Add these 5 variables:

```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: [Get from Supabase Settings → API]

Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Get from Supabase Settings → API]

Key: GROQ_API_KEY
Value: [Get from https://console.groq.com]

Key: HUGGING_FACE_API_KEY
Value: [Get from https://huggingface.co/settings/tokens]

Key: NEXT_PUBLIC_APP_URL
Value: https://lifegoal-ai.netlify.app
```

### Step 5: Deploy!
Click **"Deploy site"**

Wait 2-3 minutes...

### Step 6: Change Site Name
1. After deployment, go to **Site settings**
2. Click **"Change site name"**
3. Enter: **lifegoal-ai**
4. Your URL becomes: **https://lifegoal-ai.netlify.app**

### Step 7: Update App URL
1. Go to **Site settings** → **Environment variables**
2. Find `NEXT_PUBLIC_APP_URL`
3. Click **"Edit"**
4. Change to: `https://lifegoal-ai.netlify.app`
5. Save
6. Go to **Deploys** → **Trigger deploy** → **Deploy site**

## 🔑 Get API Keys (If You Don't Have Them)

### Supabase (5 min)
1. Go to https://supabase.com
2. Create project: "lifegoal"
3. Go to SQL Editor
4. Copy contents of `supabase-schema.sql`
5. Paste and run
6. Go to Settings → API
7. Copy Project URL and anon key

### Groq (2 min)
1. Go to https://console.groq.com
2. Sign up/Login
3. API Keys → Create new key
4. Copy key (starts with `gsk_`)

### Hugging Face (2 min)
1. Go to https://huggingface.co
2. Sign up/Login
3. Settings → Access Tokens
4. Create new token
5. Copy token (starts with `hf_`)

## ✅ Final Step: Configure Supabase

After deployment:
1. Go to your Supabase project
2. **Authentication** → **URL Configuration**
3. Add redirect URLs:
   - `https://lifegoal-ai.netlify.app/auth/callback`
   - `http://localhost:3000/auth/callback`
4. Save

## 🎉 DONE!

Visit: **https://lifegoal-ai.netlify.app**

Your AI-powered life tracker is LIVE! 🚀

---

**Total Time**: ~5 minutes
**Cost**: $0/month
