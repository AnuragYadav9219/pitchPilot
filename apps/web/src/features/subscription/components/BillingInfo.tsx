import {
    ShieldCheck,
    RefreshCw,
    CreditCard,
} from "lucide-react";

interface BillingInfoProps {
    autoRenew: boolean;
    onSync: () => void;
    isSyncing: boolean;
}

export function BillingInfo({
    autoRenew,
    onSync,
    isSyncing,
}: BillingInfoProps) {
    return (
        <section className="mt-10 border-t border-(--vm-border) pt-8">
            <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-(--vm-muted)">
                    Billing & security
                </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
                <InfoItem
                    icon={ShieldCheck}
                    title="Secure billing"
                    description="Payments are securely processed by Razorpay."
                />

                <InfoItem
                    icon={RefreshCw}
                    title={
                        autoRenew
                            ? "Auto renewal enabled"
                            : "Auto renewal disabled"
                    }
                    description={
                        autoRenew
                            ? "Your subscription renews automatically."
                            : "Your subscription will not renew automatically."
                    }
                />

                <button
                    type="button"
                    onClick={onSync}
                    disabled={isSyncing}
                    className="group flex items-start gap-3 rounded-xl border border-(--vm-border) bg-(--vm-surface) p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-(--vm-primary)/30 hover:bg-(--vm-surface-2)/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--vm-primary)/10 transition-transform duration-200 group-hover:scale-105">
                        <CreditCard className="h-4 w-4 text-(--vm-primary)" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-(--vm-text)">
                            Refresh billing status
                        </p>

                        <p className="mt-1 text-[11px] leading-4 text-(--vm-muted)">
                            Sync the latest subscription status.
                        </p>
                    </div>

                    {isSyncing && (
                        <RefreshCw className="ml-auto h-3.5 w-3.5 shrink-0 animate-spin text-(--vm-primary)" />
                    )}
                </button>
            </div>
        </section>
    );
}

interface InfoItemProps {
    icon: React.ComponentType<{
        className?: string;
    }>;
    title: string;
    description: string;
}

function InfoItem({
    icon: Icon,
    title,
    description,
}: InfoItemProps) {
    return (
        <div className="group flex items-start gap-3 rounded-xl border border-(--vm-border) bg-(--vm-surface) p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--vm-primary)/20 hover:bg-(--vm-surface-2)/20">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--vm-primary)/10 transition-transform duration-200 group-hover:scale-105">
                <Icon className="h-4 w-4 text-(--vm-primary)" />
            </div>

            <div className="min-w-0">
                <p className="text-xs font-semibold text-(--vm-text)">
                    {title}
                </p>

                <p className="mt-1 text-[11px] leading-4 text-(--vm-muted)">
                    {description}
                </p>
            </div>
        </div>
    );
}