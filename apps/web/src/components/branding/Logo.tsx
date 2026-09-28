import { branding } from "@/config/branding";
import { Brand } from "@virtualmentor/shared";

interface LogoProps {
    size?: "sm" | "md" | "lg";
    showName?: boolean;
    href?: string;
    className?: string;
    time?: string;
}

const sizes = {
    sm: { image: 32, text: "text-base", gap: "gap-2", time: "text-[10px]" },
    md: { image: 40, text: "text-xl", gap: "gap-2.5", time: "text-xs" },
    lg: { image: 52, text: "text-2xl", gap: "gap-3", time: "text-sm" },
} as const;

export function Logo({
    size = "md",
    showName = false,
    className = "",
    time,
}: LogoProps) {
    const config = sizes[size];

    return (
        <div className={`inline-flex items-center ${config.gap} ${className}`} aria-label={Brand.name}>
            <img
                src={branding.logo}
                alt={`${Brand.name} logo`}
                width={config.image}
                height={config.image}
                className="block shrink-0 rounded-3xl object-contain"
            />

            {showName && (
                <div className="flex min-w-0 flex-col justify-center">
                    <span className={`${config.text} font-bold tracking-tight text-(--vm-text)`}>
                        {Brand.name}
                    </span>

                    {time && (
                        <span className={`${config.time} mt-0.5 font-medium text-(--vm-muted)`}>
                            {time}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}