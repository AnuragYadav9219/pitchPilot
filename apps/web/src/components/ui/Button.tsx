import {
    forwardRef,
    type ButtonHTMLAttributes,
    type ReactNode,
} from "react";

import { LoaderCircle } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
    primary:
        "bg-(--vm-primary) text-white hover:bg-(--vm-primary-pressed) focus-visible:ring-(--vm-primary)",

    secondary:
        "border border-(--vm-border-strong) bg-(--vm-surface) text-(--vm-text) hover:bg-(--vm-surface-2) focus-visible:ring-(--vm-border-strong)",

    ghost:
        "text-(--vm-text-secondary) hover:bg-(--vm-surface) hover:text-(--vm-text) focus-visible:ring-(--vm-border-strong)",

    danger:
        "bg-(--vm-danger) text-white hover:opacity-90 focus-visible:ring-(--vm-danger)",
};

const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    function Button(
        {
            children,
            variant = "primary",
            size = "md",
            loading = false,
            disabled = false,
            className = "",
            type = "button",
            ...props
        },
        ref,
    ) {
        const isDisabled = disabled || loading;

        return (
            <button
                ref={ref}
                type={type}
                disabled={isDisabled}
                aria-busy={loading}
                className={[
                    "inline-flex items-center justify-center gap-2",
                    "rounded-(--vm-radius-md)",
                    "font-medium",
                    "transition-colors duration-(--vm-animation-fast)",
                    "outline-none",
                    "cursor-pointer",
                    "focus-visible:ring-2",
                    "focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-(--vm-background)",
                    "disabled:pointer-events-none",
                    "disabled:opacity-50",
                    "select-none",
                    variants[variant],
                    sizes[size],
                    className,
                ].join(" ")}
                {...props}
            >
                {loading && (
                    <LoaderCircle
                        size={18}
                        strokeWidth={2}
                        className="animate-spin"
                        aria-hidden="true"
                    />
                )}

                {children}
            </button>
        );
    },
);