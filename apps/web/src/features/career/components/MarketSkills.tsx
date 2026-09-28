import { BarChart3, CheckCircle2, TrendingUp } from "lucide-react";
import type { SkillDemand } from "../types";

interface MarketSkillsProps {
    skills: SkillDemand[];
}

export function MarketSkills({ skills }: MarketSkillsProps) {
    const visibleSkills = skills.slice(0, 8);

    return (
        <section className="vm-card overflow-hidden">
            {/* Header */}
            <div className="border-b border-(--vm-border) p-5 sm:p-6">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-(--vm-radius-md) border border-(--vm-primary)/15 bg-(--vm-primary)/10 text-(--vm-primary)">
                        <BarChart3 size={18} />
                    </div>

                    <div>
                        <h2 className="text-base font-bold text-(--vm-text)">
                            Skills the market wants
                        </h2>
                        <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                            Most requested skills across analyzed job postings.
                        </p>
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div className="space-y-5 p-5 sm:p-6">
                {visibleSkills.map((skill, index) => {
                    const percentage = Math.min(Math.max(skill.percentage, 2), 100);

                    return (
                        <div key={`${skill.skill}-${index}`}>
                            <div className="mb-2 flex items-center justify-between gap-4">
                                <div className="flex min-w-0 items-center gap-2">
                                    {index < 3 ? (
                                        <CheckCircle2 size={14} className="shrink-0 text-(--vm-primary)" />
                                    ) : (
                                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--vm-border-strong)" />
                                    )}

                                    <span className="truncate text-sm font-semibold text-(--vm-text)">
                                        {skill.skill}
                                    </span>
                                </div>

                                <span className="shrink-0 text-xs font-semibold text-(--vm-muted)">
                                    {skill.percentage}%
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-(--vm-surface-3)">
                                <div
                                    className="h-full rounded-full bg-linear-to-r from-(--vm-gradient-start) via-(--vm-gradient-middle) to-(--vm-gradient-end) shadow-[0_0_10px_var(--vm-glow-coral)] transition-all duration-700"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>

                            <div className="mt-1.5 flex items-center gap-1 text-[10px] text-(--vm-muted)">
                                <TrendingUp size={11} />
                                {skill.jobCount} job postings
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}