import {
    ArrowRight,
    TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Card, Container } from "@/components/ui";

import { useGetProgressQuery } from "../progressApi";
import { OverallScore, ProgressChart, ProgressError, ProgressInsight, ProgressLoading, SkillScoreCard } from "../components";

export default function ProgressPage() {
    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetProgressQuery();

    if (isLoading) {
        return <ProgressLoading />;
    }

    if (isError || !data?.data) {
        return (
            <ProgressError
                onRetry={() => void refetch()}
            />
        );
    }

    const progress = data.data;

    return (
        <main className="min-h-full bg-(--vm-background)">
            <Container className="py-6 sm:py-8 lg:py-10">
                {/* Header */}
                <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--vm-primary)">
                            Progress
                        </p>

                        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-(--vm-text) sm:text-3xl">
                            See how you're improving
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-(--vm-muted)">
                            Track your performance across practice sessions and focus on the skills that matter most.
                        </p>
                    </div>

                    {isFetching && (
                        <span className="text-xs text-(--vm-muted)">
                            Updating...
                        </span>
                    )}
                </header>

                {/* Overall + Trend */}
                <section className="mt-6 grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
                    <OverallScore
                        current={progress.overall.current}
                        previous={progress.overall.previous}
                        change={progress.overall.change}
                    />

                    <Card className="p-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-(--vm-text)">
                                    Score over time
                                </p>

                                <p className="mt-1 text-xs text-(--vm-muted)">
                                    Your overall evaluation score across sessions.
                                </p>
                            </div>

                            <TrendingUp
                                size={18}
                                className="text-(--vm-primary)"
                            />
                        </div>

                        <div className="mt-5">
                            <ProgressChart
                                points={progress.trend}
                            />
                        </div>
                    </Card>
                </section>

                {/* Skills */}
                <section className="mt-6">
                    <div className="mb-3">
                        <h2 className="text-sm font-semibold text-(--vm-text)">
                            Skill performance
                        </h2>

                        <p className="mt-1 text-xs text-(--vm-muted)">
                            Your latest performance across
                            the core communication skills.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <SkillScoreCard
                            label="Communication"
                            description="How effectively you express ideas."
                            score={
                                progress.skills.communication
                            }
                            type="communication"
                        />

                        <SkillScoreCard
                            label="Clarity"
                            description="How clearly you communicate."
                            score={
                                progress.skills.clarity
                            }
                            type="clarity"
                        />

                        <SkillScoreCard
                            label="Confidence"
                            description="How confidently you respond."
                            score={
                                progress.skills.confidence
                            }
                            type="confidence"
                        />

                        <SkillScoreCard
                            label="Relevance"
                            description="How directly you answer."
                            score={
                                progress.skills.relevance
                            }
                            type="relevance"
                        />
                    </div>
                </section>

                {/* Insights */}
                {(progress.strongestSkill ||
                    progress.needsAttention) && (
                        <section className="mt-6 grid gap-3 md:grid-cols-2">
                            {progress.strongestSkill && (
                                <ProgressInsight
                                    type="strongest"
                                    name={
                                        progress
                                            .strongestSkill
                                            .name
                                    }
                                    score={
                                        progress
                                            .strongestSkill
                                            .score
                                    }
                                />
                            )}

                            {progress.needsAttention && (
                                <ProgressInsight
                                    type="attention"
                                    name={
                                        progress
                                            .needsAttention
                                            .name
                                    }
                                    score={
                                        progress
                                            .needsAttention
                                            .score
                                    }
                                />
                            )}
                        </section>
                    )}

                {/* Practice CTA */}
                <section className="mt-6">
                    <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div>
                            <p className="text-sm font-semibold text-(--vm-text)">
                                Ready for another session?
                            </p>

                            <p className="mt-1 text-xs text-(--vm-muted)">
                                Practice your weakest skill and see how your score changes.
                            </p>
                        </div>

                        <Link
                            to="/scenarios"
                            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-(--vm-radius-md) bg-(--vm-primary) px-4 text-xs font-medium text-white transition-colors hover:bg-(--vm-primary-pressed)"
                        >
                            Start Practice
                            <ArrowRight size={14} />
                        </Link>
                    </Card>
                </section>
            </Container>
        </main>
    );
}