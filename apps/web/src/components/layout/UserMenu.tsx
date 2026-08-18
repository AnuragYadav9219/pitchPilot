import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { useLogoutMutation } from "@/features/auth/authApi";
import { authStorage } from "@/features/auth/authStorage";
import { appToast } from "@/lib/toast";
import { ConfirmDialog } from "../dialogs";

export function UserMenu() {
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const user = useAppSelector((state) => state.auth.user);
    const [logout, { isLoading }] = useLogoutMutation();

    // =========================================================
    // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    // =========================================================
    useEffect(() => {
        if (!menuOpen) return;

        function handlePointerDown(event: PointerEvent) {
            const target = event.target as Node;
            if (menuRef.current && !menuRef.current.contains(target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [menuOpen]);

    // =========================================================
    // CLOSE ON ESCAPE
    // =========================================================
    useEffect(() => {
        if (!menuOpen) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuOpen]);

    // =========================================================
    // LOGOUT
    // =========================================================
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

    // =========================================================
    // USER DATA
    // =========================================================
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
            {/* =================================================
                USER MENU
            ================================================= */}
            <div ref={menuRef} className="relative flex h-10 shrink-0 items-center">

                {/* =================================================
                    TRIGGER
                ================================================= */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((current) => !current)}
                    aria-label="Open user menu"
                    aria-expanded={menuOpen}
                    className={`
                        inline-flex h-10 shrink-0 items-center gap-2 rounded-(--vm-radius-md) p-1.5 transition-all duration-150
                        hover:bg-(--vm-surface-2)
                        ${menuOpen ? "bg-(--vm-surface-2)" : ""}
                    `}
                >
                    {/* Avatar */}
                    <span className="flex cursor-pointer h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)/10 text-xs font-bold text-(--vm-primary)">
                        {initials}
                    </span>

                    {/* User information */}
                    <span className="hidden min-w-0 text-left sm:block">
                        <span className="block max-w-32 truncate text-sm font-medium text-(--vm-text)">
                            {fullName}
                        </span>
                        <span className="block max-w-32 truncate text-[11px] text-(--vm-muted)">
                            {email}
                        </span>
                    </span>

                    {/* Chevron */}
                    <ChevronDown
                        size={16}
                        className={`
                            hidden shrink-0 text-(--vm-muted) transition-transform duration-200 sm:block
                            ${menuOpen ? "rotate-180" : ""}
                        `}
                    />
                </button>

                {/* =================================================
                    DROPDOWN
                ================================================= */}
                {menuOpen && (
                    <div
                        role="menu"
                        className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                    >
                        {/* =================================================
                            USER HEADER
                        ================================================= */}
                        <div className="border-b border-(--vm-border) bg-(--vm-surface) px-4 py-4">
                            <div className="flex items-center gap-3">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)/10 text-sm font-bold text-(--vm-primary)">
                                    {initials}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-(--vm-text)">
                                        {fullName}
                                    </p>
                                    <p className="mt-0.5 truncate text-xs text-(--vm-muted)">
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            ACTIONS
                        ================================================= */}
                        <div className="bg-(--vm-surface) p-2">
                            {/* Profile */}
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/profile");
                                }}
                                className="
                                    flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5
                                    text-sm font-medium text-(--vm-text) transition-colors hover:bg-(--vm-surface-2)
                                "
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--vm-surface-2)">
                                    <UserRound size={16} className="text-(--vm-muted)" />
                                </span>
                                <span>Profile</span>
                            </button>

                            {/* Logout */}
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setMenuOpen(false);
                                    setLogoutDialogOpen(true);
                                }}
                                disabled={isLoading}
                                className="
                                    mt-1 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5
                                    text-sm font-medium text-(--vm-danger) transition-colors hover:bg-(--vm-danger)/10
                                    disabled:cursor-not-allowed disabled:opacity-50
                                "
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--vm-danger)/10">
                                    <LogOut size={16} />
                                </span>
                                <span>Log out</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* =================================================
                LOGOUT CONFIRMATION
            ================================================= */}
            <ConfirmDialog
                open={logoutDialogOpen}
                title="Log out of VirtualMento?"
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