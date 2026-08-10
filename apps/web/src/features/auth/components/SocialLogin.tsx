import { Globe2 } from "lucide-react";

interface SocialLoginProps {
    loading?: boolean;
}

export function SocialLogin({
    loading = false,
}: SocialLoginProps) {
    return (
        <button
            type="button"
            disabled={loading}
            className={[
                "flex h-12 w-full items-center justify-center gap-3",
                "rounded-(--vm-radius-md)",
                "border border-(--vm-border)",
                "bg-(--vm-surface)",
                "text-sm font-medium text-(--vm-text)",
                "transition-all duration-(--vm-animation-fast)",
                "hover:border-(--vm-border-strong)",
                "hover:bg-(--vm-surface-2)",
                "disabled:cursor-not-allowed disabled:opacity-50",
            ].join(" ")}
        >
            <Globe2
                size={18}
                aria-hidden="true"
            />

            {loading
                ? "Please wait..."
                : "Continue with Google"}
        </button>
    );
}