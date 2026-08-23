import { useCallback, useEffect, useRef, useState } from "react";
import {
    useCreateConversationMutation,
    useGetConversationQuery,
    useSendMessageMutation,
} from "@/features/conversation/conversationApi";
import type {
    Conversation,
    ConversationMessage,
    ConversationType,
} from "@/features/conversation/types";

interface UsePracticeSessionOptions {
    title: string;
    type: ConversationType;
    conversationId?: string;
}

interface ApiError {
    status?: number | string;
    data?: {
        message?: string;
    };
}

export function usePracticeSession({
    title,
    type,
    conversationId: existingConversationId,
}: UsePracticeSessionOptions) {

    const [createConversation, { isLoading: isCreatingMutation }] = useCreateConversationMutation();

    const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

    const {
        data: existingResponse,
        isLoading: isLoadingExisting,
        isFetching: isFetchingExisting,
        error: existingError,
    } = useGetConversationQuery(existingConversationId ?? "", {
        skip: !existingConversationId,
    });

    const [conversationId, setConversationId] = useState<string | null>(
        existingConversationId ?? null
    );
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<ConversationMessage[]>([]);
    const [isCreatingNew, setIsCreatingNew] = useState(!existingConversationId);
    const [error, setError] = useState<string | null>(null);

    // Track mounted state safely
    const mountedRef = useRef(true);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    /* ========================================================= */
    /* LOAD EXISTING CONVERSATION                                */
    /* ========================================================= */

    useEffect(() => {
        if (!existingConversationId) return;

        setConversationId(existingConversationId);
        setIsCreatingNew(false);

        if (existingResponse?.data) {
            setConversation(existingResponse.data.conversation);
            setMessages(existingResponse.data.messages ?? []);
            setError(null);
        }
    }, [existingConversationId, existingResponse]);

    useEffect(() => {
        if (!existingConversationId || !existingError) return;

        console.error("Failed to load conversation:", existingError);
        setError(getConversationError(existingError));
        setIsCreatingNew(false);
    }, [existingConversationId, existingError]);

    const hasCreatedRef = useRef(false);

    useEffect(() => {
        if (existingConversationId || hasCreatedRef.current) return;
        hasCreatedRef.current = true;

        setIsCreatingNew(true);
        setError(null);

        createConversation({ title, type })
            .unwrap()
            .then((response) => {
                if (!mountedRef.current) return;

                const id = response.data?.id;
                if (!id) throw new Error("Conversation ID was not returned.");

                setConversationId(id);
                setMessages([]);
                setError(null);
            })
            .catch((err) => {
                if (!mountedRef.current) return;

                console.error("Conversation creation failed:", err);
                setError(getConversationError(err));
            })
            .finally(() => {
                if (mountedRef.current) {
                    setIsCreatingNew(false);
                }
            });
    }, [existingConversationId, title, type, createConversation]);

    /* ========================================================= */
    /* SEND MESSAGE                                              */
    /* ========================================================= */

    const send = useCallback(
        async (content: string) => {
            const trimmed = content.trim();
            if (!trimmed) return;

            if (!conversationId) {
                setError(
                    "Your practice session is still starting. Please wait a moment."
                );
                return;
            }

            setError(null);

            const temporaryMessage: ConversationMessage = {
                id: `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                role: "USER",
                content: trimmed,
                model: null,
                createdAt: new Date().toISOString(),
            };

            setMessages((current) => [...current, temporaryMessage]);

            try {
                const response = await sendMessage({
                    conversationId,
                    content: trimmed,
                }).unwrap();

                const assistantMessage = response.data;

                if (assistantMessage) {
                    setMessages((current) => [...current, assistantMessage]);
                }
            } catch (err) {
                console.error("Failed to send message:", err);

                // Rollback optimistic update
                setMessages((current) =>
                    current.filter((msg) => msg.id !== temporaryMessage.id)
                );
                setError(getMessageError(err));
            }
        },
        [conversationId, sendMessage]
    );

    const isLoading = existingConversationId
        ? isLoadingExisting || isFetchingExisting
        : isCreatingNew || isCreatingMutation;

    return {
        conversationId,
        conversation,
        messages,
        isLoading,
        isCreating: isCreatingNew,
        isSendingMessage,
        error,
        send,
    };
}

function parseApiError(error: unknown): ApiError | null {
    return typeof error === "object" && error !== null ? (error as ApiError) : null;
}

function getConversationError(error: unknown): string {
    const apiError = parseApiError(error);
    if (apiError?.data?.message) return apiError.data.message;

    const status = apiError?.status;
    if (status === 401 || status === "401") {
        return "Your session has expired. Please sign in again.";
    }
    if (status === 404 || status === "404") {
        return "This practice session could not be found.";
    }
    return "Unable to load the practice session.";
}

function getMessageError(error: unknown): string {
    const apiError = parseApiError(error);
    if (apiError?.data?.message) return apiError.data.message;

    if (apiError?.status === 401 || apiError?.status === "401") {
        return "Your session has expired. Please sign in again.";
    }
    return "Unable to send your message.";
}