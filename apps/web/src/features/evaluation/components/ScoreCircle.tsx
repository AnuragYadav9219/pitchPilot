interface ScoreCircleProps {
    score: number;
}

export function ScoreCircle({
    score,
}: ScoreCircleProps) {
    const safeScore = Math.max(
        0,
        Math.min(100, score),
    );

    const radius = 52;
    const circumference =
        2 * Math.PI * radius;

    const progress =
        circumference -
        (safeScore / 100) *
        circumference;

    return (
        <div className="relative h-36 w-36">
            <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 120 120"
            >
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-(--vm-surface-2)"
                />

                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={
                        circumference
                    }
                    strokeDashoffset={
                        progress
                    }
                    className="text-(--vm-primary) transition-all duration-1000"
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-(--vm-text)">
                    {safeScore}
                </span>

                <span className="text-xs text-(--vm-muted)">
                    / 100
                </span>
            </div>
        </div>
    );
}