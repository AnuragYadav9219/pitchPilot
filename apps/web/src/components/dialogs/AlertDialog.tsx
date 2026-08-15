import {
    AlertCircle,
    CheckCircle2,
    Info,
    X,
} from "lucide-react";
import { useEffect } from "react";
import { DialogPortal } from "./DialogPortal";

interface AlertDialogProps {
    open: boolean;
    title: string;
    description?: string;
    buttonLabel?: string;

    variant?:
    | "info"
    | "success"
    | "warning"
    | "error";

    onClose: () => void;
}

const variantConfig = {
    info: {
        icon: Info,
        className:
            "bg-(--vm-primary)/10 text-(--vm-primary)",
    },

    success: {
        icon: CheckCircle2,
        className:
            "bg-(--vm-success)/10 text-(--vm-success)",
    },

    warning: {
        icon: AlertCircle,
        className:
            "bg-(--vm-warning)/10 text-(--vm-warning)",
    },

    error: {
        icon: AlertCircle,
        className:
            "bg-(--vm-danger)/10 text-(--vm-danger)",
    },
};

export function AlertDialog({
    open,
    title,
    description,
    buttonLabel = "Okay",
    variant = "info",
    onClose,
}: AlertDialogProps) {
    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        function handleKeyDown(
            event: KeyboardEvent,
        ) {
            if (event.key === "Escape") {
                onClose();
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
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    const config =
        variantConfig[variant];

    const Icon = config.icon;

    return (
        <DialogPortal>
            <div
                className="fixed inset-0 z-9999 flex min-h-dvh w-screen items-center justify-center overflow-y-auto p-4 sm:p-6"
                role="alertdialog"
                aria-modal="true"
            >
                <button
                    type="button"
                    aria-label="Close dialog"
                    onClick={onClose}
                    className="absolute inset-0 h-full w-full cursor-default bg-black/55 backdrop-blur-md"
                />

                <div className="relative z-10 my-auto w-full max-w-md rounded-2xl border border-(--vm-border) bg-(--vm-surface) shadow-2xl shadow-black/40">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-lg p-1.5 text-(--vm-muted) transition-colors hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                        aria-label="Close dialog"
                    >
                        <X size={18} />
                    </button>

                    <div className="p-6 sm:p-7">
                        <div
                            className={[
                                "mb-5 flex h-12 w-12 items-center justify-center rounded-full",
                                config.className,
                            ].join(" ")}
                        >
                            <Icon
                                size={22}
                                strokeWidth={2}
                            />
                        </div>

                        <h2 className="pr-8 text-lg font-semibold tracking-tight text-(--vm-text) sm:text-xl">
                            {title}
                        </h2>

                        {description && (
                            <p className="mt-2.5 text-sm leading-6 text-(--vm-muted)">
                                {description}
                            </p>
                        )}

                        <div className="mt-7 flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="h-11 rounded-xl bg-(--vm-primary) px-5 text-sm font-semibold text-white transition-colors hover:bg-(--vm-primary-pressed)"
                            >
                                {buttonLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DialogPortal>
    );
}