import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui";

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export function EmptyState({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    className = "",
}: EmptyStateProps) {
    return (
        <div className={`flex min-h-[45vh] w-full items-center justify-center px-5 py-10 ${className}`}>
            <div className="w-full max-w-md text-center">
                {/* Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-(--vm-border) bg-(--vm-surface) text-(--vm-primary) shadow-sm">
                    {icon ?? <Sparkles size={23} strokeWidth={1.8} />}
                </div>

                {/* Title */}
                <h2 className="mt-5 text-base font-semibold tracking-tight text-(--vm-text)">
                    {title}
                </h2>

                {/* Description */}
                {description && (
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-(--vm-muted)">
                        {description}
                    </p>
                )}

                {/* Action */}
                {actionLabel && onAction && (
                    <Button
                        type="button"
                        size="sm"
                        onClick={onAction}
                        className="mt-5"
                    >
                        {actionLabel}
                    </Button>
                )}
            </div>
        </div>
    );
}