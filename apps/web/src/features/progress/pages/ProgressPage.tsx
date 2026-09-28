import { AlertCircle, RefreshCw } from "lucide-react";

import { useGetProgressQuery } from "../progressApi";

import ProgressHeader from "../components/ProgressHeader";
import ProgressOverview from "../components/ProgressOverview";
import ScoreTrend from "../components/ScoreTrend";
import SkillPerformance from "../components/SkillPerformance";
import FocusArea from "../components/FocusArea";
import StrengthsAndImprovements from "../components/StrengthsAndImprovements";
import PracticeGoal from "../components/PracticeGoal";
import InterviewHistory from "../components/InterviewHistory";

export default function ProgressPage() {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useGetProgressQuery();

    if (isLoading) {
        return <ProgressSkeleton />;
    }

    if (isError) {
        return (
            <main className="min-h-full bg-(--vm-background) px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
                    <div className="w-full max-w-md rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-6 text-center shadow-sm">
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-(--vm-danger)/10 text-(--vm-danger)">
                            <AlertCircle className="h-5 w-5" />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-(--vm-text)">
                            Unable to load your progress
                        </h2>

                        <p className="mt-2 text-sm text-(--vm-muted)">
                            Something went wrong while loading your interview progress.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-(--vm-primary) px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-(--vm-primary-pressed)"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Try again
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    if (!data) {
        return null;
    }

    const hasProgress = data.completedInterviews > 0;

    return (
        <main className="min-h-full bg-(--vm-background) px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <ProgressHeader />

                {!hasProgress ? (
                    <EmptyProgress />
                ) : (
                    <>
                        <ProgressOverview
                            overallScore={data.overallScore}
                            improvementPercentage={data.improvementPercentage}
                            highestScore={data.highestScore}
                            completedInterviews={data.completedInterviews}
                            currentStreak={data.currentStreak}
                            weeklyInterviews={data.weeklyInterviews}
                        />

                        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.8fr)]">
                            <ScoreTrend
                                scoreTrend={data.scoreTrend}
                            />

                            <SkillPerformance
                                skills={data.skills}
                            />
                        </div>

                        <FocusArea
                            focusArea={data.focusArea}
                        />

                        <StrengthsAndImprovements
                            strengths={data.strengths}
                            areasToImprove={data.areasToImprove}
                        />

                        <PracticeGoal
                            goal={data.weeklyGoal}
                        />

                        <InterviewHistory
                            interviews={data.interviewHistory}
                        />
                    </>
                )}
            </div>
        </main>
    );
}

function ProgressSkeleton() {
    return (
        <main className="min-h-full bg-(--vm-background) px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl animate-pulse space-y-6">
                <div className="space-y-2">
                    <div className="h-8 w-48 rounded-lg bg-(--vm-surface-2)" />
                    <div className="h-4 w-80 max-w-full rounded-lg bg-(--vm-surface-2)" />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-36 rounded-2xl border border-(--vm-border) bg-(--vm-surface)"
                        />
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
                    <div className="h-80 rounded-2xl bg-(--vm-surface)" />
                    <div className="h-80 rounded-2xl bg-(--vm-surface)" />
                </div>

                <div className="h-40 rounded-2xl bg-(--vm-surface)" />

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="h-60 rounded-2xl bg-(--vm-surface)" />
                    <div className="h-60 rounded-2xl bg-(--vm-surface)" />
                </div>
            </div>
        </main>
    );
}

function EmptyProgress() {
    return (
        <section className="flex min-h-105 items-center justify-center rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-6 text-center shadow-sm">
            <div className="max-w-md">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-6 w-6"
                    >
                        <path d="M4 19V5" />
                        <path d="M4 19h16" />
                        <path d="M8 16v-5" />
                        <path d="M12 16V8" />
                        <path d="M16 16v-9" />
                    </svg>
                </div>

                <h2 className="mt-5 text-xl font-bold text-(--vm-text)">
                    Your progress starts here
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    Complete your first mock interview to start tracking your
                    scores, skills, streaks, and improvement.
                </p>

                <button
                    type="button"
                    onClick={() => {
                        window.location.href = "/interviews";
                    }}
                    className="mt-5 inline-flex rounded-xl bg-(--vm-primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--vm-primary-pressed)"
                >
                    Start an interview
                </button>
            </div>
        </section>
    );
}