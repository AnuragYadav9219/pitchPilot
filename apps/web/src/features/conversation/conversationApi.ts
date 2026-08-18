import { baseApi } from "@/services/baseApi";
import type {
    ApiResponse,
    Conversation,
    ConversationDetail,
    ConversationMessage,
    ConversationPage,
    CreateConversationRequest,
    SendMessageRequest,
    SessionEvaluation,
} from "./types";

export const conversationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // CREATE CONVERSATION
        createConversation: builder.mutation<ApiResponse<Conversation>, CreateConversationRequest>({
            query: (body) => ({
                url: "/api/conversations",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Conversation", id: "LIST" }],
        }),

        // GET CONVERSATIONS
        getConversations: builder.query<ApiResponse<ConversationPage>, { page?: number; size?: number }>({
            query: ({ page = 0, size = 20 }) => ({
                url: "/api/conversations",
                method: "GET",
                params: { page, size },
            }),
            providesTags: (result) => {
                if (!result?.data) {
                    return [{ type: "Conversation", id: "LIST" }];
                }
                return [
                    { type: "Conversation", id: "LIST" },
                    ...result.data.content.map((conversation) => ({
                        type: "Conversation" as const,
                        id: conversation.id,
                    })),
                ];
            },
        }),

        // GET CONVERSATION
        getConversation: builder.query<ApiResponse<ConversationDetail>, string>({
            query: (conversationId) => ({
                url: `/api/conversations/${conversationId}`,
                method: "GET",
            }),
            providesTags: (_result, _error, conversationId) => [
                { type: "Conversation", id: conversationId },
            ],
        }),

        // SEND MESSAGE
        sendMessage: builder.mutation<ApiResponse<ConversationMessage>, { conversationId: string; content: string }>({
            query: ({ conversationId, content }) => ({
                url: `/api/conversations/${conversationId}/messages`,
                method: "POST",
                body: { content } satisfies SendMessageRequest,
            }),
            invalidatesTags: (_result, _error, { conversationId }) => [
                { type: "Conversation", id: conversationId },
                { type: "Conversation", id: "LIST" },
            ],
        }),

        // ARCHIVE CONVERSATION
        archiveConversation: builder.mutation<ApiResponse<null>, string>({
            query: (conversationId) => ({
                url: `/api/conversations/${conversationId}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Conversation", id: "LIST" }],
        }),

        // PERMANENT DELETE CONVERSATION
        deleteConversation: builder.mutation<ApiResponse<null>, string>({
            query: (conversationId) => ({
                url: `/api/conversations/${conversationId}/permanent`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, conversationId) => [
                { type: "Conversation", id: conversationId },
                { type: "Conversation", id: "LIST" },
            ],
        }),

        // GENERATE EVALUATION
        generateEvaluation: builder.mutation<ApiResponse<SessionEvaluation>, string>({
            query: (conversationId) => ({
                url: `/api/conversations/${conversationId}/evaluation`,
                method: "POST",
            }),
            invalidatesTags: (_result, _error, conversationId) => [
                { type: "Evaluation", id: conversationId },
            ],
        }),

        // GET EVALUATION
        getEvaluation: builder.query<ApiResponse<SessionEvaluation>, string>({
            query: (conversationId) => ({
                url: `/api/conversations/${conversationId}/evaluation`,
                method: "GET",
            }),
            providesTags: (_result, _error, conversationId) => [
                { type: "Evaluation", id: conversationId },
            ],
        }),
    }),
});

export const {
    useCreateConversationMutation,
    useGetConversationsQuery,
    useGetConversationQuery,
    useSendMessageMutation,
    useArchiveConversationMutation,
    useDeleteConversationMutation,
    useGenerateEvaluationMutation,
    useGetEvaluationQuery,
} = conversationApi;