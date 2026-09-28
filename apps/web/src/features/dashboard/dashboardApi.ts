import { baseApi } from "@/services/baseApi";
import type { DashboardResponse } from "./types";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query<DashboardResponse, void>({
            query: () => ({
                url: "/api/dashboard",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetDashboardQuery,
} = dashboardApi;