-- Life Tracker Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Goals table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('health', 'fitness', 'career', 'finance', 'personal', 'education')),
  title TEXT NOT NULL,
  description TEXT,
  target_value NUMERIC,
  current_value NUMERIC DEFAULT 0,
  unit TEXT,
  deadline DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habits table
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'custom')),
  target_days INTEGER,
  streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habit logs table
CREATE TABLE habit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT TRUE,
  notes TEXT,
  log_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(habit_id, log_date)
);

-- Exercise logs table
CREATE TABLE exercise_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exercise_type TEXT NOT NULL,
  duration INTEGER,
  calories_burned NUMERIC,
  distance NUMERIC,
  sets INTEGER,
  reps INTEGER,
  weight NUMERIC,
  notes TEXT,
  log_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Diet logs table
CREATE TABLE diet_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  food_name TEXT NOT NULL,
  calories NUMERIC,
  protein NUMERIC,
  carbs NUMERIC,
  fats NUMERIC,
  portion_size TEXT,
  notes TEXT,
  log_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress snapshots table
CREATE TABLE progress_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  weight NUMERIC,
  body_fat_percentage NUMERIC,
  muscle_mass NUMERIC,
  measurements JSONB,
  mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 10),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  sleep_hours NUMERIC,
  notes TEXT,
  snapshot_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Chat history table
CREATE TABLE ai_chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  context JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Voice recordings table (metadata only, audio stored in Supabase Storage)
CREATE TABLE voice_recordings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  storage_path TEXT NOT NULL,
  transcription TEXT,
  duration NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_status ON goals(status);
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_habit_logs_habit_id ON habit_logs(habit_id);
CREATE INDEX idx_habit_logs_date ON habit_logs(log_date);
CREATE INDEX idx_exercise_logs_user_id ON exercise_logs(user_id);
CREATE INDEX idx_exercise_logs_date ON exercise_logs(log_date);
CREATE INDEX idx_diet_logs_user_id ON diet_logs(user_id);
CREATE INDEX idx_diet_logs_date ON diet_logs(log_date);
CREATE INDEX idx_progress_snapshots_user_id ON progress_snapshots(user_id);
CREATE INDEX idx_progress_snapshots_date ON progress_snapshots(snapshot_date);
CREATE INDEX idx_ai_chat_user_id ON ai_chat_history(user_id);
CREATE INDEX idx_voice_recordings_user_id ON voice_recordings(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE diet_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_recordings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Goals
CREATE POLICY "Users can view their own goals" ON goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own goals" ON goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own goals" ON goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own goals" ON goals FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Habits
CREATE POLICY "Users can view their own habits" ON habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own habits" ON habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own habits" ON habits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own habits" ON habits FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Habit Logs
CREATE POLICY "Users can view their habit logs" ON habit_logs FOR SELECT 
  USING (EXISTS (SELECT 1 FROM habits WHERE habits.id = habit_logs.habit_id AND habits.user_id = auth.uid()));
CREATE POLICY "Users can insert their habit logs" ON habit_logs FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM habits WHERE habits.id = habit_logs.habit_id AND habits.user_id = auth.uid()));
CREATE POLICY "Users can update their habit logs" ON habit_logs FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM habits WHERE habits.id = habit_logs.habit_id AND habits.user_id = auth.uid()));
CREATE POLICY "Users can delete their habit logs" ON habit_logs FOR DELETE 
  USING (EXISTS (SELECT 1 FROM habits WHERE habits.id = habit_logs.habit_id AND habits.user_id = auth.uid()));

-- RLS Policies for Exercise Logs
CREATE POLICY "Users can view their own exercise logs" ON exercise_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own exercise logs" ON exercise_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own exercise logs" ON exercise_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own exercise logs" ON exercise_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Diet Logs
CREATE POLICY "Users can view their own diet logs" ON diet_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own diet logs" ON diet_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own diet logs" ON diet_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own diet logs" ON diet_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Progress Snapshots
CREATE POLICY "Users can view their own progress snapshots" ON progress_snapshots FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress snapshots" ON progress_snapshots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress snapshots" ON progress_snapshots FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own progress snapshots" ON progress_snapshots FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for AI Chat History
CREATE POLICY "Users can view their own chat history" ON ai_chat_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own chat history" ON ai_chat_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own chat history" ON ai_chat_history FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Voice Recordings
CREATE POLICY "Users can view their own voice recordings" ON voice_recordings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own voice recordings" ON voice_recordings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own voice recordings" ON voice_recordings FOR DELETE USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for goals table
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update habit streak
CREATE OR REPLACE FUNCTION update_habit_streak()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.completed = TRUE THEN
    UPDATE habits 
    SET streak = streak + 1,
        best_streak = GREATEST(best_streak, streak + 1)
    WHERE id = NEW.habit_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for habit logs
CREATE TRIGGER update_streak_on_log AFTER INSERT ON habit_logs
  FOR EACH ROW EXECUTE FUNCTION update_habit_streak();

-- Create storage bucket for voice recordings
INSERT INTO storage.buckets (id, name, public) 
VALUES ('voice-recordings', 'voice-recordings', false)
ON CONFLICT DO NOTHING;

-- Storage policy for voice recordings
CREATE POLICY "Users can upload their own voice recordings"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'voice-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own voice recordings"
ON storage.objects FOR SELECT
USING (bucket_id = 'voice-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own voice recordings"
ON storage.objects FOR DELETE
USING (bucket_id = 'voice-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);
