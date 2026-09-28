import type { EvaluationStatus } from "../evaluation/types";
import type { InterviewDifficulty, InterviewStatus, InterviewType } from "../interview/types";

export interface HistoryItem {
    interviewId: number;
    role: string;
    topics: string | null;

    type: InterviewType;
    difficulty: InterviewDifficulty;
    status: InterviewStatus;

    score: number | null;
    evaluationStatus: EvaluationStatus | null;

    durationMinutes: number | null;

    startedAt: string | null;
    completedAt: string | null;
    createdAt: string;
}

export interface HistoryPage {
    content: HistoryItem[];

    totalElements: number;
    totalPages: number;

    number: number;
    size: number;

    first: boolean;
    last: boolean;
    empty: boolean;
}