import { branding } from "@/config/branding";
import { Brand } from "@virtualmentor/shared";

interface LogoProps {
    size?: "sm" | "md" | "lg";
    showName?: boolean;
    href?: string;
    className?: string;
}

const sizes = {
    sm: {
        image: 32,
        text: "text-base",
        gap: "gap-2",
    },
    md: {
        image: 40,
        text: "text-xl",
        gap: "gap-2.5",
    },
    lg: {
        image: 52,
        text: "text-2xl",
        gap: "gap-3",
    },
} as const;

export function Logo({
    size = "md",
    showName = false,
    href = "/",
    className = "",
}: LogoProps) {
    const config = sizes[size];

    return (
        <a
            href={href}
            className={`inline-flex items-center ${config.gap} ${className}`}
            aria-label={`${Brand.name} home`}
        >
            <img
                src={branding.logo}
                alt={`${Brand.name} logo`}
                width={config.image}
                height={config.image}
                className="block shrink-0 rounded-3xl object-contain"
            />

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