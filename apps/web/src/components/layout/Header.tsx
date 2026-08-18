import { Bell, Menu } from "lucide-react";
import { UserMenu } from "./UserMenu";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 min-h-16 w-full shrink-0 items-center border-b border-(--vm-border) bg-(--vm-background)/90 px-4 sm:px-6 backdrop-blur-xl">
            {/* Mobile menu */}
            <button
                type="button"
                onClick={onMenuClick}
                aria-label="Open navigation"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-(--vm-muted) transition-colors hover:bg-(--vm-surface-2) hover:text-(--vm-text) lg:hidden"
            >
                <Menu size={21} strokeWidth={1.9} />
            </button>

            {/* Desktop context */}
            <div className="hidden min-w-0 lg:block">
                <p className="truncate text-sm font-medium text-(--vm-muted)">
                    Your mentoring workspace
                </p>
            </div>

            {/* Right actions */}
            <div className="ml-auto flex h-16 min-h-16 shrink-0 items-center gap-1 sm:gap-2">
                {/* Notifications */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-(--vm-muted) transition-colors hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                >
                    <Bell size={19} strokeWidth={1.9} />
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-(--vm-primary)"
                    />
                </button>

                {/* User menu */}
                <UserMenu />
            </div>
        </header>
    );
}