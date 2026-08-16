import {
    Archive,
    ArrowLeft,
    Clock3,
    MessageCircle,
    Search,
    Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useConversationHistory } from "../hooks/useConversationHistory";
import type { Conversation } from "../types";

interface HistoryCardProps {
    conversation: Conversation;
    isArchiving: boolean;
    onOpen: () => void;
    onArchive: () => void;
}

interface EmptyHistoryProps {
    hasSearch: boolean;
    onStart: () => void;
}

export default function HistoryPage() {
    const navigate = useNavigate();
    const {
        filteredConversations,
        search,
        setSearch,
        isLoading,
        isArchiving,
        error,
        archive,
    } = useConversationHistory();

    const hasSearch = search.trim().length > 0;

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <Link
                    to="/dashboard"
                    className="mb-5 inline-flex items-center gap-1.5 text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                >
                    <ArrowLeft size={15} />
                    Dashboard
                </Link>

                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-(--vm-primary)/10 px-3 py-1.5 text-xs font-medium text-(--vm-primary)">
                            <Sparkles size={14} />
                            Practice history
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-(--vm-text) sm:text-4xl">
                            Your sessions
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-(--vm-muted) sm:text-base">
                            Continue previous practice sessions or review your conversations.
                        </p>
                    </div>

                    {/* Search */}
                    <label
                        htmlFor="history-search"
                        className="relative z-50 block w-full cursor-text sm:w-72"
                    >
                        <Search
                            size={17}
                            aria-hidden="true"
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--vm-muted)"
                        />

                        <input
                            id="history-search"
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value,
                                )
                            }
                            placeholder="Search sessions..."
                            className="block h-11 w-full rounded-xl border border-(--vm-border) bg-(--vm-surface) pl-10 pr-4 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) transition-all focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20"
                        />
                    </label>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 rounded-xl border border-(--vm-danger)/30 bg-(--vm-danger)/10 px-4 py-3 text-sm text-(--vm-danger)">
                    Unable to load your practice history. Please try again.
                </div>
            )}

            {/* Content States */}
            {isLoading ? (
                <HistorySkeleton />
            ) : filteredConversations.length === 0 ? (
                <EmptyHistory
                    hasSearch={hasSearch}
                    onStart={() => navigate("/scenarios")}
                />
            ) : (
                <div className="space-y-3">
                    {filteredConversations.map((conversation) => (
                        <HistoryCard
                            key={conversation.id}
                            conversation={conversation}
                            isArchiving={isArchiving}
                            onOpen={() => navigate(`/practice/${conversation.id}`)}
                            onArchive={() => void archive(conversation.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function HistoryCard({
    conversation,
    isArchiving,
    onOpen,
    onArchive,
}: HistoryCardProps) {
    return (
        <div className="group flex flex-col gap-4 rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-4 transition-all hover:border-(--vm-primary)/30 hover:shadow-lg hover:shadow-(--vm-primary)/5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <button
                type="button"
                onClick={onOpen}
                className="flex min-w-0 flex-1 items-center gap-4 text-left"
            >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <MessageCircle size={19} />
                </div>

                <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-(--vm-text)">
                        {conversation.title || "Practice Session"}
                    </h2>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-(--vm-muted)">
                        <span className="rounded-full bg-(--vm-surface-2) px-2 py-0.5">
                            {conversation.type}
                        </span>

                        <span className="inline-flex items-center gap-1">
                            <Clock3 size={12} />
                            {formatDate(conversation.lastMessageAt ?? conversation.createdAt)}
                        </span>
                    </div>
                </div>
            </button>

            <button
                type="button"
                onClick={onArchive}
                disabled={isArchiving}
                className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-(--vm-border) px-3 text-xs font-medium text-(--vm-muted) transition-colors hover:border-(--vm-danger)/30 hover:bg-(--vm-danger)/10 hover:text-(--vm-danger) disabled:pointer-events-none disabled:opacity-50"
            >
                <Archive size={14} />
                Archive
            </button>
        </div>
    );
}

function EmptyHistory({ hasSearch, onStart }: EmptyHistoryProps) {
    return (
        <div className="flex min-h-[45vh] items-center justify-center rounded-2xl border border-dashed border-(--vm-border) bg-(--vm-surface)/50 px-6">
            <div className="max-w-sm text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <MessageCircle size={20} />
                </div>

                <h2 className="text-lg font-semibold text-(--vm-text)">
                    {hasSearch ? "No sessions found" : "No practice sessions yet"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    {hasSearch
                        ? "Try a different search term."
                        : "Start your first AI practice session and your conversations will appear here."}
                </p>

                {!hasSearch && (
                    <button
                        type="button"
                        onClick={onStart}
                        className="mt-5 rounded-xl bg-(--vm-primary) px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--vm-primary-pressed)"
                    >
                        Start practicing
                    </button>
                )}
            </div>
        </div>
    );
}

function HistorySkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="h-24 animate-pulse rounded-2xl border border-(--vm-border) bg-(--vm-surface)"
                />
            ))}
        </div>
    );
}

function formatDate(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Unknown";
    }

    return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}