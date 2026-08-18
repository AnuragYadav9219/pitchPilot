import { Container } from "@/components/ui";

export function ProgressLoading() {
    return (
        <main className="min-h-full bg-(--vm-background)">
            <Container className="py-6 sm:py-8 lg:py-10">
                <div className="animate-pulse">
                    <div className="h-4 w-20 rounded bg-(--vm-surface-2)" />

                    <div className="mt-3 h-8 w-72 rounded bg-(--vm-surface-2)" />

                    <div className="mt-3 h-4 w-full max-w-xl rounded bg-(--vm-surface-2)" />

                    <div className="mt-6 grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
                        <div className="h-64 rounded-(--vm-radius-lg) bg-(--vm-surface-2)" />

                        <div className="h-64 rounded-(--vm-radius-lg) bg-(--vm-surface-2)" />
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="h-40 rounded-(--vm-radius-lg) bg-(--vm-surface-2)"
                                />
                            ),
                        )}
                    </div>
                </div>
            </Container>
        </main>
    );
}