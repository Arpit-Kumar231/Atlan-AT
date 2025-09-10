import { useState, useEffect } from 'react';
import { Activity, ScheduledActivity, WeekendTheme, ActivityMood } from '@/types/weekend';
import { activities } from '@/data/activities';
import { ActivityBrowser } from '@/components/ActivityBrowser';
import { WeekendSchedule } from '@/components/WeekendSchedule';
import { ThemeSelector } from '@/components/ThemeSelector';
import { AddActivityModal } from '@/components/AddActivityModal';
import { ShareModal } from '@/components/ShareModal';
import { addMinutesToTime } from '@/utils/time';
import { saveWeekendPlan } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Save, RefreshCw, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WeekendPlanner() {
  const { toast } = useToast();
  const [weekendTheme, setWeekendTheme] = useState<WeekendTheme>('balanced');
  const [saturdayActivities, setSaturdayActivities] = useState<ScheduledActivity[]>([]);
  const [sundayActivities, setSundayActivities] = useState<ScheduledActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [planName, setPlanName] = useState('My Perfect Weekend');

  useEffect(() => {
    const savedPlan = localStorage.getItem('weekendly_current_plan');
    if (savedPlan) {
      try {
        const plan = JSON.parse(savedPlan);
        setSaturdayActivities(plan.saturday || []);
        setSundayActivities(plan.sunday || []);
        setWeekendTheme(plan.theme || 'balanced');
        setPlanName(plan.name || 'My Perfect Weekend');
      } catch (error) {
        console.error('Failed to load saved plan:', error);
      }
    }
  }, []);

  useEffect(() => {
    const currentPlan = {
      name: planName,
      theme: weekendTheme,
      saturday: saturdayActivities,
      sunday: sundayActivities,
    };
    localStorage.setItem('weekendly_current_plan', JSON.stringify(currentPlan));
  }, [planName, weekendTheme, saturdayActivities, sundayActivities]);

  const handleAddActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleConfirmAdd = (day: 'saturday' | 'sunday', startTime: string) => {
    if (!selectedActivity) return;

    const scheduledActivity: ScheduledActivity = {
      ...selectedActivity,
      scheduledId: `${selectedActivity.id}-${Date.now()}`,
      day,
      startTime,
      endTime: addMinutesToTime(startTime, selectedActivity.duration),
    };

    if (day === 'saturday') {
      setSaturdayActivities([...saturdayActivities, scheduledActivity].sort(
        (a, b) => a.startTime.localeCompare(b.startTime)
      ));
    } else {
      setSundayActivities([...sundayActivities, scheduledActivity].sort(
        (a, b) => a.startTime.localeCompare(b.startTime)
      ));
    }

    toast({
      title: 'Activity added!',
      description: `${selectedActivity.name} scheduled for ${day}`,
    });
  };

  const handleRemoveActivity = (day: 'saturday' | 'sunday', scheduledId: string) => {
    if (day === 'saturday') {
      setSaturdayActivities(saturdayActivities.filter(a => a.scheduledId !== scheduledId));
    } else {
      setSundayActivities(sundayActivities.filter(a => a.scheduledId !== scheduledId));
    }
  };

  const handleUpdateMood = (day: 'saturday' | 'sunday', scheduledId: string, mood: ActivityMood) => {
    const updateActivities = (activities: ScheduledActivity[]) =>
      activities.map(a => a.scheduledId === scheduledId ? { ...a, mood } : a);

    if (day === 'saturday') {
      setSaturdayActivities(updateActivities(saturdayActivities));
    } else {
      setSundayActivities(updateActivities(sundayActivities));
    }
  };

  const handleUpdateNotes = (day: 'saturday' | 'sunday', scheduledId: string, notes: string) => {
    const updateActivities = (activities: ScheduledActivity[]) =>
      activities.map(a => a.scheduledId === scheduledId ? { ...a, notes } : a);

    if (day === 'saturday') {
      setSaturdayActivities(updateActivities(saturdayActivities));
    } else {
      setSundayActivities(updateActivities(sundayActivities));
    }
  };

  const handleReorderActivities = (day: 'saturday' | 'sunday', activities: ScheduledActivity[]) => {
    if (day === 'saturday') {
      setSaturdayActivities(activities);
    } else {
      setSundayActivities(activities);
    }
  };

  const handleSavePlan = () => {
    const plan = {
      id: Date.now().toString(),
      name: planName,
      theme: weekendTheme,
      saturday: saturdayActivities,
      sunday: sundayActivities,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    saveWeekendPlan(plan);
    toast({
      title: 'Weekend saved!',
      description: 'Your perfect weekend plan has been saved',
    });
  };

  const handleReset = () => {
    setSaturdayActivities([]);
    setSundayActivities([]);
    setWeekendTheme('balanced');
    toast({
      title: 'Plan reset',
    });
  };

  const getThemeBasedActivities = () => {
    if (weekendTheme === 'lazy') {
      return activities.filter(a => ['relaxation', 'food', 'entertainment'].includes(a.category));
    }
    if (weekendTheme === 'adventure') {
      return activities.filter(a => ['adventure', 'wellness'].includes(a.category));
    }
    if (weekendTheme === 'social') {
      return activities.filter(a => ['social', 'food', 'entertainment'].includes(a.category));
    }
    return activities;
  };

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
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center gap-2 font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center gap-2 font-medium"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleSavePlan}
                className="px-5 py-2.5 rounded-xl bg-white  text-black text-primary hover:bg-white/95 transition-all flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Save className="w-4 h-4" />
                Save Plan
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 py-10">
        <div className="mb-10 space-y-8">
          <div className="text-center">
            <label className="text-sm font-medium text-muted-foreground block mb-3 uppercase tracking-wider">
              Weekend Plan Name
            </label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="text-3xl font-display font-bold bg-transparent border-b-2 border-primary/30 focus:border-primary outline-none pb-3 transition-all text-center w-full max-w-md mx-auto"
              placeholder="Name your adventure..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-4 text-center uppercase tracking-wider">
              Choose Your Weekend Vibe
            </label>
            <ThemeSelector
              selectedTheme={weekendTheme}
              onSelectTheme={setWeekendTheme}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          <div className="glass rounded-3xl p-6 h-[700px] shadow-xl flex flex-col">
            <h2 className="text-xl font-display font-semibold mb-5 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              Activity Library
            </h2>
            <div className="flex-1 overflow-hidden">
              <ActivityBrowser
                activities={getThemeBasedActivities()}
                onAddActivity={handleAddActivity}
                selectedActivityIds={[
                  ...saturdayActivities.map(a => a.id),
                  ...sundayActivities.map(a => a.id),
                ]}
              />
            </div>
          </div>

          <div className="glass rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
              <span className="text-2xl">📅</span>
              Your Weekend Timeline
            </h2>
            <WeekendSchedule
              saturday={saturdayActivities}
              sunday={sundayActivities}
              onRemoveActivity={handleRemoveActivity}
              onUpdateMood={handleUpdateMood}
              onUpdateNotes={handleUpdateNotes}
              onReorderActivities={handleReorderActivities}
            />
          </div>
        </div>
      </div>

      {selectedActivity && (
        <AddActivityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          activity={selectedActivity}
          onConfirm={handleConfirmAdd}
          existingActivities={{
            saturday: saturdayActivities.map(a => ({ startTime: a.startTime, endTime: a.endTime })),
            sunday: sundayActivities.map(a => ({ startTime: a.startTime, endTime: a.endTime })),
          }}
        />
      )}

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        planName={planName}
        theme={weekendTheme}
        saturday={saturdayActivities}
        sunday={sundayActivities}
      />
    </div>
  );
}