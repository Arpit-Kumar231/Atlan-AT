export type ActivityCategory = 
  | 'adventure' 
  | 'relaxation' 
  | 'social' 
  | 'food' 
  | 'entertainment' 
  | 'wellness';

export type ActivityMood = '😊' | '🎉' | '😌' | '🚀' | '💪' | '🧘';

export type WeekendTheme = 'lazy' | 'adventure' | 'social' | 'balanced';

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: ActivityCategory;
  duration: number; // in minutes
  icon: string;
  suggestedTime?: string;
}

export interface ScheduledActivity extends Activity {
  scheduledId: string;
  day: 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  mood?: ActivityMood;
  notes?: string;
}

export interface WeekendPlan {
  id: string;
  name: string;
  theme?: WeekendTheme;
  saturday: ScheduledActivity[];
  sunday: ScheduledActivity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlot {
  time: string;
  display: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
}