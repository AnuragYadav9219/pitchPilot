import { AlertTriangle, ArrowRight, AlertCircle } from "lucide-react";

interface UsageAlertProps {
    label: string;
    used: number;
    limit: number;
    onUpgrade: () => void;
}

export function UsageAlert({
    label,
    used,
    limit,
    onUpgrade,
}: UsageAlertProps) {
    if (limit <= 0) {
        return null;
    }

    const percentage = (used / limit) * 100;

    if (percentage < 80) {
        return null;
    }

    const reached = used >= limit;

    return (
        <div
            className={`
                mt-4 flex flex-col gap-3 rounded-2xl border px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between transition-all duration-200 shadow-sm
                ${reached
                    ? "border-(--vm-danger)/30 bg-(--vm-danger)/5"
                    : "border-(--vm-warning)/30 bg-(--vm-warning)/5"
                }
            `}
        >
            <div className="flex items-start gap-3.5">
                <div
                    className={`
                        flex h-7 w-7 shrink-0 items-center justify-center rounded-lg shadow-sm
                        ${reached
                            ? "bg-(--vm-danger)/10 text-(--vm-danger)"
                            : "bg-(--vm-warning)/10 text-(--vm-warning)"
                        }
                    `}
                >
                    {reached ? (
                        <AlertTriangle className="h-4 w-4" />
                    ) : (
                        <AlertCircle className="h-4 w-4" />
                    )}
                </div>

                <div>
                    <p className="text-xs font-semibold text-(--vm-text)">
                        {reached
                            ? `${label} limit reached`
                            : `You're approaching your ${label.toLowerCase()} limit`}
                    </p>

                    <p className="mt-0.5 text-[11px] font-medium text-(--vm-muted)">
                        {reached
                            ? `You've used all ${limit} available this month.`
                            : `${used} of ${limit} used this month (${Math.round(percentage)}%).`}
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={onUpgrade}
                className="group inline-flex shrink-0 items-center justify-center gap-1.5 text-xs font-semibold text-(--vm-primary) transition-all hover:opacity-80 active:scale-95 sm:self-center"
            >
                <span>Explore plans</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
        </div>
    );
}