# 🚀 AI-Powered Life Tracker - Complete Transformation System

A comprehensive, AI-powered life tracking application with voice interaction, built entirely on **FREE TIER** services!

## ✨ Features

### Core Tracking
- 🎯 **Goal Management** - Track goals across 6 categories with progress visualization
- ✅ **Habit Tracking** - Build streaks and maintain daily habits
- 💪 **Exercise Logging** - Record workouts with detailed metrics
- 🍎 **Diet Tracking** - Monitor nutrition and macros
- 📊 **Progress Snapshots** - Track body measurements and wellness metrics
- 📈 **Dashboard** - Comprehensive overview with statistics

### AI-Powered Features
- 🤖 **AI Life Coach** - Personalized advice using Llama 3 (via Groq)
- 🎤 **Voice Input** - Record voice notes with speech-to-text (Whisper)
- 🔊 **Voice Output** - AI responses with text-to-speech
- 💬 **Contextual Coaching** - AI analyzes your data for personalized guidance

## 🆓 100% Free Tech Stack

| Service | Purpose | Free Tier Limits |
|---------|---------|------------------|
| **Netlify** | Hosting & Functions | 100GB bandwidth, 300 build minutes/month |
| **Supabase** | Database & Auth | 500MB DB, 50K users, 2GB storage |
| **Groq** | AI Coach (Llama 3) | 14,400 requests/day |
| **Hugging Face** | Speech-to-Text & TTS | Generous free tier |

**Total Monthly Cost: $0** 💰

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- Accounts on: Netlify, Supabase, Groq, Hugging Face (all free!)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd life-tracker-app
npm install
```

### 2. Set Up Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run `supabase-schema.sql`
4. Get your credentials from Settings > API:
   - Project URL
   - Anon/Public Key

### 3. Get API Keys

**Groq (AI Coach):**
1. Sign up at [console.groq.com](https://console.groq.com)
2. Create API key

**Hugging Face (Speech):**
1. Sign up at [huggingface.co](https://huggingface.co)
2. Go to Settings > Access Tokens
3. Create new token

### 4. Configure Environment

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Groq API
GROQ_API_KEY=your-groq-api-key

# Hugging Face API
HUGGING_FACE_API_KEY=your-huggingface-token

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Deploy to Netlify

**Option A: Via Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

**Option B: Via GitHub**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" > "Import from Git"
4. Select your repository
5. Add environment variables in Site Settings
6. Deploy!

## 📁 Project Structure

```
life-tracker-app/
├── app/                      # Next.js 14 App Router
│   ├── (auth)/              # Auth pages (login, register)
│   ├── dashboard/           # Main dashboard
│   ├── goals/               # Goals management
│   ├── habits/              # Habits tracking
│   ├── exercise/            # Exercise logging
│   ├── diet/                # Diet tracking
│   ├── progress/            # Progress snapshots
│   └── ai-coach/            # AI Coach interface
├── components/              # Reusable React components
├── lib/                     # Utilities
│   ├── supabase.ts         # Supabase client & types
│   └── hooks/              # Custom React hooks
├── netlify/
│   └── functions/          # Serverless functions
│       ├── ai-coach.ts     # Groq/Llama 3 integration
│       ├── speech-to-text.ts # Whisper integration
│       └── text-to-speech.ts # TTS integration
├── public/                 # Static assets
├── supabase-schema.sql    # Database schema
├── netlify.toml           # Netlify configuration
└── next.config.js         # Next.js configuration
```

## 🎯 Usage Guide

### Getting Started

1. **Sign Up** - Create account with email
2. **Set Goals** - Define what you want to achieve
3. **Track Habits** - Build daily routines
4. **Log Activities** - Record workouts and meals
5. **Monitor Progress** - Take regular snapshots
6. **Get AI Coaching** - Ask for personalized advice

### AI Coach Features

The AI Coach can help with:
- Goal setting and prioritization
- Habit formation strategies
- Workout planning
- Nutrition advice
- Progress analysis
- Motivation and accountability

**Example prompts:**
- "Help me create a workout plan for weight loss"
- "Why am I not seeing progress on my fitness goals?"
- "Suggest healthy meal ideas based on my diet logs"
- "How can I improve my sleep habits?"

### Voice Features

**Voice Input:**
1. Click microphone icon
2. Speak your message
3. AI transcribes and processes

**Voice Output:**
1. AI responds with text
2. Click speaker icon to hear response
3. Adjust playback speed as needed

## 🔒 Security & Privacy

- **Row Level Security (RLS)** - Users can only access their own data
- **JWT Authentication** - Secure session management via Supabase
- **API Keys Hidden** - Serverless functions keep keys secure
- **HTTPS Only** - All traffic encrypted
- **No Data Sharing** - Your data stays private

## 📊 Database Schema

### Tables
- `goals` - Goal tracking with progress
- `habits` - Habit definitions
- `habit_logs` - Daily habit completions
- `exercise_logs` - Workout records
- `diet_logs` - Meal tracking
- `progress_snapshots` - Body measurements
- `ai_chat_history` - AI conversation history
- `voice_recordings` - Voice note metadata

### Storage
- `voice-recordings` bucket - Audio files

## 🎨 Customization

### Themes
Edit `app/globals.css` to customize colors:
```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  /* Add your colors */
}
```

### AI Personality
Modify system prompt in `netlify/functions/ai-coach.ts`:
```typescript
const systemPrompt = `You are a [your custom personality]...`;
```

## 📈 Monitoring & Analytics

### Supabase Dashboard
- View database usage
- Monitor API requests
- Check authentication logs

### Netlify Dashboard
- Function invocations
- Build logs
- Bandwidth usage

## 🐛 Troubleshooting

### Common Issues

**"Model is loading" error:**
- Hugging Face models need warm-up time
- Wait 20-30 seconds and retry
- Consider using Replicate as alternative

**Supabase RLS errors:**
- Ensure user is authenticated
- Check RLS policies in SQL Editor
- Verify user_id matches auth.uid()

**Netlify function timeout:**
- Functions have 10s timeout on free tier
- Optimize API calls
- Consider upgrading if needed

## 🚀 Performance Tips

1. **Enable Supabase Realtime** for instant updates
2. **Use Next.js Image Optimization** for faster loads
3. **Implement React Query** for better caching
4. **Add Service Worker** for offline support
5. **Use Incremental Static Regeneration** for static pages

## 📦 Deployment Checklist

- [ ] Environment variables set in Netlify
- [ ] Supabase database schema deployed
- [ ] RLS policies enabled
- [ ] Storage bucket created
- [ ] Custom domain configured (optional)
- [ ] Analytics added (optional)

## 🔄 Updates & Maintenance

### Database Migrations
Run new migrations in Supabase SQL Editor:
```sql
-- Add new column example
ALTER TABLE goals ADD COLUMN tags TEXT[];
```

### Function Updates
Edit functions in `netlify/functions/` and push to deploy.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - Use freely for personal or commercial projects

## 🙏 Acknowledgments

- **Supabase** - Amazing open-source Firebase alternative
- **Netlify** - Best-in-class hosting and functions
- **Groq** - Blazing fast LLM inference
- **Hugging Face** - Open-source AI models
- **Meta** - Llama 3 model
- **OpenAI** - Whisper model

## 📞 Support

- 📧 Email: support@yourapp.com
- 💬 Discord: [Join our community]
- 🐦 Twitter: [@yourapp]
- 📖 Docs: [docs.yourapp.com]

---

**Built with ❤️ using 100% free, open-source technologies**

Start your transformation journey today! 🌟
