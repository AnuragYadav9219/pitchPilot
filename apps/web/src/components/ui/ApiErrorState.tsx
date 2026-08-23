import { AlertCircle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "@/components/ui";

export type ApiErrorStateVariant = "page" | "card" | "inline";

interface ApiErrorStateProps {
    title?: string;
    message?: string;
    variant?: ApiErrorStateVariant;
    onRetry?: () => void;
    showBack?: boolean;
    showHome?: boolean;
}

export function ApiErrorState({
    title = "Something went wrong",
    message = "We couldn't load this content. Please try again.",
    variant = "page",
    onRetry,
    showBack = false,
    showHome = false,
}: ApiErrorStateProps) {
    const navigate = useNavigate();

    if (variant === "inline") {
        return (
            <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-(--vm-danger)/20 bg-(--vm-danger)/5 px-4 py-3"
            >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-(--vm-danger)/10 text-(--vm-danger)">
                    <AlertCircle size={15} />
                </div>

                <div className="min-w-0">
                    <p className="text-xs font-semibold text-(--vm-text)">
                        {title}
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-(--vm-muted)">
                        {message}
                    </p>

                    {onRetry && (
                        <button
                            type="button"
                            onClick={onRetry}
                            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-(--vm-primary) hover:underline"
                        >
                            <RefreshCw size={12} />
                            Try again
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const content = (
        <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-danger)/10 text-(--vm-danger)">
                <AlertCircle size={25} strokeWidth={1.8} />
            </div>

            <h1 className="mt-5 text-lg font-semibold tracking-tight text-(--vm-text) sm:text-xl">
                {title}
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-(--vm-muted)">
                {message}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
                {onRetry && (
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={onRetry}
                    >
                        <RefreshCw size={14} />
                        Try again
                    </Button>
                )}

                {showBack && (
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={14} />
                        Go back
                    </Button>
                )}

                {showHome && (
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate("/dashboard")}
                    >
                        <Home size={14} />
                        Dashboard
                    </Button>
                )}
            </div>
        </>
    );

    if (variant === "card") {
        return (
            <Card className="p-7 text-center sm:p-8">
                {content}
            </Card>
        );
    }

    return (
        <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-10">
            <div className="w-full max-w-md text-center">
                {content}
            </div>
        </div>
    );
}