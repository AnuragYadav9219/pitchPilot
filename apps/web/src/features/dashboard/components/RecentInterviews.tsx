import { motion } from "framer-motion";
import { ArrowRight, Clock3, Sparkles, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { RecentInterview } from "../types";

interface RecentInterviewsProps {
    interviews: RecentInterview[];
}

function formatRelativeTime(value: string | null) {
    if (!value) {
        return "Unknown";
    }

    const date = new Date(value);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) {
        return "Just now";
    }
    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days}d ago`;
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
    });
}

function getScoreBadgeStyle(score: number) {
    if (score >= 80) {
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    }
    if (score >= 60) {
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    }
    return "bg-rose-500/10 text-rose-500 border-rose-500/20";
}

export function RecentInterviews({
    interviews,
}: RecentInterviewsProps) {
    const navigate = useNavigate();

    return (
        <div className="overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-(--vm-border) px-5 py-4 sm:px-6">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-(--vm-text) tracking-tight">
                            Recent interviews
                        </h2>
                        <span className="inline-flex items-center gap-1 rounded-full bg-(--vm-primary)/10 px-2 py-0.5 text-[10px] font-medium text-(--vm-primary)">
                            <Sparkles className="h-2.5 w-2.5" /> History
                        </span>
                    </div>
                    <p className="mt-0.5 text-xs text-(--vm-muted)">
                        Review performance analytics from your latest completed sessions.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/interviews")}
                    className="group inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-(--vm-primary) transition hover:bg-(--vm-primary)/10"
                >
                    <span>View all</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
            </div>

            {/* Content List / Empty State */}
            {interviews.length === 0 ? (
                <div className="px-5 py-12 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vm-surface-2) text-(--vm-muted) mb-3">
                        <FileText className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-(--vm-text)">
                        No completed interviews yet.
                    </p>
                    <p className="mt-1 text-xs text-(--vm-muted) max-w-xs mx-auto">
                        Complete your first voice or text simulation to start tracking analytical progress.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-(--vm-border)/60">
                    {interviews.map((interview, index) => {
                        const score = Math.round(interview.score);
                        const badgeStyle = getScoreBadgeStyle(score);

                        return (
                            <motion.button
                                key={interview.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                type="button"
                                onClick={() =>
                                    navigate(`/interviews/${interview.id}`)
                                }
                                className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-all hover:bg-(--vm-surface-2)/50 sm:px-6"
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-(--vm-text) group-hover:text-(--vm-primary) transition-colors">
                                        {interview.role}
                                    </p>

                                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-(--vm-muted)">
                                        <span className="capitalize font-medium text-(--vm-text-secondary)">
                                            {interview.type.replaceAll("_", " ")}
                                        </span>
                                        <span>•</span>
                                        <span className="capitalize">
                                            {interview.difficulty}
                                        </span>
                                        <span>•</span>
                                        <span className="inline-flex items-center gap-1">
                                            <Clock3 className="h-3 w-3" />
                                            {formatRelativeTime(interview.completedAt)}
                                        </span>
                                    </div>
                                </div>

                                <div className={`flex flex-col items-center justify-center rounded-xl border px-3 py-1.5 shrink-0 ${badgeStyle}`}>
                                    <span className="text-sm sm:text-base font-extrabold tracking-tight">
                                        {score}
                                    </span>
                                    <span className="text-[9px] uppercase font-semibold opacity-80 leading-none">
                                        / 100
                                    </span>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}