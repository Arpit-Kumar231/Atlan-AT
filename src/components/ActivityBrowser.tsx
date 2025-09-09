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
  activities,
  onAddActivity,
  selectedActivityIds = [],
}: ActivityBrowserProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | 'all'>('all');

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105",
                  selectedCategory === cat.value
                    ? "bg-primary text-primary-foreground shadow-colored"
                    : "bg-muted/50 hover:bg-muted/80"
                )}
              >
                <span className="mr-1.5 text-base">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid gap-3 pr-2">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onAdd={onAddActivity}
              isSelected={selectedActivityIds.includes(activity.id)}
            />
          ))}
        </div>
        
        {filteredActivities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No activities found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};