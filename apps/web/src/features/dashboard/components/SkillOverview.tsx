import { Card } from "@/components/ui";
import { Target } from "lucide-react";
import { SkillBar } from "./SkillBar";

interface SkillOverviewProps {
    communication: number | null;
    clarity: number | null;
    confidence: number | null;
    relevance: number | null;
}

export function SkillOverview({
    communication,
    clarity,
    confidence,
    relevance,
}: SkillOverviewProps) {
    const skills = [
        {
            label: "Communication",
            value: communication,
        },
        {
            label: "Clarity",
            value: clarity,
        },
        {
            label: "Confidence",
            value: confidence,
        },
        {
            label: "Relevance",
            value: relevance,
        },
    ];

    return (
        <Card className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-(--vm-text)">
                        Your communication skills
                    </p>

                    <p className="mt-1 text-xs text-(--vm-muted)">
                        Average performance across your
                        completed sessions.
                    </p>
                </div>

                <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary) sm:flex">
                    <Target size={17} />
                </div>
            </div>

            <div className="mt-6 space-y-5">
                {skills.map((skill) => (
                    <SkillBar
                        key={skill.label}
                        label={skill.label}
                        value={skill.value}
                    />
                ))}
            </div>
        </Card>
    );
}