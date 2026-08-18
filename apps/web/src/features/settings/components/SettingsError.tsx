import { RefreshCw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui";

interface SettingsErrorProps {
    onRetry?: () => void;
}

export function SettingsError({
    onRetry,
}: SettingsErrorProps) {
    return (
        <main className="flex min-h-full items-center justify-center bg-(--vm-background) px-4">
            <div className="w-full max-w-sm text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vm-danger)/10 text-(--vm-danger)">
                    <TriangleAlert size={20} />
                </div>

                <h1 className="mt-4 text-sm font-semibold text-(--vm-text)">
                    Unable to load settings
                </h1>

                <p className="mt-2 text-xs leading-5 text-(--vm-muted)">
                    Something went wrong while loading your account settings.
                </p>

                {onRetry && (
                    <Button
                        variant="secondary"
                        size="sm"
                        className="mt-5"
                        onClick={onRetry}
                    >
                        <RefreshCw size={14} />
                        Try again
                    </Button>
                )}
            </div>
        </main>
    );
}