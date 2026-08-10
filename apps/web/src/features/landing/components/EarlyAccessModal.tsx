import { Sparkles, X } from "lucide-react";

import EarlyAccessForm from "@/features/landing/marketing/EarlyAccessForm";

type EarlyAccessModalProps = {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

export function EarlyAccessModal({
    open,
    onClose,
    onSuccess,
}: EarlyAccessModalProps) {
    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="early-access-title"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }
            }}
        >
            <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-(--vm-radius-xl) border border-(--vm-border-strong) bg-(--vm-surface) p-6 shadow-2xl sm:p-8">
                {/* Close */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close early access form"
                    className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-(--vm-muted) transition hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                >
                    <X
                        size={18}
                        aria-hidden="true"
                    />
                </button>

                {/* Header */}
                <div className="pr-8">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--vm-primary)/12 text-(--vm-primary)">
                        <Sparkles
                            size={20}
                            aria-hidden="true"
                        />
                    </div>

                    <h2
                        id="early-access-title"
                        className="mt-5 text-2xl font-bold text-(--vm-text)"
                    >
                        Join Early Access
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                        Be among the first students to
                        experience VirtualMento when it
                        becomes available.
                    </p>
                </div>

                {/* Registration form */}
                <div className="mt-7">
                    <EarlyAccessForm
                        onSuccess={onSuccess}
                    />
                </div>
            </div>
        </div>
    );
}