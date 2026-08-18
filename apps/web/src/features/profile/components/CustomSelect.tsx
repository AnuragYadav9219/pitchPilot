import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    placeholder?: string;
}

export function CustomSelect({
    label,
    value,
    options,
    onChange,
    placeholder = "Select...",
}: CustomSelectProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const labelId = useRef(`select-label-${Math.random().toString(36).substring(2, 9)}`).current;

    const selected = options.find((option) => option.value === value);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <label id={labelId} className="mb-2 block text-xs font-medium text-(--vm-text)">
                {label}
            </label>

            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-labelledby={labelId}
                className="flex h-10 w-full items-center justify-between gap-3 rounded-xl border border-(--vm-border) bg-(--vm-background) px-3 text-sm transition outline-none hover:border-(--vm-border-strong) focus:border-(--vm-primary)"
            >
                <span className={selected ? "text-(--vm-text)" : "text-(--vm-muted)"}>
                    {selected?.label || placeholder}
                </span>

                <ChevronDown
                    size={15}
                    className={`shrink-0 text-(--vm-muted) transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div
                    role="listbox"
                    aria-labelledby={labelId}
                    className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-(--vm-border) bg-(--vm-surface-solid) p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
                >
                    {options.map((option) => {
                        const active = option.value === value;

                        return (
                            <button
                                key={option.value}
                                role="option"
                                aria-selected={active}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                                className={`
                                    flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-medium transition
                                    ${active
                                        ? "bg-(--vm-primary)/10 text-(--vm-primary)"
                                        : "text-(--vm-text) hover:bg-(--vm-surface-2)"
                                    }
                                `}
                            >
                                <span>{option.label}</span>
                                {active && <Check size={14} />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}