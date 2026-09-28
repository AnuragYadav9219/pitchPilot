import {
    ArrowDown,
    History,
} from "lucide-react";

interface HistoryHeaderProps {
    totalInterviews: number;
}

export function HistoryHeader({
    totalInterviews,
}: HistoryHeaderProps) {
    return (
        <header className="relative">
            <div className="relative">
                {/* Eyebrow */}
                <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--vm-primary)/10 text-(--vm-primary)">
                        <History className="h-4 w-4" />
                    </span>

                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-(--vm-primary)">
                        Interview Journey
                    </span>
                </div>

                {/* Main row */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    {/* Title */}
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-(--vm-text) sm:text-[42px]">
                            Interview History
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-(--vm-muted) sm:text-base">
                            Review your past interviews, track your performance, and see how your preparation is progressing over time.
                        </p>
                    </div>

                    {/* Total */}
                    <div className="shrink-0 pb-1 sm:pr-1">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold tracking-tight text-(--vm-text)">
                                {totalInterviews}
                            </span>

                            <span className="text-xs font-medium text-(--vm-muted)">
                                {totalInterviews === 1
                                    ? "interview"
                                    : "interviews"}
                            </span>
                        </div>

                        <p className="mt-0.5 text-[10px] text-(--vm-muted)">
                            Total sessions
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-6 border-t border-(--vm-border)" />

                {/* Scroll hint */}
                <div className="mt-3 flex items-center gap-2 text-xs text-(--vm-muted)">
                    <ArrowDown className="h-3.5 w-3.5 text-(--vm-primary)" />

                    <span>
                        Scroll to explore your previous sessions
                    </span>
                </div>
            </div>
        </header>
    );
}