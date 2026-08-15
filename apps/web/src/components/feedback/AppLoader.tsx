import { Loader2 } from "lucide-react";

interface AppLoaderProps {
    size?: "sm" | "md" | "lg";
    label?: string;
    fullScreen?: boolean;
}

const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-9 w-9",
};

export function AppLoader({
    size = "md",
    label,
    fullScreen = false,
}: AppLoaderProps) {
    const content = (
        <div className="flex flex-col items-center justify-center gap-3">
            <Loader2
                className={`${sizeClasses[size]} animate-spin text-(--vm-primary)`}
                aria-hidden="true"
            />

            {label && (
                <p className="text-sm text-(--vm-muted)">
                    {label}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--vm-background)">
                {content}
            </div>
        );
    }

    return content;
}