export function SubscriptionSkeleton() {
    return (
        <main className="min-h-full bg-(--vm-background)">
            <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

                {/* Page Header Skeleton */}
                <div className="animate-pulse space-y-2.5">
                    <div className="h-3 w-28 rounded-md bg-(--vm-surface-2)" />
                    <div className="h-8 w-56 rounded-xl bg-(--vm-surface-2)" />
                    <div className="h-4 w-80 max-w-full rounded-md bg-(--vm-surface-2)" />
                </div>

                {/* Current Plan Card Skeleton */}
                <div className="relative overflow-hidden rounded-2xl border border-(--vm-border)/40 bg-(--vm-surface) p-6 sm:p-7 shadow-sm animate-pulse">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 shrink-0 rounded-2xl bg-(--vm-surface-2)" />
                            <div className="space-y-2">
                                <div className="h-3 w-20 rounded bg-(--vm-surface-2)" />
                                <div className="h-7 w-40 rounded-lg bg-(--vm-surface-2)" />
                                <div className="h-3.5 w-72 max-w-full rounded bg-(--vm-surface-2)" />
                            </div>
                        </div>
                        <div className="h-16 w-full lg:w-56 rounded-xl bg-(--vm-surface-2)" />
                    </div>
                    <div className="mt-7 grid gap-3 border-t border-(--vm-border)/40 pt-5 sm:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-14 rounded-xl bg-(--vm-surface-2)" />
                        ))}
                    </div>
                </div>

                {/* Credit Balance Card Skeleton */}
                <div className="relative overflow-hidden rounded-2xl border border-(--vm-border)/40 bg-(--vm-surface) p-6 sm:p-7 shadow-sm animate-pulse">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3.5">
                            <div className="h-11 w-11 shrink-0 rounded-2xl bg-(--vm-surface-2)" />
                            <div className="space-y-2">
                                <div className="h-4 w-24 rounded bg-(--vm-surface-2)" />
                                <div className="h-3 w-36 rounded bg-(--vm-surface-2)" />
                            </div>
                        </div>
                        <div className="space-y-1.5 sm:text-right">
                            <div className="h-3 w-16 rounded bg-(--vm-surface-2) sm:ml-auto" />
                            <div className="h-8 w-28 rounded bg-(--vm-surface-2) sm:ml-auto" />
                        </div>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="h-12 rounded-xl bg-(--vm-surface-2)" />
                        <div className="h-12 rounded-xl bg-(--vm-surface-2)" />
                    </div>
                </div>

                {/* Billing Info Grid Skeletons */}
                <div className="grid gap-4 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 rounded-2xl border border-(--vm-border)/40 bg-(--vm-surface) p-5 animate-pulse"
                        >
                            <div className="h-8 w-8 shrink-0 rounded-lg bg-(--vm-surface-2)" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3.5 w-28 rounded bg-(--vm-surface-2)" />
                                <div className="h-3 w-40 rounded bg-(--vm-surface-2)" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Plan Comparison Cards Skeletons */}
                <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between rounded-2xl border border-(--vm-border)/40 bg-(--vm-surface) p-6 sm:p-7 animate-pulse"
                        >
                            <div className="space-y-4">
                                <div className="h-3 w-16 rounded bg-(--vm-surface-2)" />
                                <div className="h-6 w-32 rounded bg-(--vm-surface-2)" />
                                <div className="h-4 w-full rounded bg-(--vm-surface-2)" />
                                <div className="h-16 w-full rounded-xl bg-(--vm-surface-2) mt-6" />
                                <div className="space-y-3 pt-4">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="h-6 w-6 rounded-lg bg-(--vm-surface-2)" />
                                            <div className="h-3.5 w-36 rounded bg-(--vm-surface-2)" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="h-10 w-full rounded-lg bg-(--vm-surface-2) mt-8" />
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}