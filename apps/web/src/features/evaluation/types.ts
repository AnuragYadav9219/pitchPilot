export interface EvaluationSummary {
    conversationId: string;
    conversationTitle: string;
    conversationType: string;

    overallScore: number | null;

    communicationScore: number | null;
    clarityScore: number | null;
    confidenceScore: number | null;
    relevanceScore: number | null;

    completedAt: string;
}

export interface EvaluationPage {
    content: EvaluationSummary[];

    page: number;
    size: number;

    totalElements: number;
    totalPages: number;

    first: boolean;
    last: boolean;
}