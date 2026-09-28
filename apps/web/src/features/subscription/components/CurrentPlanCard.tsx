import {
  CalendarDays,
  Check,
  CreditCard,
  Crown,
} from "lucide-react";

import {
  ENTITLEMENT_LABELS,
  SUBSCRIPTION_PLANS,
  SUBSCRIPTION_STATUS_LABELS,
  type SubscriptionResponse,
} from "@virtualmentor/shared";

interface CurrentPlanCardProps {
  subscription: SubscriptionResponse;
}

export function CurrentPlanCard({
  subscription,
}: CurrentPlanCardProps) {
  const isFree = subscription.plan === "FREE";
  const isPaid = !isFree;

  const planConfig = SUBSCRIPTION_PLANS.find(
    (plan) => plan.plan === subscription.plan,
  );

  const expiresAt = subscription.expiresAt
    ? new Date(
      subscription.expiresAt,
    ).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    : null;

  /*
   * FREE is a valid product state even if an older
   * subscription record happens to have INACTIVE status.
   */
  const statusLabel = isFree
    ? "Free plan"
    : SUBSCRIPTION_STATUS_LABELS[
    subscription.status
    ];

  const statusClass = isFree
    ? "bg-(--vm-surface-2) text-(--vm-muted)"
    : subscription.status === "ACTIVE"
      ? "border border-(--vm-success)/20 bg-(--vm-success)/10 text-(--vm-success)"
      : "border border-(--vm-danger)/20 bg-(--vm-danger)/10 text-(--vm-danger)";

  return (
    <section className="group relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) shadow-sm transition-all duration-300 hover:border-(--vm-border)/80">

      {/* =====================================================
                BACKGROUND GLOW
            ====================================================== */}

      <div
        className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-(--vm-primary)/10 blur-3xl transition-all duration-500 group-hover:bg-(--vm-primary)/15"
        aria-hidden="true"
      />

      <div className="relative p-6 sm:p-7">

        {/* =================================================
                    PLAN HEADER
                ================================================= */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Plan identity */}

          <div className="flex min-w-0 items-start gap-4">

            {/* Icon */}

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--vm-primary)/10 shadow-inner transition-transform duration-200 group-hover:scale-105">
              {isPaid ? (
                <Crown className="h-5 w-5 text-(--vm-primary)" />
              ) : (
                <CreditCard className="h-5 w-5 text-(--vm-primary)" />
              )}
            </div>

            {/* Content */}

            <div className="min-w-0">

              {/* Label + status */}

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-(--vm-muted)">
                  Current plan
                </span>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${statusClass}`}
                >
                  {statusLabel}
                </span>
              </div>

              {/* Plan name + price */}

              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">

                <h2 className="text-2xl font-bold tracking-tight text-(--vm-text)">
                  {planConfig?.name ??
                    subscription.plan}
                </h2>

                {/* Only paid plans show a price.
                                    Free already has its plan name. */}

                {isPaid &&
                  planConfig?.price !==
                  undefined && (
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-(--vm-text)">
                        {formatPrice(
                          planConfig.price,
                        )}
                      </span>

                      <span className="text-xs font-medium text-(--vm-muted)">
                        / month
                      </span>
                    </div>
                  )}
              </div>

              {/* Description */}

              <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-(--vm-muted) sm:text-sm">
                {isFree
                  ? "Start building your interview skills with AI-powered practice."
                  : "Your VirtualMentor preparation experience is active."}
              </p>
            </div>
          </div>

          {/* =================================================
                        BILLING DATE
                    ================================================= */}

          {isPaid && expiresAt && (
            <div className="flex shrink-0 items-center gap-3.5 rounded-xl border border-(--vm-border) bg-(--vm-surface-2)/40 px-4 py-3 shadow-sm lg:min-w-56">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10">
                <CalendarDays className="h-4 w-4 text-(--vm-primary)" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-(--vm-muted)">
                  {subscription.autoRenew
                    ? "Next renewal"
                    : "Expires"}
                </p>

                <p className="mt-0.5 text-xs font-semibold text-(--vm-text) sm:text-sm">
                  {expiresAt}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
                    PLAN SUMMARY
                ================================================= */}

        <div className="mt-7 grid gap-3 border-t border-(--vm-border) pt-5 sm:grid-cols-3">

          <PlanMeta
            label="Plan"
            value={
              planConfig?.name ??
              subscription.plan
            }
          />

          <PlanMeta
            label="Billing"
            value={
              isFree
                ? "No charge"
                : subscription.autoRenew
                  ? "Monthly · Auto renew"
                  : "Monthly"
            }
          />

          <PlanMeta
            label="Status"
            value={statusLabel}
          />
        </div>

        {/* =================================================
                    ENTITLEMENTS
                ================================================= */}

        {subscription.entitlements.length >
          0 && (
            <div className="mt-6 border-t border-(--vm-border) pt-5">

              <div className="mb-3.5 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-(--vm-muted)">
                  Included features
                </p>

                <span className="rounded-full bg-(--vm-surface-2)/60 px-2.5 py-0.5 text-[10px] font-semibold text-(--vm-muted)">
                  {
                    subscription
                      .entitlements
                      .length
                  }{" "}
                  included
                </span>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {subscription.entitlements.map(
                  (entitlement) => (
                    <div
                      key={entitlement}
                      className="group/item flex items-center gap-2.5 rounded-xl border border-(--vm-border) bg-(--vm-surface-2)/30 px-3.5 py-2.5 transition-all duration-200 hover:border-(--vm-primary)/30 hover:bg-(--vm-surface-2)/60"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)/10 shadow-sm transition-transform duration-200 group-hover/item:scale-110">
                        <Check className="h-3 w-3 text-(--vm-primary)" />
                      </span>

                      <span className="text-xs font-semibold text-(--vm-text)">
                        {
                          ENTITLEMENT_LABELS[
                          entitlement
                          ]
                        }
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
      </div>
    </section>
  );
}

/* ================================================================
   PLAN META
================================================================ */

function PlanMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-(--vm-border) bg-(--vm-surface-2)/20 px-4 py-3 transition-colors duration-200 hover:bg-(--vm-surface-2)/40">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-(--vm-muted)">
        {label}
      </p>

      <p className="mt-0.5 text-xs font-bold text-(--vm-text)">
        {value}
      </p>
    </div>
  );
}

/* ================================================================
   PRICE FORMATTER
================================================================ */

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}