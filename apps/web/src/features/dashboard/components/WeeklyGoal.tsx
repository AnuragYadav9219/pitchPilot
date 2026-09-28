import { motion } from "framer-motion";
import { Target, Trophy, CheckCircle2 } from "lucide-react";

interface WeeklyGoalProps {
    activity: {
        date: string;
        count: number;
    }[];
}

export function WeeklyGoal({
    activity,
}: WeeklyGoalProps) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const monday = new Date(today);
    monday.setDate(today.getDate() - mondayOffset);
    monday.setHours(0, 0, 0, 0);

    // Filter and aggregate this week's activities
    const weekDaysMap = new Map<string, number>();
    
    // Initialize current week days to 0
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        weekDaysMap.set(`${yyyy}-${mm}-${dd}`, 0);
    }

    let completedThisWeek = 0;
    activity.forEach((item) => {
        const itemDate = new Date(`${item.date}T00:00:00`);
        if (itemDate >= monday && itemDate <= today) {
            completedThisWeek += item.count;
            const key = item.date;
            if (weekDaysMap.has(key)) {
                weekDaysMap.set(key, (weekDaysMap.get(key) ?? 0) + item.count);
            }
        }
    });

    const goal = 5;
    const progress = Math.min(
        100,
        (completedThisWeek / goal) * 100
    );

    const remaining = Math.max(
        0,
        goal - completedThisWeek
    );

    const isCompleted = completedThisWeek >= goal;

    return (
        <div className="relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) p-5 sm:p-6 shadow-sm">
            {/* Background subtle glow effect when completed */}
            {isCompleted && (
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-(--vm-primary)/10 blur-3xl pointer-events-none" />
            )}

            {/* Header Section */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isCompleted ? "bg-emerald-500/10 text-emerald-500" : "bg-(--vm-primary)/10 text-(--vm-primary)"}`}>
                        {isCompleted ? <Trophy className="h-5 w-5" /> : <Target className="h-5 w-5" />}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-semibold text-(--vm-text) tracking-tight">
                                Weekly goal
                            </h2>
                            {isCompleted && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
                                    <CheckCircle2 className="h-2.5 w-2.5" /> Achieved
                                </span>
                            )}
                        </div>
                        <p className="mt-0.5 text-xs sm:text-sm text-(--vm-muted)">
                            Build a consistent weekly practice habit.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-(--vm-surface-2) px-3 py-1 text-xs font-bold text-(--vm-text) border border-(--vm-border)/60">
                    <span className="text-(--vm-primary)">{completedThisWeek}</span>
                    <span className="text-(--vm-muted)">/ {goal}</span>
                </div>
            </div>

            {/* Progress Section */}
            <div className="mt-6">
                <div className="h-3 overflow-hidden rounded-full bg-(--vm-surface-3) p-0.5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                        }}
                        className={`h-full rounded-full ${isCompleted ? "bg-emerald-500 shadow-xs shadow-emerald-500/30" : "bg-linear-to-r from-(--vm-primary)/70 to-(--vm-primary) shadow-xs shadow-(--vm-primary)/30"}`}
                    />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-medium text-(--vm-muted)">
                        {isCompleted
                            ? "Goal completed! Amazing work 🎉"
                            : `${remaining} ${remaining === 1 ? "interview" : "interviews"} more to reach your goal`}
                    </span>

                    <span className="font-bold text-(--vm-text)">
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>
        </div>
    );
}