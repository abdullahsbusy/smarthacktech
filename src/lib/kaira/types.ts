export type ChatMessage = { role: "user" | "assistant"; content: string };

export type Blueprint = {
  projectName?: string;
  summary?: string;
  architecture?: { layer: string; tech: string; note: string }[];
  stack?: { frontend?: string; backend?: string; database?: string; ai?: string; infrastructure?: string };
  security?: string[];
  scalability?: string[];
  estimation?: {
    complexityScore?: number;
    complexityLabel?: string;
    timeline?: string;
    teamSize?: string;
    budgetRange?: string;
    phases?: { name: string; weeks: string; focus: string }[];
    risks?: string[];
  };
  proposal?: {
    overview?: string;
    scope?: string[];
    deliverables?: string[];
    nextSteps?: string[];
  };
};

export type AuditResult = {
  url?: string;
  verdict?: string;
  scores?: {
    performance?: number | null;
    accessibility?: number | null;
    seo?: number | null;
    bestPractices?: number | null;
  };
  metrics?: {
    lcp?: string;
    fcp?: string;
    tbt?: string;
    cls?: string;
    si?: string;
  };
  recommendations?: { area: string; text: string }[];
  issues?: { title: string }[];
};

export type LeadPayload = {
  _hp?: string;
  name: string;
  email: string;
  company?: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  context?: string;
};
