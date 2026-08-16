import {
    useEffect,
    useRef,
} from "react";

import type {
    ConversationMessage,
} from "../types";

import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

interface ChatMessageListProps {
    messages: ConversationMessage[];
    isLoading?: boolean;
    isSendingMessage?: boolean;
    error?: string | null;
}

export function ChatMessageList({
    messages,
    isLoading = false,
    isSendingMessage = false,
    error = null,
}: ChatMessageListProps) {
    const bottomRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [
        messages.length,
        isSendingMessage,
    ]);

    if (
        isLoading &&
        messages.length === 0
    ) {
        return (
            <div className="flex flex-1 items-center justify-center px-4">
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-(--vm-primary)" />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-(--vm-text)">
                            Preparing your session
                        </p>

                        <p className="mt-1 text-xs text-(--vm-muted)">
                            Your AI mentor is getting ready...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
                {messages.length === 0 ? (
                    <EmptyConversation />
                ) : (
                    <div className="space-y-7">
                        {messages.map(
                            (message) => (
                                <ChatMessage
                                    key={message.id}
                                    message={message}
                                />
                            ),
                        )}

                        {isSendingMessage && (
                            <TypingIndicator />
                        )}

                        {error && (
                            <div className="rounded-xl border border-(--vm-danger)/30 bg-(--vm-danger)/10 px-4 py-3 text-sm text-(--vm-danger)">
                                {error}
                            </div>
                        )}

                        <div
                            ref={bottomRef}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function EmptyConversation() {
    return (
        <div className="flex min-h-[55vh] items-center justify-center">
            <div className="max-w-md text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    ✦
                </div>

                <h2 className="text-lg font-semibold text-(--vm-text)">
                    Your practice session is ready
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    Start the conversation below. Your AI mentor will respond based on your scenario and previous answers.
                </p>
            </div>
        </div>
    );
}