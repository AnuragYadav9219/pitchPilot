import {
    History,
    LayoutDashboard,
    MessageCircle,
    Settings,
    UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Logo } from "@/components/branding/Logo";

const navigation = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Practice", href: "/scenarios", icon: MessageCircle },
    { label: "History", href: "/history", icon: History },
];

const accountNavigation = [
    { label: "Profile", href: "/profile", icon: UserRound },
    { label: "Settings", href: "/settings", icon: Settings },
];

interface NavItem {
    label: string;
    href: string;
    icon: React.ComponentType<{
        size?: number;
        strokeWidth?: number;
        className?: string;
    }>;
}

interface NavSectionProps {
    title: string;
    items: NavItem[];
}

export function Sidebar() {
    return (
        <div className="flex h-full w-full min-w-0 flex-col overflow-hidden bg-(--vm-surface)">
            {/* Logo */}
            <div className="flex h-16 shrink-0 items-center border-b border-(--vm-border) px-6">
                <Logo size="md" />
            </div>

            {/* Navigation */}
            <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-3 py-6">
                <NavSection title="Overview" items={[navigation[0]]} />
                <NavSection title="Practice" items={navigation.slice(1)} />
                <NavSection title="Account" items={accountNavigation} />
            </div>

            {/* Bottom Card */}
            <div className="shrink-0 border-t border-(--vm-border) p-4">
                <div className="w-full rounded-xl border border-(--vm-border) bg-(--vm-surface-2) p-3">
                    <p className="text-xs font-semibold text-(--vm-text)">
                        Keep practicing
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-(--vm-muted)">
                        Build confidence through realistic conversations.
                    </p>
                </div>
            </div>
        </div>
    );
}

function NavSection({ title, items }: NavSectionProps) {
    return (
        <section className="mb-7 w-full min-w-0 last:mb-0">
            {/* Section title */}
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--vm-muted)">
                {title}
            </p>

            {/* Links */}
            <nav className="w-full min-w-0 space-y-1">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={({ isActive }) => `
                                group relative flex w-full min-w-0 items-center gap-3
                                rounded-(--vm-radius-md) px-3 py-2.5 text-sm font-medium
                                transition-all duration-(--vm-animation-fast)
                                ${isActive
                                    ? "bg-(--vm-primary)/10 text-(--vm-primary)"
                                    : "text-(--vm-muted) hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Active indicator */}
                                    {isActive && (
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-(--vm-primary)"
                                        />
                                    )}

                                    {/* Icon */}
                                    <Icon
                                        size={18}
                                        strokeWidth={isActive ? 2.3 : 1.8}
                                        className="pointer-events-none shrink-0"
                                    />

                                    {/* Label */}
                                    <span className="min-w-0 truncate">
                                        {item.label}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </section>
    );
}