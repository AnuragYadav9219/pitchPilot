import {
    TrendingDown,
    TrendingUp,
} from "lucide-react";

import { Card } from "@/components/ui";

interface OverallScoreProps {
    current: number | null;
    previous: number | null;
    change: number | null;
}

export function OverallScore({
    current,
    previous,
    change,
}: OverallScoreProps) {
    const improved = change != null && change > 0;
    const declined = change != null && change < 0;

    return (
        <Card className="relative overflow-hidden p-6">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-(--vm-primary)/10 blur-3xl"
            />

            <div className="relative">
                <p className="text-xs font-medium text-(--vm-muted)">
                    Overall score
                </p>

                <div className="mt-4 flex items-end gap-2">
                    <span className="text-5xl font-semibold tracking-tight text-(--vm-text)">
                        {current ?? "—"}
                    </span>

                    {current != null && (
                        <span className="mb-1 text-xs text-(--vm-muted)">
                            / 100
                        </span>
                    )}
                </div>

                {change != null ? (
                    <div className="mt-4 flex items-center gap-2">
                        <span
                            className={[
                                "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium",
                                improved
                                    ? "bg-(--vm-success)/10 text-(--vm-success)"
                                    : declined
                                        ? "bg-(--vm-danger)/10 text-(--vm-danger)"
                                        : "bg-(--vm-surface-2) text-(--vm-muted)",
                            ].join(" ")}
                        >
                            {improved && (
                                <TrendingUp size={12} />
                            )}

                            {declined && (
                                <TrendingDown size={12} />
                            )}

                            {change > 0 ? "+" : ""}
                            {change}%
                        </span>

                        <span className="text-[11px] text-(--vm-muted)">
                            vs previous session
                        </span>
                    </div>
                ) : (
                    <p className="mt-4 text-xs text-(--vm-muted)">
                        {previous == null
                            ? "Complete more sessions to track improvement."
                            : "Your current score."}
                    </p>
                )}
            </div>
        </Card>
    );
}