import { useState } from "react";

import { useTheme } from "@/app/theme/ThemeProvider";
import { loadRazorpay } from "@/services/razorpayLoader";

import {
    Brand,
    type PaidSubscriptionPlan,
} from "@virtualmentor/shared";

import {
    useCreateRazorpaySubscriptionMutation,
    useGetMySubscriptionQuery,
    useSyncSubscriptionMutation,
    useVerifyRazorpayPaymentMutation,
} from "../subscriptionApi";

import { useGetCreditBalanceQuery } from "../creditApi";

export function useSubscription() {
    const { colors } = useTheme();

    // ============================================================
    // QUERIES
    // ============================================================

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useGetMySubscriptionQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    const {
        data: creditData,
        isLoading: isCreditLoading,
        isError: isCreditError,
        refetch: refetchCredits,
    } = useGetCreditBalanceQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    // ============================================================
    // MUTATIONS
    // ============================================================

    const [
        syncSubscription,
        { isLoading: isSyncing },
    ] = useSyncSubscriptionMutation();

    const [
        createRazorpaySubscription,
        { isLoading: isCreatingSubscription },
    ] = useCreateRazorpaySubscriptionMutation();

    const [
        verifyRazorpayPayment,
        { isLoading: isVerifyingPayment },
    ] = useVerifyRazorpayPaymentMutation();

    // ============================================================
    // LOCAL STATE
    // ============================================================

    const [
        selectedPlan,
        setSelectedPlan,
    ] = useState<PaidSubscriptionPlan | null>(null);

    const subscription = data?.data;
    const credits = creditData?.data;

    // ============================================================
    // SYNC SUBSCRIPTION
    // ============================================================

    const handleSync = async () => {
        try {
            await syncSubscription().unwrap();

            await Promise.all([
                refetch(),
                refetchCredits(),
            ]);
        } catch (error) {
            console.error(
                "Failed to sync subscription:",
                error,
            );
        }
    };

    // ============================================================
    // SCROLL TO PLANS
    // ============================================================

    const scrollToPlans = () => {
        document
            .getElementById("subscription-plans")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    // ============================================================
    // UPGRADE SUBSCRIPTION
    // ============================================================

    const handleUpgrade = async (
        plan: PaidSubscriptionPlan,
    ) => {
        if (
            isCreatingSubscription ||
            isVerifyingPayment
        ) {
            return;
        }

        try {
            setSelectedPlan(plan);

            // ----------------------------------------------------
            // Load Razorpay SDK
            // ----------------------------------------------------

            await loadRazorpay();

            // ----------------------------------------------------
            // Create Razorpay subscription
            // ----------------------------------------------------

            const response =
                await createRazorpaySubscription({
                    plan,
                }).unwrap();

            const razorpaySubscription =
                response.data;

            if (
                !razorpaySubscription?.subscriptionId ||
                !razorpaySubscription?.keyId
            ) {
                throw new Error(
                    "Invalid Razorpay subscription response",
                );
            }

            /*
             * Store these in local constants.
             *
             * This gives TypeScript a guaranteed `string`
             * instead of `string | undefined`.
             */
            const subscriptionId =
                razorpaySubscription.subscriptionId;

            const keyId =
                razorpaySubscription.keyId;

            // ----------------------------------------------------
            // Open Razorpay Checkout
            // ----------------------------------------------------

            const razorpay =
                new window.Razorpay({
                    key: keyId,

                    subscription_id:
                        subscriptionId,

                    name: Brand.name,

                    description:
                        plan === "PRO"
                            ? `${Brand.name} Pro Subscription`
                            : `${Brand.name} Premium Subscription`,

                    theme: {
                        color: colors.primary,
                    },

                    // ------------------------------------------------
                    // PAYMENT SUCCESS
                    // ------------------------------------------------

                    handler: async (
                        paymentResponse,
                    ) => {
                        try {
                            const paymentId =
                                paymentResponse
                                    .razorpay_payment_id;

                            const callbackSubscriptionId =
                                paymentResponse
                                    .razorpay_subscription_id;

                            const signature =
                                paymentResponse
                                    .razorpay_signature;

                            /*
                             * Razorpay's TypeScript definition
                             * allows these values to be undefined.
                             *
                             * Backend requires all three.
                             */
                            if (
                                !paymentId ||
                                !callbackSubscriptionId ||
                                !signature
                            ) {
                                throw new Error(
                                    "Incomplete Razorpay payment response",
                                );
                            }

                            // ----------------------------------------
                            // Verify payment on backend
                            // ----------------------------------------

                            await verifyRazorpayPayment({
                                razorpayPaymentId:
                                    paymentId,

                                razorpaySubscriptionId:
                                    callbackSubscriptionId,

                                razorpaySignature:
                                    signature,
                            }).unwrap();

                            // ----------------------------------------
                            // Refresh subscription + credits
                            // ----------------------------------------

                            await Promise.all([
                                refetch(),
                                refetchCredits(),
                            ]);

                            setSelectedPlan(null);

                        } catch (error) {
                            console.error(
                                "Payment verification failed:",
                                error,
                            );

                            setSelectedPlan(null);
                        }
                    },

                    // ------------------------------------------------
                    // CHECKOUT CLOSED
                    // ------------------------------------------------

                    modal: {
                        ondismiss: () => {
                            setSelectedPlan(null);
                        },
                    },
                });

            razorpay.open();

        } catch (error) {
            console.error(
                "Failed to start Razorpay checkout:",
                error,
            );

            setSelectedPlan(null);
        }
    };

    // ============================================================
    // RETURN
    // ============================================================

    return {
        // Subscription
        subscription,

        // Credits
        credits,

        // Loading / error states
        isLoading,
        isError,

        isCreditLoading,
        isCreditError,

        // Subscription sync
        isSyncing,

        // Checkout state
        selectedPlan,
        isCreatingSubscription,
        isVerifyingPayment,

        // Queries
        refetch,
        refetchCredits,

        // Actions
        handleSync,
        scrollToPlans,
        handleUpgrade,
    };
}