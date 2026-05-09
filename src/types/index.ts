// PRD Data Types
export interface UserStory {
  id: string;
  asA: string;
  iWant: string;
  soThat: string;
}

export interface TargetMetric {
  id: string;
  metric: string;
  target: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface TechnicalSpec {
  id: string;
  category: string;
  specification: string;
}

export interface OutOfScope {
  id: string;
  item: string;
}

export interface EdgeCase {
  id: string;
  scenario: string;
  handling: string;
}

export interface PRDData {
  // Step 1: Info
  productName: string;
  productTagline: string;
  targetUsers: string;
  problemStatement: string;

  // Step 2: Problem
  painPoints: string;
  currentSolutions: string;
  opportunities: string;

  // Step 3: Features
  features: Feature[];

  // Step 4: Technical
  userStories: UserStory[];
  targetMetrics: TargetMetric[];
  outOfScope: OutOfScope[];
  edgeCases: EdgeCase[];
  technicalSpecs: TechnicalSpec[];
  successMetrics: string;
}

export type WizardStep = 'info' | 'problem' | 'features' | 'technical';
