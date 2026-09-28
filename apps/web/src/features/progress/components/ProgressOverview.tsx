import { motion } from "framer-motion";
import {
    Award,
    BarChart3,
    Flame,
    Target,
    TrendingUp,
    Trophy,
} from "lucide-react";

interface ProgressOverviewProps {
    overallScore: number;
    improvementPercentage: number;
    highestScore: number;
    completedInterviews: number;
    currentStreak: number;
    weeklyInterviews: number;
}

interface Metric {
    label: string;
    value: string;
    description: string;
    icon: React.ElementType;
    colorClass: string;
    bgClass: string;
}

export default function ProgressOverview({
    overallScore,
    improvementPercentage,
    highestScore,
    completedInterviews,
    currentStreak,
    weeklyInterviews,
}: ProgressOverviewProps) {
    const metrics: Metric[] = [
        {
            label: "Average score",
            value: `${overallScore.toFixed(1)}%`,
            description: "Across completed interviews",
            icon: BarChart3,
            colorClass: "text-(--vm-primary)",
            bgClass: "bg-(--vm-primary)/10",
        },
        {
            label: "Improvement",
            value: `${improvementPercentage >= 0 ? "+" : ""}${improvementPercentage.toFixed(1)}%`,
            description: "Compared with previous score",
            icon: TrendingUp,
            colorClass: improvementPercentage >= 0 ? "text-(--vm-success)" : "text-(--vm-danger)",
            bgClass: improvementPercentage >= 0 ? "bg-(--vm-success)/10" : "bg-(--vm-danger)/10",
        },
        {
            label: "Best score",
            value: `${highestScore.toFixed(1)}%`,
            description: "Your highest interview score",
            icon: Trophy,
            colorClass: "text-amber-500",
            bgClass: "bg-amber-500/10",
        },
        {
            label: "Interviews",
            value: completedInterviews.toString(),
            description: "Completed interviews",
            icon: Award,
            colorClass: "text-(--vm-primary)",
            bgClass: "bg-(--vm-primary)/10",
        },
        {
            label: "Current streak",
            value: `${currentStreak}d`,
            description: "Keep practicing consistently",
            icon: Flame,
            colorClass: "text-orange-500",
            bgClass: "bg-orange-500/10",
        },
        {
            label: "This week",
            value: `${weeklyInterviews}/5`,
            description: "Weekly practice goal",
            icon: Target,
            colorClass: "text-(--vm-success)",
            bgClass: "bg-(--vm-success)/10",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-6">
            {metrics.map((metric, index) => {
                const Icon = metric.icon;

                return (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: index * 0.05,
                            ease: "easeOut",
                        }}
                        whileHover={{ y: -3 }}
                        className="group relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-4 shadow-xs transition-all duration-300 hover:border-(--vm-border-strong) hover:shadow-md"
                    >
                        {/* Ambient Accent Glow on Hover */}
                        <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-(--vm-primary)/5 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Top Icon & Indicator Row */}
                        <div className="flex items-center justify-between gap-2">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${metric.bgClass} ${metric.colorClass} transition-transform duration-300 group-hover:scale-105`}>
                                <Icon className="h-4 w-4" />
                            </div>

                            {metric.label === "Improvement" && improvementPercentage !== 0 && (
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${improvementPercentage > 0
                                        ? "bg-(--vm-success)/10 text-(--vm-success)"
                                        : "bg-(--vm-danger)/10 text-(--vm-danger)"
                                    }`}>
                                    {improvementPercentage > 0 ? "↗" : "↘"} {Math.abs(improvementPercentage).toFixed(0)}%
                                </span>
                            )}
                        </div>

                        {/* Metric Body Content */}
                        <div className="mt-4 space-y-0.5">
                            <p className="text-[11px] font-medium uppercase tracking-wider text-(--vm-muted)">
                                {metric.label}
                            </p>

                            <p className="text-xl font-extrabold tracking-tight text-(--vm-text)">
                                {metric.value}
                            </p>

                            <p className="pt-1 text-[11px] leading-relaxed text-(--vm-muted)">
                                {metric.description}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}