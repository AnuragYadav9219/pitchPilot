import {
    LogOut,
    ShieldAlert,
    Trash2,
} from "lucide-react";

import { Button, Card } from "@/components/ui";
import { Brand } from "@virtualmento/shared";

interface DangerZoneCardProps {
    onLogout: () => void;
    loggingOut?: boolean;
}

export function DangerZoneCard({
    onLogout,
    loggingOut = false,
}: DangerZoneCardProps) {
    return (
        <Card className="overflow-hidden">
            {/* Header */}
            <div className="border-b border-(--vm-border) px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <ShieldAlert
                        size={16}
                        className="text-(--vm-danger)"
                    />

                    <h2 className="text-sm font-semibold text-(--vm-text)">
                        Account actions
                    </h2>
                </div>

                <p className="mt-1 text-xs text-(--vm-muted)">
                    Manage your session or permanently remove your
                    account.
                </p>
            </div>

            {/* Logout */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-surface-2) text-(--vm-muted)">
                        <LogOut size={16} />
                    </div>

                    <div className="min-w-0">
                        <p className="text-sm font-medium text-(--vm-text)">
                            Log out
                        </p>

                        <p className="mt-0.5 text-xs text-(--vm-muted)">
                            End your current {Brand.name} session.
                        </p>
                    </div>
                </div>

                <Button
                    variant="secondary"
                    size="xs"
                    onClick={onLogout}
                    loading={loggingOut}
                >
                    Log out
                </Button>
            </div>

            {/* Delete */}
            <div className="border-t border-(--vm-border) bg-(--vm-danger)/2.5 px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-danger)/10 text-(--vm-danger)">
                            <Trash2 size={16} />
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-(--vm-text)">
                                    Delete account
                                </p>

                                <span className="rounded-full bg-(--vm-surface-2) px-2 py-0.5 text-[9px] font-medium text-(--vm-muted)">
                                    Coming soon
                                </span>
                            </div>

                            <p className="mt-0.5 text-xs text-(--vm-muted)">
                                Permanently delete your {Brand.name} account and data.
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="danger"
                        size="xs"
                        disabled
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Card>
    );
}