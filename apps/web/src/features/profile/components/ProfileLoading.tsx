import { Card } from "@/components/ui";

export function ProfileLoading() {
    return (
        <main className="min-h-full bg-(--vm-background)">
            <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="h-4 w-20 animate-pulse rounded bg-(--vm-surface-2)" />

                <div className="mt-8 flex items-center gap-4">
                    <div className="h-16 w-16 animate-pulse rounded-2xl bg-(--vm-surface-2)" />

                    <div className="space-y-2">
                        <div className="h-5 w-40 animate-pulse rounded bg-(--vm-surface-2)" />
                        <div className="h-3 w-52 animate-pulse rounded bg-(--vm-surface-2)" />
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
        </main>
    );
}

function SkeletonCard() {
    return (
        <Card className="h-72 animate-pulse p-6">
            <div className="h-4 w-40 rounded bg-(--vm-surface-2)" />
            <div className="mt-2 h-3 w-64 rounded bg-(--vm-surface-2)" />
            <div className="mt-8 space-y-4">
                <div className="h-11 rounded-xl bg-(--vm-surface-2)" />
                <div className="h-11 rounded-xl bg-(--vm-surface-2)" />
                <div className="h-10 w-28 rounded-xl bg-(--vm-surface-2)" />
            </div>
        </Card>
    );
}