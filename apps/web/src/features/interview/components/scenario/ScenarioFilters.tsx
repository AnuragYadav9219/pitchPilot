import type { ScenarioCategory } from "../../types";

interface ScenarioFiltersProps {
    value: ScenarioCategory | "ALL";
    onChange: (value: ScenarioCategory | "ALL") => void;
}

const filters: Array<{
    label: string;
    value: ScenarioCategory | "ALL";
}> = [
        { label: "All", value: "ALL" },
        { label: "Technical", value: "TECHNICAL" },
        { label: "Behavioral", value: "BEHAVIORAL" },
        { label: "HR", value: "HR" },
        { label: "System Design", value: "SYSTEM_DESIGN" },
        { label: "Leadership", value: "LEADERSHIP" },
        { label: "Presentation", value: "PRESENTATION" },
    ];

export function ScenarioFilters({
    value,
    onChange,
}: ScenarioFiltersProps) {
    return (
        <div className="flex w-full gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => {
                const isActive = value === filter.value;

                return (
                    <button
                        key={filter.value}
                        type="button"
                        onClick={() => onChange(filter.value)}
                        className={`
                            shrink-0 rounded-lg px-3.5 py-2 text-xs font-medium transition-all
                            ${isActive
                                ? "bg-(--vm-primary) text-white"
                                : "border border-(--vm-border) bg-(--vm-surface) text-(--vm-muted) hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                            }
                        `}
                    >
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
}