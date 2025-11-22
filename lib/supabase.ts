import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Goal {
  id: string;
  user_id: string;
  category: 'health' | 'fitness' | 'career' | 'finance' | 'personal' | 'education';
  title: string;
  description?: string;
  target_value?: number;
  current_value: number;
  unit?: string;
  deadline?: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  target_days?: number;
  streak: number;
  best_streak: number;
  created_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  completed: boolean;
  notes?: string;
  log_date: string;
  created_at: string;
}

export interface ExerciseLog {
  id: string;
  user_id: string;
  exercise_type: string;
  duration?: number;
  calories_burned?: number;
  distance?: number;
  sets?: number;
  reps?: number;
  weight?: number;
  notes?: string;
  log_date: string;
  created_at: string;
}

export interface DietLog {
  id: string;
  user_id: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food_name: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  portion_size?: string;
  notes?: string;
  log_date: string;
  created_at: string;
}

export interface ProgressSnapshot {
  id: string;
  user_id: string;
  weight?: number;
  body_fat_percentage?: number;
  muscle_mass?: number;
  measurements?: any;
  mood_rating?: number;
  energy_level?: number;
  sleep_hours?: number;
  notes?: string;
  snapshot_date: string;
  created_at: string;
}

export interface AIChatMessage {
  id: string;
  user_id: string;
  message: string;
  response: string;
  context?: any;
  created_at: string;
}
