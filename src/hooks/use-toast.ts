import { useState, useEffect } from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

type Toast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

let toastId = 0;
const toasts: Toast[] = [];
const listeners = new Set<(toasts: Toast[]) => void>();

function createToast(props: Omit<Toast, "id">): Toast {
  const id = (++toastId).toString();
  return {
    ...props,
    id,
    open: true,
    onOpenChange: (open) => {
      if (!open) {
        dismissToast(id);
      }
    },
  };
}

function addToast(toast: Toast) {
  toasts.unshift(toast);
  if (toasts.length > 1) {
    toasts.pop();
  }
  notifyListeners();
}

function dismissToast(id?: string) {
  if (id) {
    const index = toasts.findIndex(t => t.id === id);
    if (index > -1) {
      toasts[index] = { ...toasts[index], open: false };
      setTimeout(() => {
        toasts.splice(index, 1);
        notifyListeners();
      }, 1000);
    }
  } else {
    toasts.forEach(toast => {
      toast.open = false;
    });
    setTimeout(() => {
      toasts.length = 0;
      notifyListeners();
    }, 1000);
  }
  notifyListeners();
}

function updateToast(id: string, updates: Partial<Toast>) {
  const index = toasts.findIndex(t => t.id === id);
  if (index > -1) {
    toasts[index] = { ...toasts[index], ...updates };
    notifyListeners();
  }
}

function notifyListeners() {
  listeners.forEach(listener => listener([...toasts]));
}

export function toast(props: Omit<Toast, "id">) {
  const newToast = createToast(props);
  addToast(newToast);
  
  return {
    id: newToast.id,
    dismiss: () => dismissToast(newToast.id),
    update: (updates: Partial<Toast>) => updateToast(newToast.id, updates),
  };
}

export function useToast() {
  const [state, setState] = useState<Toast[]>([]);

  useEffect(() => {
    listeners.add(setState);
    setState([...toasts]);
    
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    toasts: state,
    toast,
    dismiss: dismissToast,
  };
}
