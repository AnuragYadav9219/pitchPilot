import { AlertCircle, RefreshCcw } from "lucide-react";

interface CareerErrorProps {
    onRetry: () => void;
}

export function CareerError({ onRetry }: CareerErrorProps) {
    return (
        <section className="relative overflow-hidden rounded-(--vm-radius-xl) border border-(--vm-border) bg-(--vm-surface) px-6 py-12 text-center sm:px-8 sm:py-14">
            {/* Subtle ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--vm-danger)/5 blur-3xl" />

            <div className="relative mx-auto flex max-w-md flex-col items-center">
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-(--vm-radius-lg) border border-(--vm-danger)/15 bg-(--vm-danger)/8 text-(--vm-danger)">
                    <AlertCircle size={24} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h2 className="mt-5 text-lg font-bold tracking-tight text-(--vm-text) sm:text-xl">
                    We couldn't analyze the market
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    We couldn't fetch the career intelligence right now.
                    Your search is still safe — try running the analysis
                    again.
                </p>

                {/* Action */}
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-(--vm-radius-md) border border-(--vm-border-strong) bg-(--vm-surface-2) px-4 text-sm font-semibold text-(--vm-text) transition-all duration-200 hover:-translate-y-0.5 hover:border-(--vm-primary)/30 hover:bg-(--vm-primary)/5 hover:text-(--vm-primary) active:translate-y-0"
                >
                    <RefreshCcw size={15} />
                    Try analysis again
                </button>

                {/* Hint */}
                <p className="mt-4 text-[11px] text-(--vm-placeholder)">
                    If the problem continues, try a different role or
                    location.
                </p>
            </div>
        </section>
    );
}