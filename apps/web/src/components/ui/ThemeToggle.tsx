import { useTheme } from "@/app/theme/ThemeProvider"
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const {
        mode,
        toggleTheme,
    } = useTheme();

    const isDark = mode === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
            className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-(--vm-radius-sm) border border-(--vm-border) bg-(--vm-surface) text-(--vm-muted) transition-all hover:border-(--vm-border-strong) hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
        >
            {isDark ? (
                <Sun size={17} />
            ) : (
                <Moon size={17} />
            )}
        </button>
    )
}
