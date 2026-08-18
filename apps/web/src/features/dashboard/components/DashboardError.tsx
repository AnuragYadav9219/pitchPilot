import { Card } from "@/components/ui";
import { BarChart3 } from "lucide-react";

interface DashboardErrorProps {
    onRetry: () => void;
}

export function DashboardError({
    onRetry,
}: DashboardErrorProps) {
    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-(--vm-background) px-4">
            <Card className="w-full max-w-md p-7 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vm-danger)/10 text-(--vm-danger)">
                    <BarChart3 size={22} />
                </div>

                <h1 className="mt-4 text-lg font-semibold text-(--vm-text)">
                    Couldn't load your dashboard
                </h1>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    Something went wrong while loading
                    your practice progress.
                </p>

                <button
                    type="button"
                    onClick={onRetry}
                    className="
                        mt-5 h-10 rounded-(--vm-radius-md)
                        bg-(--vm-primary) px-5
                        text-sm font-medium text-white
                        transition-colors
                        hover:bg-(--vm-primary-pressed)
                    "
                >
                    Try again
                </button>
            </Card>
        </main>
    );
}