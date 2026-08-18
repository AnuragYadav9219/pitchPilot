import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { scenarios } from "@/features/scenario/data/scenarios";
import { useGetConversationQuery } from "@/features/conversation/conversationApi";
import type { ConversationType } from "@/features/conversation/types";

import { usePracticeSession } from "./usePracticeSession";

export function usePracticePage(
    scenarioId?: string,
    conversationId?: string,
) {
    const navigate = useNavigate();

    const scenario = useMemo(
        () => scenarios.find((item) => item.id === scenarioId),
        [scenarioId],
    );

    const isExistingConversation = Boolean(conversationId);

    const {
        data: conversationResponse,
        isLoading: isLoadingConversation,
        error: conversationError,
    } = useGetConversationQuery(conversationId ?? "", {
        skip: !conversationId,
    });

    const conversation = conversationResponse?.data?.conversation;

    const title =
        scenario?.title ??
        conversation?.title ??
        "Practice Session";

    const type: ConversationType =
        conversation?.type ??
        scenario?.conversationType ??
        "INTERVIEW";

    const session = usePracticeSession({
        title,
        type,
        conversationId,
    });

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

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (!historyOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [historyOpen]);

    const hasUserMessages = session.messages.some(
        (message) => message.role === "USER",
    );

    const canFinish =
        Boolean(session.conversationId) &&
        hasUserMessages &&
        !session.isLoading &&
        !session.isSendingMessage;

    const showEmptyState =
        session.messages.length === 0 &&
        !session.isLoading &&
        !session.isSendingMessage;

    const backPath = isExistingConversation
        ? "/history"
        : "/scenarios";

    const finish = () => {
        if (canFinish) {
            setFinishOpen(true);
        }
    };

    const confirmFinish = () => {
        if (!session.conversationId) return;

        setFinishOpen(false);

        navigate(
            `/practice/${session.conversationId}/evaluation`,
        );
    };

    return {
        scenario,
        conversation,
        isExistingConversation,

        title,
        type,
        backPath,

        conversationError,
        isLoadingConversation,

        ...session,

        bottomRef,

        finishOpen,
        setFinishOpen,

        historyOpen,
        openHistory: () => setHistoryOpen(true),
        closeHistory: () => setHistoryOpen(false),

        canFinish,
        showEmptyState,

        finish,
        confirmFinish,
    };
}