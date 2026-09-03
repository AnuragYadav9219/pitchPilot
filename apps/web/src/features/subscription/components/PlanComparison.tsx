import {
  BarChart3,
  Check,
  FileQuestion,
  FileText,
  MessageSquare,
  Mic,
  SlidersHorizontal,
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
  TEXT_INTERVIEW: MessageSquare,
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
    <div className="grid gap-5 lg:grid-cols-3">
      {SUBSCRIPTION_PLANS.map((plan) => {
        const isCurrent = plan.plan === currentPlan;
        const isPaid = plan.plan === "PRO" || plan.plan === "PREMIUM";

        const cardBorderClass = plan.highlighted
          ? "border-(--vm-primary)/40 shadow-md"
          : "border-(--vm-border)";

        return (
          <Card
            key={plan.plan}
            className={`relative overflow-hidden p-6 transition-shadow duration-200 ${cardBorderClass}`}
          >
            {plan.highlighted && (
              <div className="absolute right-5 top-5 rounded-full bg-(--vm-primary)/10 px-2.5 py-1 text-[10px] font-semibold text-(--vm-primary)">
                {plan.badge}
              </div>
            )}

            <div className="flex min-h-97.5 flex-col">
              {/* Header */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-(--vm-muted)">
                  {plan.plan}
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-(--vm-text)">
                  {plan.name}
                </h3>

                <p className="mt-2 min-h-10 text-sm leading-5 text-(--vm-muted)">
                  {plan.description}
                </p>
              </div>

              <div className="my-6 h-px bg-(--vm-border)" />

              {/* Features */}
              <div className="flex-1 space-y-3">
                {SUBSCRIPTION_FEATURES.map((feature) => {
                  const included = plan.features.includes(feature.entitlement);
                  const Icon = FEATURE_ICONS[feature.entitlement];

                  return (
                    <div
                      key={feature.entitlement}
                      className={`flex items-center gap-3 ${
                        included ? "" : "opacity-35"
                      }`}
                    >
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                          included
                            ? "bg-(--vm-primary)/10"
                            : "bg-(--vm-surface-2)"
                        }`}
                      >
                        {included ? (
                          <Icon className="h-3.5 w-3.5 text-(--vm-primary)" />
                        ) : (
                          <Check className="h-3.5 w-3.5 text-(--vm-muted)" />
                        )}
                      </div>

                      <span className="text-sm text-(--vm-text)">
                        {ENTITLEMENT_LABELS[feature.entitlement]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="mt-6">
                {isCurrent ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current plan
                  </Button>
                ) : !isPaid ? (
                  <Button className="w-full" variant="outline" disabled>
                    Free plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (plan.plan === "PRO" || plan.plan === "PREMIUM") {
                        onUpgrade?.(plan.plan);
                      }
                    }}
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