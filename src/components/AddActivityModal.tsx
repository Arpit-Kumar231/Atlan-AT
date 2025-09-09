import { useState } from 'react';
import { Activity } from '@/types/weekend';
import { TimeSelector } from './TimeSelector';
import { addMinutesToTime, isTimeOverlapping } from '@/utils/time';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity;
  onConfirm: (day: 'saturday' | 'sunday', startTime: string) => void;
  existingActivities: {
    saturday: Array<{ startTime: string; endTime: string }>;
    sunday: Array<{ startTime: string; endTime: string }>;
  };
}

export const AddActivityModal = ({
  isOpen,
  onClose,
  activity,
  onConfirm,
  existingActivities,
}: AddActivityModalProps) => {
  const [selectedDay, setSelectedDay] = useState<'saturday' | 'sunday'>('saturday');
  const [selectedTime, setSelectedTime] = useState(activity.suggestedTime || '09:00');

  const getDisabledTimes = (day: 'saturday' | 'sunday'): string[] => {
    const activities = existingActivities[day];
    const disabledTimes: string[] = [];
    
    const proposedEnd = addMinutesToTime(selectedTime, activity.duration);
    
    timeSlots.forEach((slot) => {
      const slotEnd = addMinutesToTime(slot.time, activity.duration);
      
      const hasOverlap = activities.some((existing) =>
        isTimeOverlapping(slot.time, slotEnd, existing.startTime, existing.endTime)
      );
      
      if (hasOverlap) {
        disabledTimes.push(slot.time);
      }
    });
    
    return disabledTimes;
  };

  const handleConfirm = () => {
    onConfirm(selectedDay, selectedTime);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{activity.icon}</span>
            Add {activity.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Select Day</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedDay('saturday')}
                className={cn(
                  "px-4 py-2 rounded-lg transition-all",
                  selectedDay === 'saturday'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Saturday
              </button>
              <button
                onClick={() => setSelectedDay('sunday')}
                className={cn(
                  "px-4 py-2 rounded-lg transition-all",
                  selectedDay === 'sunday'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Sunday
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              <Clock className="w-4 h-4 inline mr-1" />
              Start Time ({activity.duration} minutes)
            </label>
            <TimeSelector
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              disabledTimes={getDisabledTimes(selectedDay)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            Add to Schedule
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import { timeSlots } from '@/data/timeSlots';