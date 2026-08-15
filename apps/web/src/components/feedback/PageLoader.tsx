import { Loader2 } from "lucide-react";

import { Brand } from "@virtualmento/shared";

interface PageLoaderProps {
    label?: string;
    fullScreen?: boolean;
}

export function PageLoader({
    label = `Loading ${Brand.name}...`,
    fullScreen = true,
}: PageLoaderProps) {
    return (
        <div
            className={[
                "flex items-center justify-center",
                "bg-(--vm-background)",
                "text-(--vm-text)",
                fullScreen
                    ? "min-h-screen"
                    : "min-h-[60vh]",
            ].join(" ")}
        >
            <div className="flex flex-col items-center gap-3">
                <Loader2
                    size={32}
                    className="animate-spin text-(--vm-primary)"
                    aria-hidden="true"
                />

                <p className="text-sm text-(--vm-muted)">
                    {label}
                </p>
            </div>
        </div>
    );
}