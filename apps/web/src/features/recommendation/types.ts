export interface RecommendationResponse {
    available: boolean;
    targetSkill: string | null;
    currentScore: number | null;
    reason: string;
}