interface SkillBarProps {
    label: string;
    value: number | null;
}

export function SkillBar({
    label,
    value,
}: SkillBarProps) {
    const score = value ?? 0;

    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-(--vm-text-secondary)">
                    {label}
                </span>

                <span className="text-xs font-semibold text-(--vm-text)">
                    {value == null ? "—" : value}
                </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-(--vm-surface-2)">
                <div
                    className="
                        h-full rounded-full
                        bg-(--vm-primary)
                        transition-all duration-700
                    "
                    style={{
                        width: `${score}%`,
                    }}
                />
            </div>
        </div>
    );
}