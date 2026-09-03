import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { scenarios } from "@/features/scenario/data/scenarios";
import type { ConversationType } from "@/features/conversation/types";
import type { InterviewMode } from "@virtualmentor/shared";
import { usePracticeSession } from "./usePracticeSession";

export function usePracticePage(
  scenarioId?: string,
  conversationId?: string,
  mode: InterviewMode = "TEXT"
) {
  const navigate = useNavigate();

  const scenario = useMemo(() => {
    if (!scenarioId) return undefined;
    return scenarios.find((item) => item.id === scenarioId);
  }, [scenarioId]);

  const isExistingConversation = Boolean(conversationId);

  const session = usePracticeSession({
    title: scenario?.title ?? "Practice Session",
    type: scenario?.conversationType ?? "INTERVIEW",
    mode,
    conversationId,
  });

  const conversation = session.conversation;
  const title = conversation?.title ?? scenario?.title ?? "Practice Session";
  const type: ConversationType =
    conversation?.type ?? scenario?.conversationType ?? "INTERVIEW";

  const bottomRef = useRef<HTMLDivElement>(null);
  const [finishOpen, setFinishOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Auto-scroll when new messages arrive or loading states change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [session.messages.length, session.isSendingMessage]);

  // Reset desktop view overflow state on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setHistoryOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile history drawer/modal is open
  useEffect(() => {
    if (!historyOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [historyOpen]);

  const hasUserMessages = useMemo(
    () => session.messages.some((msg) => msg.role === "USER"),
    [session.messages]
  );

  const canFinish =
    Boolean(session.conversationId) &&
    hasUserMessages &&
    !session.isLoading &&
    !session.isSendingMessage;

  const finish = useCallback(() => {
    if (canFinish) {
      setFinishOpen(true);
    }
  }, [canFinish]);

  const confirmFinish = useCallback(() => {
    const id = session.conversationId;
    if (!id) return;

    setFinishOpen(false);
    navigate(`/practice/${id}/evaluation`);
  }, [session.conversationId, navigate]);

  const showEmptyState =
    session.messages.length === 0 &&
    !session.isLoading &&
    !session.isSendingMessage &&
    !session.error &&
    !session.subscriptionLimitReached;

  const backPath = isExistingConversation ? "/history" : "/scenarios";

  const openHistory = useCallback(() => setHistoryOpen(true), []);
  const closeHistory = useCallback(() => setHistoryOpen(false), []);

  return {
    // Scenario & Conversation Metadata
    scenario,
    conversation,
    isExistingConversation,
    title,
    type,
    mode,
    backPath,

    // Session State & Data
    conversationId: session.conversationId,
    messages: session.messages,
    error: session.error,
    conversationError: session.error,
    subscriptionLimitReached: session.subscriptionLimitReached,
    isLoading: session.isLoading,
    isLoadingConversation: session.isLoading,
    isSendingMessage: session.isSendingMessage,
    showEmptyState,

    // Session Actions
    send: session.send,
    bottomRef,

    // Finish Modal Controls
    finishOpen,
    setFinishOpen,
    canFinish,
    finish,
    confirmFinish,

    // History Sidebar/Drawer Controls
    historyOpen,
    openHistory,
    closeHistory,
  };
}