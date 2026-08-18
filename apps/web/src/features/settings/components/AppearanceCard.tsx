import {
    Check,
    Moon,
    Palette,
    Sun,
} from "lucide-react";

import { Card } from "@/components/ui";
import { Brand } from "@virtualmento/shared";

interface AppearanceCardProps {
    mode: "light" | "dark";
    onToggle: () => void;
}

export function AppearanceCard({
    mode,
    onToggle,
}: AppearanceCardProps) {
    const isDark = mode === "dark";

    return (
        <Card className="overflow-hidden">
            {/* Header */}
            <div className="flex items-start gap-3 border-b border-(--vm-border) px-5 py-4 sm:px-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <Palette size={17} />
                </div>

                <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-(--vm-text)">
                        Appearance
                    </h2>

                    <p className="mt-0.5 text-xs leading-5 text-(--vm-muted)">
                        Customize the look and feel of your {Brand.name} workspace.
                    </p>
                </div>
            </div>

            <div className="p-5 sm:p-6">
                {/* Theme selector */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-(--vm-text)">
                                Theme
                            </p>

                            <span className="rounded-full bg-(--vm-primary)/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-(--vm-primary)">
                                {mode}
                            </span>
                        </div>

                        <p className="mt-1 text-xs text-(--vm-muted)">
                            Select your preferred appearance.
                        </p>
                    </div>

                    <div
                        className="
                            flex w-full rounded-xl
                            border border-(--vm-border)
                            bg-(--vm-surface-2)
                            p-1 sm:w-auto
                        "
                    >
                        <ThemeOption
                            active={!isDark}
                            icon={<Sun size={15} />}
                            label="Light"
                            onClick={() => {
                                if (isDark) {
                                    onToggle();
                                }
                            }}
                        />

                        <ThemeOption
                            active={isDark}
                            icon={<Moon size={15} />}
                            label="Dark"
                            onClick={() => {
                                if (!isDark) {
                                    onToggle();
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Current theme */}
                <div className="mt-5 flex items-center justify-between rounded-xl border border-(--vm-border) bg-(--vm-surface-2) px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--vm-primary)/10 text-(--vm-primary)">
                            {isDark ? (
                                <Moon size={15} />
                            ) : (
                                <Sun size={15} />
                            )}
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-medium text-(--vm-text)">
                                {isDark
                                    ? "Dark appearance"
                                    : "Light appearance"}
                            </p>

                            <p className="mt-0.5 text-[10px] text-(--vm-muted)">
                                Automatically saved to your preferences.
                            </p>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 text-[10px] font-medium text-(--vm-success)">
                        <span className="h-1.5 w-1.5 rounded-full bg-(--vm-success)" />
                        Active
                    </div>
                </div>
            </div>
        </Card>
    );
}

/* =========================================================
   THEME OPTION
========================================================= */

function ThemeOption({
    active,
    icon,
    label,
    onClick,
}: {
    active: boolean;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={[
                "flex h-9 flex-1 items-center justify-center cursor-pointer gap-2",
                "rounded-lg px-3 text-xs font-medium",
                "transition-all duration-150 sm:min-w-24",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-(--vm-primary)/30",
                active
                    ? [
                          "bg-(--vm-surface)",
                          "text-(--vm-text)",
                          "shadow-sm",
                          "ring-1 ring-(--vm-border)",
                      ].join(" ")
                    : [
                          "text-(--vm-muted)",
                          "hover:text-(--vm-text)",
                      ].join(" "),
            ].join(" ")}
        >
            {icon}

            <span>{label}</span>

            {active && (
                <Check
                    size={13}
                    strokeWidth={2.5}
                    className="text-(--vm-primary)"
                />
            )}
        </button>
    );
}