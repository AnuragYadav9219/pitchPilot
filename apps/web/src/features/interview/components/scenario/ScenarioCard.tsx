import { ArrowRight, Clock3, Code2, Layers3, MessageSquare, Users } from "lucide-react";
import type { Scenario } from "../../types";

interface ScenarioCardProps {
    scenario: Scenario;
    onStart: (scenario: Scenario) => void;
    isStarting?: boolean;
}

const categoryIcons = {
    TECHNICAL: Code2,
    BEHAVIORAL: Users,
    HR: MessageSquare,
    SYSTEM_DESIGN: Layers3,
    LEADERSHIP: Users,
    PRESENTATION: MessageSquare,
};

const difficultyLabels = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
};

export function ScenarioCard({ scenario, onStart, isStarting = false }: ScenarioCardProps) {
    const Icon = categoryIcons[scenario.category] ?? Code2;

    return (
        <article className="group flex h-full flex-col rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--vm-primary)/30 hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <Icon size={20} strokeWidth={1.8} />
                </div>

                <span className="rounded-full bg-(--vm-surface-2) px-2.5 py-1 text-[10px] font-semibold text-(--vm-muted)">
                    {difficultyLabels[scenario.difficulty]}
                </span>
            </div>

            <div className="mt-5 flex-1">
                <h2 className="text-base font-semibold text-(--vm-text)">{scenario.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-(--vm-muted)">{scenario.description}</p>

                <div className="mt-4 flex items-center gap-2 text-xs text-(--vm-muted)">
                    <Clock3 size={14} />
                    <span>{scenario.estimatedMinutes} minutes</span>
                </div>

                <p className="mt-3 text-xs font-medium text-(--vm-text)">
                    Focus: <span className="font-normal text-(--vm-muted)">{scenario.focus}</span>
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {scenario.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="rounded-md border border-(--vm-border) bg-(--vm-surface-2) px-2 py-1 text-[10px] font-medium text-(--vm-muted)">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <button
                type="button"
                disabled={isStarting}
                onClick={() => onStart(scenario)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-(--vm-primary) px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isStarting ? (
                    <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Starting...
                    </>
                ) : (
                    <>
                        Start interview
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                )}
            </button>
        </article>
    );
}