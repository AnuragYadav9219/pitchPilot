import { Search, X } from "lucide-react";

interface ScenarioSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function ScenarioSearch({ value, onChange }: ScenarioSearchProps) {
    return (
        <div className="relative w-full">
            <Search
                size={17}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-(--vm-muted)"
            />

            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search scenarios..."
                className="h-11 w-full rounded-xl border border-(--vm-border) bg-(--vm-surface) pl-10 pr-10 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) transition focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/10"
            />

            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-(--vm-muted) transition hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                >
                    <X size={15} />
                </button>
            )}
        </div>
    );
}