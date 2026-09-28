import {
    BriefcaseBusiness,
    FileText,
    Mic,
} from "lucide-react";

interface FeatureUsageCardProps {
    label: string;
    description: string;
    used: number;
    limit: number;
    icon: React.ComponentType<{
        className?: string;
    }>;
}

export function FeatureUsageCard({
    label,
    description,
    used,
    limit,
    icon: Icon,
}: FeatureUsageCardProps) {
    const unlimited = limit < 0;
    const unavailable = limit === 0;

    const percentage =
        unlimited || unavailable
            ? 0
            : Math.min((used / limit) * 100, 100);

    const remaining = Math.max(limit - used, 0);

    return (
        <article className="group rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--vm-primary)/25 hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 transition-transform duration-200 group-hover:scale-105">
                        <Icon className="h-4 w-4 text-(--vm-primary)" />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-(--vm-text)">
                            {label}
                        </h3>

                        <p className="mt-1 max-w-50 text-[11px] leading-4 text-(--vm-muted)">
                            {description}
                        </p>
                    </div>
                </div>

                <span className="shrink-0 text-sm font-bold text-(--vm-text)">
                    {unlimited
                        ? "∞"
                        : unavailable
                            ? "—"
                            : `${used}/${limit}`}
                </span>
            </div>

            {unavailable ? (
                <div className="mt-5 rounded-lg bg-(--vm-surface-2)/50 px-3 py-2">
                    <span className="text-[10px] font-medium text-(--vm-muted)">
                        Not included in your plan
                    </span>
                </div>
            ) : unlimited ? (
                <div className="mt-5 rounded-lg bg-(--vm-primary)/5 px-3 py-2">
                    <span className="text-[10px] font-medium text-(--vm-primary)">
                        Unlimited access
                    </span>
                </div>
            ) : (
                <>
                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-(--vm-surface-2)">
                        <div
                            className="h-full rounded-full bg-(--vm-primary) transition-all duration-500"
                            style={{
                                width: `${percentage}%`,
                            }}
                        />
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] text-(--vm-muted)">
                            {used} used
                        </span>

                        <span className="text-[10px] text-(--vm-muted)">
                            {remaining} remaining
                        </span>
                    </div>
                </>
            )}
        </article>
    );
}

export const FEATURE_USAGE_ICONS = {
    VOICE_INTERVIEWS: Mic,
    RESUME_ANALYSES: FileText,
    JOB_SEARCHES: BriefcaseBusiness,
};