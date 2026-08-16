import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useCreateConversationMutation,
    useSendMessageMutation,
} from "@/features/conversation/conversationApi";

import type {
    ConversationMessage,
    ConversationType,
} from "@/features/conversation/types";

interface UsePracticeSessionOptions {
    title: string;
    type: ConversationType;
}

export function usePracticeSession({
    title,
    type,
}: UsePracticeSessionOptions) {
    const [
        createConversation,
    ] = useCreateConversationMutation();

    const [
        sendMessage,
        {
            isLoading: isSendingMessage,
        },
    ] = useSendMessageMutation();

    const [
        conversationId,
        setConversationId,
    ] = useState<string | null>(null);

    const [
        messages,
        setMessages,
    ] = useState<ConversationMessage[]>([]);

    const [
        isLoading,
        setIsLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState<string | null>(null);

    /*
     * Keeps the initialization request alive
     * across React StrictMode's effect cleanup/re-run.
     */
    const initializationPromiseRef =
        useRef<Promise<string> | null>(null);

    const initializationKeyRef =
        useRef<string>("");

    /*
     * =========================================================
     * CREATE CONVERSATION
     * =========================================================
     */
    useEffect(() => {
        const initializationKey =
            `${type}:${title}`;

        /*
         * If this exact scenario is already being
         * initialized, don't create another conversation.
         */
        if (
            initializationKeyRef.current ===
            initializationKey &&
            initializationPromiseRef.current
        ) {
            return;
        }

        /*
         * New scenario.
         */
        initializationKeyRef.current =
            initializationKey;

        setConversationId(null);
        setMessages([]);
        setError(null);
        setIsLoading(true);

        const initializeConversation =
            async (): Promise<string> => {
                console.log(
                    "Creating conversation:",
                    {
                        title,
                        type,
                    },
                );

                const response =
                    await createConversation({
                        title,
                        type,
                    }).unwrap();

                console.log(
                    "Conversation created:",
                    response,
                );

                const id =
                    response.data?.id;

                if (!id) {
                    throw new Error(
                        "Conversation was created but no conversation ID was returned.",
                    );
                }

                return id;
            };

        /*
         * Create ONE shared promise.
         *
         * React StrictMode may execute this effect
         * more than once, but both executions can
         * use the same promise.
         */
        const promise =
            initializationPromiseRef.current ??
            initializeConversation();

        initializationPromiseRef.current =
            promise;

        promise
            .then((id) => {
                console.log(
                    "Practice session ready:",
                    id,
                );

                setConversationId(id);
                setIsLoading(false);
                setError(null);
            })
            .catch((err) => {
                console.error(
                    "Failed to create conversation:",
                    err,
                );

                setConversationId(null);

                setError(
                    getConversationError(err),
                );

                setIsLoading(false);
            });

        /*
         * IMPORTANT:
         *
         * Do NOT set initializationPromiseRef.current
         * to null during cleanup.
         *
         * React StrictMode would otherwise create
         * another conversation.
         */
    }, [
        title,
        type,
        createConversation,
    ]);

    /*
     * =========================================================
     * SEND MESSAGE
     * =========================================================
     */
    const send = useCallback(
        async (content: string) => {
            const trimmedContent =
                content.trim();

            /*
             * Session is still starting.
             */
            if (!conversationId) {
                setError(
                    "Your practice session is still starting. Please wait a moment and try again.",
                );

                return;
            }

            /*
             * Empty message.
             */
            if (!trimmedContent) {
                return;
            }

            setError(null);

            /*
             * Optimistically show the user's message.
             */
            const temporaryUserMessage:
                ConversationMessage = {
                id: `temp-user-${Date.now()}`,
                role: "USER",
                content: trimmedContent,
                model: null,
                createdAt:
                    new Date().toISOString(),
            };

            setMessages(
                (current) => [
                    ...current,
                    temporaryUserMessage,
                ],
            );

            try {
                console.log(
                    "Sending message:",
                    {
                        conversationId,
                        content:
                            trimmedContent,
                    },
                );

                const response =
                    await sendMessage({
                        conversationId,
                        content:
                            trimmedContent,
                    }).unwrap();

                console.log(
                    "Message response:",
                    response,
                );

                /*
                 * Backend returns the assistant
                 * MessageResponse.
                 */
                if (response.data) {
                    setMessages(
                        (current) => [
                            ...current,
                            response.data,
                        ],
                    );
                }
            } catch (err) {
                console.error(
                    "Failed to send message:",
                    err,
                );

                /*
                 * Remove optimistic user message
                 * when the request fails.
                 */
                setMessages(
                    (current) =>
                        current.filter(
                            (message) =>
                                message.id !==
                                temporaryUserMessage.id,
                        ),
                );

                setError(
                    getMessageError(err),
                );
            }
        },
        [
            conversationId,
            sendMessage,
        ],
    );

    return {
        messages,
        isLoading,
        isSendingMessage,
        error,
        send,
        conversationId,
    };
}

/*
 * =========================================================
 * ERROR HELPERS
 * =========================================================
 */

function getConversationError(
    error: unknown,
): string {
    if (
        typeof error === "object" &&
        error !== null
    ) {
        const apiError =
            error as {
                status?: number | string;
                data?: {
                    message?: string;
                };
            };

        if (
            apiError.data?.message
        ) {
            return apiError.data.message;
        }

        if (
            apiError.status === 401
        ) {
            return "Your session has expired. Please sign in again.";
        }

        if (
            apiError.status === 400
        ) {
            return "Unable to create this practice session. Please try again.";
        }
    }

    return "Unable to start the practice session. Please try again.";
}

function getMessageError(
    error: unknown,
): string {
    if (
        typeof error === "object" &&
        error !== null
    ) {
        const apiError =
            error as {
                status?: number | string;
                data?: {
                    message?: string;
                };
            };

        if (
            apiError.data?.message
        ) {
            return apiError.data.message;
        }

        if (
            apiError.status === 401
        ) {
            return "Your session has expired. Please sign in again.";
        }
    }

    return "Unable to send your message. Please try again.";
}