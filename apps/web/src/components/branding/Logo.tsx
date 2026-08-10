import { Sparkles } from "lucide-react";

import { Brand } from "@virtualmento/shared";

interface LogoProps {
    size?: "sm" | "md" | "lg";
    showName?: boolean;
    href?: string;
}

const sizes = {
    sm: {
        icon: 16,
        text: "text-base",
    },
    md: {
        icon: 20,
        text: "text-xl",
    },
    lg: {
        icon: 26,
        text: "text-2xl",
    },
} as const;

export function Logo({
    size = "md",
    showName = true,
    href = "/",
}: LogoProps) {
    const config = sizes[size];

    return (
        <a
            href={href}
            className="inline-flex items-center gap-2"
            aria-label={`${Brand.name} home`}
        >
            <span
                className="flex items-center justify-center rounded-(--vm-radius-sm) bg-(--vm-primary)/15 text-(--vm-primary)"
                style={{
                    width: config.icon + 12,
                    height: config.icon + 12,
                }}
            >
                <Sparkles
                    size={config.icon}
                    aria-hidden="true"
                />
            </span>

            {showName && (
                <span
                    className={`${config.text} font-bold tracking-tight text-(--vm-text)`}
                >
                    {Brand.name}
                </span>
            )}
        </a>
    );
}