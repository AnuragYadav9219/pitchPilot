import { Coins, LockKeyhole, Sparkles } from "lucide-react";
import { CreditInfo } from "./CreditInfo";
import type { CreditBalanceResponse } from "../types";

interface CreditBalanceCardProps {
    balance: CreditBalanceResponse;
}

export function CreditBalanceCard({ balance }: CreditBalanceCardProps) {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) shadow-sm transition-all duration-300 hover:border-(--vm-border)/80">
            {/* Ambient decorative lighting */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-(--vm-primary)/10 blur-3xl transition-all duration-500 group-hover:bg-(--vm-primary)/15" aria-hidden="true" />

            <div className="relative p-5 sm:p-6">
                {/* Main top balance header */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-(--vm-primary)/10 shadow-inner">
                            <Coins className="h-5 w-5 text-(--vm-primary)" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-sm font-semibold tracking-tight text-(--vm-text)">AI Credits</h2>
                            </div>
                            <p className="mt-0.5 text-xs text-(--vm-muted)">Used for AI-powered features</p>
                        </div>
                    </div>

                    <div className="sm:text-right">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-(--vm-muted)">Available</p>
                        <div className="mt-0.5 flex items-baseline gap-1.5 sm:justify-end">
                            <span className="text-3xl font-extrabold tracking-tight text-(--vm-text)">
                                {balance.available.toLocaleString()}
                            </span>
                            <span className="text-xs font-medium text-(--vm-muted)">credits</span>
                        </div>
                    </div>
                </div>

                {/* Sub metrics grid */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <CreditMetric icon={Sparkles} label="Total credits" value={balance.balance} />
                    <CreditMetric icon={LockKeyhole} label="Reserved" value={balance.reserved} />
                </div>

                {/* Additional info footer block */}
                <div className="mt-4">
                    <CreditInfo />
                </div>
            </div>
        </section>
    );
}

function CreditMetric({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: number;
}) {
    return (
        <div className="group flex items-center justify-between rounded-xl border border-(--vm-border) bg-(--vm-surface-2)/30 px-4 py-3 transition-all duration-200 hover:border-(--vm-primary)/30 hover:bg-(--vm-surface-2)/60">
            <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--vm-surface) shadow-sm transition-transform duration-200 group-hover:scale-105">
                    <Icon className="h-3.5 w-3.5 text-(--vm-muted) transition-colors group-hover:text-(--vm-primary)" />
                </div>
                <span className="text-xs font-medium text-(--vm-muted)">{label}</span>
            </div>

            <span className="text-sm font-bold tracking-tight text-(--vm-text)">
                {value.toLocaleString()}
            </span>
        </div>
    );
}