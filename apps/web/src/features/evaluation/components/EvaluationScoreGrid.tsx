interface EvaluationScoreGridProps {
    communication: number;
    clarity: number;
    confidence: number;
    relevance: number;
}

const scores = [
    {
        key: "communication",
        label: "Communication",
        description:
            "How effectively you communicated",
    },
    {
        key: "clarity",
        label: "Clarity",
        description:
            "How clear and structured your answers were",
    },
    {
        key: "confidence",
        label: "Confidence",
        description:
            "How confident and composed you appeared",
    },
    {
        key: "relevance",
        label: "Relevance",
        description:
            "How directly you answered the scenario",
    },
] as const;

export function EvaluationScoreGrid({
    communication,
    clarity,
    confidence,
    relevance,
}: EvaluationScoreGridProps) {
    const values = {
        communication,
        clarity,
        confidence,
        relevance,
    };

    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {scores.map((item) => (
                <div
                    key={item.key}
                    className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-4"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-(--vm-text)">
                                {item.label}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                                {item.description}
                            </p>
                        </div>

                        <span className="shrink-0 text-xl font-bold text-(--vm-primary)">
                            {values[item.key]}
                        </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-(--vm-surface-2)">
                        <div
                            className="h-full rounded-full bg-(--vm-primary) transition-all duration-700"
                            style={{
                                width: `${values[item.key]}%`,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}