export type ConversationType =
    | "GENERAL"
    | "INTERVIEW"
    | "ROLEPLAY"
    | "CAREER"
    | "CODING"
    | "LEARNING";

export type MessageRole =
    | "USER"
    | "ASSISTANT"
    | "SYSTEM";

export type EvaluationStatus =
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: unknown;
    timestamp: string;
}

export interface ConversationMessage {
    id: string;
    role: MessageRole;
    content: string;
    model?: string | null;
    createdAt: string;
}

export interface Conversation {
    id: string;
    title: string | null;
    type: ConversationType;
    archived: boolean;
    lastMessageAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ConversationPage {
    content: Conversation[];

    page: number;
    size: number;

    totalElements: number;
    totalPages: number;

    first: boolean;
    last: boolean;
}

export interface ConversationDetail {
    conversation: Conversation;
    messages: ConversationMessage[];
}

export interface CreateConversationRequest {
    type: ConversationType;
    title?: string;
}

export interface SendMessageRequest {
    content: string;
}

export interface SessionEvaluation {
    id: string;
    conversationId: string;

    status: EvaluationStatus;

    overallScore: number | null;
    communicationScore: number | null;
    clarityScore: number | null;
    confidenceScore: number | null;
    relevanceScore: number | null;

    strengths: string[];
    improvements: string[];

    recommendation: string | null;
    evaluatorFeedback: string | null;

    createdAt: string;
    completedAt: string | null;
}