import { Activity } from '@/types/weekend';
import { Clock, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
  onAdd?: (activity: Activity) => void;
  isSelected?: boolean;
}

export const ActivityCard = ({ activity, onAdd, isSelected }: ActivityCardProps) => {
  const categoryColors = {
    adventure: 'category-adventure',
    relaxation: 'category-relaxation', 
    social: 'category-social',
    food: 'category-food',
    entertainment: 'category-entertainment',
    wellness: 'category-wellness',
  };

  return (
    <div
      className={cn(
        "glass-subtle rounded-2xl p-5 hover-lift cursor-pointer transition-all",
        "border-2 relative overflow-hidden group",
        isSelected ? "border-primary shadow-colored" : "border-transparent hover:border-primary/30"
      )}
      onClick={() => onAdd?.(activity)}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl group-hover:scale-110 transition-transform">{activity.icon}</span>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium tracking-wide",
            categoryColors[activity.category]
          )}
        >
          {activity.category}
        </span>
      </div>
      
      <h3 className="font-display font-semibold text-foreground mb-2">{activity.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{activity.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-medium">{activity.duration} min</span>
        </div>
        {onAdd && (
          <button
            className={cn(
              "p-2 rounded-xl transition-all",
              "bg-primary/10 hover:bg-primary/20 text-primary",
              "hover:shadow-md transform hover:scale-105"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(activity);
            }}
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};