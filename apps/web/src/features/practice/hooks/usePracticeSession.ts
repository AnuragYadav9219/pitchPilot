import { useCallback, useEffect, useRef, useState } from "react";
import {
    useCreateConversationMutation,
    useGetConversationQuery,
    useSendMessageMutation,
} from "@/features/conversation/conversationApi";
import type {
    ConversationMessage,
    ConversationType,
} from "@/features/conversation/types";

/* ============================================================= */
/* TYPES */
/* ============================================================= */

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

/* ============================================================= */
/* HOOK */
/* ============================================================= */

export function usePracticeSession({
    title,
    type,
    conversationId: existingConversationId,
}: UsePracticeSessionOptions) {
    /* API Mutations & Queries */
    const [createConversation] = useCreateConversationMutation();
    const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

    const {
        data: existingResponse,
        isLoading: isLoadingExisting,
        isFetching: isFetchingExisting,
        error: existingError,
    } = useGetConversationQuery(existingConversationId ?? "", {
        skip: !existingConversationId,
    });

    /* State */
    const [conversationId, setConversationId] = useState<string | null>(
        existingConversationId ?? null
    );
    const [messages, setMessages] = useState<ConversationMessage[]>([]);
    const [isCreating, setIsCreating] = useState(!existingConversationId);
    const [error, setError] = useState<string | null>(null);

    // Prevent duplicate creation requests
    const creationKeyRef = useRef<string | null>(null);

    /* ========================================================= */
    /* EXISTING CONVERSATION — LOAD */
    /* ========================================================= */

    useEffect(() => {
        if (!existingConversationId || !existingResponse?.data) {
            return;
        }

        const conversation = existingResponse.data.conversation;
        const loadedMessages = existingResponse.data.messages ?? [];

        console.log("Existing conversation loaded:", {
            conversation,
            messages: loadedMessages,
        });

        setConversationId(conversation.id);
        setMessages(loadedMessages);
        setError(null);
        setIsCreating(false);
    }, [existingConversationId, existingResponse]);

    /* ========================================================= */
    /* EXISTING CONVERSATION — ERROR */
    /* ========================================================= */

    useEffect(() => {
        if (!existingConversationId || !existingError) {
            return;
        }

        console.error("Failed to load conversation:", existingError);
        setError(getConversationError(existingError));
        setIsCreating(false);
    }, [existingConversationId, existingError]);

    /* ========================================================= */
    /* CREATE NEW CONVERSATION */
    /* ========================================================= */

    useEffect(() => {
        if (existingConversationId) {
            setIsCreating(false);
            return;
        }

        const key = `${type}:${title}`;
        if (creationKeyRef.current === key) {
            return;
        }
        creationKeyRef.current = key;

        let cancelled = false;

        async function create() {
            try {
                setIsCreating(true);
                setError(null);

                console.log("Creating NEW conversation:", { title, type });

                const response = await createConversation({
                    title,
                    type,
                }).unwrap();

                if (cancelled) return;

                const id = response.data?.id;
                if (!id) {
                    throw new Error("Conversation ID was not returned.");
                }

                console.log("NEW conversation created:", id);

                setConversationId(id);
                setMessages([]);
                setIsCreating(false);
            } catch (err) {
                if (cancelled) return;

                console.error("Conversation creation failed:", err);
                setConversationId(null);
                setError(getConversationError(err));
                setIsCreating(false);
            }
        }

        void create();

        return () => {
            cancelled = true;
        };
    }, [existingConversationId, title, type, createConversation]);

    /* ========================================================= */
    /* SEND MESSAGE */
    /* ========================================================= */

    const send = useCallback(
        async (content: string) => {
            const trimmed = content.trim();

            if (!conversationId) {
                setError("Your practice session is still starting. Please wait a moment.");
                return;
            }

            if (!trimmed) return;

            setError(null);

            const temporaryMessage: ConversationMessage = {
                id: `temp-${Date.now()}`,
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

                if (response.data) {
                    setMessages((current) => [...current, response.data]);
                }
            } catch (err) {
                console.error("Failed to send message:", err);

                setMessages((current) =>
                    current.filter((message) => message.id !== temporaryMessage.id)
                );

                setError(getMessageError(err));
            }
        },
        [conversationId, sendMessage]
    );

    /* ========================================================= */
    /* LOADING & RETURN */
    /* ========================================================= */

    const isLoading = Boolean(existingConversationId)
        ? isLoadingExisting || isFetchingExisting
        : isCreating;

    return {
        conversationId,
        messages,
        isLoading,
        isSendingMessage,
        error,
        send,
    };
}

/* ============================================================= */
/* ERRORS */
/* ============================================================= */

function parseApiError(error: unknown): ApiError | null {
    if (typeof error === "object" && error !== null) {
        return error as ApiError;
    }
    return null;
}

function getConversationError(error: unknown): string {
    const apiError = parseApiError(error);

    if (apiError?.data?.message) return apiError.data.message;
    if (apiError?.status === 401) return "Your session has expired. Please sign in again.";
    if (apiError?.status === 404) return "This practice session could not be found.";

    return "Unable to load the practice session.";
}

function getMessageError(error: unknown): string {
    const apiError = parseApiError(error);

    if (apiError?.data?.message) return apiError.data.message;
    if (apiError?.status === 401) return "Your session has expired. Please sign in again.";

    return "Unable to send your message.";
}