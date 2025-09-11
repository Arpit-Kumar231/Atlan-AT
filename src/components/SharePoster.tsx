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



export function SharePoster({ planName, theme, saturday, sunday }: SharePosterProps) {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const renderDayActivities = (activities: ScheduledActivity[], dayName: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: 'bold', 
        color: '#1f2937',
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '8px',
        margin: '0'
      }}>
        {dayName}
      </h3>
      {activities.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {activities.map((activity) => (
            <div key={activity.scheduledId} style={{ 
              display: 'flex', 
              gap: '12px', 
              alignItems: 'flex-start' 
            }}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#7c3aed',
                whiteSpace: 'nowrap',
                minWidth: '80px'
              }}>
                {formatTime(activity.startTime)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px' 
                }}>
                  <span style={{ fontSize: '18px' }}>{activity.icon}</span>
                  <span style={{ 
                    fontWeight: '500', 
                    color: '#1f2937' 
                  }}>
                    {activity.name}
                  </span>
                  {activity.mood && <span>{activity.mood}</span>}
                </div>
                <p style={{ 
                  fontSize: '12px', 
                  color: '#4b5563', 
                  marginTop: '2px',
                  margin: '2px 0 0 0'
                }}>
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ 
          color: '#6b7280', 
          fontStyle: 'italic', 
          fontSize: '14px',
          margin: '0'
        }}>
          No activities planned
        </p>
      )}
    </div>
  );

  const getGradientStyle = (theme: WeekendTheme) => {
    const gradients = {
      lazy: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
      adventure: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
      social: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
      balanced: 'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)'
    };
    return gradients[theme];
  };

  return (
    <div 
      id="weekend-poster" 
      style={{ 
        width: '794px', 
        minHeight: '1123px', 
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div style={{
        background: getGradientStyle(theme),
        padding: '40px 48px',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '16px' 
          }}>
            <span style={{ fontSize: '36px' }}>{themeEmojis[theme]}</span>
          </div>
          
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>
            {planName}
          </h1>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '14px' }}>📅</span>
              <span style={{ fontSize: '14px' }}>Weekend Plan</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '14px' }}>📍</span>
              <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>{theme} Weekend</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '40px 48px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '48px' 
        }}>
          <div>
            {renderDayActivities(saturday, '🌅 Saturday')}
          </div>
          <div>
            {renderDayActivities(sunday, '🌇 Sunday')}
          </div>
        </div>

        <div style={{ 
          marginTop: '32px', 
          paddingTop: '24px', 
          borderTop: '1px solid #e5e7eb' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end' 
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}>
              <span style={{ fontSize: '12px' }}>🕐</span>
              <span style={{ 
                fontSize: '12px', 
                color: '#6b7280' 
              }}>
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}