import { baseApi } from "@/services/baseApi";
import type { ApiResponse } from "@/types/types";
import type { HistoryPage } from "./types";

export const historyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHistory: builder.query<
            ApiResponse<HistoryPage>,
            { page: number; size: number }
        >({
            query: ({ page, size }) => ({
                url: "/api/history",
                method: "GET",
                params: {
                    page,
                    size,
                },
            }),

            providesTags: (_result, _error, arg) => [
                {
                    type: "History",
                    id: `PAGE-${arg.page}`,
                },
            ],
        }),
    }),
});

export const {
    useGetHistoryQuery,
    useLazyGetHistoryQuery,
} = historyApi;