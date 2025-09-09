import { useState, useEffect } from 'react';

import { AddActivityModal } from '@/components/AddActivityModal';

import { Sparkles, Save, RefreshCw, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WeekendPlanner() {
  const { toast } = useToast();
  const [weekendTheme, setWeekendTheme] = useState<WeekendTheme>('balanced');
  const [saturdayActivities, setSaturdayActivities] = useState<ScheduledActivity[]>([]);
  const [sundayActivities, setSundayActivities] = useState<ScheduledActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planName, setPlanName] = useState('My Perfect Weekend');

 

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="gradient-hero text-white py-8 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-display font-bold flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <Sparkles className="w-8 h-8" />
                </div>
                Weekendly
              </h1>
              <p className="text-white/90 text-lg font-light">Craft your perfect weekend experience</p>
            </div>
            
           
          </div>
        </div>
      </header>

    

        

         

      {selectedActivity && (
        <AddActivityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          activity={selectedActivity}
          existingActivities={{
            saturday: saturdayActivities.map(a => ({ startTime: a.startTime, endTime: a.endTime })),
            sunday: sundayActivities.map(a => ({ startTime: a.startTime, endTime: a.endTime })),
          }}
        />
      )}
    </div>
  );
}