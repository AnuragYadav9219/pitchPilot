import {
    BookOpen,
    History,
    LayoutDashboard,
    MessageCircle,
    Settings,
    UserRound,
    X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { Logo } from "@/components/branding/Logo";

interface MobileSidebarProps {
    open: boolean;
    onClose: () => void;
}

const practiceNavigation = [
    {
        label: "Practice",
        href: "/practice",
        icon: MessageCircle,
    },
    {
        label: "Scenarios",
        href: "/scenarios",
        icon: BookOpen,
    },
    {
        label: "History",
        href: "/history",
        icon: History,
    },
];

const accountNavigation = [
    {
        label: "Profile",
        href: "/profile",
        icon: UserRound,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export function MobileSidebar({
    open,
    onClose,
}: MobileSidebarProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close navigation"
                onClick={onClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-[5px]"
            />

            {/* Drawer */}
            <aside
                className={[
                    "relative flex h-full w-[min(82vw,320px)] flex-col",
                    "border-r border-(--vm-border)",
                    "bg-(--vm-surface)",
                    "shadow-2xl",
                    "animate-in slide-in-from-left duration-200",
                ].join(" ")}
            >
                {/* Header */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-(--vm-border) px-5">
                    <Logo size="md" />

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-(--vm-muted) transition-colors hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                        aria-label="Close navigation"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-3 py-5">
                    <NavSection
                        title="Overview"
                        items={[
                            {
                                label: "Dashboard",
                                href: "/dashboard",
                                icon: LayoutDashboard,
                            },
                        ]}
                        onNavigate={onClose}
                    />

                    <NavSection
                        title="Practice"
                        items={practiceNavigation}
                        onNavigate={onClose}
                    />

                    <NavSection
                        title="Account"
                        items={accountNavigation}
                        onNavigate={onClose}
                    />
                </div>
            </aside>
        </div>
    );
}

interface NavSectionProps {
    title: string;
    items: {
        label: string;
        href: string;
        icon: typeof LayoutDashboard;
    }[];
    onNavigate: () => void;
}

function NavSection({
    title,
    items,
    onNavigate,
}: NavSectionProps) {
    return (
        <section className="mb-6">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--vm-muted)">
                {title}
            </p>

            <nav className="space-y-1">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                                [
                                    "flex items-center gap-3 rounded-(--vm-radius-md) px-3 py-2.5",
                                    "text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-(--vm-primary)/10 text-(--vm-primary)"
                                        : "text-(--vm-muted) hover:bg-(--vm-surface-2) hover:text-(--vm-text)",
                                ].join(" ")
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        size={18}
                                        strokeWidth={isActive
                                            ? 2.3
                                            : 1.8
                                        }
                                    />

                                    <span>
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