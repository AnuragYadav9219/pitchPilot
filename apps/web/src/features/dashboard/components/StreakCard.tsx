import { motion } from "framer-motion";
import { Flame, Trophy, Sparkles, Zap } from "lucide-react";

interface StreakCardProps {
    currentStreak: number;
    longestStreak: number;
}

export function StreakCard({
    currentStreak,
    longestStreak,
}: StreakCardProps) {
    const milestones = [3, 7, 14, 30, 50, 100];

    const nextMilestone = milestones.find((milestone) => milestone > currentStreak) ?? null;

    const daysToGo = nextMilestone
        ? nextMilestone - currentStreak
        : 0;

    const progress = nextMilestone
        ? Math.min(100, (currentStreak / nextMilestone) * 100)
        : 100;

    return (
        <div className="relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) p-5 sm:p-6 shadow-sm">
            {/* Background subtle glow effect */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-(--vm-orange)/10 blur-3xl pointer-events-none" />

            {/* Top Section */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--vm-orange)/10 text-(--vm-orange) shadow-inner">
                        <Flame className="h-5 w-5 fill-(--vm-orange)/20" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-semibold text-(--vm-text) tracking-tight">
                                Practice streak
                            </h2>
                            {currentStreak > 0 && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-(--vm-orange)/10 px-2 py-0.5 text-[10px] font-medium text-(--vm-orange)">
                                    <Sparkles className="h-2.5 w-2.5" />
                                    On a streak
                                </span>
                            )}
                        </div>
                        <p className="mt-0.5 text-xs sm:text-sm text-(--vm-muted)">
                            Consistency compounds your interview confidence.
                        </p>
                    </div>
                </div>

                <div className="text-right shrink-0">
                    <div className="flex items-baseline justify-end gap-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-(--vm-text) tracking-tight">
                            {currentStreak}
                        </span>
                        <span className="text-xs font-medium text-(--vm-muted)">days</span>
                    </div>
                    <div className="text-[11px] font-medium text-(--vm-muted) uppercase tracking-wider">
                        Current Streak
                    </div>
                </div>
            </div>

            {/* Milestone Progress Bar */}
            <div className="mt-6 rounded-xl bg-(--vm-surface-2)/50 border border-(--vm-border)/60 p-3.5">
                <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-(--vm-muted)">
                        <Zap className="h-3.5 w-3.5 text-amber-500" />
                        Next milestone(
                        {nextMilestone
                            ? `${nextMilestone} days`
                            : "Complete"}
                        )
                    </span>

                    <span className="font-semibold text-(--vm-text)">
                        {nextMilestone
                            ? `${daysToGo} days to go`
                            : "All milestones reached!"}
                    </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-(--vm-surface-3) p-0.5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-linear-to-r from-(--vm-primary)/70 to-(--vm-primary) shadow-xs shadow-(--vm-primary)/30"
                    />
                </div>
            </div>

            {/* Bottom Metrics Grid */}
            <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl bg-(--vm-surface-2) p-3 border border-(--vm-border)/40 transition hover:border-(--vm-border)">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--vm-accent)/10 text-(--vm-accent)">
                        <Trophy className="h-4 w-4" />
                    </div>
                    <div>
                        <span className="text-[11px] font-medium text-(--vm-muted) block">
                            Longest streak
                        </span>
                        <span className="text-base font-bold text-(--vm-text) tracking-tight">
                            {longestStreak}{" "}
                            {longestStreak === 1 ? "day" : "days"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-(--vm-surface-2) p-3 border border-(--vm-border)/40 transition hover:border-(--vm-border)">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--vm-orange)/10 text-(--vm-orange)">
                        <Flame className="h-4 w-4 fill-(--vm-orange)/20" />
                    </div>
                    <div>
                        <span className="text-[11px] font-medium text-(--vm-muted) block">
                            Milestone target
                        </span>
                        <span className="text-base font-bold text-(--vm-text) tracking-tight">
                            {nextMilestone} days
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}