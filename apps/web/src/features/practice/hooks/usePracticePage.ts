import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { scenarios } from "@/features/scenario/data/scenarios";
import type { ConversationType } from "@/features/conversation/types";
import { usePracticeSession } from "./usePracticeSession";

export function usePracticePage(
    scenarioId?: string,
    conversationId?: string,
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
        conversationId,
    });

    const conversation = session.conversation;
    const title = conversation?.title ?? scenario?.title ?? "Practice Session";
    const type: ConversationType =
        conversation?.type ?? scenario?.conversationType ?? "INTERVIEW";

    const bottomRef = useRef<HTMLDivElement>(null);
    const [finishOpen, setFinishOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [session.messages.length, session.isSendingMessage]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setHistoryOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!historyOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [historyOpen]);

    const hasUserMessages = useMemo(
        () => session.messages.some((message) => message.role === "USER"),
        [session.messages]
    );

    const canFinish =
        Boolean(session.conversationId) &&
        hasUserMessages &&
        !session.isLoading &&
        !session.isSendingMessage;

    const finish = useCallback(() => {
        if (!canFinish) return;
        setFinishOpen(true);
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
        !session.error;

    const backPath = isExistingConversation ? "/history" : "/scenarios";

    const openHistory = useCallback(() => setHistoryOpen(true), []);
    const closeHistory = useCallback(() => setHistoryOpen(false), []);

    return {
        /* Scenario & Conversation Details */
        scenario,
        conversation,
        isExistingConversation,
        title,
        type,
        backPath,

        /* Session State */
        conversationId: session.conversationId,
        messages: session.messages,
        error: session.error,
        isLoading: session.isLoading,
        isSendingMessage: session.isSendingMessage,
        send: session.send,

        /* Aliases for Existing Conversations */
        isLoadingConversation: session.isLoading,
        conversationError: session.error,

        /* UI Controls & Refs */
        bottomRef,
        finishOpen,
        setFinishOpen,
        canFinish,
        finish,
        confirmFinish,
        historyOpen,
        openHistory,
        closeHistory,
        showEmptyState,
    };
}