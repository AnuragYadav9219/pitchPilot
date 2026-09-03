import { baseApi } from "@/services/baseApi";
import type { ApiResponse } from "@/services/types";
import type { SubscriptionResponse } from "@virtualmentor/shared";

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
    }),
});

export const {
    useGetMySubscriptionQuery,
    useSyncSubscriptionMutation,
} = subscriptionApi;