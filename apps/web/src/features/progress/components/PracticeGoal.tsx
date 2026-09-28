import { motion } from "framer-motion";
import { CheckCircle2, Flame, Target } from "lucide-react";
import type { GoalProgress } from "../types";

interface PracticeGoalProps {
    goal: GoalProgress;
}

export default function PracticeGoal({
    goal,
}: PracticeGoalProps) {
    const percentage = Math.min(
        100,
        Math.max(0, goal.percentage)
    );

    const isCompleted = goal.completed >= goal.target;

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            whileHover={{ y: -2 }}
            className="group relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 shadow-xs transition-shadow duration-300 hover:shadow-md sm:p-6"
        >
            {/* Top Header Row */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Target className="h-5 w-5" />}
                    </div>

                    <div className="space-y-0.5">
                        <h2 className="text-base font-bold text-(--vm-text)">
                            Weekly practice goal
                        </h2>
                        <p className="text-sm text-(--vm-muted)">
                            Build consistency with regular mock interviews.
                        </p>
                    </div>
                </div>

                {/* Counter Badge */}
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isCompleted
                        ? "bg-(--vm-success)/10 text-(--vm-success) border border-(--vm-success)/20"
                        : "bg-(--vm-surface-2) text-(--vm-text)"
                    }`}>
                    {isCompleted && <Flame className="h-3.5 w-3.5" />}
                    <span>{goal.completed}/{goal.target}</span>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-(--vm-surface-3) p-0.5">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                    className={`h-full rounded-full bg-(--vm-primary) transition-all ${isCompleted ? "bg-linear-to-r from-(--vm-primary) to-(--vm-success)" : ""
                        }`}
                />
            </div>

            {/* Footer Info Row */}
            <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-medium text-(--vm-muted)">
                    {percentage.toFixed(0)}% completed
                </span>

                {isCompleted ? (
                    <span className="font-semibold text-(--vm-success) flex items-center gap-1">
                        Goal achieved!
                    </span>
                ) : (
                    <span className="text-(--vm-muted) font-medium">
                        <strong className="text-(--vm-text)">{goal.target - goal.completed}</strong> more interview{goal.target - goal.completed === 1 ? "" : "s"} to go
                    </span>
                )}
            </div>
        </motion.section>
    );
}