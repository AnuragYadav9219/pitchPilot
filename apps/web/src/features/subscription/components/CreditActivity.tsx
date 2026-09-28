import {
    ArrowDownLeft,
    ArrowUpRight,
    Clock3,
    Coins,
} from "lucide-react";

import { useGetCreditTransactionsQuery } from "../creditApi";

export function CreditActivity() {
    const { data, isLoading } =
        useGetCreditTransactionsQuery({
            page: 0,
            size: 5,
        });

    const transactions = data?.data?.content ?? [];

    return (
        <section className="rounded-2xl border border-(--vm-border) bg-(--vm-surface)">
            <div className="flex items-center justify-between border-b border-(--vm-border) px-5 py-4 sm:px-6">
                <div>
                    <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-(--vm-primary)" />

                        <h2 className="text-sm font-semibold text-(--vm-text)">
                            Recent credit activity
                        </h2>
                    </div>

                    <p className="mt-1 text-xs text-(--vm-muted)">
                        See how your AI credits are being used.
                    </p>
                </div>

                {transactions.length > 0 && (
                    <span className="hidden text-[10px] font-medium uppercase tracking-wider text-(--vm-muted) sm:block">
                        Last 5
                    </span>
                )}
            </div>

            {isLoading ? (
                <CreditActivitySkeleton />
            ) : transactions.length === 0 ? (
                <div className="flex min-h-32 flex-col items-center justify-center px-6 text-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--vm-surface-2)">
                        <Coins className="h-4 w-4 text-(--vm-muted)" />
                    </div>

                    <p className="mt-3 text-xs font-medium text-(--vm-text)">
                        No credit activity yet
                    </p>

                    <p className="mt-1 text-[11px] text-(--vm-muted)">
                        Your credit activity will appear here.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-(--vm-border)">
                    {transactions.map((transaction) => (
                        <CreditActivityRow
                            key={transaction.id}
                            transaction={transaction}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

function CreditActivityRow({
    transaction,
}: {
    transaction: {
        id: string;
        amount: number;
        type: string;
        action: string;
        description: string | null;
        createdAt: string;
    };
}) {
    const isPositive =
        transaction.amount > 0 ||
        transaction.type === "RESERVATION_RELEASE" ||
        transaction.type === "REFUND";

    const isReservation =
        transaction.type === "RESERVATION";

    const Icon = isReservation
        ? Clock3
        : isPositive
            ? ArrowDownLeft
            : ArrowUpRight;

    const iconClass = isReservation
        ? "bg-(--vm-warning)/10 text-(--vm-warning)"
        : isPositive
            ? "bg-(--vm-success)/10 text-(--vm-success)"
            : "bg-(--vm-danger)/10 text-(--vm-danger)";

    const amountClass = isReservation
        ? "text-(--vm-warning)"
        : isPositive
            ? "text-(--vm-success)"
            : "text-(--vm-danger)";

    const formattedDate = new Date(
        transaction.createdAt,
    ).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
    });

    const formattedTime = new Date(
        transaction.createdAt,
    ).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
    });

    const amountText =
        transaction.amount > 0
            ? `+${transaction.amount}`
            : transaction.amount.toString();

    return (
        <div className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-(--vm-surface-2)/30 sm:px-6">
            <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
            >
                <Icon className="h-3.5 w-3.5" />
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-(--vm-text)">
                    {transaction.description ||
                        formatAction(transaction.action)}
                </p>

                <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-(--vm-muted)">
                    <span>
                        {formatAction(transaction.action)}
                    </span>

                    <span>•</span>

                    <span>
                        {formattedDate} at {formattedTime}
                    </span>
                </div>
            </div>

            <span
                className={`shrink-0 text-sm font-bold ${amountClass}`}
            >
                {amountText}
            </span>
        </div>
    );
}

function formatAction(action: string) {
    return action
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) =>
            char.toUpperCase(),
        );
}

function CreditActivitySkeleton() {
    return (
        <div className="divide-y divide-(--vm-border) animate-pulse">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 px-5 py-3.5 sm:px-6"
                >
                    <div className="h-8 w-8 rounded-lg bg-(--vm-surface-2)" />

                    <div className="flex-1 space-y-1.5">
                        <div className="h-3 w-40 rounded bg-(--vm-surface-2)" />
                        <div className="h-2.5 w-28 rounded bg-(--vm-surface-2)" />
                    </div>

                    <div className="h-4 w-8 rounded bg-(--vm-surface-2)" />
                </div>
            ))}
        </div>
    );
}