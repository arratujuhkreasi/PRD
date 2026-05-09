'use client';
import { usePRDStore } from '@/store/usePRDStore';
import ProgressIndicator from '@/components/ProgressIndicator';
import InfoStep from '@/components/InfoStep';
import ProblemStep from '@/components/ProblemStep';
import FeaturesStep from '@/components/FeaturesStep';
import TechnicalStep from '@/components/TechnicalStep';
import MarkdownPreview from '@/components/MarkdownPreview';
import ExportButtons from '@/components/ExportButtons';
import { useRouter } from 'next/navigation';

export default function WizardPage() {
  const { currentStep, nextStep, prevStep, resetAll, _hasHydrated } = usePRDStore();
  const router = useRouter();
  
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
  
  const renderStep = () => {
    switch (currentStep) {
      case 'info': return <InfoStep />;
      case 'problem': return <ProblemStep />;
      case 'features': return <FeaturesStep />;
      case 'technical': return <TechnicalStep />;
      default: return <InfoStep />;
    }
  };
  
  const isFirst = currentStep === 'info';
  const isLast = currentStep === 'technical';
  const stepLabels = { info: 1, problem: 2, features: 3, technical: 4 };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/')}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PRD Generator</h1>
                <p className="text-xs text-gray-500 font-medium">Step-by-step wizard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ExportButtons />
              <button onClick={resetAll} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Reset">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <ProgressIndicator currentStep={currentStep} />
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            <div className="p-8">
              {renderStep()}
            </div>
            
            <div className="px-8 pb-8">
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button 
                  onClick={prevStep} 
                  disabled={isFirst} 
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                    isFirst 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-100 active:scale-95'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
                
                <span className="text-sm text-gray-500 font-semibold">Step {stepLabels[currentStep]} of 4</span>
                
                <button 
                  onClick={nextStep} 
                  disabled={isLast} 
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${
                    isLast 
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                  }`}
                >
                  {isLast ? (
                    <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Done</>
                  ) : (
                    <>Next <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="hidden xl:block">
            <div className="sticky top-28">
              <MarkdownPreview />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-gray-200 bg-white/70 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
            <p className="font-medium">Built with PRD Generator</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> 
                Auto-save aktif
              </span>
              <span className="text-gray-300">|</span>
              <span>100% Client-side</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}