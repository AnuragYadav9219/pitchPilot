import { baseApi } from "@/services/baseApi";

import type {
    ProgressResponse,
} from "./types";
import type { ApiResponse } from "@/services/types";

export const progressApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProgress: builder.query<ApiResponse<ProgressResponse>, void>({
            query: () => ({
                url: "/api/dashboard/progress",
                method: "GET",
            }),
            providesTags: [
                {
                    type: "Dashboard",
                    id: "PROGRESS",
                },
            ],
        }),
    }),
});

export const {
    useGetProgressQuery,
} = progressApi;