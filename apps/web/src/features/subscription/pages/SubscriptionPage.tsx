import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";
import { CurrentPlanCard } from "../components/CurrentPlanCard";
import { PlanComparison } from "../components/PlanComparison";
import {
  useCreateRazorpaySubscriptionMutation,
  useGetMySubscriptionQuery,
  useSyncSubscriptionMutation,
  useVerifyRazorpayPaymentMutation,
} from "../subscriptionApi";
import { Brand, type PaidSubscriptionPlan } from "@virtualmentor/shared";
import { useState } from "react";
import { useTheme } from "@/app/theme/ThemeProvider";
import { loadRazorpay } from "@/services/razorpayLoader";

export default function SubscriptionPage() {
  const { colors } = useTheme();

  const { data, isLoading, isError, refetch } = useGetMySubscriptionQuery();
  const [syncSubscription, { isLoading: isSyncing }] = useSyncSubscriptionMutation();
  const [createRazorpaySubscription, { isLoading: isCreatingSubscription }] = useCreateRazorpaySubscriptionMutation();
  const [verifyRazorpayPayment, { isLoading: isVerifyingPayment }] = useVerifyRazorpayPaymentMutation();

  const [selectedPlan, setSelectedPlan] = useState<PaidSubscriptionPlan | null>(null);

  if (isLoading) {
    return <SubscriptionSkeleton />;
  }

  if (isError || !data?.data) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="rounded-xl border border-(--vm-border) p-8 text-center">
          <h2 className="font-semibold text-(--vm-text)">
            Unable to load subscription
          </h2>
          <p className="mt-2 text-sm text-(--vm-muted)">
            Something went wrong while loading your subscription.
          </p>
          <Button className="mt-5" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  const subscription = data.data;

  const handleSync = async () => {
    try {
      await syncSubscription().unwrap();
    } catch (error) {
      console.error(
        "Failed to sync subscription:",
        error,
      );
    }
  };

  const handleUpgrade = async (plan: PaidSubscriptionPlan) => {
    if (isCreatingSubscription || isVerifyingPayment) {
      return;
    }

    try {
      setSelectedPlan(plan);
      await loadRazorpay();

      const response = await createRazorpaySubscription({ plan }).unwrap();
      const razorpaySubscription = response.data;

      if (!razorpaySubscription?.subscriptionId || !razorpaySubscription?.keyId) {
        throw new Error("Invalid Razorpay subscription response");
      }

      const razorpay = new window.Razorpay({
        key: razorpaySubscription?.keyId,
        subscription_id: razorpaySubscription?.subscriptionId,
        name: Brand.name,
        description:
          plan === "PRO"
            ? `${Brand.name} Pro Subscription`
            : `${Brand.name} Premium Subscription`,

        handler: async (paymentResponse) => {
          try {
            console.log("Razorpay payment completed:", paymentResponse);

            await verifyRazorpayPayment({
              razorpayPaymentId: paymentResponse.razorpay_payment_id,
              razorpaySubscriptionId: paymentResponse.razorpay_subscription_id,
              razorpaySignature: paymentResponse.razorpay_signature,
            }).unwrap();

            await refetch();

            setSelectedPlan(null);

          } catch (error) {
            console.error("Razorpay payment verification failed:", error);
            setSelectedPlan(null);
          }
        },

        modal: {
          ondismiss: () => {
            console.log("Razorpay checkout cancelled");
            setSelectedPlan(null);
          },
        },

        theme: {
          color: colors.primary,
        },
      });

      razorpay.open();

    } catch (error) {
      console.error("Failed to start Razorpay checkout:", error);
      setSelectedPlan(null);
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-(--vm-text)">
            Subscription
          </h1>
          <p className="mt-1 text-sm text-(--vm-muted)">
            Manage your plan and interview features.
          </p>
        </div>

        <Button
          variant="outline"
          disabled={isSyncing}
          onClick={() => void handleSync()}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`}
          />
          {isSyncing ? "Syncing..." : "Sync subscription"}
        </Button>
      </div>

      {/* Current subscription */}
      <CurrentPlanCard subscription={subscription} />

      {/* Monthly Usage */}
      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-(--vm-text)">
            Usage this month
          </h2>
          <p className="mt-1 text-sm text-(--vm-muted)">
            Track your interview and resume usage.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <UsageCard
            label="Text Interviews"
            usage={subscription.limits.TEXT_INTERVIEWS}
          />
          <UsageCard
            label="Voice Interviews"
            usage={subscription.limits.VOICE_INTERVIEWS}
          />
          <UsageCard
            label="Resume Analyses"
            usage={subscription.limits.RESUME_ANALYSES}
          />
        </div>
      </section>

      {/* Plans */}
      <section className="mt-10">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-(--vm-text)">
            Plans
          </h2>

          <p className="mt-1 text-sm text-(--vm-muted)">
            Choose the level of interview practice that works for you.
          </p>
        </div>

        <PlanComparison
          currentPlan={subscription.plan}
          onUpgrade={handleUpgrade}
        />

        {selectedPlan && (isCreatingSubscription || isVerifyingPayment) && (
          <div className="mt-6 rounded-xl border border-(--vm-border) bg-(--vm-surface) p-5">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-4 w-4 animate-spin text-(--vm-primary)" />

              <div>
                <p className="text-sm font-medium text-(--vm-text)">
                  {isVerifyingPayment
                    ? "Verifying payment..."
                    : `Preparing ${selectedPlan}...`}
                </p>

                <p className="mt-1 text-sm text-(--vm-muted)">
                  {isVerifyingPayment
                    ? "Confirming your subscription securely. Please don't close this page."
                    : "Securely preparing your Razorpay subscription."}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

/*
 * Helper Components
 */

function SubscriptionSkeleton() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <div className="h-7 w-40 animate-pulse rounded bg-(--vm-surface-2)" />
        <div className="h-4 w-72 animate-pulse rounded bg-(--vm-surface-2)" />
      </div>

      <div className="h-36 animate-pulse rounded-xl bg-(--vm-surface-2)" />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="h-107.5 animate-pulse rounded-xl bg-(--vm-surface-2)" />
        <div className="h-107.5 animate-pulse rounded-xl bg-(--vm-surface-2)" />
        <div className="h-107.5 animate-pulse rounded-xl bg-(--vm-surface-2)" />
      </div>
    </main>
  );
}

interface UsageCardProps {
  label: string;
  usage: {
    used: number;
    limit: number;
  };
}

function UsageCard({ label, usage }: UsageCardProps) {
  const unlimited = usage.limit === -1;
  const unavailable = usage.limit === 0;

  const percentage =
    unlimited || unavailable
      ? 0
      : Math.min((usage.used / usage.limit) * 100, 100);

  return (
    <div className="rounded-xl border border-(--vm-border) bg-(--vm-surface) p-5">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-(--vm-text)">{label}</span>

        <span className="shrink-0 text-xs text-(--vm-muted)">
          {unlimited
            ? "Unlimited"
            : unavailable
              ? "Not included"
              : `${usage.used} / ${usage.limit}`}
        </span>
      </div>

      {unavailable ? (
        <p className="mt-4 text-xs text-(--vm-muted)">
          Upgrade your plan to unlock this feature.
        </p>
      ) : unlimited ? (
        <p className="mt-4 text-xs text-(--vm-muted)">
          Available with your current plan.
        </p>
      ) : (
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-(--vm-surface-2)">
          <div
            className="h-full rounded-full bg-(--vm-primary) transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}