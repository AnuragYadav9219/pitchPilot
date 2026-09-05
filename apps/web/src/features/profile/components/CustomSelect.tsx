import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

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
  disabled?: boolean;
}

export function CustomSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
  disabled = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const generatedId = useId();
  const labelId = `select-label-${generatedId}`;

  const selected = options.find((option) => option.value === value);

  /*
   * Estimate the dropdown height.
   */
  const getDropdownHeight = () => Math.min(options.length * 42 + 12, 256);

  /*
   * Decide whether the dropdown should open upward or downward.
   */
  const updateDropdownPosition = () => {
    const container = containerRef.current;
    if (!container) return;

    const selectRect = container.getBoundingClientRect();
    const dropdownHeight = getDropdownHeight();

    const form = container.closest("form");

    if (form) {
      const formRect = form.getBoundingClientRect();
      const spaceBelow = formRect.bottom - selectRect.bottom;
      const spaceAbove = selectRect.top - formRect.top;

      if (spaceBelow < dropdownHeight && spaceAbove >= dropdownHeight) {
        setDropUp(true);
        return;
      }

      if (spaceBelow < dropdownHeight && spaceAbove < dropdownHeight) {
        setDropUp(spaceAbove > spaceBelow);
        return;
      }

      setDropUp(false);
      return;
    }

    const spaceBelow = window.innerHeight - selectRect.bottom;
    const spaceAbove = selectRect.top;

    setDropUp(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
  };

  /*
   * Calculate placement before the dropdown paints.
   */
  useLayoutEffect(() => {
    if (open) updateDropdownPosition();
  }, [open, options.length]);

  /*
   * Recalculate if the user scrolls or resizes.
   */
  useEffect(() => {
    if (!open) return;

    const handlePositionChange = () => updateDropdownPosition();

    window.addEventListener("resize", handlePositionChange);
    window.addEventListener("scroll", handlePositionChange, true);

    return () => {
      window.removeEventListener("resize", handlePositionChange);
      window.removeEventListener("scroll", handlePositionChange, true);
    };
  }, [open, options.length]);

  /*
   * Close when clicking outside.
   */
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /*
   * Close automatically when disabled.
   */
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <div ref={containerRef} className="relative">
      {/* Label */}
      <label
        id={labelId}
        className="mb-2 block text-xs font-medium text-(--vm-text)"
      >
        {label}
      </label>

      {/* Select button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        className="flex h-10 w-full items-center justify-between gap-3 rounded-xl border border-(--vm-border) bg-(--vm-background) px-3 text-sm text-(--vm-text) outline-none transition hover:border-(--vm-border-strong) focus:border-(--vm-primary) disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className={selected ? "text-(--vm-text)" : "text-(--vm-muted)"}>
          {selected?.label || placeholder}
        </span>

        <ChevronDown
          size={15}
          className={`shrink-0 text-(--vm-muted) transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && !disabled && (
        <div
          role="listbox"
          aria-labelledby={labelId}
          className={`absolute left-0 right-0 z-100 max-h-64 overflow-y-auto rounded-xl border border-(--vm-border) bg-(--vm-surface-solid) p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] ${
            dropUp ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"
          }`}
        >
          {options.map((option) => {
            const active = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-medium transition ${
                  active
                    ? "bg-(--vm-primary)/10 text-(--vm-primary)"
                    : "text-(--vm-text) hover:bg-(--vm-surface-2)"
                }`}
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