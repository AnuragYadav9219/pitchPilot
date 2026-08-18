import {
    Clock3,
    MessageCircle,
    Plus,
    Sparkles,
    X,
} from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useGetConversationsQuery } from "@/features/conversation/conversationApi";
import type { Conversation, ConversationType } from "@/features/conversation/types";
import { Button } from "@/components/ui";
import { Brand } from "@virtualmento/shared";

/* ============================================================= */
/* TYPES & CONSTANTS */
/* ============================================================= */

interface PracticeSidebarProps {
    currentConversationId: string | null;
    mobileOpen: boolean;
    onCloseMobile: () => void;
}

interface HistoryGroup {
    label: string;
    conversations: Conversation[];
}

const CONVERSATION_TYPE_LABELS: Record<ConversationType, string> = {
    GENERAL: "General",
    INTERVIEW: "Interview",
    ROLEPLAY: "Roleplay",
    CAREER: "Career",
    CODING: "Coding",
    LEARNING: "Learning",
};

/* ============================================================= */
/* COMPONENT */
/* ============================================================= */

export function PracticeSidebar({
    currentConversationId,
    mobileOpen,
    onCloseMobile,
}: PracticeSidebarProps) {
    const navigate = useNavigate();

    const { data, isLoading, isFetching } = useGetConversationsQuery({
        page: 0,
        size: 30,
    });

    const conversations = data?.data?.content ?? [];

    const groupedConversations = useMemo(
        () => groupConversations(conversations),
        [conversations],
    );

    function handleNewPractice() {
        onCloseMobile();
        navigate("/scenarios");
    }

    function handleConversationClick(conversation: Conversation) {
        if (!conversation.id) {
            console.error("Cannot open conversation without an ID.", conversation);
            return;
        }

        onCloseMobile();
        navigate(`/practice/conversation/${conversation.id}`);
    }

    return (
        <>
            {/* Mobile Backdrop */}
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close practice history"
                    onClick={onCloseMobile}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                aria-label="Practice history"
                className={[
                    "fixed inset-y-0 left-0 z-50 flex w-72.5 flex-col",
                    "border-r border-(--vm-border) bg-(--vm-background)",
                    "transition-transform duration-200 ease-out",
                    mobileOpen ? "translate-x-0" : "-translate-x-full",
                    "lg:relative lg:z-0 lg:translate-x-0",
                ].join(" ")}
            >
                {/* Header */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-(--vm-border) px-4">
                    <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--vm-primary)/10 text-(--vm-primary)">
                            <Sparkles size={16} strokeWidth={2} />
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-(--vm-text)">
                                {Brand.name}
                            </p>
                            <p className="text-[10px] text-(--vm-muted)">
                                Practice history
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onCloseMobile}
                        aria-label="Close history"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-(--vm-muted) transition-colors hover:bg-(--vm-surface-2) hover:text-(--vm-text) lg:hidden"
                    >
                        <X size={18} strokeWidth={1.8} />
                    </button>
                </div>

                {/* New Practice Button */}
                <div className="px-3 pb-3 pt-3">
                    <Button
                        type="button"
                        variant="secondary"
                        size="md"
                        onClick={handleNewPractice}
                        className="h-10 w-full justify-center border-(--vm-border-strong) bg-(--vm-surface) text-(--vm-text) shadow-sm hover:border-(--vm-primary)/40 hover:bg-(--vm-primary)/5 hover:text-(--vm-primary)"
                    >
                        <Plus size={16} strokeWidth={2} />
                        New practice
                    </Button>
                </div>

                {/* History Header */}
                <div className="flex items-center justify-between px-4 pb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-(--vm-muted)">
                        Conversations
                    </span>
                    {isFetching && !isLoading && (
                        <span className="text-[10px] text-(--vm-muted)">
                            Updating...
                        </span>
                    )}
                </div>

                {/* History Body */}
                <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-5 scrollbar-thin [scrollbar-color:var(--vm-border)_transparent]">
                    {isLoading ? (
                        <HistorySkeleton />
                    ) : conversations.length === 0 ? (
                        <EmptyHistory onStart={handleNewPractice} />
                    ) : (
                        <div className="space-y-5">
                            {groupedConversations.map((group) => (
                                <HistoryGroupSection
                                    key={group.label}
                                    group={group}
                                    currentConversationId={currentConversationId}
                                    onConversationClick={handleConversationClick}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

/* ============================================================= */
/* SUB-COMPONENTS */
/* ============================================================= */

interface HistoryGroupSectionProps {
    group: HistoryGroup;
    currentConversationId: string | null;
    onConversationClick: (conversation: Conversation) => void;
}

function HistoryGroupSection({
    group,
    currentConversationId,
    onConversationClick,
}: HistoryGroupSectionProps) {
    return (
        <section>
            <div className="mb-1 px-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-(--vm-muted)">
                    {group.label}
                </p>
            </div>
            <div className="space-y-0.5">
                {group.conversations.map((conversation) => (
                    <HistoryItem
                        key={conversation.id}
                        conversation={conversation}
                        active={conversation.id === currentConversationId}
                        onClick={() => onConversationClick(conversation)}
                    />
                ))}
            </div>
        </section>
    );
}

interface HistoryItemProps {
    conversation: Conversation;
    active: boolean;
    onClick: () => void;
}

function HistoryItem({ conversation, active, onClick }: HistoryItemProps) {
    const title = conversation.title || "Practice Session";
    const timestamp = conversation.lastMessageAt ?? conversation.createdAt;

    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={[
                "group relative flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-(--vm-primary)",
                active ? "bg-(--vm-primary)/10" : "hover:bg-(--vm-surface-2)",
            ].join(" ")}
        >
            {active && (
                <span
                    aria-hidden="true"
                    className="absolute left-0 h-5 w-0.5 rounded-full bg-(--vm-primary)"
                />
            )}

            <div
                className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                    active
                        ? "bg-(--vm-primary)/15 text-(--vm-primary)"
                        : "bg-(--vm-surface-2) text-(--vm-muted) group-hover:text-(--vm-text-secondary)",
                ].join(" ")}
            >
                <MessageCircle size={15} strokeWidth={1.8} />
            </div>

            <div className="min-w-0 flex-1">
                <p
                    className={[
                        "truncate text-xs",
                        active
                            ? "font-semibold text-(--vm-text)"
                            : "font-medium text-(--vm-text-secondary) group-hover:text-(--vm-text)",
                    ].join(" ")}
                >
                    {title}
                </p>

                <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[10px] text-(--vm-muted)">
                    <span className="truncate">
                        {formatConversationType(conversation.type)}
                    </span>
                    <span aria-hidden="true" className="opacity-40">·</span>
                    <span className="inline-flex shrink-0 items-center gap-1">
                        <Clock3 size={9} strokeWidth={1.8} />
                        {formatDate(timestamp)}
                    </span>
                </div>
            </div>

            {active && (
                <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--vm-primary)"
                />
            )}
        </button>
    );
}

function EmptyHistory({ onStart }: { onStart: () => void }) {
    return (
        <div className="px-5 py-12 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-(--vm-surface) text-(--vm-muted) ring-1 ring-(--vm-border)">
                <MessageCircle size={19} strokeWidth={1.8} />
            </div>
            <p className="mt-3 text-xs font-semibold text-(--vm-text)">
                No conversations yet
            </p>
            <p className="mt-1 text-[11px] leading-5 text-(--vm-muted)">
                Start a practice session and your conversation will appear here.
            </p>
            <button
                type="button"
                onClick={onStart}
                className="mt-4 text-xs font-medium text-(--vm-primary) transition-colors hover:text-(--vm-primary-pressed)"
            >
                Start practicing →
            </button>
        </div>
    );
}

function HistorySkeleton() {
    return (
        <div className="space-y-4 px-1">
            {Array.from({ length: 3 }).map((_, groupIndex) => (
                <div key={groupIndex} className="space-y-1.5">
                    <div className="mb-2 h-2.5 w-16 animate-pulse rounded bg-(--vm-surface-2)" />
                    {Array.from({ length: groupIndex === 0 ? 3 : 2 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex h-13 animate-pulse items-center gap-2.5 rounded-lg bg-(--vm-surface-2)/70 px-2.5"
                        >
                            <div className="h-8 w-8 shrink-0 rounded-lg bg-(--vm-border)" />
                            <div className="flex-1 space-y-1.5">
                                <div className="h-2.5 w-3/4 rounded bg-(--vm-border)" />
                                <div className="h-2 w-1/2 rounded bg-(--vm-border)" />
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

/* ============================================================= */
/* UTILS & HELPERS */
/* ============================================================= */

function groupConversations(conversations: Conversation[]): HistoryGroup[] {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    const startOfSevenDaysAgo = new Date(startOfToday);
    startOfSevenDaysAgo.setDate(startOfSevenDaysAgo.getDate() - 7);

    const groups: HistoryGroup[] = [
        { label: "Today", conversations: [] },
        { label: "Yesterday", conversations: [] },
        { label: "Previous 7 days", conversations: [] },
        { label: "Older", conversations: [] },
    ];

    for (const conversation of conversations) {
        const timestamp = conversation.lastMessageAt ?? conversation.createdAt;
        const date = new Date(timestamp);

        if (Number.isNaN(date.getTime())) {
            groups[3].conversations.push(conversation);
            continue;
        }

        if (date >= startOfToday) {
            groups[0].conversations.push(conversation);
        } else if (date >= startOfYesterday) {
            groups[1].conversations.push(conversation);
        } else if (date >= startOfSevenDaysAgo) {
            groups[2].conversations.push(conversation);
        } else {
            groups[3].conversations.push(conversation);
        }
    }

    return groups.filter((group) => group.conversations.length > 0);
}

function formatConversationType(type: ConversationType): string {
    return CONVERSATION_TYPE_LABELS[type] ?? "Practice";
}

function formatDate(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Unknown";
    }

    const now = new Date();
    const isSameDay =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

    if (isSameDay) {
        return new Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            minute: "2-digit",
        }).format(date);
    }

    return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
    }).format(date);
}