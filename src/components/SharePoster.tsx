import { ScheduledActivity, WeekendTheme } from '@/types/weekend';
import { Calendar, MapPin, Clock, Sparkles } from 'lucide-react';

interface SharePosterProps {
  planName: string;
  theme: WeekendTheme;
  saturday: ScheduledActivity[];
  sunday: ScheduledActivity[];
}

const themeEmojis = {
  lazy: '😌',
  adventure: '🚀',
  social: '🎉',
  balanced: '✨'
};

const themeColors = {
  lazy: 'from-purple-600 to-pink-600',
  adventure: 'from-orange-500 to-red-600',
  social: 'from-blue-500 to-purple-600',
  balanced: 'from-purple-600 to-indigo-600'
};

export function SharePoster({ planName, theme, saturday, sunday }: SharePosterProps) {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const renderDayActivities = (activities: ScheduledActivity[], dayName: string) => (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">
        {dayName}
      </h3>
      {activities.length > 0 ? (
        <div className="space-y-2">
          {activities.map((activity) => (
            <div key={activity.scheduledId} className="flex gap-3 items-start">
              <div className="text-sm font-medium text-purple-700 whitespace-nowrap">
                {formatTime(activity.startTime)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{activity.icon}</span>
                  <span className="font-medium text-gray-800">{activity.name}</span>
                  {activity.mood && <span>{activity.mood}</span>}
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-sm">No activities planned</p>
      )}
    </div>
  );

  return (
    <div 
      id="weekend-poster" 
      className="bg-white rounded-2xl overflow-hidden"
      style={{ width: '794px', minHeight: '1123px', padding: '0' }}
    >
      <div className={`bg-gradient-to-br ${themeColors[theme]} px-12 py-10 text-white relative`}>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">{themeEmojis[theme]}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">{planName}</h1>
          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Weekend Plan</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm capitalize">{theme} Weekend</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-10">
        <div className="grid grid-cols-2 gap-12">
          <div>
            {renderDayActivities(saturday, '🌅 Saturday')}
          </div>
          <div>
            {renderDayActivities(sunday, '🌇 Sunday')}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}