import {
    BarChart3,
    BriefcaseBusiness,
    CreditCard,
    History,
    LayoutDashboard,
    MessageCircle,
    Settings,
    UserRound,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import type { ComponentType } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "@/components/branding/Logo";

interface NavItem {
    label: string;
    href: string;
    icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

const navigation: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Practice", href: "/practice", icon: MessageCircle },
    { label: "Career", href: "/career", icon: BriefcaseBusiness },
    { label: "Progress", href: "/progress", icon: BarChart3 },
    { label: "History", href: "/history", icon: History },
];

const accountNavigation: NavItem[] = [
    { label: "Profile", href: "/profile", icon: UserRound },
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Subscription", href: "/subscription", icon: CreditCard },
];

export function Sidebar() {
    const navigate = useNavigate();

    return (
        <aside className="flex h-full w-full flex-col bg-(--vm-surface) border-r border-(--vm-border)">
            {/* Header */}
            <div className="flex h-14 shrink-0 items-center px-5 border-b border-(--vm-border)/50">
                <Logo showName size="sm" />
            </div>

            {/* Navigation Lists */}
            <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5">
                <NavSection title="Overview" items={[navigation[0]]} />
                <NavSection title="Practice" items={navigation.slice(1)} />
                <NavSection title="Account" items={accountNavigation} />
            </div>

            {/* Bottom Subscription Promo Card */}
            <div className="shrink-0 p-3.5 border-t border-(--vm-border)/50">
                <div
                    onClick={() => navigate("/subscription")}
                    className="group relative overflow-hidden rounded-xl border border-(--vm-primary)/20 bg-linear-to-br from-(--vm-primary)/10 via-(--vm-surface-2)/40 to-(--vm-surface-2) p-3 transition-all duration-200 hover:border-(--vm-primary)/40 hover:shadow-sm cursor-pointer"
                >
                    <div className="absolute -right-6 -bottom-6 h-16 w-16 rounded-full bg-(--vm-primary)/20 blur-xl pointer-events-none transition-transform duration-300 group-hover:scale-125" />
                    
                    <div className="flex items-center gap-2 text-(--vm-primary) mb-1">
                        <Sparkles size={14} className="animate-pulse" />
                        <span className="text-[11px] font-bold tracking-wide uppercase">Upgrade to Pro</span>
                    </div>
                    
                    <p className="text-xs font-semibold text-(--vm-text) tracking-tight">
                        Unlock unlimited AI mock interviews
                    </p>
                    
                    <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-(--vm-primary) transition-transform duration-200 group-hover:translate-x-0.5">
                        <span>Explore plans</span>
                        <ArrowRight size={12} />
                    </div>
                </div>
            </div>
        </aside>
    );
}

function NavSection({ title, items }: { title: string; items: NavItem[] }) {
    return (
        <div className="space-y-1">
            <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-(--vm-muted)/70">
                {title}
            </p>
            {items.map((item) => {
                const Icon = item.icon;
                return (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) =>
                            `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 active:scale-[0.98] ${
                                isActive
                                    ? "bg-(--vm-primary)/10 text-(--vm-primary) font-semibold shadow-xs"
                                    : "text-(--vm-muted) hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-(--vm-primary)" />
                                )}
                                <Icon
                                    size={16}
                                    strokeWidth={isActive ? 2.3 : 1.7}
                                    className="transition-transform duration-200 group-hover:scale-110"
                                />
                                <span className="truncate">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                );
            })}
        </div>
    );
}