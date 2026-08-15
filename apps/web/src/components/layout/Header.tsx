import { Bell, Menu } from "lucide-react";

import { UserMenu } from "./UserMenu";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({
    onMenuClick,
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-(--vm-border) bg-(--vm-background)/85 px-4 backdrop-blur-xl sm:px-6">
            {/* Mobile menu */}
            <button
                type="button"
                onClick={onMenuClick}
                className="mr-2 rounded-lg p-2 text-(--vm-muted) transition-colors hover:bg-(--vm-surface-2) hover:text-(--vm-text) lg:hidden"
                aria-label="Open navigation"
            >
                <Menu size={21} />
            </button>

            {/* Desktop context */}
            <div className="hidden lg:block">
                <p className="text-sm font-medium text-(--vm-muted)">
                    Your mentoring workspace
                </p>
            </div>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
                {/* Notifications */}
                <button
                    type="button"
                    className="relative rounded-lg p-2 text-(--vm-muted) transition-colors hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                    aria-label="Notifications"
                >
                    <Bell
                        size={19}
                        strokeWidth={1.9}
                    />

                    <span
                        aria-hidden="true"
                        className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-(--vm-primary)"
                    />
                </button>

                {/* User */}
                <UserMenu />
            </div>
        </header>
    );
}