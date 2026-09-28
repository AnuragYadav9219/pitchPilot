export interface EvaluationQuestion {
    id: string;
    questionNumber: number;
    question: string;
    userAnswer: string;
    score: number;
    feedback: string;
}

export type EvaluationStatus =
    | "PENDING"
    | "EVALUATING"
    | "COMPLETED"
    | "FAILED";

export interface Evaluation {
    id: string;
    interviewId: number;
    status: "PENDING" | "EVALUATING" | "COMPLETED" | "FAILED";

    overallScore: number | null;
    technicalScore: number | null;
    communicationScore: number | null;
    problemSolvingScore: number | null;
    confidenceScore: number | null;

    summary: string | null;

    strengths: string[];
    areasToImprove: string[];
    recommendations: string[];

    questions: EvaluationQuestion[];

    createdAt: string;
    completedAt: string | null;
}