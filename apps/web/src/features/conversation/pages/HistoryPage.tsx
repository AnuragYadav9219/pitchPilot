import {
    Archive,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Clock3,
    MessageCircle,
    Sparkles,
    Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useConversationHistory } from "../hooks/useConversationHistory";
import type { Conversation } from "../types";
import { Button, Card, Container } from "@/components/ui";
import { ConfirmDialog } from "@/components/dialogs";
import { appToast } from "@/lib/toast";

/* ============================================================= */
/* TYPES */
/* ============================================================= */

interface HistoryCardProps {
    conversation: Conversation;
    isArchiving: boolean;
    isDeleting: boolean;
    onOpen: () => void;
    onArchive: () => void;
    onDelete: () => void;
}

interface EmptyHistoryProps {
    onStart: () => void;
}

/* ============================================================= */
/* PAGE */
/* ============================================================= */

export default function HistoryPage() {
    const navigate = useNavigate();

    const {
        conversations,
        page,
        totalPages,
        totalElements,
        isFirst,
        isLast,
        nextPage,
        previousPage,
        isLoading,
        isFetching,
        isArchiving,
        isDeleting,
        error,
        archive,
        remove,
    } = useConversationHistory();

    // Conversation currently selected for permanent deletion.
    const [deleteTarget, setDeleteTarget] = useState<Conversation | null>(null);

    // Track exactly which conversation is being deleted.
    const [deletingId, setDeletingId] = useState<string | null>(null);

    /* ========================================================= */
    /* HANDLERS */
    /* ========================================================= */

    function openDeleteDialog(conversation: Conversation) {
        setDeleteTarget(conversation);
    }

    function closeDeleteDialog() {
        if (isDeleting) return;
        setDeleteTarget(null);
    }

    async function handleDelete() {
        if (!deleteTarget) return;

        const conversationId = deleteTarget.id;

        try {
            setDeletingId(conversationId);
            await remove(conversationId);

            // If this was the only conversation on the current page, move back.
            if (conversations.length === 1 && page > 0) {
                previousPage();
            }

            appToast.success("Practice session deleted.");
            setDeleteTarget(null);
        } catch (error) {
            console.error("Failed to delete conversation:", error);
            appToast.error("Unable to delete this practice session.");
        } finally {
            setDeletingId(null);
        }
    }

    async function handleArchive(conversationId: string) {
        try {
            await archive(conversationId);
            appToast.success("Practice session archived.");
        } catch (error) {
            console.error("Failed to archive conversation:", error);
            appToast.error("Unable to archive this practice session.");
        }
    }

    /* ========================================================= */
    /* RENDER */
    /* ========================================================= */

    return (
        // <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Container className="py-8 sm:py-10">
            {/* HEADER */}
            <div className="mb-8">
                <Link
                    to="/dashboard"
                    className="mb-5 inline-flex items-center gap-1.5 text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                >
                    <ArrowLeft size={15} />
                    Dashboard
                </Link>

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
            </div>

            {/* ERROR */}
            {error && (
                <div className="mb-6 rounded-xl border border-(--vm-danger)/30 bg-(--vm-danger)/10 px-4 py-3 text-sm text-(--vm-danger)">
                    Unable to load your practice history. Please try again.
                </div>
            )}

            {/* RESULT COUNT */}
            {!isLoading && conversations.length > 0 && (
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-(--vm-muted)">
                        {totalElements} {totalElements === 1 ? "session" : "sessions"}
                    </p>
                    {isFetching && (
                        <p className="text-xs text-(--vm-muted)">Updating...</p>
                    )}
                </div>
            )}

            {/* CONTENT */}
            {isLoading ? (
                <HistorySkeleton />
            ) : conversations.length === 0 ? (
                <EmptyHistory onStart={() => navigate("/scenarios")} />
            ) : (
                <>
                    {/* HISTORY LIST */}
                    <div className="space-y-3">
                        {conversations.map((conversation) => (
                            <HistoryCard
                                key={conversation.id}
                                conversation={conversation}
                                isArchiving={isArchiving}
                                isDeleting={isDeleting && deletingId === conversation.id}
                                onOpen={() => navigate(`/practice/conversation/${conversation.id}`)}
                                onArchive={() => void handleArchive(conversation.id)}
                                onDelete={() => openDeleteDialog(conversation)}
                            />
                        ))}
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="mt-6 flex flex-col gap-4 border-t border-(--vm-border) pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-(--vm-muted)">
                                Page{" "}
                                <span className="font-medium text-(--vm-text)">{page + 1}</span> of{" "}
                                <span className="font-medium text-(--vm-text)">{totalPages}</span>
                            </p>

                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    disabled={isFirst || isFetching}
                                    onClick={previousPage}
                                >
                                    <ChevronLeft size={16} />
                                    Previous
                                </Button>

                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    disabled={isLast || isFetching}
                                    onClick={nextPage}
                                >
                                    Next
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* DELETE CONFIRMATION */}
            <ConfirmDialog
                open={deleteTarget !== null}
                title="Delete practice session?"
                description={
                    deleteTarget
                        ? `"${deleteTarget.title || "Practice Session"}" and all of its messages will be permanently deleted. This action cannot be undone.`
                        : ""
                }
                confirmLabel="Delete session"
                variant="danger"
                loading={isDeleting}
                onCancel={closeDeleteDialog}
                onConfirm={handleDelete}
            />
        </Container>
    );
}

/* ============================================================= */
/* HISTORY CARD */
/* ============================================================= */

function HistoryCard({
    conversation,
    isArchiving,
    isDeleting,
    onOpen,
    onArchive,
    onDelete,
}: HistoryCardProps) {
    return (
        <Card
            className="p-4 overflow-hidden transition-all duration-(--vm-animation-normal) hover:border-(--vm-primary)/30 hover:shadow-lg hover:shadow-(--vm-primary)/5"
        >

            {/* CONVERSATION */}
            <button
                type="button"
                onClick={onOpen}
                className="relative z-10 flex min-w-0 w-full items-center gap-4 text-left outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-(--vm-primary)"
            >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <MessageCircle size={19} />
                </div>

                <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-semibold text-(--vm-text)">
                        {conversation.title || "Practice Session"}
                    </h2>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-(--vm-muted)">
                        <span className="rounded-full bg-(--vm-surface-2) px-2 py-0.5">
                            {formatConversationType(conversation.type)}
                        </span>

                        <span className="inline-flex items-center gap-1">
                            <Clock3 size={12} />
                            {formatDate(conversation.lastMessageAt ?? conversation.createdAt)}
                        </span>
                    </div>
                </div>
            </button>

            {/* ACTIONS */}
            <div className="relative z-30 flex w-full shrink-0 items-center justify-end gap-1 border-t border-(--vm-border) pt-3 sm:w-auto sm:border-t-0 sm:pt-0">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isArchiving || isDeleting}
                    loading={isArchiving}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onArchive();
                    }}
                    className="relative z-30 text-(--vm-muted) hover:text-(--vm-text)"
                >
                    {!isArchiving && (
                        <Archive size={14} />
                    )}

                    Archive
                </Button>

                <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    disabled={isDeleting || isArchiving}
                    loading={isDeleting}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onDelete();
                    }}
                    className="relative z-30 text-(--vm-muted) hover:bg-(--vm-danger)/10 hover:text-(--vm-danger)"
                >
                    {!isDeleting && (
                        <Trash2 size={14} />
                    )}

                    Delete
                </Button>
            </div>
        </Card>
    );
}

/* ============================================================= */
/* EMPTY STATE */
/* ============================================================= */

function EmptyHistory({ onStart }: EmptyHistoryProps) {
    return (
        <div className="flex min-h-[45vh] items-center justify-center rounded-2xl border border-dashed border-(--vm-border) bg-(--vm-surface)/50 px-6">
            <div className="max-w-sm text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <MessageCircle size={20} />
                </div>

                <h2 className="text-lg font-semibold text-(--vm-text)">
                    No practice sessions yet
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    Start your first AI practice session and your conversations will appear here.
                </p>

                <Button type="button" size="md" className="mt-5" onClick={onStart}>
                    Start practicing
                </Button>
            </div>
        </div>
    );
}

/* ============================================================= */
/* SKELETON */
/* ============================================================= */

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

/* ============================================================= */
/* HELPERS */
/* ============================================================= */

function formatConversationType(type: Conversation["type"]): string {
    return type.charAt(0) + type.slice(1).toLowerCase();
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