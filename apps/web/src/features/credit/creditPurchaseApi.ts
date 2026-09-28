import { baseApi } from "@/services/baseApi";

import type {
    CreditPackage,
    CreditPurchaseResponse,
    CreateCreditPurchaseRequest,
    VerifyCreditPurchaseRequest,
} from "./types";
import type { ApiResponse } from "@/types/types";

export const creditPurchaseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCreditPackages: builder.query<
            ApiResponse<CreditPackage[]>,
            void
        >({
            query: () => ({
                url: "/api/credits/packages",
                method: "GET",
            }),
        }),

        createCreditPurchase: builder.mutation<
            ApiResponse<CreditPurchaseResponse>,
            CreateCreditPurchaseRequest
        >({
            query: (body) => ({
                url: "/api/credits/purchases",
                method: "POST",
                body,
            }),
        }),

        verifyCreditPurchase: builder.mutation<
            ApiResponse<void>,
            VerifyCreditPurchaseRequest
        >({
            query: (body) => ({
                url: "/api/credits/purchases/verify",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useGetCreditPackagesQuery,
    useCreateCreditPurchaseMutation,
    useVerifyCreditPurchaseMutation,
} = creditPurchaseApi;