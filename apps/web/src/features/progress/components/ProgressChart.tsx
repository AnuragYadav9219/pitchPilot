import type { ProgressTrendPoint } from "../types";

interface ProgressChartProps {
    points: ProgressTrendPoint[];
}

const DIMENSIONS = {
    width: 800,
    height: 260,
    paddingX: 32, // Increased slightly to accommodate axis labels
    paddingY: 24,
} as const;

const GRID_VALUES = [0, 25, 50, 75, 100] as const;

export function ProgressChart({ points }: ProgressChartProps) {
    const validPoints = points.filter((point) => point.score != null);

    if (validPoints.length === 0) {
        return (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-(--vm-border-strong)">
                <p className="text-sm text-(--vm-muted)">
                    Complete more sessions to see your progress.
                </p>
            </div>
        );
    }

    if (validPoints.length === 1) {
        return (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-(--vm-border-strong)">
                <p className="text-3xl font-semibold text-(--vm-text)">
                    {validPoints[0].score}
                </p>
                <p className="mt-2 text-xs text-(--vm-muted)">
                    Complete another session to see your progress trend.
                </p>
            </div>
        );
    }

    const { width, height, paddingX, paddingY } = DIMENSIONS;
    const chartWidth = width - paddingX * 2;
    const chartHeight = height - paddingY * 2;

    const getX = (index: number) =>
        paddingX + (index / (validPoints.length - 1)) * chartWidth;

    const getY = (score: number) =>
        paddingY + chartHeight - (score / 100) * chartHeight;

    const pointsString = validPoints
        .map((point, index) => `${getX(index)},${getY(point.score ?? 0)}`)
        .join(" ");

    return (
        <div className="overflow-hidden rounded-xl border border-(--vm-border) bg-(--vm-background)/40 p-3 sm:p-5">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="h-auto w-full"
                preserveAspectRatio="none"
                role="img"
                aria-label="Overall score progress"
            >
                {/* Background Grid Lines & Labels */}
                {GRID_VALUES.map((value) => {
                    const y = getY(value);
                    return (
                        <g key={value}>
                            <line
                                x1={paddingX}
                                x2={width - paddingX}
                                y1={y}
                                y2={y}
                                stroke="currentColor"
                                className="text-(--vm-border)"
                                strokeWidth="1"
                            />
                            <text
                                x={paddingX - 24}
                                y={y + 4}
                                className="fill-(--vm-muted)"
                                fontSize="11"
                            >
                                {value}
                            </text>
                        </g>
                    );
                })}

                {/* Trend Polyline */}
                <polyline
                    points={pointsString}
                    fill="none"
                    stroke="var(--vm-primary)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Data Points */}
                {validPoints.map((point, index) => (
                    <circle
                        key={`${point.sessionNumber}-${index}`}
                        cx={getX(index)}
                        cy={getY(point.score ?? 0)}
                        r="5"
                        fill="var(--vm-background)"
                        stroke="var(--vm-primary)"
                        strokeWidth="3"
                    />
                ))}
            </svg>

            {/* Session Range Footer */}
            <div className="mt-2 flex justify-between px-2 text-[10px] text-(--vm-muted)">
                <span>Session {validPoints[0].sessionNumber}</span>
                <span>Session {validPoints[validPoints.length - 1].sessionNumber}</span>
            </div>
        </div>
    );
}