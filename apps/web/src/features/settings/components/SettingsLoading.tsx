import { LoaderCircle } from "lucide-react";

export function SettingsLoading() {
    return (
        <main className="min-h-full bg-(--vm-background)">
            <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="animate-pulse">
                    <div className="h-4 w-20 rounded bg-(--vm-surface-2)" />

                    <div className="mt-6 h-7 w-32 rounded bg-(--vm-surface-2)" />

                    <div className="mt-2 h-4 w-72 rounded bg-(--vm-surface-2)" />

                    <div className="mt-8 space-y-5">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-40 rounded-2xl border border-(--vm-border) bg-(--vm-surface)"
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-(--vm-muted)">
                    <LoaderCircle
                        size={14}
                        className="animate-spin"
                    />
                    Loading settings
                </div>
            </div>
        </main>
    );
}