import { motion } from "framer-motion";
import {
    Award,
    Flame,
    GraduationCap,
    Target,
    Timer,
    Trophy,
} from "lucide-react";

import type { DashboardStats as DashboardStatsType } from "../types";

interface DashboardStatsProps {
    stats: DashboardStatsType;
}

function formatPracticeTime(minutes: number) {
    if (minutes < 60) {
        return `${minutes}m`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
        return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes}m`;
}

export function DashboardStats({
    stats,
}: DashboardStatsProps) {
    const items = [
        {
            label: "Current streak",
            value: stats.currentStreak,
            suffix: stats.currentStreak === 1 ? "day" : "days",
            icon: Flame,
            color: "bg-(--vm-orange)/10 text-(--vm-orange)",
            showBadge: stats.currentStreak > 0,
        },
        {
            label: "Longest streak",
            value: stats.longestStreak,
            suffix: stats.longestStreak === 1 ? "day" : "days",
            icon: Trophy,
            color: "bg-(--vm-accent)/10 text-(--vm-accent)",
        },
        {
            label: "Average score",
            value: stats.averageScore,
            suffix: "/100",
            icon: Award,
            color: "bg-(--vm-primary)/10 text-(--vm-primary)",
        },
        {
            label: "Completion rate",
            value: stats.completionRate,
            suffix: "%",
            icon: Target,
            color: "bg-emerald-500/10 text-emerald-500",
        },
        {
            label: "Practice time",
            value: formatPracticeTime(stats.totalPracticeMinutes),
            suffix: "",
            icon: Timer,
            color: "bg-cyan-500/10 text-cyan-500",
        },
        {
            label: "Best score",
            value: stats.highestScore,
            suffix: "/100",
            icon: GraduationCap,
            color: "bg-indigo-500/10 text-indigo-500",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {items.map((item, index) => {
                const Icon = item.icon;

                return (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.05,
                        }}
                        className="group relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) p-4 transition-all duration-200 hover:border-(--vm-primary)/40 hover:shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${item.color}`}>
                                <Icon className="h-4 w-4" />
                            </div>

                            {item.showBadge && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-(--vm-orange)/15 text-[10px] text-(--vm-orange)">
                                    🔥
                                </span>
                            )}
                        </div>

                        <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-xl font-bold tracking-tight text-(--vm-text)">
                                {item.value}
                            </span>

                            {item.suffix && (
                                <span className="text-xs font-medium text-(--vm-muted)">
                                    {item.suffix}
                                </span>
                            )}
                        </div>

                        <p className="mt-0.5 text-xs font-medium text-(--vm-muted)">
                            {item.label}
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}