import { Bot, MessageCircle, UserRound } from "lucide-react";
import { useGetConversationMessagesQuery } from "../../interviewApi";

interface ConversationHistoryProps {
    interviewId: number;
}

export function ConversationHistory({ interviewId }: ConversationHistoryProps) {
    const { data, isLoading, isFetching, isError } = useGetConversationMessagesQuery(interviewId, {
        pollingInterval: 0,
    });

    // IMPORTANT: These are messages saved in the database. No live transcript state is used here.
    const messages = data?.data ?? [];

    return (
        <aside className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden border-l border-(--vm-border) bg-(--vm-surface)">
            {/* HEADER */}
            <div className="shrink-0 border-b border-(--vm-border) px-3 py-3 sm:px-4 sm:py-4 lg:px-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-(--vm-primary)/20 bg-(--vm-primary)/10">
                        <MessageCircle className="h-4 w-4 text-(--vm-primary)" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="truncate text-sm font-semibold text-(--vm-text)">Conversation</h2>
                        <p className="truncate text-[11px] text-(--vm-muted)">Saved interview messages</p>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none px-3 py-4 sm:px-4 sm:py-5 lg:px-5">
                {/* LOADING */}
                {isLoading && (
                    <div className="flex h-full items-center justify-center text-xs text-(--vm-muted)">
                        Loading conversation...
                    </div>
                )}

                {/* ERROR */}
                {isError && (
                    <div className="flex h-full items-center justify-center px-6 text-center text-xs text-red-400">
                        Unable to load the conversation.
                    </div>
                )}

                {/* EMPTY */}
                {!isLoading && !isError && messages.length === 0 && <EmptyConversation />}

                {/* SAVED MESSAGES */}
                {!isLoading && !isError && messages.length > 0 && (
                    <div className="space-y-5 sm:space-y-6">
                        {messages.map((message) => (
                            <PersistedMessage
                                key={message.id}
                                role={message.role}
                                content={message.content}
                                createdAt={message.createdAt}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* FETCHING INDICATOR */}
            {isFetching && !isLoading && (
                <div className="shrink-0 border-t border-(--vm-border) px-4 py-2 text-center text-[10px] text-(--vm-muted)">
                    Saving conversation...
                </div>
            )}
        </aside>
    );
}

/* ============================================================
   PERSISTED MESSAGE
============================================================ */

interface PersistedMessageProps {
    role: "USER" | "ASSISTANT";
    content: string;
    createdAt: string;
}

function PersistedMessage({ role, content, createdAt }: PersistedMessageProps) {
    const isUser = role === "USER";

    return (
        <div className={`flex w-full gap-2.5 sm:gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
            {/* AI AVATAR */}
            {!isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--vm-border) bg-(--vm-background)">
                    <Bot className="h-4 w-4 text-(--vm-primary)" />
                </div>
            )}

            {/* MESSAGE */}
            <div className={`flex min-w-0 max-w-[85%] flex-col ${isUser ? "items-end" : "items-start"}`}>
                <span className="mb-1 px-1 text-[10px] font-medium text-(--vm-muted)">
                    {isUser ? "You" : "VirtualMentor"}
                </span>

                <div
                    className={`rounded-2xl px-3 py-2.5 text-sm leading-6 ${isUser
                        ? "rounded-br-md border border-(--vm-primary)/20 bg-(--vm-primary)/10"
                        : "rounded-bl-md border border-(--vm-border) bg-(--vm-background)"
                        }`}
                >
                    <p className="whitespace-pre-wrap wrap-break-word">{content}</p>
                </div>

                <span className="mt-1 px-1 text-[9px] text-(--vm-muted)">{formatTime(createdAt)}</span>
            </div>

            {/* USER AVATAR */}
            {isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--vm-primary)/20 bg-(--vm-primary)/10">
                    <UserRound className="h-4 w-4 text-(--vm-primary)" />
                </div>
            )}
        </div>
    );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyConversation() {
    return (
        <div className="flex h-full min-h-60 flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-(--vm-border) bg-(--vm-background)">
                <MessageCircle className="h-4 w-4 text-(--vm-muted)" />
            </div>
            <p className="text-sm font-medium text-(--vm-text)">No saved messages yet</p>
            <p className="mt-1 max-w-60 text-xs leading-5 text-(--vm-muted)">
                Messages will appear here after they are saved during the interview.
            </p>
        </div>
    );
}

/* ============================================================
   TIME
============================================================ */

function formatTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}