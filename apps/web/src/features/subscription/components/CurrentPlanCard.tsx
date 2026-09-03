import { Check, CreditCard } from "lucide-react";
import { Card } from "@/components/ui";
import {
  ENTITLEMENT_LABELS,
  SUBSCRIPTION_STATUS_LABELS,
  type SubscriptionResponse,
} from "@virtualmentor/shared";

interface CurrentPlanCardProps {
  subscription: SubscriptionResponse;
}

export function CurrentPlanCard({ subscription }: CurrentPlanCardProps) {
  const expiresAt = subscription.expiresAt
    ? new Date(subscription.expiresAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Card className="border-(--vm-border) bg-(--vm-surface) p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--vm-primary)/10">
            <CreditCard className="h-5 w-5 text-(--vm-primary)" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-(--vm-muted)">
              Current plan
            </p>

            <div className="mt-1 flex items-center gap-2">
              <h2 className="text-xl font-semibold text-(--vm-text)">
                {subscription.plan}
              </h2>

              <span className="rounded-full bg-(--vm-primary)/10 px-2 py-0.5 text-[10px] font-medium text-(--vm-primary)">
                {SUBSCRIPTION_STATUS_LABELS[subscription.status]}
              </span>
            </div>
          </div>
        </div>

        {expiresAt && (
          <div className="text-sm sm:text-right">
            <p className="text-(--vm-muted)">
              {subscription.autoRenew ? "Renews" : "Expires"}{" "}
              <span className="font-medium text-(--vm-text)">{expiresAt}</span>
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 border-t border-(--vm-border) pt-5">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {subscription.entitlements.map((entitlement) => (
            <div key={entitlement} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-(--vm-primary)" />
              <span className="text-xs text-(--vm-muted)">
                {ENTITLEMENT_LABELS[entitlement]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}