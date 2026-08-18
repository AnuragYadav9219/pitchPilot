import { AlertCircle } from "lucide-react";

import { Card } from "@/components/ui";

interface ProgressErrorProps {
    onRetry: () => void;
}

export function ProgressError({
    onRetry,
}: ProgressErrorProps) {
    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-(--vm-background) px-4">
            <Card className="w-full max-w-md p-7 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-(--vm-danger)/10 text-(--vm-danger)">
                    <AlertCircle size={20} />
                </div>

                <h1 className="mt-4 text-lg font-semibold text-(--vm-text)">
                    Couldn't load your progress
                </h1>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    We couldn't retrieve your practice progress right now. Please try again.
                </p>

                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-5 h-10 rounded-(--vm-radius-md) bg-(--vm-primary) px-5 text-sm font-medium text-white transition-colors hover:bg-(--vm-primary-pressed)"
                >
                    Try again
                </button>
            </Card>
        </main>
    );
}