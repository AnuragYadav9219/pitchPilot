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