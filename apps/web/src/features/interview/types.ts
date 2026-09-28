export type InterviewType =
    | "TECHNICAL"
    | "HR"
    | "BEHAVIORAL"
    | "SYSTEM_DESIGN"
    | "PRESENTATION"
    | "MIXED";

export type InterviewDifficulty =
    | "EASY"
    | "MEDIUM"
    | "HARD";

export type InterviewStatus =
    | "CREATED"
    | "CREDIT_RESERVED"
    | "STARTING"
    | "IN_PROGRESS"
    | "COMPLETING"
    | "EVALUATING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED"
    | "ABANDONED";

export type ConnectionStatus =
    | "idle"
    | "creating-session"
    | "connecting"
    | "connected"
    | "error"
    | "stopped";

export interface TranscriptMessage {
    id: string;
    speaker: "assistant" | "user";
    text: string;
    timestamp: number;
}

export interface StartInterviewRequest {
    role: string;
    type: InterviewType;
    difficulty: InterviewDifficulty;
    topics?: string;
    durationMinutes: number;
}

export interface Interview {
    id: number;
    type: InterviewType;
    difficulty: InterviewDifficulty;
    status: InterviewStatus;
    role: string;
    topics?: string;
    durationMinutes: number;
    voiceProvider?: string;
    startedAt?: string;
    completedAt?: string;
    createdAt: string;
}

export interface VoiceSessionResponse {
    interviewId: number;
    provider: string;
    model: string;
    connectionType: string;
    accessToken: string;
    expiresAt: string;
}

/* ============================================================= */
/* SCENARIO                                                      */
/* ============================================================= */

export type ScenarioCategory =
    | "TECHNICAL"
    | "BEHAVIORAL"
    | "HR"
    | "SYSTEM_DESIGN"
    | "LEADERSHIP"
    | "PRESENTATION";

export type ScenarioDifficulty =
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED";

export interface Scenario {
    id: string;

    title: string;

    description: string;

    category: ScenarioCategory;

    difficulty: ScenarioDifficulty;

    estimatedMinutes: number;

    focus: string;

    tags: string[];

    interviewType: InterviewType;

    interviewDifficulty: InterviewDifficulty;
}