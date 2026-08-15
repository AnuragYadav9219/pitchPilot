import {
    Loader2,
    X,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { DialogPortal } from "./DialogPortal";

interface FormDialogProps {
    open: boolean;
    title: string;
    description?: string;

    children: ReactNode;

    submitLabel?: string;
    cancelLabel?: string;

    loading?: boolean;

    onSubmit: () => void;
    onCancel: () => void;
}

export function FormDialog({
    open,
    title,
    description,
    children,
    submitLabel = "Save",
    cancelLabel = "Cancel",
    loading = false,
    onSubmit,
    onCancel,
}: FormDialogProps) {
    useEffect(() => {
        if (!open) {
            return;
        }

        function handleKeyDown(
            event: KeyboardEvent,
        ) {
            if (
                event.key === "Escape" &&
                !loading
            ) {
                onCancel();
            }
        }

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [open, loading, onCancel]);

    if (!open) {
        return null;
    }

    return (
        <DialogPortal>
            <div
                className="fixed inset-0 z-9999 flex min-h-dvh w-screen items-center justify-center overflow-y-auto p-4 sm:p-6"
                role="dialog"
                aria-modal="true"
            >
                <button
                    type="button"
                    aria-label="Close dialog"
                    onClick={() => {
                        if (!loading) {
                            onCancel();
                        }
                    }}
                    className="absolute inset-0 h-full w-full cursor-default bg-black/55 backdrop-blur-md"
                />

                <div className="relative z-10 my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) shadow-2xl shadow-black/40">
                    <div className="flex items-start justify-between border-b border-(--vm-border) px-6 py-5">
                        <div className="pr-8">
                            <h2 className="text-lg font-semibold text-(--vm-text)">
                                {title}
                            </h2>

                            {description && (
                                <p className="mt-1.5 text-sm leading-5 text-(--vm-muted)">
                                    {description}
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="rounded-lg p-1.5 text-(--vm-muted) hover:bg-(--vm-surface-2) hover:text-(--vm-text) disabled:opacity-50"
                            aria-label="Close dialog"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="px-6 py-5">
                        {children}
                    </div>

                    <div className="flex flex-col-reverse gap-2 border-t border-(--vm-border) px-6 py-4 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="h-10 rounded-(--vm-radius-md) border border-(--vm-border) px-4 text-sm font-medium text-(--vm-text) hover:bg-(--vm-surface-2) disabled:opacity-50"
                        >
                            {cancelLabel}
                        </button>

                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={loading}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-(--vm-radius-md) bg-(--vm-primary) px-5 text-sm font-semibold text-white hover:bg-(--vm-primary-pressed) disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading && (
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
                            )}

                            {loading
                                ? "Saving..."
                                : submitLabel}
                        </button>
                    </div>
                </div>
            </div>
        </DialogPortal>
    );
}