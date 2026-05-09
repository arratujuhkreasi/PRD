'use client';
import { usePRDStore } from '@/store/usePRDStore';
import AIGeneratorStep from '@/components/AIGeneratorStep';

export default function Home() {
  const { _hasHydrated } = usePRDStore();
  
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  
  return <AIGeneratorStep />;
}