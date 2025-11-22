# 🚀 DEPLOY YOUR APP NOW - ONE CLICK!

## ✅ Your Repository is Ready!

**GitHub Repository**: https://github.com/aliattia10/goallife

## 🌐 DEPLOY TO NETLIFY (Click This Link)

### **STEP 1: Click this link to start deployment**

👉 **https://app.netlify.com/start/deploy?repository=https://github.com/aliattia10/goallife**

This will:
- Connect your GitHub repo automatically
- Set up the build configuration
- Prepare for deployment

---

## 📋 STEP 2: Configure Build Settings

When you click the link above, Netlify will ask you to:

1. **Authorize Netlify** to access your GitHub (if not already done)

2. **Save & Deploy** - Click this button

3. **Build Settings** (should auto-detect):
   - Build command: `npm run build`
   - Publish directory: `.next`

---

## 🔑 STEP 3: Add Environment Variables

After the first deploy (it will fail without env vars), go to:

**Site settings → Environment variables → Add variables**

Add these 5 variables:

### Variable 1: Supabase URL
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project.supabase.co
```

### Variable 2: Supabase Key
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Variable 3: Groq API Key
```
Key: GROQ_API_KEY
Value: gsk_...
```

### Variable 4: Hugging Face Key
```
Key: HUGGING_FACE_API_KEY
Value: hf_...
```

### Variable 5: App URL
```
Key: NEXT_PUBLIC_APP_URL
Value: https://lifegoal-ai.netlify.app
```

---

## 🔄 STEP 4: Redeploy

After adding environment variables:

1. Go to **Deploys** tab
2. Click **Trigger deploy**
3. Select **Deploy site**

---

## 🎯 STEP 5: Change Site Name

1. Go to **Site settings**
2. Click **Site details**
3. Click **Change site name**
4. Enter: `lifegoal-ai`
5. Your URL becomes: **https://lifegoal-ai.netlify.app**

---

## 🔑 WHERE TO GET API KEYS

### Supabase
1. https://supabase.com → Create project
2. SQL Editor → Run `supabase-schema.sql`
3. Settings → API → Copy URL and anon key

### Groq
1. https://console.groq.com
2. API Keys → Create new key

### Hugging Face
1. https://huggingface.co/settings/tokens
2. Create new token

---

## ✅ FINAL STEP

After deployment, configure Supabase:

1. Go to Supabase project
2. Authentication → URL Configuration
3. Add redirect URLs:
   - `https://lifegoal-ai.netlify.app/auth/callback`
   - `http://localhost:3000/auth/callback`

---

## 🎉 YOU'RE LIVE!

Visit: **https://lifegoal-ai.netlify.app**

---

## 🆘 ALTERNATIVE METHOD

If the one-click link doesn't work:

1. Go to: https://app.netlify.com
2. Click "Add new site"
3. Click "Import an existing project"
4. Choose "GitHub"
5. Select "goallife" repository
6. Follow steps 2-5 above

---

**Total Time**: 10 minutes
**Cost**: $0/month

🚀 **START HERE**: https://app.netlify.com/start/deploy?repository=https://github.com/aliattia10/goallife
