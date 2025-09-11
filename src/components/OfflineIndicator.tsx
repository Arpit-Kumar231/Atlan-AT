import { useOffline } from '@/hooks/use-offline';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const isOffline = useOffline();

  if (!isOffline) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
      <WifiOff className="w-4 h-4" />
      <span className="text-sm">Offline</span>
    </div>
  );
}
