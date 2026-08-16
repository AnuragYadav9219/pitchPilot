import { baseApi } from "@/services/baseApi";

import type {
    ApiResponse,
    Conversation,
    ConversationDetail,
    ConversationMessage,
    CreateConversationRequest,
    SendMessageRequest,
} from "./types";

export const conversationApi =
    baseApi.injectEndpoints({
        endpoints: (builder) => ({
            createConversation:
                builder.mutation<
                    ApiResponse<Conversation>,
                    CreateConversationRequest
                >({
                    query: (body) => ({
                        url: "/api/conversations",
                        method: "POST",
                        body,
                    }),

                    invalidatesTags: [
                        {
                            type: "Conversation",
                            id: "LIST",
                        },
                    ],
                }),

            getConversations:
                builder.query<
                    ApiResponse<Conversation[]>,
                    void
                >({
                    query: () => ({
                        url: "/api/conversations",
                        method: "GET",
                    }),

                    providesTags: (
                        result,
                    ) => {
                        if (!result?.data) {
                            return [
                                {
                                    type: "Conversation" as const,
                                    id: "LIST",
                                },
                            ];
                        }

                        return [
                            {
                                type: "Conversation" as const,
                                id: "LIST",
                            },

                            ...result.data.map(
                                (
                                    conversation: Conversation,
                                ) => ({
                                    type: "Conversation" as const,
                                    id: conversation.id,
                                }),
                            ),
                        ];
                    },
                }),

            getConversation:
                builder.query<
                    ApiResponse<ConversationDetail>,
                    string
                >({
                    query: (
                        conversationId,
                    ) => ({
                        url: `/api/conversations/${conversationId}`,
                        method: "GET",
                    }),

                    providesTags: (
                        _result,
                        _error,
                        conversationId,
                    ) => [
                            {
                                type: "Conversation",
                                id: conversationId,
                            },
                        ],
                }),

            sendMessage:
                builder.mutation<
                    ApiResponse<ConversationMessage>,
                    {
                        conversationId: string;
                        content: string;
                    }
                >({
                    query: ({
                        conversationId,
                        content,
                    }) => ({
                        url: `/api/conversations/${conversationId}/messages`,
                        method: "POST",
                        body: {
                            content,
                        } satisfies SendMessageRequest,
                    }),

                    invalidatesTags: (
                        _result,
                        _error,
                        { conversationId },
                    ) => [
                            {
                                type: "Conversation",
                                id: conversationId,
                            },
                            {
                                type: "Conversation",
                                id: "LIST",
                            },
                        ],
                }),

            archiveConversation:
                builder.mutation<
                    ApiResponse<null>,
                    string
                >({
                    query: (
                        conversationId,
                    ) => ({
                        url: `/api/conversations/${conversationId}`,
                        method: "DELETE",
                    }),

                    invalidatesTags: [
                        {
                            type: "Conversation",
                            id: "LIST",
                        },
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
} = conversationApi;