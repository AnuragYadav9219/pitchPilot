import { CalendarDays, CheckCircle2, CreditCard, RefreshCw } from "lucide-react";
import type { SubscriptionResponse } from "@virtualmentor/shared";

interface BillingSummaryProps {
    subscription: SubscriptionResponse;
    onSync: () => void;
    isSyncing: boolean;
}

export function BillingSummary({ subscription, onSync, isSyncing }: BillingSummaryProps) {
    const renewalDate = subscription.expiresAt
        ? new Date(subscription.expiresAt).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "—";

    return (
        <section className="overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) shadow-sm transition-all duration-300 hover:border-(--vm-border)/80">
            {/* Header */}
            <div className="border-b border-(--vm-border) px-5 py-4 sm:px-6">
                <h2 className="text-sm font-semibold tracking-tight text-(--vm-text)">Billing</h2>
                <p className="mt-0.5 text-xs text-(--vm-muted)">Subscription and renewal information.</p>
            </div>

            {/* Grid Layout */}
            <div className="grid divide-y divide-(--vm-border) sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <BillingItem icon={CreditCard} label="Current plan" value={subscription.plan} />

                <BillingItem icon={CalendarDays} label={subscription.autoRenew ? "Next renewal" : "Expires"} value={renewalDate} />

                {/* Auto renewal status card */}
                <div className="flex items-center justify-between gap-3 px-5 py-4 transition-colors duration-200 hover:bg-(--vm-surface-2)/30 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--vm-primary)/10 transition-transform duration-200 hover:scale-105">
                            <RefreshCw className="h-4 w-4 text-(--vm-primary)" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-(--vm-muted)">Auto renewal</p>
                            <p className="mt-0.5 text-xs font-semibold text-(--vm-text)">{subscription.autoRenew ? "Enabled" : "Disabled"}</p>
                        </div>
                    </div>

                    {subscription.autoRenew && (
                        <div className="flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-(--vm-success)/10">
                            <CheckCircle2 className="h-4 w-4 text-(--vm-success)" />
                        </div>
                    )}
                </div>
            </div>

            {/* Footer action */}
            <div className="border-t border-(--vm-border) bg-(--vm-surface-2)/20 px-5 py-3.5 sm:px-6">
                <button
                    type="button"
                    disabled={isSyncing}
                    onClick={onSync}
                    className="group inline-flex items-center gap-2 text-[11px] font-semibold text-(--vm-primary) transition-all duration-200 hover:opacity-80 active:scale-95 disabled:opacity-50"
                >
                    <RefreshCw className={`h-3.5 w-3.5 transition-transform duration-500 ${isSyncing ? "animate-spin" : "group-hover:rotate-180"}`} />
                    <span>{isSyncing ? "Refreshing billing status..." : "Refresh billing status"}</span>
                </button>
            </div>
        </section>
    );
}

function BillingItem({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3 px-5 py-4 transition-colors duration-200 hover:bg-(--vm-surface-2)/30 sm:px-6">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--vm-primary)/10 transition-transform duration-200 hover:scale-105">
                <Icon className="h-4 w-4 text-(--vm-primary)" />
            </div>
            <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-(--vm-muted)">{label}</p>
                <p className="mt-0.5 truncate text-xs font-semibold text-(--vm-text)">{value}</p>
            </div>
        </div>
    );
}