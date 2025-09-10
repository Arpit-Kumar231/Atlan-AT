import type { ScheduledActivity, ActivityMood } from '@/types/weekend';
import { ScheduledActivityCard } from './ScheduledActivityCard';
import { Calendar, Sunrise, Sunset } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

interface WeekendScheduleProps {
  saturday: ScheduledActivity[];
  sunday: ScheduledActivity[];
  onRemoveActivity: (day: 'saturday' | 'sunday', scheduledId: string) => void;
  onUpdateMood: (day: 'saturday' | 'sunday', scheduledId: string, mood: ActivityMood) => void;
  onUpdateNotes: (day: 'saturday' | 'sunday', scheduledId: string, notes: string) => void;
  onReorderActivities: (day: 'saturday' | 'sunday', activities: ScheduledActivity[]) => void;
}

export const WeekendSchedule = ({
  saturday,
  sunday,
  onRemoveActivity,
  onUpdateMood,
  onUpdateNotes,
  onReorderActivities,
}: WeekendScheduleProps) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const day = result.source.droppableId as 'saturday' | 'sunday';
    const activities = day === 'saturday' ? [...saturday] : [...sunday];
    
    const [reorderedItem] = activities.splice(result.source.index, 1);
    activities.splice(result.destination.index, 0, reorderedItem);
    
    onReorderActivities(day, activities);
  };

  const renderDaySchedule = (
    day: 'saturday' | 'sunday',
    activities: ScheduledActivity[],
    icon: React.ReactNode
  ) => (
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-[hsl(var(--primary))]/10 rounded-xl">
          {icon}
        </div>
        <h2 className="text-2xl font-display font-bold capitalize">{day}</h2>
        <span className="text-sm text-muted-foreground bg-[hsl(var(--muted))]/50 px-3 py-1 rounded-full">
          {activities.length} {activities.length === 1 ? 'activity' : 'activities'}
        </span>
      </div>
      
      <Droppable droppableId={day}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "space-y-3 min-h-[200px] p-4 rounded-xl transition-colors",
              snapshot.isDraggingOver && "bg-[hsl(var(--muted))]/20"
            )}
          >
            {activities.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No activities scheduled yet</p>
                <p className="text-sm">Add activities from the browser</p>
              </div>
            ) : (
              activities.map((activity, index) => (
                <Draggable
                  key={activity.scheduledId}
                  draggableId={activity.scheduledId}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ScheduledActivityCard
                        activity={activity}
                        onRemove={(id) => onRemoveActivity(day, id)}
                        onUpdateMood={(id, mood) => onUpdateMood(day, id, mood)}
                        onUpdateNotes={(id, notes) => onUpdateNotes(day, id, notes)}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col lg:flex-row gap-6">
        {renderDaySchedule(
          'saturday',
          saturday,
          <Sunrise className="w-5 h-5 text-weekend-social" />
        )}
        {renderDaySchedule(
          'sunday',
          sunday,
          <Sunset className="w-5 h-5 text-weekend-food" />
        )}
      </div>
    </DragDropContext>
  );
};