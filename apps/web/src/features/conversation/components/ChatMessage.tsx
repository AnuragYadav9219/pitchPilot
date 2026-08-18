import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ConversationMessage } from "../types";
import { Brand } from "@virtualmento/shared";

interface ChatMessageProps {
    message: ConversationMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === "USER";

    return (
        <div className={`group flex w-full gap-3.5 transition-all duration-200 ${isUser ? "justify-end" : "justify-start"}`}>
            {/* AI Avatar */}
            {!isUser && (
                <div className="relative mt-1 shrink-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--vm-primary)/20 bg-(--vm-primary)/10 text-(--vm-primary) shadow-xs transition-transform duration-200 group-hover:scale-105">
                        <Bot size={17} strokeWidth={2} />
                    </div>
                </div>
            )}

            {/* Message column */}
            <div className={`flex min-w-0 max-w-[88%] flex-col sm:max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>
                {/* Sender */}
                <div className={`mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${isUser ? "text-(--vm-muted)" : "text-(--vm-primary)"}`}>
                    {isUser ? "You" : `${Brand.name}`}
                </div>

                {/* Bubble */}
                <div
                    className={`relative min-w-0 rounded-2xl px-4 py-3.5 text-sm leading-6 shadow-xs wrap-break-word transition-shadow duration-200 hover:shadow-md ${
                        isUser
                            ? "rounded-br-sm bg-(--vm-primary) text-white shadow-(--vm-primary)/10"
                            : "rounded-bl-sm border border-(--vm-border)/80 bg-(--vm-surface) text-(--vm-text) backdrop-blur-xs"
                    }`}
                >
                    {isUser ? (
                        <div className="whitespace-pre-wrap wrap-break-word">{message.content}</div>
                    ) : (
                        <div className="vm-markdown min-w-0 wrap-break-word">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ children }) => (
                                        <h1 className="mb-3 mt-1 text-lg font-bold tracking-tight text-(--vm-text) border-b border-(--vm-border)/50 pb-2">{children}</h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="mb-2 mt-4 text-base font-bold text-(--vm-text)">{children}</h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="mb-2 mt-3 text-sm font-semibold text-(--vm-text)">{children}</h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-3 last:mb-0 leading-relaxed text-(--vm-text)">{children}</p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="mb-3 ml-5 list-disc space-y-1.5 last:mb-0 marker:text-(--vm-primary)">{children}</ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="mb-3 ml-5 list-decimal space-y-1.5 last:mb-0 marker:text-(--vm-primary) marker:font-medium">{children}</ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="pl-1 leading-relaxed">{children}</li>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-semibold text-(--vm-text)">{children}</strong>
                                    ),
                                    em: ({ children }) => (
                                        <em className="text-(--vm-text-secondary) italic">{children}</em>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="my-3 border-l-2 border-(--vm-primary) bg-(--vm-primary)/5 py-1.5 pr-3 pl-4 rounded-r-lg text-(--vm-text-secondary)">
                                            {children}
                                        </blockquote>
                                    ),
                                    code: ({ className, children }) => {
                                        const isBlock = Boolean(className);

                                        if (isBlock) {
                                            return (
                                                <code className="block overflow-x-auto rounded-xl border border-(--vm-border)/80 bg-(--vm-background)/80 p-4 font-mono text-xs leading-relaxed text-(--vm-text-secondary) shadow-inner">
                                                    {children}
                                                </code>
                                            );
                                        }

                                        return (
                                            <code className="rounded-md border border-(--vm-border)/50 bg-(--vm-surface-2) px-1.5 py-0.5 font-mono text-[0.85em] text-(--vm-primary) shadow-xs">
                                                {children}
                                            </code>
                                        );
                                    },
                                    pre: ({ children }) => (
                                        <pre className="my-3 max-w-full overflow-x-auto rounded-xl">{children}</pre>
                                    ),
                                    a: ({ children, href }) => (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-medium text-(--vm-primary) underline decoration-(--vm-primary)/30 underline-offset-4 transition-colors hover:decoration-(--vm-primary) hover:text-(--vm-primary-hover, --vm-primary)"
                                        >
                                            {children}
                                        </a>
                                    ),
                                    hr: () => <hr className="my-4 border-(--vm-border)/60" />,
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Timestamp & Status Row */}
                <div className="mt-1 flex items-center gap-1.5 px-1">
                    {!isUser && (
                        <span className="h-2 w-2 rounded-full bg-(--vm-success) shadow-xs" />
                    )}
                    <span className="text-[10px] font-medium text-(--vm-muted)">
                        {formatMessageTime(message.createdAt)}
                    </span>
                </div>
            </div>

            {/* User Avatar */}
            {isUser && (
                <div className="mt-6 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-(--vm-border)/40 bg-(--vm-surface-2) text-(--vm-muted) shadow-xs transition-transform duration-200 group-hover:scale-105">
                    <User size={17} strokeWidth={2} />
                </div>
            )}
        </div>
    );
}

function formatMessageTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
}