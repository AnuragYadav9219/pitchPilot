import { Button } from "@/components/ui";
import { AlertCircle, RefreshCw } from "lucide-react";

export function SubscriptionError({
    onRetry,
}: {
    onRetry: () => void;
}) {
    return (
        <main className="min-h-full bg-(--vm-background) px-4 py-12 sm:px-6">
            <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center">
                <div className="w-full rounded-3xl border border-(--vm-border) bg-(--vm-surface) p-8 text-center shadow-sm transition-all duration-300">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-danger)/10 shadow-inner">
                        <AlertCircle className="h-6 w-6 text-(--vm-danger)" />
                    </div>

                    <h2 className="mt-5 text-xl font-bold tracking-tight text-(--vm-text)">
                        Unable to load subscription
                    </h2>

                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-(--vm-muted)">
                        We couldn't retrieve your subscription details. Please check your connection and try again.
                    </p>

                    <div className="mt-7">
                        <Button
                            className="group w-full gap-2 font-semibold shadow-sm transition-transform active:scale-95"
                            onClick={onRetry}
                        >
                            <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
                            Try again
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}