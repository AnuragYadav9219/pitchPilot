import { Container } from "@/components/ui";

export function DashboardLoading() {
    return (
        <main className="min-h-full bg-(--vm-background)">
            <Container className="py-6 sm:py-8 lg:py-10">
                <div className="animate-pulse space-y-6">
                    <div className="h-40 rounded-(--vm-radius-xl) bg-(--vm-surface-2)" />

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="h-32 rounded-(--vm-radius-lg) bg-(--vm-surface-2)"
                                />
                            ),
                        )}
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="h-80 rounded-(--vm-radius-lg) bg-(--vm-surface-2)" />
                        <div className="h-80 rounded-(--vm-radius-lg) bg-(--vm-surface-2)" />
                    </div>
                </div>
            </Container>
        </main>
    );
}