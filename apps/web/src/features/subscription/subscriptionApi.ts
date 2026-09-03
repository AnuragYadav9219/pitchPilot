import { baseApi } from "@/services/baseApi";
import type { ApiResponse } from "@/types/types";
import type { SubscriptionPlan, SubscriptionResponse } from "@virtualmentor/shared";

export interface RazorpayCreateSubscriptionResponse {
    subscriptionId: string;
    keyId: string;
    plan: SubscriptionPlan;
}

export const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getMySubscription: builder.query<ApiResponse<SubscriptionResponse>, void>({
            query: () => ({
                url: "/api/subscriptions/me",
                method: "GET",
            }),

            providesTags: [
                { type: "Subscription", id: "ME" },
            ],
        }),

        syncSubscription: builder.mutation<ApiResponse<SubscriptionResponse>, void>({
            query: () => ({
                url: "/api/subscriptions/sync",
                method: "POST",
            }),

            invalidatesTags: [
                { type: "Subscription", id: "ME" },
            ],
        }),

        createRazorpaySubscription: builder.mutation<
            ApiResponse<RazorpayCreateSubscriptionResponse>,
            { plan: SubscriptionPlan }
        >({
            query: (body) => ({
                url: "/api/subscriptions/razorpay/create",
                method: "POST",
                body,
            }),
        }),

        verifyRazorpayPayment: builder.mutation<
            ApiResponse<{
                plan: SubscriptionPlan;
                status: string;
            }>,
            {
                razorpayPaymentId: string;
                razorpaySubscriptionId: string;
                razorpaySignature: string;
            }
        >({
            query: (body) => ({
                url: "/api/subscriptions/razorpay/verify",
                method: "POST",
                body,
            }),

            invalidatesTags: [{ type: "Subscription", id: "ME" }],
        })

    }),
});

export const {
    useGetMySubscriptionQuery,
    useSyncSubscriptionMutation,
    useCreateRazorpaySubscriptionMutation,
    useVerifyRazorpayPaymentMutation,
} = subscriptionApi;