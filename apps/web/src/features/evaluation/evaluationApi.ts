import { baseApi } from "@/services/baseApi";
import type { ApiResponse } from "@/types/types";
import type { Evaluation } from "./types";

export const evaluationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        generateEvaluation: builder.mutation<ApiResponse<Evaluation>, number>({
            query: (interviewId) => ({
                url: `/api/interviews/${interviewId}/evaluation`,
                method: "POST",
            }),
            invalidatesTags: (_, __, interviewId) => [{ type: "Evaluation", id: interviewId }],
        }),

        getEvaluation: builder.query<ApiResponse<Evaluation>, number>({
            query: (interviewId) => ({
                url: `/api/interviews/${interviewId}/evaluation`,
                method: "GET",
            }),
            providesTags: (_, __, interviewId) => [{ type: "Evaluation", id: interviewId }],
        }),
    }),
});

export const {
    useGenerateEvaluationMutation,
    useGetEvaluationQuery,
} = evaluationApi;