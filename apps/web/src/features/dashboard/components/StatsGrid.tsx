import { Card } from "@/components/ui";
import { Award, BarChart3, CheckCircle2, MessageCircle } from "lucide-react";
import { formatScore } from "../hooks/useFormatters";

interface StatsGridProps {
    totalSessions: number;
    completedSessions: number;
    averageScore: number | null;
    bestScore: number | null;
}

export function StatsGrid({
    totalSessions,
    completedSessions,
    averageScore,
    bestScore,
}: StatsGridProps) {
    const stats = [
        {
            label: "Practice sessions",
            value: totalSessions,
            icon: MessageCircle,
            description: `${completedSessions} evaluated`,
        },
        {
            label: "Average score",
            value: formatScore(averageScore),
            icon: BarChart3,
            description: "Across completed sessions",
        },
        {
            label: "Best score",
            value: formatScore(bestScore),
            icon: Award,
            description: "Your highest evaluation",
        },
        {
            label: "Completed",
            value: completedSessions,
            icon: CheckCircle2,
            description: "Evaluated sessions",
        },
    ];

    return (
        <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <Card
                        key={stat.label}
                        className="p-5"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium text-(--vm-muted)">
                                    {stat.label}
                                </p>

                                <p className="mt-2 text-2xl font-semibold tracking-tight text-(--vm-text)">
                                    {stat.value}
                                </p>
                            </div>

                            <div
                                className="
                                    flex h-9 w-9 items-center
                                    justify-center rounded-xl
                                    bg-(--vm-primary)/10
                                    text-(--vm-primary)
                                "
                            >
                                <Icon size={17} />
                            </div>
                        </div>

                        <p className="mt-3 text-[11px] text-(--vm-muted)">
                            {stat.description}
                        </p>
                    </Card>
                );
            })}
        </section>
    );
}