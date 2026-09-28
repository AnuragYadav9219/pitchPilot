import { motion } from "framer-motion";
import { BrainCircuit, TrendingUp, TrendingDown } from "lucide-react";
import type { SkillProgress } from "../types";

interface SkillPerformanceProps {
    skills: SkillProgress[];
}

export default function SkillPerformance({
    skills,
}: SkillPerformanceProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
            whileHover={{ y: -2 }}
            className="group relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 shadow-xs transition-shadow duration-300 hover:shadow-md sm:p-6"
        >
            {/* Section Header */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                        <BrainCircuit className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-(--vm-text)">
                            Skill Performance
                        </h2>
                        <p className="text-sm text-(--vm-muted)">
                            See how each individual interview skill is developing over time.
                        </p>
                    </div>
                </div>

                {skills.length > 0 && (
                    <span className="rounded-full bg-(--vm-surface-2) px-3 py-1 text-xs font-semibold text-(--vm-muted)">
                        {skills.length} tracked
                    </span>
                )}
            </div>

            {/* Content Area */}
            {skills.length === 0 ? (
                <div className="flex h-48 flex-col items-center justify-center text-center">
                    <p className="text-sm font-medium text-(--vm-text)">No skill data available</p>
                    <p className="text-xs text-(--vm-muted) mt-1">Skill metrics will appear after your first completed evaluation.</p>
                </div>
            ) : (
                <div className="mt-6 space-y-6">
                    {skills.map((skill, index) => {
                        const improvement = skill.improvementPercentage;
                        const score = Math.min(100, Math.max(0, skill.currentScore));

                        return (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                                className="space-y-2"
                            >
                                {/* Skill Name & Current Score Row */}
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm font-semibold text-(--vm-text)">
                                        {skill.name}
                                    </span>
                                    <span className="text-sm font-bold text-(--vm-text)">
                                        {score.toFixed(0)}%
                                    </span>
                                </div>

                                {/* Animated Progress Bar Track */}
                                <div className="h-2.5 overflow-hidden rounded-full bg-(--vm-surface-3) p-0.5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${score}%` }}
                                        transition={{
                                            duration: 0.8,
                                            ease: "easeOut",
                                            delay: 0.45 + index * 0.05,
                                        }}
                                        className="h-full rounded-full bg-(--vm-primary) transition-all"
                                    />
                                </div>

                                {/* Subtext: Previous Score & Growth Indicator */}
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-[11px] text-(--vm-muted)">
                                        Previous: <strong className="text-(--vm-text)">{skill.previousScore.toFixed(0)}%</strong>
                                    </span>

                                    <span
                                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ${improvement >= 0
                                                ? "bg-(--vm-success)/10 text-(--vm-success)"
                                                : "bg-(--vm-danger)/10 text-(--vm-danger)"
                                            }`}
                                    >
                                        {improvement >= 0 ? (
                                            <TrendingUp className="h-3 w-3" />
                                        ) : (
                                            <TrendingDown className="h-3 w-3" />
                                        )}
                                        {improvement >= 0 ? "+" : ""}
                                        {improvement.toFixed(1)}%
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </motion.section>
    );
}