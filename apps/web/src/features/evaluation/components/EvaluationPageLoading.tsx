import { Container, Card } from "@/components/ui";

export function EvaluationPageLoading() {
    return (
        <main className="min-h-full bg-(--vm-background)">
            <Container className="py-6 sm:py-8 lg:py-10">
                {/* Back link skeleton */}
                <div className="mb-6 h-4 w-20 animate-pulse rounded bg-(--vm-surface-2)" />

                {/* Header */}
                <div className="space-y-3">
                    <div className="h-7 w-48 animate-pulse rounded-lg bg-(--vm-surface-2)" />

                    <div className="h-4 w-full max-w-xl animate-pulse rounded bg-(--vm-surface-2)" />
                </div>

                {/* Evaluation cards */}
                <div className="mt-8 space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Card
                            key={index}
                            className="animate-pulse p-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 shrink-0 rounded-xl bg-(--vm-surface-2)" />

                                <div className="min-w-0 flex-1 space-y-2">
                                    <div className="h-4 w-2/5 rounded bg-(--vm-surface-2)" />

                                    <div className="h-3 w-1/3 rounded bg-(--vm-surface-2)" />
                                </div>

                                <div className="h-4 w-4 rounded bg-(--vm-surface-2)" />
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                                {Array.from({ length: 4 }).map(
                                    (_, scoreIndex) => (
                                        <div
                                            key={scoreIndex}
                                            className="h-12 rounded-lg bg-(--vm-surface-2)"
                                        />
                                    ),
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </Container>
        </main>
    );
}