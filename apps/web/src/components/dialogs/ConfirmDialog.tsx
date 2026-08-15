import {
    AlertTriangle,
    X,
} from "lucide-react";
import { useEffect } from "react";

import { DialogPortal } from "./DialogPortal";
import { Button } from "../ui";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description?: string;

    confirmLabel?: string;
    cancelLabel?: string;

    variant?: "default" | "danger";

    loading?: boolean;

    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "default",
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow =  document.body.style.overflow;

        document.body.style.overflow = "hidden";

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
            document.body.style.overflow =
                previousOverflow;

            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [open, loading, onCancel]);

    if (!open) {
        return null;
    }

    const isDanger =
        variant === "danger";

    return (
        <DialogPortal>
            {/* Full viewport overlay */}
            <div
                className="fixed inset-0 z-9999 flex min-h-dvh w-screen items-center justify-center overflow-y-auto p-4 sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
            >
                {/* Backdrop */}
                <button
                    type="button"
                    aria-label="Close dialog"
                    disabled={loading}
                    onClick={() => {
                        if (!loading) {
                            onCancel();
                        }
                    }}
                    className="absolute inset-0 h-full w-full cursor-default bg-black/55 backdrop-blur-md disabled:cursor-not-allowed"
                />

                {/* Modal */}
                <div
                    className={[
                        "relative z-10",
                        "my-auto w-full max-w-md",
                        "overflow-hidden",
                        "rounded-2xl",
                        "border border-(--vm-border)",
                        "bg-(--vm-surface)",
                        "shadow-2xl shadow-black/40",
                    ].join(" ")}
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="absolute right-4 top-4 rounded-lg p-1.5 text-(--vm-muted) transition-colors hover:bg-(--vm-surface-2) hover:text-(--vm-text) disabled:pointer-events-none disabled:opacity-50"
                        aria-label="Close dialog"
                    >
                        <X size={18} />
                    </button>

                    <div className="p-6 sm:p-7">
                        {/* Icon */}
                        <div
                            className={[
                                "mb-5 flex h-12 w-12 items-center justify-center rounded-full",
                                isDanger
                                    ? "bg-(--vm-danger)/10 text-(--vm-danger)"
                                    : "bg-(--vm-primary)/10 text-(--vm-primary)",
                            ].join(" ")}
                        >
                            <AlertTriangle
                                size={22}
                                strokeWidth={2}
                            />
                        </div>

                        {/* Title */}
                        <h2
                            id="confirm-dialog-title"
                            className="pr-8 text-lg font-semibold tracking-tight text-(--vm-text) sm:text-xl"
                        >
                            {title}
                        </h2>

                        {/* Description */}
                        {description && (
                            <p className="mt-2.5 text-sm leading-6 text-(--vm-muted)">
                                {description}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="mt-7 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="secondary"
                                size="md"
                                disabled={loading}
                                onClick={onCancel}
                            >
                                {cancelLabel}
                            </Button>

                            <Button
                                type="button"
                                variant={
                                    variant === "danger"
                                        ? "danger"
                                        : "primary"
                                }
                                size="md"
                                loading={loading}
                                onClick={onConfirm}
                            >
                                {confirmLabel}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DialogPortal>
    );
}