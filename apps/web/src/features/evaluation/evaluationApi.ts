import { baseApi } from "@/services/baseApi";
import type { ApiResponse } from "@/types/types";

import type { EvaluationPage } from "./types";

export const evaluationApi =
    baseApi.injectEndpoints({
        endpoints: (builder) => ({
            getEvaluations: builder.query<ApiResponse<EvaluationPage>,
                {
                    page?: number;
                    size?: number;
                }
            >({
                query: ({
                    page = 0,
                    size = 10,
                }) => ({
                    url: "/api/evaluations",
                    method: "GET",
                    params: {
                        page,
                        size,
                    },
                }),

                providesTags: [
                    {
                        type: "Evaluation",
                        id: "LIST",
                    },
                ],
            }),
        }),
    });

export const {
    useGetEvaluationsQuery,
} = evaluationApi;