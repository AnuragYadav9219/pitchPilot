interface HistorySkeletonProps {
    compact?: boolean;
}

export function HistorySkeleton({
    compact = false,
}: HistorySkeletonProps) {
    if (compact) {
        return (
            <div
                className="divide-y divide-(--vm-border) animate-pulse"
                aria-label="Loading interview history"
            >
                {Array.from({ length: 5 }).map((_, index) => (
                    <HistorySkeletonRow key={index} />
                ))}
            </div>
        );
    }

    return (
        <main className="min-h-full bg-(--vm-background) px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-374">

                {/* Header skeleton */}
                <div className="animate-pulse">

                    {/* Eyebrow */}
                    <div className="mb-3 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-(--vm-surface-2)" />
                        <div className="h-3 w-32 rounded-full bg-(--vm-surface-2)" />
                    </div>

                    {/* Title + total */}
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                        <div className="space-y-3">
                            <div className="h-10 w-64 rounded-lg bg-(--vm-surface-2) sm:h-11 sm:w-80" />

                            <div className="h-4 w-96 max-w-[80vw] rounded bg-(--vm-surface-2)" />
                            <div className="h-4 w-72 max-w-[65vw] rounded bg-(--vm-surface-2)" />
                        </div>

                        {/* Total */}
                        <div className="space-y-2 sm:pb-1">
                            <div className="h-6 w-24 rounded bg-(--vm-surface-2)" />
                            <div className="h-3 w-20 rounded bg-(--vm-surface-2)" />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mt-7 h-px bg-(--vm-border)" />

                    {/* Scroll hint */}
                    <div className="mt-4 flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-(--vm-surface-2)" />
                        <div className="h-3 w-48 rounded bg-(--vm-surface-2)" />
                    </div>
                </div>

                {/* History list */}
                <section className="mt-8 overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface)">
                    <div className="animate-pulse divide-y divide-(--vm-border)">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <HistorySkeletonRow key={index} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

function HistorySkeletonRow() {
    return (
        <div className="flex gap-3.5 px-4 py-5 sm:gap-4 sm:px-6 sm:py-6">

            {/* Interview icon */}
            <div className="h-10 w-10 shrink-0 rounded-xl bg-(--vm-surface-2) sm:h-11 sm:w-11" />

            {/* Content */}
            <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left */}
                    <div className="min-w-0 space-y-2.5">

                        {/* Role */}
                        <div className="h-4 w-44 max-w-[60%] rounded bg-(--vm-surface-2)" />

                        {/* Metadata */}
                        <div className="h-3 w-72 max-w-[85%] rounded bg-(--vm-surface-2)" />

                        {/* Topics */}
                        <div className="h-3 w-52 max-w-[70%] rounded bg-(--vm-surface-2)" />
                    </div>

                    {/* Score + action */}
                    <div className="flex items-center justify-between gap-4 border-t border-(--vm-border) pt-3.5 lg:border-0 lg:pt-0">

                        {/* Score */}
                        <div className="space-y-1.5">
                            <div className="h-6 w-14 rounded bg-(--vm-surface-2)" />
                            <div className="h-2.5 w-20 rounded bg-(--vm-surface-2)" />
                        </div>

                        {/* Action */}
                        <div className="h-9 w-9 rounded-xl bg-(--vm-surface-2)" />
                    </div>
                </div>
            </div>
        </div>
    );
}