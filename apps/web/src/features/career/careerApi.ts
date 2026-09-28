import { baseApi } from "@/services/baseApi";
import type { CareerAnalysisResponse, JobSearchRequest, JobSearchResponse } from "./types";

export const careerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        analyzeCareer: builder.mutation<
            CareerAnalysisResponse,
            JobSearchRequest
        >({
            query: (body) => ({
                url: "/api/career/analyze",
                method: "POST",
                body,
            }),
        }),

        searchJobs: builder.mutation<
            JobSearchResponse,
            JobSearchRequest
        >({
            query: (body) => ({
                url: "/api/career/jobs/search",
                method: "POST",
                body,
            }),

            invalidatesTags: [
                { type: "Credits", id: "BALANCE" },
                { type: "Credits", id: "TRANSACTIONS" },
                { type: "Subscription", id: "ME" },
            ],
        }),
    }),
});

export const {
    useAnalyzeCareerMutation,
    useSearchJobsMutation,
} = careerApi;