import { useState } from "react";
import {
    ChevronDown,
    LogOut,
    UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";

import { useLogoutMutation } from "@/features/auth/authApi";
import { authStorage } from "@/features/auth/authStorage";

import { appToast } from "@/lib/toast";

import { ConfirmDialog } from "../dialogs";

export function UserMenu() {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const [
        logoutDialogOpen,
        setLogoutDialogOpen,
    ] = useState(false);

    const user = useAppSelector(
        (state) => state.auth.user,
    );

    const [
        logout,
        { isLoading },
    ] = useLogoutMutation();

    async function handleLogout() {
        const refreshToken =
            authStorage.getRefreshToken();

        if (!refreshToken) {
            setLogoutDialogOpen(false);
            setMenuOpen(false);

            navigate("/login", {
                replace: true,
            });

            return;
        }

        try {
            await logout({
                refreshToken,
            }).unwrap();

            appToast.success(
                "You have been logged out.",
            );

            setLogoutDialogOpen(false);
            setMenuOpen(false);

            navigate("/login", {
                replace: true,
            });
        } catch {
            /*
             * logout mutation already clears local
             * credentials in its finally block.
             */
            appToast.info("Your session has been ended.");

            setLogoutDialogOpen(false);
            setMenuOpen(false);

            navigate("/login", {
                replace: true,
            });
        }
    }

    const fullName = user?.fullName || "User";

    const email = user?.email || "";

    const initials = fullName
            .split(/\s+/)
            .filter(Boolean)
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "U";

    return (
        <>
            <div className="relative">
                {/* User trigger */}
                <button
                    type="button"
                    onClick={() =>
                        setMenuOpen(
                            (current) => !current,
                        )
                    }
                    className="flex items-center gap-2 rounded-(--vm-radius-md) p-1.5 transition-colors hover:bg-(--vm-surface-2)"
                    aria-label="Open user menu"
                    aria-expanded={menuOpen}
                >
                    {/* Avatar */}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)/10 text-xs font-bold text-(--vm-primary)">
                        {initials}
                    </span>

                    {/* User info */}
                    <span className="hidden text-left sm:block">
                        <span className="block max-w-32 truncate text-sm font-medium text-(--vm-text)">
                            {fullName}
                        </span>

                        <span className="block max-w-32 truncate text-[11px] text-(--vm-muted)">
                            {email}
                        </span>
                    </span>

                    <ChevronDown
                        size={16}
                        className={[
                            "hidden text-(--vm-muted) transition-transform sm:block",
                            menuOpen
                                ? "rotate-180"
                                : "",
                        ].join(" ")}
                    />
                </button>

                {/* Dropdown */}
                {menuOpen && (
                    <>
                        {/* Outside click layer */}
                        <button
                            type="button"
                            aria-label="Close user menu"
                            onClick={() =>
                                setMenuOpen(false)
                            }
                            className="fixed inset-0 z-40 cursor-default"
                        />

                        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-surface) shadow-xl">
                            {/* User information */}
                            <div className="border-b border-(--vm-border) px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)/10 text-sm font-bold text-(--vm-primary)">
                                        {initials}
                                    </span>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-(--vm-text)">
                                            {fullName}
                                        </p>

                                        <p className="truncate text-xs text-(--vm-muted)">
                                            {email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        navigate("/profile");
                                    }}
                                    className="flex cursor-pointer w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-(--vm-text) transition-colors hover:bg-(--vm-surface-2)"
                                >
                                    <UserRound
                                        size={17}
                                        className="text-(--vm-muted)"
                                    />

                                    Profile
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setLogoutDialogOpen(true);
                                    }}
                                    disabled={isLoading}
                                    className="flex cursor-pointer w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-(--vm-danger) transition-colors hover:bg-(--vm-danger)/10 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <LogOut size={17} />
                                    Log out
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Logout confirmation */}
            <div className="flex justify-center items-center h-screen">
                <ConfirmDialog
                open={logoutDialogOpen}
                title="Log out of VirtualMento?"
                description="You'll need to sign in again to access your mentoring workspace."
                confirmLabel="Log out"
                cancelLabel="Stay signed in"
                variant="danger"
                loading={isLoading}
                onCancel={() =>
                    setLogoutDialogOpen(false)
                }
                onConfirm={handleLogout}
            />
            </div>
        </>
    );
}