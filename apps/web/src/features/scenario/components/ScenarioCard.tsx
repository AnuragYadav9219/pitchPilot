import {
    ArrowRight,
    Clock3,
    Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Card } from "@/components/ui";

import type {
    Scenario,
    ScenarioDifficulty,
} from "../types";

interface ScenarioCardProps {
    scenario: Scenario;
}

const difficultyStyles: Record<
    ScenarioDifficulty,
    string
> = {
    BEGINNER: "bg-(--vm-success)/10 text-(--vm-success)",

    INTERMEDIATE: "bg-(--vm-warning)/10 text-(--vm-warning)",

    ADVANCED: "bg-(--vm-danger)/10 text-(--vm-danger)",
};

export function ScenarioCard({
    scenario,
}: ScenarioCardProps) {
    return (
        <Link
            to={`/practice/scenario/${scenario.id}`}
            className="group block"
        >
            <Card
                className="h-full p-5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-(--vm-primary)/30 group-hover:shadow-lg"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                        <Sparkles size={20} />
                    </div>

                    <span
                        className={[
                            "rounded-full px-2.5 py-1",
                            "text-[10px] font-semibold",
                            difficultyStyles[
                            scenario.difficulty
                            ],
                        ].join(" ")}
                    >
                        {scenario.difficulty}
                    </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-(--vm-text)">
                    {scenario.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    {scenario.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-(--vm-muted)">
                        <Clock3 size={14} />

                        {scenario.estimatedMinutes} min
                    </div>

                    <span
                        className="flex items-center gap-1 text-sm font-medium text-(--vm-primary)"
                    >
                        Practice

                        <ArrowRight
                            size={15}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {scenario.tags.map(
                        (tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-(--vm-surface-2) px-2 py-1 text-[10px] text-(--vm-muted)"
                            >
                                {tag}
                            </span>
                        ),
                    )}
                </div>
            </Card>
        </Link>
    );
}