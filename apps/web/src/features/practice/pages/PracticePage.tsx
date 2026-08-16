import { useEffect, useRef } from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

import { scenarios } from "@/features/scenario/data/scenarios";
import type { Scenario } from "@/features/scenario/types";
import { ChatMessage, MessageInput, TypingIndicator } from "@/features/conversation/components";
import { usePracticeSession } from "../hooks/usePracticeSession";

export default function PracticePage() {
    const { scenarioId } = useParams();
    const scenario = scenarios.find((item) => item.id === scenarioId);

    // Redirect if the scenario ID is invalid
    if (!scenario) {
        return <Navigate to="/scenarios" replace />;
    }

    return <PracticeSession scenario={scenario} />;
}

interface PracticeSessionProps {
    scenario: Scenario;
}

function PracticeSession({ scenario }: PracticeSessionProps) {
    const { messages, isLoading, isSendingMessage, error, send } = usePracticeSession({
        title: scenario.title,
        type: scenario.conversationType,
    });

    const bottomRef = useRef<HTMLDivElement>(null);

    // Automatically scroll to the newest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages.length]);

    const showEmptyState = messages.length === 0 && !isLoading && !isSendingMessage;

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col">
            {/* Header */}
            <header className="shrink-0 border-b border-(--vm-border) bg-(--vm-background)/90 px-4 py-3 backdrop-blur-xl sm:px-6">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <Link
                            to="/scenarios"
                            aria-label="Back to scenarios"
                            className="shrink-0 rounded-lg p-2 text-(--vm-muted) transition-colors hover:bg-(--vm-surface) hover:text-(--vm-text)"
                        >
                            <ArrowLeft size={19} aria-hidden="true" />
                        </Link>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-(--vm-text)">
                                {scenario.title}
                            </p>
                            <p className="text-xs text-(--vm-muted)">AI Practice</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="More options"
                        className="shrink-0 rounded-lg p-2 text-(--vm-muted) transition-colors hover:bg-(--vm-surface) hover:text-(--vm-text)"
                    >
                        <MoreVertical size={19} aria-hidden="true" />
                    </button>
                </div>
            </header>

            {/* Chat Area */}
            <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="mx-auto max-w-3xl space-y-5 px-4 py-6 sm:px-6">
                    {showEmptyState && (
                        <div className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-6">
                            <p className="text-sm leading-6 text-(--vm-muted)">
                                Your AI mentor is getting the scenario ready. Start by introducing yourself or responding to the situation.
                            </p>
                        </div>
                    )}

                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}

                    {isSendingMessage && <TypingIndicator />}

                    {error && (
                        <div
                            role="alert"
                            className="rounded-xl border border-(--vm-danger)/30 bg-(--vm-danger)/10 px-4 py-3 text-sm text-(--vm-danger)"
                        >
                            {error}
                        </div>
                    )}

                    <div ref={bottomRef} aria-hidden="true" />
                </div>
            </div>

            {/* Message Input */}
            <div className="shrink-0 border-t border-(--vm-border) bg-(--vm-background)/95 px-4 py-4 backdrop-blur-xl sm:px-6">
                <div className="mx-auto max-w-3xl">
                    {isLoading && (
                        <div className="mb-2 text-center text-xs text-(--vm-muted)">
                            Preparing your practice session...
                        </div>
                    )}

                    <MessageInput
                        onSend={send}
                        disabled={isLoading || isSendingMessage}
                    />

                    <p className="mt-2 text-center text-[10px] font-medium tracking-wide text-(--vm-muted)/80">
                        Press <span className="text-(--vm-text-secondary)">Enter</span> to send{" "}
                        <span className="mx-1.5 opacity-50">·</span>{" "}
                        <span className="text-(--vm-text-secondary)">Shift + Enter</span> for a new line
                    </p>
                </div>
            </div>
        </div>
    );
}