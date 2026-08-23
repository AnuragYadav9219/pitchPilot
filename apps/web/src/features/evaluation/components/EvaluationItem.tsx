import {
    ArrowRight,
    CalendarDays,
    MessageCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Card } from "@/components/ui";

import type { EvaluationSummary } from "../types";

interface EvaluationItemProps {
    evaluation: EvaluationSummary;
}

export function EvaluationItem({
    evaluation,
}: EvaluationItemProps) {
    const score = evaluation.overallScore;

    return (
        <Link
            to={`/practice/${evaluation.conversationId}/evaluation`}
            className="group block"
        >
            <Card
                interactive
                className="overflow-hidden p-4 sm:p-5"
            >
                <div className="flex flex-col gap-5">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <ScoreBadge score={score} />

                        <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-semibold text-(--vm-text) sm:text-[15px]">
                                        {evaluation.conversationTitle}
                                    </h3>

                                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-(--vm-muted)">
                                        <span className="inline-flex items-center gap-1.5">
                                            <MessageCircle
                                                size={12}
                                            />

                                            <span>
                                                {formatType(evaluation.conversationType)}
                                            </span>
                                        </span>

                                        <span className="hidden h-1 w-1 rounded-full bg-(--vm-border-strong) sm:block" />

                                        <span className="inline-flex items-center gap-1.5">
                                            <CalendarDays
                                                size={12}
                                            />

                                            {formatDate(evaluation.completedAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Desktop arrow */}

                                <ArrowRight
                                    size={17}
                                    className="mt-1 hidden shrink-0 text-(--vm-muted) transition-all duration-200 sm:block group-hover:translate-x-0.5 group-hover:text-(--vm-primary)"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ================================================= */}
                    {/* SKILL SCORES                                      */}
                    {/* ================================================= */}

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <SkillScore
                            label="Communication"
                            value={evaluation.communicationScore}
                        />

                        <SkillScore
                            label="Clarity"
                            value={evaluation.clarityScore}
                        />

                        <SkillScore
                            label="Confidence"
                            value={evaluation.confidenceScore}
                        />

                        <SkillScore
                            label="Relevance"
                            value={evaluation.relevanceScore}
                        />
                    </div>

                    {/* ================================================= */}
                    {/* MOBILE ACTION                                     */}
                    {/* ================================================= */}

                    <div className="flex items-center justify-between border-t border-(--vm-border) pt-3 sm:hidden">
                        <span className="text-[11px] font-medium text-(--vm-muted)">
                            View evaluation
                        </span>

                        <ArrowRight
                            size={15}
                            className="text-(--vm-primary) transition-transform group-hover:translate-x-0.5"
                        />
                    </div>
                </div>
            </Card>
        </Link>
    );
}

/* ============================================================= */
/* SCORE BADGE                                                    */
/* ============================================================= */

function ScoreBadge({
    score,
}: {
    score: number | null;
}) {
    const scoreValue = score ?? 0;

    const scoreStyle =
        score === null
            ? { wrapper: "bg-(--vm-surface-2) text-(--vm-muted)" }
            : score >= 80
                ? { wrapper: "bg-(--vm-success)/10 text-(--vm-success)" }
                : score >= 60
                    ? { wrapper: "bg-(--vm-warning)/10 text-(--vm-warning)" }
                    : { wrapper: "bg-(--vm-danger)/10 text-(--vm-danger)" };

    return (
        <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-(--vm-border) bg-(--vm-background) px-2 py-2.5 sm:w-16 sm:py-3">
            <span className="text-[9px] font-medium uppercase tracking-wide text-(--vm-muted)">
                Score
            </span>

            <span
                className={[
                    "mt-1",
                    "flex h-8 w-8",
                    "items-center justify-center",
                    "rounded-lg",
                    "text-sm font-bold",
                    scoreStyle.wrapper,
                ].join(" ")}
            >
                {score === null
                    ? "—"
                    : scoreValue}
            </span>
        </div>
    );
}

/* ============================================================= */
/* SKILL SCORE                                                    */
/* ============================================================= */

function SkillScore({
    label,
    value,
}: {
    label: string;
    value: number | null;
}) {
    const percentage =
        value === null
            ? 0
            : Math.min(
                Math.max(value, 0),
                100,
            );

    return (
        <div className="min-w-0 rounded-xl border border-(--vm-border) bg-(--vm-background) px-3 py-2.5 sm:px-3.5">
            <div className="flex items-center justify-between gap-2">
                <p className="min-w-0 truncate text-[10px] font-medium text-(--vm-muted)">
                    {label}
                </p>

                <span className="shrink-0 text-[11px] font-semibold text-(--vm-text)">
                    {value ?? "—"}
                </span>
            </div>

            {/* Progress */}

            <div className="mt-2 h-1 overflow-hidden rounded-full bg-(--vm-surface-3)">
                {value !== null && (
                    <div
                        className="h-full rounded-full bg-(--vm-primary) transition-all duration-300"
                        style={{
                            width: `${percentage}%`,
                        }}
                    />
                )}
            </div>
        </div>
    );
}

/* ============================================================= */
/* HELPERS                                                        */
/* ============================================================= */

function formatDate(
    value: string,
) {
    return new Intl.DateTimeFormat(
        undefined,
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        },
    ).format(new Date(value));
}

function formatType(
    value: string,
) {
    return value
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase(),
        );
}