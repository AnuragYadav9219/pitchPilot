export interface JobSearchRequest {
    query: string;
    location: string;
}

export interface SkillDemand {
    skill: string;
    jobCount: number;
    percentage: number;
}

export interface CareerAiAnalysis {
    summary: string;
    prioritySkills: string[];
    interviewTopics: string[];
    preparationPlan: string[];
}

export interface CareerAnalysisResponse {
    role: string;
    location: string;
    jobsAnalyzed: number;
    marketSkills: SkillDemand[];
    topCompanies: string[];
    topLocations: string[];
    aiAnalysis: CareerAiAnalysis;
}

export interface JobApplyOption {
    title: string;
    link: string;
}

export interface JobHighlight {
    title: string;
    items: string[];
}

export interface JobResult {
    jobId: string;
    title: string;
    companyName: string;
    location: string;
    description: string;
    via: string;
    shareLink: string;
    highlights: JobHighlight[];
    skills: string[];
    applyOptions: JobApplyOption[];
}

export interface JobSearchRequest {
    query: string;
    location: string;
}

export interface JobSearchResponse {
    query: string;
    location: string;
    totalResults: number;
    jobs: JobResult[];
}