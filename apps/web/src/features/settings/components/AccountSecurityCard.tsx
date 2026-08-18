import {
    CheckCircle2,
    Mail,
    Phone,
    ShieldCheck,
} from "lucide-react";

import { Card } from "@/components/ui";

interface AccountSecurityCardProps {
    email: string;
    emailVerified: boolean;
    phoneNumber: string | null;
    phoneVerified: boolean;
}

export function AccountSecurityCard({
    email,
    emailVerified,
    phoneNumber,
    phoneVerified,
}: AccountSecurityCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="border-b border-(--vm-border) px-5 py-4 sm:px-6">
                <h2 className="text-sm font-semibold text-(--vm-text)">
                    Account & security
                </h2>

                <p className="mt-0.5 text-xs text-(--vm-muted)">
                    Manage your account information and verification status.
                </p>
            </div>

            <div className="divide-y divide-(--vm-border)">
                <AccountRow
                    icon={<Mail size={16} />}
                    label="Email address"
                    value={email}
                    verified={emailVerified}
                />

                <AccountRow
                    icon={<Phone size={16} />}
                    label="Phone number"
                    value={phoneNumber || "Not added"}
                    verified={phoneVerified}
                />

                <AccountRow
                    icon={<ShieldCheck size={16} />}
                    label="Account status"
                    value="Active"
                    verified
                />
            </div>
        </Card>
    );
}

function AccountRow({
    icon,
    label,
    value,
    verified,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    verified: boolean;
}) {
    return (
        <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-surface-2) text-(--vm-muted)">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-[11px] text-(--vm-muted)">
                    {label}
                </p>

                <p className="mt-0.5 truncate text-sm font-medium text-(--vm-text)">
                    {value}
                </p>
            </div>

            <span
                className={[
                    "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium",
                    verified
                        ? "bg-(--vm-success)/10 text-(--vm-success)"
                        : "bg-(--vm-surface-2) text-(--vm-muted)",
                ].join(" ")}
            >
                {verified && <CheckCircle2 size={11} />}

                {verified ? "Verified" : "Not verified"}
            </span>
        </div>
    );
}