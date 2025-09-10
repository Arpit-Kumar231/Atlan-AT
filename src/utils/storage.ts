import { WeekendPlan } from '@/types/weekend';

const STORAGE_KEY = 'weekendly_plans';

export const saveWeekendPlan = (plan: WeekendPlan): void => {
  const existingPlans = getWeekendPlans();
  const updatedPlans = existingPlans.filter(p => p.id !== plan.id);
  updatedPlans.unshift(plan);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlans));
};

export const getWeekendPlans = (): WeekendPlan[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    const plans = JSON.parse(stored);
    return plans.map((plan: any) => ({
      ...plan,
      createdAt: new Date(plan.createdAt),
      updatedAt: new Date(plan.updatedAt),
    }));
  } catch {
    return [];
  }
};

export const getWeekendPlan = (id: string): WeekendPlan | null => {
  const plans = getWeekendPlans();
  return plans.find(p => p.id === id) || null;
};

export const deleteWeekendPlan = (id: string): void => {
  const plans = getWeekendPlans();
  const updatedPlans = plans.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlans));
};