import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    interactive?: boolean;
}

export function Card({
    children,
    className = "",
    interactive = false,
}: CardProps) {
    return (
        <div
            className={[
                "rounded-(--vm-radius-lg)",
                "border border-(--vm-border)",
                "bg-(--vm-surface)",
                "backdrop-blur-xl",
                interactive
                    ? [
                        "transition-all duration-(--vm-animation-normal)",
                        "hover:-translate-y-1",
                        "hover:border-(--vm-border-strong)",
                        "hover:bg-(--vm-surface-2)",
                    ].join(" ")
                    : "",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}