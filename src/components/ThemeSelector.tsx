import { WeekendTheme } from '@/types/weekend';
import { cn } from '@/lib/utils';
import { Sparkles, Coffee, Users, Target } from 'lucide-react';

interface ThemeSelectorProps {
  selectedTheme?: WeekendTheme;
  onSelectTheme: (theme: WeekendTheme) => void;
}

const themes = [
  {
    id: 'lazy' as WeekendTheme,
    name: 'Lazy Weekend',
    description: 'Rest & recharge',
    icon: Coffee,
    gradient: 'gradient-soft',
  },
  {
    id: 'adventure' as WeekendTheme,
    name: 'Adventure Mode',
    description: 'Explore & thrill',
    icon: Sparkles,
    gradient: 'gradient-hero',
  },
  {
    id: 'social' as WeekendTheme,
    name: 'Social Butterfly',
    description: 'Connect & celebrate',
    icon: Users,
    gradient: 'gradient-morning',
  },
  {
    id: 'balanced' as WeekendTheme,
    name: 'Balanced Blend',
    description: 'Perfect harmony',
    icon: Target,
    gradient: 'gradient-evening',
  },
];

export const ThemeSelector = ({ selectedTheme, onSelectTheme }: ThemeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {themes.map((theme) => {
        const Icon = theme.icon;
        return (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme.id)}
            className={cn(
              "p-5 rounded-2xl transition-all hover-lift group",
              "border-2 relative overflow-hidden",
              selectedTheme === theme.id
                ? "border-[hsl(var(--primary))] shadow-colored bg-[hsl(var(--primary))]/5"
                : "border-[hsl(var(--border))]/50 glass-subtle hover:border-[hsl(var(--primary))]/40"
            )}
          >
            <div
              className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-3 mx-auto transition-transform group-hover:scale-110",
                theme.gradient
              )}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-display font-semibold text-sm mb-1">{theme.name}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{theme.description}</p>
          </button>
        );
      })}
    </div>
  );
};