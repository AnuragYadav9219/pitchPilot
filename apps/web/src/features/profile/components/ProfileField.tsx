interface ProfileFieldProps {
    label: string;
    value?: string | null;
    placeholder?: string;
}

export function ProfileField({
    label,
    value,
    placeholder = "Not provided",
}: ProfileFieldProps) {
    return (
        <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-(--vm-muted)">
                {label}
            </p>

            <p
                className={[
                    "mt-1.5 truncate text-sm font-medium",
                    value
                        ? "text-(--vm-text)"
                        : "text-(--vm-muted)",
                ].join(" ")}
            >
                {value || placeholder}
            </p>
        </div>
    );
}