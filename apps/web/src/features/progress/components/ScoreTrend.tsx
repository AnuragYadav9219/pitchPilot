import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";
import { useState } from "react";
import type { ScoreTrendPoint } from "../types";

interface ScoreTrendProps {
    scoreTrend: ScoreTrendPoint[];
}

function formatDate(value: string | null) {
    if (!value) return "Recent";
    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
    }).format(new Date(value));
}

export default function ScoreTrend({
    scoreTrend,
}: ScoreTrendProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // SVG Chart Dimensions mapping
    const height = 180;
    const width = 600;
    const padding = 20;

    const scores = scoreTrend.map((p) => p.score);
    const minScore = 0;
    const maxScore = 100;

    // Calculate coordinates for SVG line path
    const points = scoreTrend.map((point, index) => {
        const x = scoreTrend.length === 1
            ? width / 2
            : padding + (index / (scoreTrend.length - 1)) * (width - padding * 2);

        const y = height - padding - ((point.score - minScore) / (maxScore - minScore)) * (height - padding * 2);
        return { x, y, ...point };
    });

    const pathString = points.reduce((acc, pt, i) => {
        return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, "");

    // Closed area path for gradient fill under the line
    const areaString = points.length > 0
        ? `${pathString} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
        : "";

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            whileHover={{ y: -2 }}
            className="group relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 shadow-xs transition-shadow duration-300 hover:shadow-md sm:p-6"
        >
            {/* Header Row */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                        <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-(--vm-text)">
                            Score Progress
                        </h2>
                        <p className="text-sm text-(--vm-muted)">
                            Your interview performance trajectory over time
                        </p>
                    </div>
                </div>

                {scoreTrend.length > 0 && (
                    <div className="flex items-center gap-1.5 rounded-full bg-(--vm-primary)/10 px-3 py-1 text-xs font-semibold text-(--vm-primary)">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>{scores[scores.length - 1].toFixed(0)}% latest</span>
                    </div>
                )}
            </div>

            {/* Chart Body or Empty State */}
            {scoreTrend.length === 0 ? (
                <div className="flex h-56 flex-col items-center justify-center text-center">
                    <p className="text-sm font-medium text-(--vm-text)">No trend data available</p>
                    <p className="text-xs text-(--vm-muted) mt-1">Complete multiple interviews to unlock progress charts.</p>
                </div>
            ) : (
                <div className="mt-6 relative">

                    {/* Interactive Tooltip Card Preview */}
                    <div className="absolute top-0 right-0 h-8 flex items-center">
                        {activeIndex !== null && points[activeIndex] ? (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-lg bg-(--vm-surface-2) border border-(--vm-border) px-2.5 py-1 text-xs font-medium text-(--vm-text) shadow-xs"
                            >
                                <span className="text-(--vm-primary) font-bold">{points[activeIndex].score.toFixed(0)}%</span>
                                <span className="text-(--vm-muted) ml-1.5">• {formatDate(points[activeIndex].date)}</span>
                            </motion.div>
                        ) : (
                            <span className="text-[11px] text-(--vm-muted) italic">Hover over data points</span>
                        )}
                    </div>

                    {/* SVG Graph View */}
                    <div className="pt-8">
                        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 overflow-visible">
                            <defs>
                                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--vm-primary)" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="var(--vm-primary)" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>

                            {/* Background Reference Grid Lines */}
                            {[0.25, 0.5, 0.75].map((ratio) => (
                                <line
                                    key={ratio}
                                    x1={padding}
                                    y1={padding + (height - padding * 2) * ratio}
                                    x2={width - padding}
                                    y2={padding + (height - padding * 2) * ratio}
                                    stroke="currentColor"
                                    strokeOpacity="0.06"
                                    strokeDasharray="4 4"
                                />
                            ))}

                            {/* Gradient Area under line */}
                            {areaString && (
                                <path d={areaString} fill="url(#scoreGradient)" />
                            )}

                            {/* Trend Line */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                d={pathString}
                                fill="none"
                                stroke="var(--vm-primary)"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Interactive Data Points */}
                            {points.map((pt, i) => (
                                <g key={i} className="cursor-pointer" onMouseEnter={() => setActiveIndex(i)} onMouseLeave={() => setActiveIndex(null)}>
                                    {/* Outer Pulsing Ring on Hover */}
                                    {activeIndex === i && (
                                        <circle cx={pt.x} cy={pt.y} r={10} fill="var(--vm-primary)" fillOpacity={0.2} />
                                    )}
                                    {/* Inner Node Circle */}
                                    <circle
                                        cx={pt.x}
                                        cy={pt.y}
                                        r={activeIndex === i ? 6 : 4}
                                        className="fill-(--vm-surface) stroke-(--vm-primary) transition-all duration-200"
                                        strokeWidth={3}
                                    />
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>
            )}
        </motion.section>
    );
}