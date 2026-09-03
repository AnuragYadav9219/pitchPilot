import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Sparkles, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";
import { useLogoutMutation } from "@/features/auth/authApi";
import { authStorage } from "@/features/auth/authStorage";
import { useGetMySubscriptionQuery } from "@/features/subscription/subscriptionApi";

import { appToast } from "@/lib/toast";
import { ConfirmDialog } from "../dialogs";
import { Brand } from "@virtualmentor/shared";

export function UserMenu() {
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const user = useAppSelector((state) => state.auth.user);
    const { data: subscriptionData } = useGetMySubscriptionQuery();
    const [logout, { isLoading }] = useLogoutMutation();

    // Subscription Logic
    const plan = subscriptionData?.data?.plan ?? "FREE";
    const isPro = plan === "PRO";
    const isPremium = plan === "PREMIUM";
    const isPaidPlan = isPro || isPremium;
    const planLabel = isPremium ? "Premium" : isPro ? "Pro" : "Free";

    // Outside Click Handler
    useEffect(() => {
        if (!menuOpen) return;
        const handlePointerDown = (e: PointerEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [menuOpen]);

    // Escape Key Handler
    useEffect(() => {
        if (!menuOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [menuOpen]);

    // Logout Handler
    async function handleLogout() {
        const refreshToken = authStorage.getRefreshToken();

        if (!refreshToken) {
            setLogoutDialogOpen(false);
            setMenuOpen(false);
            navigate("/login", { replace: true });
            return;
        }

        try {
            await logout({ refreshToken }).unwrap();
            appToast.success("You have been logged out.");
        } catch {
            appToast.info("Your session has been ended.");
        } finally {
            setLogoutDialogOpen(false);
            setMenuOpen(false);
            navigate("/login", { replace: true });
        }
    }

    // User Details
    const fullName = user?.fullName || "User";
    const email = user?.email || "";
    const initials =
        fullName
            .split(/\s+/)
            .filter(Boolean)
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "U";

    return (
        <>
            <div ref={menuRef} className="relative flex h-10 shrink-0 items-center">
                {/* Trigger */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Open user menu"
                    aria-expanded={menuOpen}
                    className={`group inline-flex h-10 shrink-0 items-center gap-2 rounded-full p-1.5 pr-2 transition-all duration-150 cursor-pointer `}
                >
                    <span
                        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-transform duration-150 group-hover:scale-[1.02] 
                            ${isPaidPlan
                                ? "bg-(--vm-primary)/12 text-(--vm-primary) ring-1 ring-(--vm-primary)/25"
                                : "bg-(--vm-primary)/10 text-(--vm-primary)"
                            }`}
                    >
                        {initials}
                        {isPaidPlan && (
                            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-(--vm-surface-solid) bg-(--vm-primary) text-white">
                                <Sparkles size={7} />
                            </span>
                        )}
                    </span>

                    <span className="hidden min-w-0 text-left sm:block">
                        <span className="block max-w-36 truncate text-sm font-medium text-(--vm-text)">
                            {fullName}
                        </span>
                        <span className="mt-0.5 flex min-w-0 items-center gap-1.5">
                            <span className="max-w-28 truncate text-[11px] text-(--vm-muted)">
                                {email}
                            </span>
                            <span className="flex shrink-0 items-center gap-1 text-[10px] font-medium">
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${isPaidPlan ? "bg-(--vm-primary)" : "bg-(--vm-muted)"
                                        }`}
                                />
                                <span className={isPaidPlan ? "text-(--vm-primary)" : "text-(--vm-muted)"}>
                                    {planLabel}
                                </span>
                            </span>
                        </span>
                    </span>

                    <ChevronDown
                        size={15}
                        className={`hidden shrink-0 text-(--vm-muted) transition-transform duration-200 sm:block ${menuOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                    <div
                        role="menu"
                        className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) shadow-[0_18px_50px_rgba(0,0,0,0.18)] duration-150 animate-in fade-in-0 zoom-in-95"
                    >
                        <div className="p-4">
                            <div className="flex items-center gap-3">
                                <span
                                    className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${isPaidPlan
                                        ? "bg-(--vm-primary)/12 text-(--vm-primary)"
                                        : "bg-(--vm-primary)/10 text-(--vm-primary)"
                                        }`}
                                >
                                    {initials}
                                    {isPaidPlan && (
                                        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-(--vm-surface-solid) bg-(--vm-primary) text-white">
                                            <Sparkles size={8} />
                                        </span>
                                    )}
                                </span>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-(--vm-text)">
                                        {fullName}
                                    </p>
                                    <p className="mt-0.5 truncate text-xs text-(--vm-muted)">
                                        {email}
                                    </p>
                                    <div className="mt-0.5">
                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${isPremium
                                                ? "border-(--vm-primary)/35 bg-(--vm-primary)/12 text-(--vm-primary)"
                                                : isPro
                                                    ? "border-(--vm-primary)/25 bg-(--vm-primary)/8 text-(--vm-primary)"
                                                    : "border-(--vm-border) bg-(--vm-surface-2) text-(--vm-muted)"
                                                }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${isPaidPlan ? "bg-(--vm-primary)" : "bg-(--vm-muted)"
                                                    }`}
                                            />
                                            {planLabel} plan
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="border-t border-(--vm-border) p-2">
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/profile");
                                }}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-(--vm-text) transition-colors hover:bg-(--vm-surface-2)"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--vm-surface-2)">
                                    <UserRound size={15} className="text-(--vm-muted)" />
                                </span>
                                <span>Profile</span>
                            </button>

                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setMenuOpen(false);
                                    setLogoutDialogOpen(true);
                                }}
                                disabled={isLoading}
                                className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-(--vm-danger) transition-colors hover:bg-(--vm-danger)/8 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--vm-danger)/8">
                                    <LogOut size={15} />
                                </span>
                                <span>{isLoading ? "Logging out..." : "Log out"}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={logoutDialogOpen}
                title={`Log out of ${Brand.name}?`}
                description="You'll need to sign in again to access your mentoring workspace."
                confirmLabel="Log out"
                cancelLabel="Stay signed in"
                variant="danger"
                loading={isLoading}
                onCancel={() => setLogoutDialogOpen(false)}
                onConfirm={handleLogout}
            />
        </>
    );
}