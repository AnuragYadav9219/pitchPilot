import { motion } from "framer-motion";
import { ArrowRight, Target, Sparkles, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { DashboardSkillScore } from "../types";

interface FocusAreaProps {
    skills: DashboardSkillScore[];
}

export function FocusArea({
    skills,
}: FocusAreaProps) {
    const navigate = useNavigate();

    if (!skills || skills.length === 0) {
        return null;
    }

    const lowestSkill = [...skills].sort(
        (a, b) => a.score - b.score
    )[0];

    const scoreValue = Math.round(lowestSkill.score);

    // Dynamic styling or message based on score thresholds
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        if (score >= 50) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
        return "text-rose-500 bg-rose-500/10 border-rose-500/20";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) p-5 sm:p-6 shadow-sm"
        >
            {/* Background subtle glowing accent */}
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-(--vm-primary)/10 blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary) shadow-inner">
                        <Target className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-(--vm-muted)">
                                Recommended Focus Area
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-(--vm-primary)/10 px-2 py-0.5 text-[10px] font-semibold text-(--vm-primary)">
                                <Sparkles className="h-2.5 w-2.5" /> AI Pick
                            </span>
                        </div>

                        <h2 className="mt-1 text-lg font-bold text-(--vm-text) tracking-tight">
                            {lowestSkill.name}
                        </h2>

                        <p className="mt-1.5 text-sm leading-relaxed text-(--vm-muted)">
                            Your current benchmark is{" "}
                            <strong className="text-(--vm-text)">{scoreValue}/100</strong>. Dedicate your next mock session here to unlock accelerated overall growth.
                        </p>
                    </div>
                </div>

                {/* Score badge indicator */}
                <div className={`hidden sm:flex flex-col items-center justify-center rounded-2xl border px-3.5 py-2 text-center shrink-0 ${getScoreColor(scoreValue)}`}>
                    <span className="text-xl font-extrabold tracking-tight">{scoreValue}</span>
                    <span className="text-[10px] uppercase font-semibold opacity-80">Score</span>
                </div>
            </div>

            {/* Action button */}
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-(--vm-border)/60">
                <div className="flex items-center gap-1.5 text-xs text-(--vm-muted)">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                    <span>Targeted practice recommended</span>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/practice")}
                    className="group cursor-pointer inline-flex items-center gap-2 rounded-xl bg-(--vm-primary) px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-(--vm-primary)/20 transition-all duration-200 hover:bg-(--vm-primary-pressed) hover:scale-[1.02] active:scale-95"
                >
                    <span>Practice now</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
            </div>
        </motion.div>
    );
}