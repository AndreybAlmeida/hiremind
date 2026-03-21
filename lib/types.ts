export interface RoleSetup {
  companyName: string;
  industry: string;
  companySize: string;
  roleTitle: string;
  department: string;
  location: string;
  workModel: string;
  employmentType: string;
  companyWebsite?: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface DiagnosticSummary {
  roleClarity: "high" | "medium" | "low";
  scopeComplexity: "low" | "medium" | "high";
  hiringRisk: "low" | "moderate" | "high";
  risks: string[];
  insights: string[];
}

export interface InterviewQuestion {
  question: string;
  purpose: string;
}

export interface ScorecardItem {
  competency: string;
  weight: number;
  criteria: string;
  redFlags: string;
}

export interface JobDescriptionOutput {
  companyOverview: string;
  roleMission: string;
  keyResponsibilities: string[];
  expectedOutcomes: string[];
  requiredSkills: string[];
  niceToHaveSkills: string[];
  behavioralTraits: string[];
  teamStructure: string;
  successMetrics: string[];
  salaryRange: string;
  workModel: string;
  employmentType: string;
}

export interface GeneratedOutput {
  jobDescription: JobDescriptionOutput;
  interviewQuestions?: {
    behavioral: InterviewQuestion[];
    technical: InterviewQuestion[];
    culturalFit: InterviewQuestion[];
  };
  hiringScorecard?: ScorecardItem[];
  candidateSuccessProfile: string;
  diagnosticInsights: {
    roleClarity: string;
    scopeComplexity: string;
    hiringRisk: string;
    keyRisks: string[];
    recommendations: string[];
  };
}
