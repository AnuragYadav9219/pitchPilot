import {
  BriefcaseBusiness,
  FileText,
  Mic,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui";
import { Brand } from "@virtualmentor/shared";

import { useSubscription } from "../hooks/useSubscription";

import {
  BillingInfo,
  BillingSummary,
  CreditActivity,
  CreditBalanceCard,
  CurrentPlanCard,
  FeatureUsageCard,
  PlanComparison,
  SubscriptionError,
  SubscriptionFaq,
  SubscriptionSkeleton,
  UsageAlert,
} from "../components";
import { BuyCredits } from "@/features/credit/components";

export default function SubscriptionPage() {
  const {
    subscription,
    credits,
    isLoading,
    isError,
    isCreditLoading,
    isCreditError,
    isSyncing,
    selectedPlan,
    isCreatingSubscription,
    isVerifyingPayment,
    refetch,
    refetchCredits,
    handleSync,
    scrollToPlans,
    handleUpgrade,
  } = useSubscription();

  if (isLoading) {
    return <SubscriptionSkeleton />;
  }

  if (isError || !subscription) {
    return <SubscriptionError onRetry={() => void refetch()} />;
  }

  return (
    <div className="min-h-full bg-(--vm-background)">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ============================================================
            HEADER
        ============================================================ */}
        <header className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-(--vm-primary)" />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--vm-primary)">
                  {Brand.name}
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-(--vm-text) sm:text-4xl">
                Subscription
                <span className="text-(--vm-primary)">.</span>
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-(--vm-muted) sm:text-base">
                Manage your plan, AI credits, and career preparation features.
              </p>
            </div>

            <Button
              variant="outline"
              disabled={isSyncing}
              onClick={() => void handleSync()}
              className="self-start sm:self-auto"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""
                  }`}
              />

              {isSyncing ? "Syncing..." : "Sync billing"}
            </Button>
          </div>
        </header>

        {/* ============================================================
            CURRENT PLAN
        ============================================================ */}
        <CurrentPlanCard subscription={subscription} />

        {/* ============================================================
            AI CREDITS
        ============================================================ */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold tracking-tight text-(--vm-text)">
              AI Credits
            </h2>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-(--vm-muted) sm:text-sm">
              Credits power AI-intensive features such as voice interviews,
              resume analysis, and job analysis.
            </p>
          </div>

          {isCreditLoading ? (
            <div className="space-y-4">
              <div className="h-52 animate-pulse rounded-2xl bg-(--vm-surface-2)" />
              <div className="h-40 animate-pulse rounded-2xl bg-(--vm-surface-2)" />
            </div>
          ) : isCreditError ? (
            <div className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-(--vm-text)">
                    Unable to load AI credits
                  </p>

                  <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                    We couldn't retrieve your current credit balance.
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => void refetchCredits()}
                >
                  Try again
                </Button>
              </div>
            </div>
          ) : credits ? (
            <div className="space-y-5">
              {/* Balance */}
              <CreditBalanceCard balance={credits} />

              {/* Buy Credits */}
              <div className=" relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,24,21,0.04)]">

                {/* Subtle top accent */}
                <div className=" absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-(--vm-orange) via-(--vm-primary) to-(--vm-terracotta)" />

                <BuyCredits />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-6">
              <p className="text-sm font-semibold text-(--vm-text)">
                No credit information available
              </p>

              <p className="mt-1 text-xs text-(--vm-muted)">
                Try refreshing your credit balance.
              </p>

              <Button
                variant="outline"
                className="mt-4"
                onClick={() => void refetchCredits()}
              >
                Refresh credits
              </Button>
            </div>
          )}
        </section>

        {/* ============================================================
            MONTHLY USAGE
        ============================================================ */}
        <section className="mt-12">
          <div className="mb-5">
            <h2 className="text-xl font-bold tracking-tight text-(--vm-text)">
              Monthly usage
            </h2>

            <p className="mt-1 text-xs text-(--vm-muted) sm:text-sm">
              See how much of your current plan you've used this month.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <FeatureUsageCard
              icon={Mic}
              label="Voice Interviews"
              description="Practice realistic AI voice interviews."
              used={subscription.limits.VOICE_INTERVIEWS.used}
              limit={subscription.limits.VOICE_INTERVIEWS.limit}
            />

            <FeatureUsageCard
              icon={FileText}
              label="Resume Analysis"
              description="Get AI-powered feedback on your resume."
              used={subscription.limits.RESUME_ANALYSES.used}
              limit={subscription.limits.RESUME_ANALYSES.limit}
            />

            <FeatureUsageCard
              icon={BriefcaseBusiness}
              label="Job Search"
              description="Discover relevant career opportunities."
              used={subscription.limits.JOB_SEARCHES.used}
              limit={subscription.limits.JOB_SEARCHES.limit}
            />
          </div>

          {/* Usage warnings */}
          <div className="mt-4 space-y-3">
            <UsageAlert
              label="Voice interviews"
              used={subscription.limits.VOICE_INTERVIEWS.used}
              limit={subscription.limits.VOICE_INTERVIEWS.limit}
              onUpgrade={scrollToPlans}
            />

            <UsageAlert
              label="Resume analysis"
              used={subscription.limits.RESUME_ANALYSES.used}
              limit={subscription.limits.RESUME_ANALYSES.limit}
              onUpgrade={scrollToPlans}
            />

            <UsageAlert
              label="Job searches"
              used={subscription.limits.JOB_SEARCHES.used}
              limit={subscription.limits.JOB_SEARCHES.limit}
              onUpgrade={scrollToPlans}
            />
          </div>
        </section>

        {/* ============================================================
            PLAN COMPARISON
        ============================================================ */}
        <section
          id="subscription-plans"
          className="mt-12 scroll-mt-8"
        >
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-(--vm-text)">
                Choose your plan
              </h2>

              <p className="mt-1 text-xs text-(--vm-muted) sm:text-sm">
                Upgrade when you need more AI-powered preparation.
              </p>
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-(--vm-muted)">
              Flexible plans
            </span>
          </div>

          <PlanComparison
            currentPlan={subscription.plan}
            onUpgrade={handleUpgrade}
          />

          {/* Checkout status */}
          {selectedPlan &&
            (isCreatingSubscription || isVerifyingPayment) && (
              <div className="mt-5 animate-fadeIn rounded-xl border border-(--vm-primary)/20 bg-(--vm-primary)/5 p-4">
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-4 w-4 animate-spin text-(--vm-primary)" />

                  <div>
                    <p className="text-xs font-semibold text-(--vm-text) sm:text-sm">
                      {isVerifyingPayment
                        ? "Verifying payment..."
                        : `Preparing ${selectedPlan}...`}
                    </p>

                    <p className="mt-0.5 text-[11px] text-(--vm-muted)">
                      {isVerifyingPayment
                        ? "Please wait while we confirm your subscription."
                        : "Opening secure Razorpay checkout."}
                    </p>
                  </div>
                </div>
              </div>
            )}
        </section>

        {/* ============================================================
            CREDIT ACTIVITY
        ============================================================ */}
        <section className="mt-10">
          <CreditActivity />
        </section>

        {/* ============================================================
            BILLING SUMMARY
        ============================================================ */}
        <section className="mt-10">
          <BillingSummary
            subscription={subscription}
            onSync={handleSync}
            isSyncing={isSyncing}
          />
        </section>

        {/* ============================================================
            BILLING SECURITY
        ============================================================ */}
        <section className="mt-10">
          <BillingInfo
            autoRenew={subscription.autoRenew}
            onSync={handleSync}
            isSyncing={isSyncing}
          />
        </section>

        {/* ============================================================
            FAQ
        ============================================================ */}
        <section className="mt-12">
          <SubscriptionFaq />
        </section>

        {/* ============================================================
            FOOTER
        ============================================================ */}
        <p className="mt-8 pb-4 text-center text-[10px] font-medium text-(--vm-muted)">
          Your subscription and payment information are handled securely.
        </p>
      </div>
    </div>
  );
}