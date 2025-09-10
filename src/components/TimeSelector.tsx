import { timeSlots } from '@/data/timeSlots';
import { cn } from '@/lib/utils';

interface TimeSelectorProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
  disabledTimes?: string[];
}

export const TimeSelector = ({
  selectedTime,
  onSelectTime,
  disabledTimes = [],
}: TimeSelectorProps) => {
  return (
    <div className="max-h-60 overflow-y-auto">
      <div className="grid grid-cols-3 gap-2 p-2">
        {timeSlots.map((slot) => {
          const isDisabled = disabledTimes.includes(slot.time);
          const periodColors = {
            morning: 'hover:bg-time-morning/20',
            afternoon: 'hover:bg-time-afternoon/20',
            evening: 'hover:bg-time-evening/20',
            night: 'hover:bg-time-night/20',
          };

          return (
            <button
              key={slot.time}
              onClick={() => !isDisabled && onSelectTime(slot.time)}
              disabled={isDisabled}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                selectedTime === slot.time
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-md"
                  : periodColors[slot.period],
                isDisabled && "opacity-30 cursor-not-allowed"
              )}
            >
              {slot.display}
            </button>
          );
        })}
      </div>
    </div>
  );
};