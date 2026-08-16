import type { ScenarioCategory } from "../types";

interface ScenarioFiltersProps {
    value: ScenarioCategory | "ALL";
    onChange: (
        value: ScenarioCategory | "ALL",
    ) => void;
}

const filters: {
    label: string;
    value: ScenarioCategory | "ALL";
}[] = [
        {
            label: "All",
            value: "ALL",
        },
        {
            label: "Interview",
            value: "INTERVIEW",
        },
        {
            label: "Communication",
            value: "COMMUNICATION",
        },
        {
            label: "Leadership",
            value: "LEADERSHIP",
        },
        {
            label: "Workplace",
            value: "WORKPLACE",
        },
    ];

export function ScenarioFilters({
    value,
    onChange,
}: ScenarioFiltersProps) {
    return (
        <div
            className="
                flex gap-2
                overflow-x-auto
                pb-1
                scrollbar-none
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
            "
        >
            {filters.map((filter) => {
                const active =
                    filter.value === value;

                return (
                    <button
                        key={filter.value}
                        type="button"
                        onClick={() =>
                            onChange(
                                filter.value,
                            )
                        }
                        className={[
                            "shrink-0 rounded-full px-4 py-2",
                            "text-xs font-medium",
                            "transition-colors",
                            "whitespace-nowrap",
                            active
                                ? "bg-(--vm-primary) text-white"
                                : [
                                    "border border-(--vm-border)",
                                    "bg-(--vm-surface)",
                                    "text-(--vm-muted)",
                                    "hover:bg-(--vm-surface-2)",
                                    "hover:text-(--vm-text)",
                                ].join(" "),
                        ].join(" ")}
                    >
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
}