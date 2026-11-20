export type Language = 'en' | 'ar';

export interface NavItem {
  id: string;
  label: {
    en: string;
    ar: string;
  };
  href: string;
}

export interface ProjectFeature {
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  status: 'implemented' | 'in_progress' | 'planned';
}

export interface ProjectItem {
  id: string;
  title: { en: string; ar: string };
  tagline: { en: string; ar: string };
  category: { en: string; ar: string };
  year: string;
  role: { en: string; ar: string };
  overview: { en: string; ar: string };
  problemPurpose: { en: string; ar: string };
  architectureDetails: { en: string; ar: string };
  technologies: string[];
  status: {
    badge: { en: string; ar: string };
    type: 'flagship_dev' | 'completed' | 'research';
    note: { en: string; ar: string };
  };
  features: ProjectFeature[];
  githubUrl?: string; // empty or omitted if not publicly available
  liveDemoUrl?: string; // empty or omitted if not deployed
  isFlagship?: boolean;
}

export interface SkillCategory {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  skills: {
    name: string;
    level: { en: string; ar: string };
    highlight?: boolean;
    evidence?: { en: string; ar: string };
  }[];
}

export interface JourneyMilestone {
  period: string;
  title: { en: string; ar: string };
  institution: { en: string; ar: string };
  description: { en: string; ar: string };
  badge: { en: string; ar: string };
  skillsApplied: string[];
}

export interface PhilosophyPrinciple {
  number: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  quote: { en: string; ar: string };
}
