import {
    BarChart3,
    Check,
    FileQuestion,
    FileText,
    Mic,
    SlidersHorizontal,
    Sparkles,
    X,
} from "lucide-react";

import { Button, Card } from "@/components/ui";

import {
    ENTITLEMENT_LABELS,
    SUBSCRIPTION_FEATURES,
    SUBSCRIPTION_PLANS,
    type PaidSubscriptionPlan,
    type SubscriptionPlan,
} from "@virtualmentor/shared";

interface PlanComparisonProps {
    currentPlan: SubscriptionPlan;
    onUpgrade?: (plan: PaidSubscriptionPlan) => void;
}

const FEATURE_ICONS = {
    VOICE_INTERVIEW: Mic,
    ADVANCED_ANALYTICS: BarChart3,
    RESUME_ANALYSIS: FileText,
    PERSONALIZED_INTERVIEWS: SlidersHorizontal,
    RESUME_BASED_INTERVIEWS: FileQuestion,
} as const;

export function PlanComparison({
    currentPlan,
    onUpgrade,
}: PlanComparisonProps) {
    return (
        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {SUBSCRIPTION_PLANS.map((plan) => {
                const isCurrent = plan.plan === currentPlan;
                const isPaid = plan.plan === "PRO" || plan.plan === "PREMIUM";
                const isHighlighted = Boolean(plan.highlighted);

                return (
                    <Card
                        key={plan.plan}
                        className={`
                            group relative flex flex-col overflow-hidden rounded-2xl border p-6 sm:p-7
                            transition-all duration-300 bg-(--vm-surface)
                            ${
                                isHighlighted
                                    ? "border-(--vm-primary) shadow-xl shadow-(--vm-primary)/5 lg:-translate-y-2.5"
                                    : "border-(--vm-border) hover:border-(--vm-border)/80 shadow-sm hover:shadow-md"
                            }
                        `}
                    >
                        {/* Highlight top border accent */}
                        {isHighlighted && (
                            <div
                                className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-(--vm-primary)"
                                aria-hidden="true"
                            />
                        )}

                        {/* Popular badge */}
                        {isHighlighted && plan.badge && (
                            <div className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-(--vm-primary)/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-(--vm-primary)">
                                <Sparkles className="h-3 w-3" />
                                {plan.badge}
                            </div>
                        )}

                        <div className="flex flex-1 flex-col justify-between">
                            {/* =================================================
                                HEADER SECTION
                            ================================================= */}
                            <div>
                                <div className="flex items-center gap-2.5">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--vm-muted)">
                                        {plan.plan}
                                    </span>

                                    {isCurrent && (
                                        <span className="rounded-full bg-(--vm-success)/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-(--vm-success) border border-(--vm-success)/20">
                                            Active plan
                                        </span>
                                    )}
                                </div>

                                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-(--vm-text)">
                                    {plan.name}
                                </h3>

                                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-(--vm-muted)">
                                    {plan.description}
                                </p>
                            </div>

                            {/* =================================================
                                PRICE SECTION
                            ================================================= */}
                            <div className="mt-6 rounded-xl border border-(--vm-border)/60 bg-(--vm-surface-2)/30 p-4 transition-colors group-hover:bg-(--vm-surface-2)/50">
                                {plan.price === 0 ? (
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-3xl font-extrabold tracking-tight text-(--vm-text)">
                                            Free
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-extrabold tracking-tight text-(--vm-text)">
                                            {formatPrice(plan.price)}
                                        </span>
                                        <span className="text-xs font-semibold text-(--vm-muted)">
                                            / month
                                        </span>
                                    </div>
                                )}

                                <p className="mt-1 text-[11px] font-medium text-(--vm-muted)">
                                    {plan.price === 0
                                        ? "Forever free with core features"
                                        : "Billed monthly. Cancel anytime."}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="my-6 h-px bg-(--vm-border)" />

                            {/* =================================================
                                FEATURES LIST
                            ================================================= */}
                            <div className="flex-1 space-y-3.5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-(--vm-muted)">
                                    What's included
                                </p>

                                {SUBSCRIPTION_FEATURES.map((feature) => {
                                    const included = plan.features.includes(
                                        feature.entitlement,
                                    );
                                    const Icon =
                                        FEATURE_ICONS[feature.entitlement];

                                    if (!Icon) return null;

                                    return (
                                        <div
                                            key={feature.entitlement}
                                            className={`
                                                flex items-center gap-3 text-xs sm:text-sm transition-opacity duration-200
                                                ${included ? "text-(--vm-text)" : "text-(--vm-muted) opacity-40"}
                                            `}
                                        >
                                            <div
                                                className={`
                                                    flex h-6 w-6 shrink-0 items-center justify-center rounded-lg
                                                    ${
                                                        included
                                                            ? "bg-(--vm-primary)/10 text-(--vm-primary)"
                                                            : "bg-(--vm-surface-2) text-(--vm-muted)"
                                                    }
                                                `}
                                            >
                                                {included ? (
                                                    <Check className="h-3.5 w-3.5" />
                                                ) : (
                                                    <X className="h-3.5 w-3.5" />
                                                )}
                                            </div>

                                            <span className="font-medium">
                                                {
                                                    ENTITLEMENT_LABELS[
                                                        feature.entitlement
                                                    ]
                                                }
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* =================================================
                                ACTION BUTTON SECTION
                            ================================================= */}
                            <div className="mt-8">
                                {isCurrent ? (
                                    <Button
                                        className="w-full font-semibold"
                                        variant="outline"
                                        disabled
                                    >
                                        Current active plan
                                    </Button>
                                ) : !isPaid ? (
                                    <Button
                                        className="w-full font-semibold"
                                        variant="outline"
                                        disabled
                                    >
                                        Free tier
                                    </Button>
                                ) : (
                                    <Button
                                        className={`
                                            w-full font-semibold transition-transform active:scale-95
                                            ${
                                                isHighlighted
                                                    ? "shadow-md hover:shadow-lg"
                                                    : ""
                                            }
                                        `}
                                        variant={isHighlighted ? "primary" : "outline"}
                                        onClick={() =>
                                            onUpgrade?.(
                                                plan.plan as PaidSubscriptionPlan,
                                            )
                                        }
                                    >
                                        Upgrade to {plan.name}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}

/* ================================================================
   PRICE FORMATTER
================================================================ */

function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);
}