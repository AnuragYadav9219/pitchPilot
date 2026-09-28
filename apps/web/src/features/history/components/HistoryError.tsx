import {
    AlertCircle,
    ArrowRight,
    RefreshCw,
} from "lucide-react";

interface HistoryErrorProps {
    onRetry: () => void;
}

export function HistoryError({
    onRetry,
}: HistoryErrorProps) {
    return (
        <main className="min-h-full bg-(--vm-background) px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center">

                <div className="w-full max-w-md text-center">

                    {/* Icon */}
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vm-danger)/10 text-(--vm-danger)">
                        <AlertCircle className="h-5 w-5" />
                    </div>

                    {/* Heading */}
                    <h2 className="mt-5 text-xl font-bold tracking-tight text-(--vm-text)">
                        Unable to load your history
                    </h2>

                    {/* Description */}
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-(--vm-muted)">
                        We couldn't retrieve your previous interviews.
                        Please try again in a moment.
                    </p>

                    {/* Retry */}
                    <button
                        type="button"
                        onClick={onRetry}
                        className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-(--vm-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-(--vm-primary-pressed) hover:shadow-md active:scale-[0.98]"
                    >
                        <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />

                        <span>Try again</span>

                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>

                </div>
            </div>
        </main>
    );
}