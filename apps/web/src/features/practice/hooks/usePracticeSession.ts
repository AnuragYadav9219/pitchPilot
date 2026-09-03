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
import type { InterviewMode } from "@virtualmentor/shared";

interface UsePracticeSessionOptions {
  title: string;
  type: ConversationType;
  mode: InterviewMode;
  conversationId?: string;
}

interface ApiError {
  status?: number | string;
  data?: {
    success?: boolean;
    message?: string;
    errors?: string;
    timestamp?: string;
  };
}

export function usePracticeSession({
  title,
  type,
  mode,
  conversationId: existingConversationId,
}: UsePracticeSessionOptions) {
  const [createConversation, { isLoading: isCreatingMutation }] =
    useCreateConversationMutation();
  const [sendMessage, { isLoading: isSendingMessage }] =
    useSendMessageMutation();

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
  const [subscriptionLimitReached, setSubscriptionLimitReached] =
    useState(false);

  const mountedRef = useRef(true);
  const hasCreatedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Sync existing conversation state when fetching succeeds or fails
  useEffect(() => {
    if (!existingConversationId) return;

    setConversationId(existingConversationId);
    setIsCreatingNew(false);

    if (existingResponse?.data) {
      setConversation(existingResponse.data.conversation);
      setMessages(existingResponse.data.messages ?? []);
      setError(null);
    } else if (existingError) {
      console.error("Failed to load conversation:", existingError);
      setError(getConversationError(existingError));
    }
  }, [existingConversationId, existingResponse, existingError]);

  // Handle auto-creation of new conversations
  useEffect(() => {
    if (existingConversationId || hasCreatedRef.current) return;

    hasCreatedRef.current = true;
    setIsCreatingNew(true);
    setError(null);

    async function handleCreateConversation() {
      try {
        const response = await createConversation({ title, type, mode }).unwrap();

        if (!mountedRef.current) return;

        const id = response.data?.id;
        if (!id) {
          throw new Error("Conversation ID was not returned.");
        }

        setConversationId(id);
        setMessages([]);
        setError(null);
      } catch (err) {
        if (!mountedRef.current) return;

        console.error("Conversation creation failed:", err);

        if (isSubscriptionLimitError(err)) {
          setSubscriptionLimitReached(true);
          setError(null);
        } else {
          setError(getConversationError(err));
        }
      } finally {
        if (mountedRef.current) {
          setIsCreatingNew(false);
        }
      }
    }

    handleCreateConversation();
  }, [existingConversationId, title, type, mode, createConversation]);

  // Send message action
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

      setMessages((prev) => [...prev, temporaryMessage]);

      try {
        const response = await sendMessage({
          conversationId,
          content: trimmed,
        }).unwrap();

        if (response.data) {
          const assistantMessage = response.data;
          setMessages((prev) => [...prev, assistantMessage]);
        }
      } catch (err) {
        console.error("Failed to send message:", err);

        // Remove optimistic temp message on failure
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== temporaryMessage.id)
        );

        if (isSubscriptionLimitError(err)) {
          setSubscriptionLimitReached(true);
          setError(null);
        } else {
          setError(getMessageError(err));
        }
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
    subscriptionLimitReached,
    send,
  };
}

/*
 * Helper Functions
 */

function parseApiError(error: unknown): ApiError | null {
  return typeof error === "object" && error !== null ? (error as ApiError) : null;
}

function isSubscriptionLimitError(error: unknown): boolean {
  const apiError = parseApiError(error);
  const status = String(apiError?.status);

  return (
    status === "429" &&
    apiError?.data?.message === "SUBSCRIPTION_LIMIT_REACHED"
  );
}

function getConversationError(error: unknown): string {
  const apiError = parseApiError(error);
  const status = String(apiError?.status);

  if (apiError?.data?.message === "SUBSCRIPTION_LIMIT_REACHED") {
    return "You've reached your monthly interview limit.";
  }

  switch (status) {
    case "401":
      return "Your session has expired. Please sign in again.";
    case "403":
      return apiError?.data?.errors ?? "You don't have access to this interview.";
    case "429":
      return (
        apiError?.data?.errors ?? "You've reached your monthly interview limit."
      );
    case "404":
      return "This practice session could not be found.";
    default:
      return (
        apiError?.data?.errors ?? "Unable to create the practice session."
      );
  }
}

function getMessageError(error: unknown): string {
  const apiError = parseApiError(error);
  const status = String(apiError?.status);

  if (apiError?.data?.message) {
    return apiError.data.message;
  }

  if (status === "401") {
    return "Your session has expired. Please sign in again.";
  }

  return "Unable to send your message.";
}