import type { ApiResponse } from "@/services/types";

export interface ProgressScoreSummary {
    current: number | null;
    previous: number | null;
    change: number | null;
}

export interface ProgressSkillScores {
    communication: number | null;
    clarity: number | null;
    confidence: number | null;
    relevance: number | null;
}

export interface ProgressTrendPoint {
    sessionNumber: number;
    score: number | null;
    completedAt: string | null;
}

export interface ProgressSkillInsight {
    name: string;
    score: number | null;
}

export interface ProgressResponse {
    overall: ProgressScoreSummary;
    skills: ProgressSkillScores;
    trend: ProgressTrendPoint[];
    strongestSkill: ProgressSkillInsight | null;
    needsAttention: ProgressSkillInsight | null;
}

export type ProgressApiResponse = ApiResponse<ProgressResponse>;