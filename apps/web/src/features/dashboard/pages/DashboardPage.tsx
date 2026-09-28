import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useSelector } from "react-redux";

import type { RootState } from "@/app/store/store";
import { useGetDashboardQuery } from "../dashboardApi";
import {
    ActivityHeatmap,
    DashboardHeader,
    DashboardStats,
    FocusArea,
    RecentInterviews,
    SkillPerformance,
    StreakCard,
    WeeklyGoal,
} from "../components";

export default function DashboardPage() {
    const { data, isLoading, isError, refetch } = useGetDashboardQuery();
    const user = useSelector((state: RootState) => state.auth.user);

    const userName = user?.fullName?.trim().split(/\s+/)[0] ?? "there";

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (isError || !data) {
        return (
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
                <div className="rounded-full bg-(--vm-surface-2) p-3">
                    <AlertCircle className="h-6 w-6 text-(--vm-danger)" />
                </div>

                <h2 className="mt-4 text-lg font-semibold text-(--vm-text)">
                    Couldn't load your dashboard
                </h2>

                <p className="mt-2 max-w-md text-sm text-(--vm-muted)">
                    Something went wrong while loading your interview statistics.
                </p>

                <button
                    type="button"
                    onClick={() => refetch()}
                    className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-(--vm-primary) px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-(--vm-primary-pressed)"
                >
                    <RefreshCw className="h-4 w-4" />
                    Try again
                </button>
            </div>
        );
    }

    const hasInterviews = data.stats.totalInterviews > 0;

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="space-y-6">
                <DashboardHeader
                    userName={userName}
                    currentStreak={data.stats.currentStreak}
                />

                {!hasInterviews ? (
                    <EmptyDashboard />
                ) : (
                    <>
                        <DashboardStats stats={data.stats} />

                        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
                            <div className="space-y-6">
                                <StreakCard
                                    currentStreak={data.stats.currentStreak}
                                    longestStreak={data.stats.longestStreak}
                                />
                                <WeeklyGoal activity={data.activity} />
                            </div>

                            <ActivityHeatmap activity={data.activity} />
                        </div>

                        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
                            <SkillPerformance skills={data.skills} />
                            <FocusArea skills={data.skills} />
                        </div>

                        <RecentInterviews interviews={data.recentInterviews} />
                    </>
                )}
            </div>
        </main>
    );
}

function EmptyDashboard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) px-6 py-14 text-center"
        >
            <div className="mx-auto max-w-md">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-surface-2)">
                    <span className="text-2xl">🎤</span>
                </div>

                <h2 className="mt-5 text-xl font-bold text-(--vm-text)">
                    Start building your interview streak
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    Complete your first interview and VirtualMentor will start tracking your scores, skills, practice activity, and streak.
                </p>
            </div>
        </motion.div>
    );
}

function DashboardSkeleton() {
    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="animate-pulse space-y-6">
                <div className="h-28 rounded-2xl bg-(--vm-surface-2)" />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="h-28 rounded-2xl bg-(--vm-surface-2)" />
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
                    <div className="h-80 rounded-2xl bg-(--vm-surface-2)" />
                    <div className="space-y-6">
                        <div className="h-52 rounded-2xl bg-(--vm-surface-2)" />
                        <div className="h-40 rounded-2xl bg-(--vm-surface-2)" />
                    </div>
                </div>

                <div className="h-72 rounded-2xl bg-(--vm-surface-2)" />
                <div className="h-80 rounded-2xl bg-(--vm-surface-2)" />
            </div>
        </main>
    );
}