import {
    Brain,
    CheckCircle2,
    MessageCircle,
    Target,
} from "lucide-react";

interface SkillScoreCardProps {
    label: string;
    score: number | null;
    description: string;
    type: "communication" | "clarity" | "confidence" | "relevance";
}

const icons = {
    communication: MessageCircle,
    clarity: CheckCircle2,
    confidence: Brain,
    relevance: Target,
};

export function SkillScoreCard({
    label,
    score,
    description,
    type,
}: SkillScoreCardProps) {
    const Icon = icons[type];
    const value = score ?? 0;

    return (
        <div className="rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-surface) p-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-(--vm-text)">
                        {label}
                    </p>

                    <p className="mt-1 text-xs text-(--vm-muted)">
                        {description}
                    </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <Icon size={17} />
                </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
                <span className="text-2xl font-semibold tracking-tight text-(--vm-text)">
                    {score == null ? "—" : score}
                </span>

                <span className="text-[11px] text-(--vm-muted)">
                    / 100
                </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-(--vm-surface-2)">
                <div
                    className="h-full rounded-full bg-(--vm-primary) transition-all duration-700"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}