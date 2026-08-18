import {
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Card } from "@/components/ui";

import { scenarios } from "../data/scenarios";
import type { Scenario } from "../types";

import {
    useGetRecommendationQuery,
} from "@/features/recommendation/recommendationApi";

function findRecommendedScenario(
    targetSkill: string | null,
): Scenario | null {
    if (!targetSkill) {
        return null;
    }

    return (
        scenarios.find(
            (scenario) =>
                scenario.focus === targetSkill,
        ) ?? null
    );
}

export function RecommendedScenarioCard() {
    const {
        data,
        isLoading,
        isError,
    } = useGetRecommendationQuery();

    if (isLoading) {
        return <RecommendationLoading />;
    }

    if (isError || !data?.data) {
        return null;
    }

    const recommendation = data.data;

    if (!recommendation.available) {
        return <RecommendationEmpty />;
    }

    const scenario =
        findRecommendedScenario(
            recommendation.targetSkill,
        );

    if (!scenario) {
        return null;
    }

    return (
        <Card className="relative overflow-hidden p-5 sm:p-6">
            {/* Decorative glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-(--vm-primary)/10 blur-3xl"
            />

            <div className="relative">
                {/* Label */}
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--vm-primary)/10 text-(--vm-primary)">
                        <Sparkles size={15} />
                    </div>

                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-(--vm-primary)">
                        Recommended for you
                    </span>
                </div>

                {/* Content */}
                <div className="mt-4">
                    <h2 className="text-lg font-semibold text-(--vm-text)">
                        {scenario.title}
                    </h2>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-(--vm-muted)">
                        {recommendation.reason}
                    </p>
                </div>

                {/* Metadata */}
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-(--vm-primary)/10 px-2.5 py-1 text-[11px] font-medium capitalize text-(--vm-primary)">
                        Focus:{" "}
                        {formatFocus(
                            scenario.focus,
                        )}
                    </span>

                    <span className="rounded-full bg-(--vm-surface-2) px-2.5 py-1 text-[11px] font-medium text-(--vm-muted)">
                        {scenario.difficulty}
                    </span>

                    <span className="rounded-full bg-(--vm-surface-2) px-2.5 py-1 text-[11px] font-medium text-(--vm-muted)">
                        ~{scenario.estimatedMinutes} min
                    </span>

                    {recommendation.currentScore != null && (
                        <span className="rounded-full bg-(--vm-surface-2) px-2.5 py-1 text-[11px] font-medium text-(--vm-muted)">
                            Current score:{" "}
                            {recommendation.currentScore}
                        </span>
                    )}
                </div>

                {/* CTA */}
                <Link
                    to={`/practice/${scenario.id}`}
                    className="mt-5 inline-flex h-10 items-center gap-2 rounded-(--vm-radius-md) bg-(--vm-primary) px-4 text-xs font-medium text-white transition-all duration-200 hover:bg-(--vm-primary-pressed) hover:-translate-y-0.5 active:translate-y-0"
                >
                    Start recommended practice
                    <ArrowRight size={14} />
                </Link>
            </div>
        </Card>
    );
}

function formatFocus(focus: string): string {
    return focus
        .toLowerCase()
        .replaceAll("_", " ");
}

function RecommendationLoading() {
    return (
        <Card className="animate-pulse p-5 sm:p-6">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-(--vm-surface-2)" />
                <div className="h-3 w-32 rounded bg-(--vm-surface-2)" />
            </div>

            <div className="mt-5 h-5 w-64 rounded bg-(--vm-surface-2)" />

            <div className="mt-2 h-4 w-full max-w-xl rounded bg-(--vm-surface-2)" />

            <div className="mt-4 flex gap-2">
                <div className="h-6 w-24 rounded-full bg-(--vm-surface-2)" />
                <div className="h-6 w-20 rounded-full bg-(--vm-surface-2)" />
                <div className="h-6 w-20 rounded-full bg-(--vm-surface-2)" />
            </div>

            <div className="mt-5 h-10 w-48 rounded-lg bg-(--vm-surface-2)" />
        </Card>
    );
}

function RecommendationEmpty() {
    return (
        <Card className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
                <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)"
                >
                    <Sparkles size={16} />
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-(--vm-text)">
                        Your personalized practice
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                        Complete a practice session and finish its evaluation. VirtualMento will then recommend what you should practice next.
                    </p>
                </div>
            </div>
        </Card>
    );
}