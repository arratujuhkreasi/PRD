import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PRDData, WizardStep, UserStory, TargetMetric, Feature, OutOfScope, EdgeCase, TechnicalSpec } from '@/types';

const generateId = () => Math.random().toString(36).substring(2, 9);

const initialData: PRDData = {
  productName: '',
  productTagline: '',
  targetUsers: '',
  problemStatement: '',
  painPoints: '',
  currentSolutions: '',
  opportunities: '',
  features: [],
  userStories: [],
  targetMetrics: [],
  outOfScope: [],
  edgeCases: [],
  technicalSpecs: [],
  successMetrics: '',
};

interface PRDStore {
  currentStep: WizardStep;
  data: PRDData;
  _hasHydrated: boolean;
  setStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateInfo: (field: keyof PRDData, value: string) => void;
  updateProblem: (field: keyof PRDData, value: string) => void;
  addFeature: () => void;
  updateFeature: (id: string, field: keyof Feature, value: string) => void;
  removeFeature: (id: string) => void;
  addUserStory: () => void;
  updateUserStory: (id: string, field: keyof UserStory, value: string) => void;
  removeUserStory: (id: string) => void;
  addTargetMetric: () => void;
  updateTargetMetric: (id: string, field: keyof TargetMetric, value: string) => void;
  removeTargetMetric: (id: string) => void;
  addOutOfScope: () => void;
  updateOutOfScope: (id: string, value: string) => void;
  removeOutOfScope: (id: string) => void;
  addEdgeCase: () => void;
  updateEdgeCase: (id: string, field: keyof EdgeCase, value: string) => void;
  removeEdgeCase: (id: string) => void;
  addTechnicalSpec: () => void;
  updateTechnicalSpec: (id: string, field: keyof TechnicalSpec, value: string) => void;
  removeTechnicalSpec: (id: string) => void;
  updateSuccessMetrics: (value: string) => void;
  resetAll: () => void;
  setHasHydrated: (state: boolean) => void;
}

const steps: WizardStep[] = ['info', 'problem', 'features', 'technical'];

export const usePRDStore = create<PRDStore>()(
  persist(
    (set, get) => ({
      currentStep: 'info',
      data: initialData,
      _hasHydrated: false,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => {
        const currentIndex = steps.indexOf(get().currentStep);
        if (currentIndex < steps.length - 1) set({ currentStep: steps[currentIndex + 1] });
      },
      prevStep: () => {
        const currentIndex = steps.indexOf(get().currentStep);
        if (currentIndex > 0) set({ currentStep: steps[currentIndex - 1] });
      },

      updateInfo: (field, value) => set((state) => ({ data: { ...state.data, [field]: value } })),
      updateProblem: (field, value) => set((state) => ({ data: { ...state.data, [field]: value } })),

      addFeature: () => set((state) => ({ data: { ...state.data, features: [...state.data.features, { id: generateId(), title: '', description: '', priority: 'medium' as const }] } })),
      updateFeature: (id, field, value) => set((state) => ({ data: { ...state.data, features: state.data.features.map(f => f.id === id ? { ...f, [field]: value } : f) } })),
      removeFeature: (id) => set((state) => ({ data: { ...state.data, features: state.data.features.filter(f => f.id !== id) } })),

      addUserStory: () => set((state) => ({ data: { ...state.data, userStories: [...state.data.userStories, { id: generateId(), asA: '', iWant: '', soThat: '' }] } })),
      updateUserStory: (id, field, value) => set((state) => ({ data: { ...state.data, userStories: state.data.userStories.map(us => us.id === id ? { ...us, [field]: value } : us) } })),
      removeUserStory: (id) => set((state) => ({ data: { ...state.data, userStories: state.data.userStories.filter(us => us.id !== id) } })),

      addTargetMetric: () => set((state) => ({ data: { ...state.data, targetMetrics: [...state.data.targetMetrics, { id: generateId(), metric: '', target: '' }] } })),
      updateTargetMetric: (id, field, value) => set((state) => ({ data: { ...state.data, targetMetrics: state.data.targetMetrics.map(tm => tm.id === id ? { ...tm, [field]: value } : tm) } })),
      removeTargetMetric: (id) => set((state) => ({ data: { ...state.data, targetMetrics: state.data.targetMetrics.filter(tm => tm.id !== id) } })),

      addOutOfScope: () => set((state) => ({ data: { ...state.data, outOfScope: [...state.data.outOfScope, { id: generateId(), item: '' }] } })),
      updateOutOfScope: (id, value) => set((state) => ({ data: { ...state.data, outOfScope: state.data.outOfScope.map(o => o.id === id ? { ...o, item: value } : o) } })),
      removeOutOfScope: (id) => set((state) => ({ data: { ...state.data, outOfScope: state.data.outOfScope.filter(o => o.id !== id) } })),

      addEdgeCase: () => set((state) => ({ data: { ...state.data, edgeCases: [...state.data.edgeCases, { id: generateId(), scenario: '', handling: '' }] } })),
      updateEdgeCase: (id, field, value) => set((state) => ({ data: { ...state.data, edgeCases: state.data.edgeCases.map(ec => ec.id === id ? { ...ec, [field]: value } : ec) } })),
      removeEdgeCase: (id) => set((state) => ({ data: { ...state.data, edgeCases: state.data.edgeCases.filter(ec => ec.id !== id) } })),

      addTechnicalSpec: () => set((state) => ({ data: { ...state.data, technicalSpecs: [...state.data.technicalSpecs, { id: generateId(), category: '', specification: '' }] } })),
      updateTechnicalSpec: (id, field, value) => set((state) => ({ data: { ...state.data, technicalSpecs: state.data.technicalSpecs.map(ts => ts.id === id ? { ...ts, [field]: value } : ts) } })),
      removeTechnicalSpec: (id) => set((state) => ({ data: { ...state.data, technicalSpecs: state.data.technicalSpecs.filter(ts => ts.id !== id) } })),

      updateSuccessMetrics: (value) => set((state) => ({ data: { ...state.data, successMetrics: value } })),
      resetAll: () => set({ currentStep: 'info', data: initialData }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'prd-storage',
      partialize: (state) => ({ currentStep: state.currentStep, data: state.data }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
