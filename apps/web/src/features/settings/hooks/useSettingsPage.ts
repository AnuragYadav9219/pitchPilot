import { useTheme } from "@/app/theme/ThemeProvider";
import { useLogoutMutation } from "@/features/auth/authApi";
import { authStorage } from "@/features/auth/authStorage";
import { appToast } from "@/lib/toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSettingsPage() {
    const navigate = useNavigate();
    const { mode, toggleTheme } = useTheme();

    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [logout, logoutState] = useLogoutMutation();

    async function handleLogout() {
        const refreshToken = authStorage.getRefreshToken();

        try {
            if (refreshToken) {
                await logout({
                    refreshToken,
                }).unwrap();

                appToast.success(
                    "You have been logged out.",
                );
            }
        } catch {
            appToast.info(
                "Your session has been ended.",
            );
        } finally {
            setLogoutDialogOpen(false);

            navigate("/login", {
                replace: true,
            });
        }
    }

    function openLogoutDialog() {
        setLogoutDialogOpen(true);
    }

    function closeLogoutDialog() {
        if (!logoutState.isLoading) {
            setLogoutDialogOpen(false);
        }
    }

    return {
        mode,
        toggleTheme,

        logoutDialogOpen,
        openLogoutDialog,
        closeLogoutDialog,
        handleLogout,
        loggingOut: logoutState.isLoading,
    };
}