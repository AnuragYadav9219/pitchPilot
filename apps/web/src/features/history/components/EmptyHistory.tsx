import {
    History,
    Mic2,
} from "lucide-react";

export function EmptyHistory() {
    return (
        <section className="flex min-h-105 items-center justify-center rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-6 text-center shadow-sm">

            <div className="max-w-md">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <History className="h-6 w-6" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-(--vm-text)">
                    No interviews yet
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    Your completed interview sessions will appear here.
                    Start your first mock interview to build your history.
                </p>

                <button
                    type="button"
                    onClick={() => {
                        window.location.href = "/interviews";
                    }}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-(--vm-primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--vm-primary-pressed)"
                >
                    <Mic2 className="h-4 w-4" />
                    Start an interview
                </button>

            </div>

        </section>
    );
}