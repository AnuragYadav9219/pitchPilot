import { ArrowUpRight, CheckCircle2, Clock3, Mic2, XCircle } from "lucide-react";
import type { HistoryItem } from "../types";

interface HistoryCardProps {
    interview: HistoryItem;
}

export function HistoryCard({ interview }: HistoryCardProps) {
    const completed = interview.status === "COMPLETED";
    const failed = interview.status === "FAILED";
    const score = interview.score !== null ? Math.round(interview.score) : null;

    const date = new Date(
        interview.completedAt ?? interview.createdAt
    ).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

    return (
        <article className="group relative px-4 py-5 transition-all duration-300 hover:bg-(--vm-surface-2)/40 sm:px-6 sm:py-6">
            {/* Hover accent */}
            <span className="absolute bottom-4 left-0 top-4 w-0.5 origin-center scale-y-0 rounded-full bg-(--vm-primary) opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100" aria-hidden="true" />

            <div className="flex gap-3.5 sm:gap-4">
                {/* Interview icon */}
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary) transition-all duration-300 group-hover:scale-105 group-hover:bg-(--vm-primary)/15 sm:h-11 sm:w-11">
                    <Mic2 className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Main content */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        {/* Information */}
                        <div className="min-w-0">
                            {/* Role + status */}
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="min-w-0 truncate text-sm font-semibold text-(--vm-text) transition-colors duration-200 group-hover:text-(--vm-primary) sm:text-base">
                                    {interview.role}
                                </h2>

                                {completed && (
                                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-(--vm-success)/10 px-2 py-0.5 text-[10px] font-semibold text-(--vm-success)">
                                        <CheckCircle2 className="h-3 w-3" /> Completed
                                    </span>
                                )}

                                {failed && (
                                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-(--vm-danger)/10 px-2 py-0.5 text-[10px] font-semibold text-(--vm-danger)">
                                        <XCircle className="h-3 w-3" /> Failed
                                    </span>
                                )}
                            </div>

                            {/* Metadata */}
                            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-(--vm-muted) sm:text-xs">
                                <span className="font-medium uppercase tracking-wide">
                                    {interview.type.replaceAll("_", " ")}
                                </span>
                                <span className="text-(--vm-border)">•</span>
                                <span>{interview.difficulty}</span>

                                {interview.durationMinutes && (
                                    <>
                                        <span className="text-(--vm-border)">•</span>
                                        <span className="inline-flex items-center gap-1">
                                            <Clock3 className="h-3 w-3" /> {interview.durationMinutes} min
                                        </span>
                                    </>
                                )}

                                <span className="text-(--vm-border)">•</span>
                                <span>{date}</span>
                            </div>

                            {/* Topics */}
                            {interview.topics && (
                                <p className="mt-2.5 line-clamp-1 text-[11px] leading-5 text-(--vm-muted) sm:text-xs">
                                    {interview.topics}
                                </p>
                            )}
                        </div>

                        {/* Result + action */}
                        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-(--vm-border) pt-3.5 sm:gap-6 lg:border-0 lg:pt-0">
                            {/* Score */}
                            <div className="lg:text-right">
                                {score !== null ? (
                                    <div className="flex items-baseline gap-1 lg:justify-end">
                                        <span className="text-xl font-bold tracking-tight text-(--vm-text) sm:text-2xl">{score}</span>
                                        <span className="text-[11px] text-(--vm-muted)">/100</span>
                                    </div>
                                ) : (
                                    <span className="text-xs font-medium text-(--vm-muted)">Evaluation pending</span>
                                )}

                                {score !== null && (
                                    <p className="mt-0.5 text-[10px] text-(--vm-muted)">Overall score</p>
                                )}
                            </div>

                            {/* View button */}
                            <button
                                type="button"
                                aria-label={`View ${interview.role} interview`}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-(--vm-border) text-(--vm-muted) transition-all duration-300 hover:border-(--vm-primary)/30 hover:bg-(--vm-primary)/10 hover:text-(--vm-primary) active:scale-95"
                            >
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}