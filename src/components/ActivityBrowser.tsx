import { useState } from 'react';
import { Activity, ActivityCategory } from '@/types/weekend';
import { ActivityCard } from './ActivityCard';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityBrowserProps {
  activities: Activity[];
  onAddActivity: (activity: Activity) => void;
  selectedActivityIds?: string[];
}

const categories: { value: ActivityCategory | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '✨' },
  { value: 'adventure', label: 'Adventure', emoji: '🏔️' },
  { value: 'relaxation', label: 'Relaxation', emoji: '🧘' },
  { value: 'social', label: 'Social', emoji: '👥' },
  { value: 'food', label: 'Food', emoji: '🍽️' },
  { value: 'entertainment', label: 'Entertainment', emoji: '🎭' },
  { value: 'wellness', label: 'Wellness', emoji: '💚' },
];

export const ActivityBrowser = ({
}: ActivityBrowserProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | 'all'>('all');

  

  return (
    <div className="h-full flex flex-col">
      <div className="mb-5">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:font-normal"
          />
        </div>

        
      
      </div>
    </div>
  );
};