import { motion } from "framer-motion";
import {
    Brain,
    MessageCircle,
    ShieldCheck,
    Wrench,
    Sparkles,
    BarChart3,
} from "lucide-react";

import type { DashboardSkillScore } from "../types";

interface SkillPerformanceProps {
    skills: DashboardSkillScore[];
}

function getSkillTheme(name: string) {
    switch (name) {
        case "Technical":
            return { icon: Wrench, color: "text-cyan-500 bg-cyan-500/10" };
        case "Communication":
            return { icon: MessageCircle, color: "text-indigo-500 bg-indigo-500/10" };
        case "Problem Solving":
            return { icon: Brain, color: "text-(--vm-accent) bg-(--vm-accent)/10" };
        case "Confidence":
            return { icon: ShieldCheck, color: "text-emerald-500 bg-emerald-500/10" };
        default:
            return { icon: Brain, color: "text-(--vm-primary) bg-(--vm-primary)/10" };
    }
}

export function SkillPerformance({
    skills,
}: SkillPerformanceProps) {
    if (!skills || skills.length === 0) {
        return (
            <div className="rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) p-5 sm:p-6 shadow-sm text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-(--vm-surface-2) text-(--vm-muted) mb-3">
                    <BarChart3 className="h-5 w-5" />
                </div>
                <h2 className="font-semibold text-(--vm-text) tracking-tight">
                    Skill performance
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-(--vm-muted)">
                    Complete an evaluated interview to see your detailed skill breakdown.
                </p>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) p-5 sm:p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-(--vm-text) tracking-tight">
                            Skill performance
                        </h2>
                        <span className="inline-flex items-center gap-1 rounded-full bg-(--vm-primary)/10 px-2 py-0.5 text-[10px] font-medium text-(--vm-primary)">
                            <Sparkles className="h-2.5 w-2.5" /> Evaluated
                        </span>
                    </div>
                    <p className="mt-0.5 text-xs sm:text-sm text-(--vm-muted)">
                        Your average performance breakdown across completed interviews.
                    </p>
                </div>
            </div>

            {/* Skill list */}
            <div className="mt-6 space-y-4">
                {skills.map((skill, index) => {
                    const { icon: Icon, color } = getSkillTheme(skill.name);
                    const score = Math.round(skill.score);

                    return (
                        <div key={skill.name} className="group rounded-xl bg-(--vm-surface-2)/40 border border-(--vm-border)/40 p-3.5 transition hover:border-(--vm-border)">
                            <div className="mb-2.5 flex items-center justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <span className="truncate text-xs sm:text-sm font-semibold text-(--vm-text)">
                                        {skill.name}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs sm:text-sm font-bold text-(--vm-text)">
                                        {score}
                                    </span>
                                    <span className="text-[11px] text-(--vm-muted)">/100</span>
                                </div>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-(--vm-surface-3) p-0.5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${Math.min(100, Math.max(0, score))}%`,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.08,
                                        ease: "easeOut",
                                    }}
                                    className={`h-full rounded-full ${score >= 80
                                        ? "bg-emerald-500"
                                        : score >= 50
                                            ? "bg-(--vm-primary)"
                                            : "bg-amber-500"
                                        }`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}