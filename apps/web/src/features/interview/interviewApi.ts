import { baseApi } from "@/services/baseApi";
import type { ApiResponse } from "@/types/types";

import type {
    Interview,
    StartInterviewRequest,
    VoiceSessionResponse,
} from "./types";

/* ============================================================
   CONVERSATION TYPES
============================================================ */

export type ConversationRole = "USER" | "ASSISTANT";

export interface ConversationMessage {
    id: string;
    interviewId: number;
    role: ConversationRole;
    content: string;
    sequenceNumber: number;
    createdAt: string;
}

export interface SaveConversationMessageRequest {
    role: ConversationRole;
    content: string;
}

/* ============================================================
   INTERVIEW API
============================================================ */

export const interviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* =================================================
           CREATE INTERVIEW
        ================================================= */
        createInterview: builder.mutation<ApiResponse<Interview>, StartInterviewRequest>({
            query: (body) => ({
                url: "/api/interviews",
                method: "POST",
                body,
            }),
            invalidatesTags: [
                { type: "Interview", id: "LIST" },
                { type: "Subscription", id: "ME" },
                { type: "Credits", id: "BALANCE" },
            ],
        }),

        /* =================================================
           COMPLETE INTERVIEW
        ================================================= */
        completeInterview: builder.mutation<ApiResponse<Interview>, number>({
            query: (interviewId) => ({
                url: `/api/interviews/${interviewId}/complete`,
                method: "PATCH",
            }),
            invalidatesTags: (_, __, interviewId) => [
                { type: "Interview", id: interviewId },
                { type: "Interview", id: "LIST" },

                // Completion may consume reserved credits.
                { type: "Subscription", id: "ME" },
                { type: "Credits", id: "BALANCE" },
            ],
        }),

        /* =================================================
           GET INTERVIEWS
        ================================================= */
        getInterviews: builder.query<ApiResponse<Interview[]>, void>({
            query: () => ({
                url: "/api/interviews",
                method: "GET",
            }),
            providesTags: [{ type: "Interview", id: "LIST" }],
        }),

        /* =================================================
           CREATE VOICE SESSION
        ================================================= */
        createVoiceSession: builder.mutation<ApiResponse<VoiceSessionResponse>, number>({
            query: (interviewId) => ({
                url: `/api/interviews/${interviewId}/voice/session`,
                method: "POST",
            }),
        }),

        /* =================================================
           GET PERSISTED CONVERSATION
        ================================================= */
        getConversationMessages: builder.query<ApiResponse<ConversationMessage[]>, number>({
            query: (interviewId) => ({
                url: `/api/interviews/${interviewId}/messages`,
                method: "GET",
            }),
            providesTags: (_result, _error, interviewId) => [
                { type: "Conversation", id: interviewId },
            ],
        }),

        /* =================================================
           SAVE PERSISTED MESSAGE
        ================================================= */
        saveConversationMessage: builder.mutation<
            ApiResponse<ConversationMessage>,
            {
                interviewId: number;
                body: SaveConversationMessageRequest;
            }
        >({
            query: ({ interviewId, body }) => ({
                url: `/api/interviews/${interviewId}/messages`,
                method: "POST",
                body: {
                    role: body.role,
                    content: body.content,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: (_, __, { interviewId }) => [
                { type: "Conversation", id: interviewId },
            ],
        }),
    }),
});

/* ============================================================
   HOOKS
============================================================ */

export const {
    useCreateInterviewMutation,
    useCompleteInterviewMutation,
    useGetInterviewsQuery,
    useCreateVoiceSessionMutation,
    useGetConversationMessagesQuery,
    useSaveConversationMessageMutation,
} = interviewApi;