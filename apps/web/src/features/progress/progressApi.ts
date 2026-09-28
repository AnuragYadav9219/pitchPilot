import { baseApi } from "@/services/baseApi";

import type { ProgressResponse } from "./types";

export const progressApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProgress: builder.query<ProgressResponse, void>({
            query: () => ({
                url: "/api/progress",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetProgressQuery,
} = progressApi;