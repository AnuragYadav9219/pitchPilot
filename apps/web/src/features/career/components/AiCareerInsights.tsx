import {
    Brain,
    CheckCircle2,
    MessageSquareText,
    Sparkles,
} from "lucide-react";

import type { CareerAiAnalysis } from "../types";

interface AiCareerInsightsProps {
    analysis: CareerAiAnalysis;
}

export function AiCareerInsights({ analysis }: AiCareerInsightsProps) {
    return (
        <section className="relative overflow-hidden rounded-(--vm-radius-xl) border border-(--vm-border) bg-(--vm-surface)">
            {/* Ambient effects */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-(--vm-primary)/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-48 w-48 rounded-full bg-(--vm-orange)/8 blur-3xl" />

            <div className="relative z-10 p-5 sm:p-7">
                {/* Header */}
                <div className="flex items-start gap-4">
                    <div className="vm-brand-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-(--vm-radius-md) text-white shadow-[0_8px_25px_var(--vm-glow-coral)]">
                        <Brain size={22} strokeWidth={1.7} />
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-(--vm-text)">
                                AI Career Insights
                            </h2>
                            <Sparkles size={15} className="text-(--vm-primary)" />
                        </div>

                        <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                            Turn market signals into an actionable career strategy.
                        </p>
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-6 rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-surface-2) p-5">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-(--vm-primary)">
                        Market summary
                    </div>

                    <p className="mt-3 text-sm leading-7 text-(--vm-text-secondary)">
                        {analysis.summary}
                    </p>
                </div>

                {/* Insight cards */}
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <InsightCard
                        icon={<CheckCircle2 size={17} />}
                        title="Priority skills"
                        items={analysis.prioritySkills}
                    />

                    <InsightCard
                        icon={<MessageSquareText size={17} />}
                        title="Interview topics"
                        items={analysis.interviewTopics}
                    />
                </div>
            </div>
        </section>
    );
}

function InsightCard({
    icon,
    title,
    items,
}: {
    icon: React.ReactNode;
    title: string;
    items: string[];
}) {
    return (
        <div className="rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-background) p-5">
            <div className="flex items-center gap-2">
                <span className="text-(--vm-primary)">{icon}</span>
                <h3 className="text-sm font-bold text-(--vm-text)">{title}</h3>
            </div>

            <div className="mt-4 space-y-3">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div
                            key={`${item}-${index}`}
                            className="flex items-start gap-3"
                        >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--vm-primary)" />
                            <span className="text-sm leading-6 text-(--vm-text-secondary)">
                                {item}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-(--vm-muted)">
                        No insights available.
                    </p>
                )}
            </div>
        </div>
    );
}