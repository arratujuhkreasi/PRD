'use client';
import { usePRDStore } from '@/store/usePRDStore';
import { WizardStep } from '@/types';

const steps: { id: WizardStep; label: string; icon: string }[] = [
  { id: 'info', label: 'Type', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16' },
  { id: 'problem', label: 'Problem', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { id: 'features', label: 'Features', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { id: 'technical', label: 'Technical', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
];

export default function ProgressIndicator({ currentStep }: { currentStep: WizardStep }) {
  const currentIndex = steps.findIndex(s => s.id === currentStep);
  
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500" 
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }} 
          />
        </div>
        
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;
            const colors = [
              'from-blue-600 to-blue-700', 
              'from-orange-600 to-red-600', 
              'from-purple-600 to-pink-600', 
              'from-cyan-600 to-blue-600'
            ];
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isCompleted 
                      ? `bg-gradient-to-br ${colors[index]} text-white shadow-md` 
                      : isActive 
                      ? `bg-gradient-to-br ${colors[index]} text-white shadow-lg scale-110` 
                      : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                    </svg>
                  )}
                </div>
                <span 
                  className={`mt-3 text-sm font-semibold transition-colors ${
                    isActive 
                      ? 'text-blue-600' 
                      : isCompleted 
                      ? 'text-emerald-600' 
                      : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}