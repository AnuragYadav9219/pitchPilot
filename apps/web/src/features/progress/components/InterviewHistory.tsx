import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { InterviewProgressItem } from "../types";

interface InterviewHistoryProps {
    interviews: InterviewProgressItem[];
}

function formatDate(value: string | null) {
    if (!value) {
        return "Unknown date";
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(value));
}

function getScoreClass(score: number) {
    if (score >= 80) {
        return "bg-(--vm-success)/10 text-(--vm-success) border border-(--vm-success)/20";
    }

    if (score >= 60) {
        return "bg-(--vm-accent)/10 text-(--vm-accent) border border-(--vm-accent)/20";
    }

    return "bg-(--vm-danger)/10 text-(--vm-danger) border border-(--vm-danger)/20";
}

export default function InterviewHistory({
    interviews,
}: InterviewHistoryProps) {
    const navigate = useNavigate();

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) shadow-xs"
        >
            {/* Section Header */}
            <div className="flex items-center justify-between gap-4 border-b border-(--vm-border) p-5 sm:p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                        <History className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-(--vm-text)">
                            Interview History
                        </h2>
                        <p className="mt-0.5 text-sm text-(--vm-muted)">
                            Review your recent interview performance and feedback.
                        </p>
                    </div>
                </div>

                {interviews.length > 0 && (
                    <span className="rounded-full bg-(--vm-surface-2) px-3 py-1 text-xs font-semibold text-(--vm-muted)">
                        {interviews.length} {interviews.length === 1 ? "entry" : "entries"}
                    </span>
                )}
            </div>

            {/* Content List / Empty State */}
            {interviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-5 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vm-surface-2) text-(--vm-muted) mb-3">
                        <CalendarDays className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-(--vm-text)">No interview history available yet</p>
                    <p className="text-xs text-(--vm-muted) mt-1 max-w-xs">
                        Complete your first mock interview to see your detailed breakdown here.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-(--vm-border)">
                    {interviews.map((interview, index) => (
                        <motion.button
                            key={interview.interviewId}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.35 + index * 0.05 }}
                            type="button"
                            onClick={() =>
                                navigate(`/interviews/${interview.interviewId}`)
                            }
                            className="group flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-(--vm-surface-2)/60 sm:p-5"
                        >
                            {/* Date Icon Box */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--vm-surface-2) text-(--vm-muted) transition-colors group-hover:bg-(--vm-primary)/10 group-hover:text-(--vm-primary)">
                                <CalendarDays className="h-4 w-4" />
                            </div>

                            {/* Title & Date */}
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-(--vm-text) transition-colors group-hover:text-(--vm-primary)">
                                    {interview.role || "Mock Interview"}
                                </p>
                                <p className="mt-0.5 text-xs text-(--vm-muted)">
                                    {formatDate(interview.completedAt)}
                                </p>
                            </div>

                            {/* Score Badge */}
                            <div className="flex items-center gap-3">
                                <span
                                    className={`rounded-lg px-2.5 py-1 text-xs font-bold shadow-2xs ${getScoreClass(
                                        interview.score
                                    )}`}
                                >
                                    {interview.score.toFixed(0)}%
                                </span>

                                <ArrowRight className="hidden h-4 w-4 shrink-0 text-(--vm-muted) transition-transform duration-200 group-hover:translate-x-1 group-hover:text-(--vm-primary) sm:block" />
                            </div>
                        </motion.button>
                    ))}
                </div>
            )}
        </motion.section>
    );
}