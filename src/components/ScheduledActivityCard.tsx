import type { ScheduledActivity, ActivityMood } from '@/types/weekend';
import { formatTimeRange } from '@/utils/time';
import { Clock, Trash2, Edit2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ScheduledActivityCardProps {
  activity: ScheduledActivity;
  onRemove: (scheduledId: string) => void;
  onUpdateMood: (scheduledId: string, mood: ActivityMood) => void;
  onUpdateNotes: (scheduledId: string, notes: string) => void;
  isDragging?: boolean;
}

const moods: ActivityMood[] = ['😊', '🎉', '😌', '🚀', '💪', '🧘'];

export const ScheduledActivityCard = ({
  activity,
  onRemove,
  onUpdateMood,
  onUpdateNotes,
  isDragging,
}: ScheduledActivityCardProps) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(activity.notes || '');

  const handleNotesSubmit = () => {
    onUpdateNotes(activity.scheduledId, notes);
    setIsEditingNotes(false);
  };

  const getTimeBlockColor = () => {
    const hour = parseInt(activity.startTime.split(':')[0]);
    if (hour < 12) return 'time-morning';
    if (hour < 17) return 'time-afternoon';
    if (hour < 21) return 'time-evening';
    return 'time-night';
  };

  return (
    <div
      className={cn(
        "glass-subtle rounded-2xl p-5 relative transition-all group",
        isDragging && "opacity-50 scale-95",
        getTimeBlockColor()
      )}
    >
      <div className="absolute left-3 top-1/2 -translate-y-1/2 cursor-move opacity-20 hover:opacity-50 transition-opacity">
        <GripVertical className="w-5 h-5" />
      </div>
      
      <div className="ml-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activity.icon}</span>
            <div>
              <h4 className="font-semibold text-foreground">{activity.name}</h4>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{formatTimeRange(activity.startTime, activity.endTime)}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onRemove(activity.scheduledId)}
            className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-muted-foreground">Mood:</span>
          <div className="flex gap-1">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => onUpdateMood(activity.scheduledId, mood)}
                className={cn(
                  "text-xl p-1 rounded transition-all",
                  activity.mood === mood
                    ? "bg-[hsl(var(--primary))]/20 scale-110"
                    : "hover:bg-[hsl(var(--muted))] opacity-50"
                )}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {isEditingNotes ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesSubmit}
              onKeyPress={(e) => e.key === 'Enter' && handleNotesSubmit()}
              className="flex-1 px-2 py-1 text-sm rounded bg-background/50 border border-border"
              placeholder="Add notes..."
              autoFocus
            />
          </div>
        ) : (
          <button
            onClick={() => setIsEditingNotes(true)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            <span>{activity.notes || 'Add notes'}</span>
          </button>
        )}
      </div>
    </div>
  );
};