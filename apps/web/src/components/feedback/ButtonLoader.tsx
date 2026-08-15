import { Loader2 } from "lucide-react";

interface ButtonLoaderProps {
    label?: string;
}

export function ButtonLoader({
    label = "Please wait...",
}: ButtonLoaderProps) {
    return (
        <span className="inline-flex items-center gap-2">
            <Loader2
                size={17}
                className="animate-spin"
                aria-hidden="true"
            />

            {label}
        </span>
    );
}