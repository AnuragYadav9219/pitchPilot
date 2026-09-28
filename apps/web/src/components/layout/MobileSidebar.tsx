import {
    BarChart3,
    BriefcaseBusiness,
    CreditCard,
    History,
    LayoutDashboard,
    MessageCircle,
    Settings,
    UserRound,
    X,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "@/components/branding/Logo";

interface MobileSidebarProps {
    open: boolean;
    onClose: () => void;
}

const practiceNavigation = [
    { label: "Practice", href: "/practice", icon: MessageCircle },
    { label: "Career", href: "/career", icon: BriefcaseBusiness },
    { label: "Progress", href: "/progress", icon: BarChart3 },
    { label: "History", href: "/history", icon: History },
];

const accountNavigation = [
    { label: "Profile", href: "/profile", icon: UserRound },
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Subscription", href: "/subscription", icon: CreditCard },
];

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
    const navigate = useNavigate();

    if (!open) return null;

    const handleNavigateToSub = () => {
        onClose();
        navigate("/subscription");
    };

    return (
        <div className="fixed inset-0 z-100 lg:hidden">
            <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            />

            <aside className="relative z-101 flex h-full w-72 flex-col bg-(--vm-surface-solid) border-r border-(--vm-border) shadow-2xl animate-in slide-in-from-left duration-250">
                {/* Header */}
                <div className="flex h-14 shrink-0 items-center justify-between px-5 border-b border-(--vm-border)/50">
                    <Logo showName size="sm" />
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-(--vm-muted) transition-colors hover:bg-(--vm-surface-2) hover:text-(--vm-text) active:scale-95"
                        aria-label="Close navigation"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5">
                    <NavSection
                        title="Overview"
                        items={[{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]}
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

                {/* Bottom Subscription Promo Card */}
                <div className="shrink-0 p-3.5 border-t border-(--vm-border)/50 bg-(--vm-surface)/50">
                    <div
                        onClick={handleNavigateToSub}
                        className="group relative overflow-hidden rounded-xl border border-(--vm-primary)/20 bg-linear-to-br from-(--vm-primary)/10 via-(--vm-surface-2)/40 to-(--vm-surface-2) p-3 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                        <div className="absolute -right-6 -bottom-6 h-16 w-16 rounded-full bg-(--vm-primary)/20 blur-xl pointer-events-none" />
                        
                        <div className="flex items-center gap-2 text-(--vm-primary) mb-1">
                            <Sparkles size={14} />
                            <span className="text-[11px] font-bold tracking-wide uppercase">Upgrade to Pro</span>
                        </div>
                        
                        <p className="text-xs font-semibold text-(--vm-text) tracking-tight">
                            Unlock unlimited AI mock interviews
                        </p>
                        
                        <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-(--vm-primary)">
                            <span>Explore plans</span>
                            <ArrowRight size={12} />
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

function NavSection({
    title,
    items,
    onNavigate,
}: {
    title: string;
    items: { label: string; href: string; icon: typeof LayoutDashboard }[];
    onNavigate: () => void;
}) {
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
                        onClick={onNavigate}
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