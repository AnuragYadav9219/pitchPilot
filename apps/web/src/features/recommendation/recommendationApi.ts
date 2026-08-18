import { baseApi } from "@/services/baseApi";

import type { RecommendationResponse } from "./types";
import type { ApiResponse } from "@/services/types";

export const recommendationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecommendation: builder.query<ApiResponse<RecommendationResponse>, void>({
            query: () => ({
                url: "/api/recommendations",
                method: "GET",
            }),
            providesTags: ["Recommendation"],
        }),
    }),
});

export const {
    useGetRecommendationQuery,
} = recommendationApi;