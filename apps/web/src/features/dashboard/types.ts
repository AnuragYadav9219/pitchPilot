export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    errors?: unknown;
    timestamp: string;
}

export interface RecentSession {
    conversationId: string;
    title: string;
    type: string;
    score: number | null;
    completedAt: string | null;
}

export interface DashboardResponse {
    totalSessions: number;
    completedSessions: number;
    averageScore: number | null;
    bestScore: number | null;

    averageCommunicationScore: number | null;
    averageClarityScore: number | null;
    averageConfidenceScore: number | null;
    averageRelevanceScore: number | null;

    recentSessions: RecentSession[];
}

export type DashboardApiResponse = ApiResponse<DashboardResponse>;