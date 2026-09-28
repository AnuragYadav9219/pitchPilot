import { baseApi } from "@/services/baseApi";
import type { ApiResponse } from "@/types/types";
import type { CreditBalanceResponse, CreditTransactionPage } from "./types";

export const creditApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCreditBalance: builder.query<
            ApiResponse<CreditBalanceResponse>,
            void
        >({
            query: () => ({
                url: "/api/credits/balance",
                method: "GET",
            }),
            providesTags: [
                { type: "Credits", id: "BALANCE" },
            ],
        }),

        getCreditTransactions: builder.query<
            ApiResponse<CreditTransactionPage>,
            { page: number; size: number }
        >({
            query: ({ page, size }) => ({
                url: "/api/credits/transactions",
                method: "GET",
                params: {
                    page,
                    size,
                },
            }),

            providesTags: [{ type: "Credits", id: "TRANSACTIONS" }],
        }),
    }),
});

export const {
    useGetCreditBalanceQuery,
    useGetCreditTransactionsQuery,
} = creditApi;