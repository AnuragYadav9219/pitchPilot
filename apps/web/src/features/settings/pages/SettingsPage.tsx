import { ArrowLeft, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";

import {
    AccountSecurityCard,
    AppearanceCard,
    DangerZoneCard,
} from "../components";

import { SettingsError } from "../components/SettingsError";
import { SettingsLoading } from "../components/SettingsLoading";

import { useGetCurrentUserQuery } from "@/features/profile/profileApi";
import { useSettingsPage } from "../hooks/useSettingsPage";
import { Brand } from "@virtualmento/shared";
import { ConfirmDialog } from "@/components/dialogs";

export default function SettingsPage() {
    const userQuery = useGetCurrentUserQuery();

    const {
        mode,
        toggleTheme,
        logoutDialogOpen,
        openLogoutDialog,
        closeLogoutDialog,
        handleLogout,
        loggingOut,
    } = useSettingsPage();

    if (userQuery.isLoading) {
        return <SettingsLoading />;
    }

    if (
        userQuery.isError ||
        !userQuery.data?.data
    ) {
        return (
            <SettingsError
                onRetry={() =>
                    void userQuery.refetch()
                }
            />
        );
    }

    const user = userQuery.data.data;

    return (
        <>
            <main className="min-h-full bg-(--vm-background)">
                <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    {/* Back */}
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-1.5text-xs font-mediumtext-(--vm-muted)transitionhover:text-(--vm-text)"
                    >
                        <ArrowLeft size={14} />
                        Dashboard
                    </Link>

                    {/* Header */}
                    <header className="mt-6">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                                <Settings2 size={19} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-(--vm-text)">
                                    Settings
                                </h1>

                                <p className="mt-1 text-sm text-(--vm-muted)">
                                    Manage your {Brand.name} experience and account preferences.
                                </p>
                            </div>
                        </div>
                    </header>

                    {/* Settings */}
                    <div className="mt-8 space-y-5">
                        <AppearanceCard
                            mode={mode}
                            onToggle={toggleTheme}
                        />

                        <AccountSecurityCard
                            email={user.email}
                            emailVerified={
                                user.emailVerified
                            }
                            phoneNumber={
                                user.phoneNumber
                            }
                            phoneVerified={
                                user.phoneVerified
                            }
                        />

                        <DangerZoneCard
                            onLogout={openLogoutDialog}
                            loggingOut={loggingOut}
                        />
                    </div>
                </div>
            </main>

            {/* Logout confirmation */}
            <ConfirmDialog
                open={logoutDialogOpen}
                title={`Log out of ${Brand.name}?`}
                description="You'll need to sign in again to access your mentoring workspace."
                confirmLabel="Log out"
                cancelLabel="Stay signed in"
                variant="danger"
                loading={loggingOut}
                onCancel={closeLogoutDialog}
                onConfirm={handleLogout}
            />
        </>
    );
}