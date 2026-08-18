import { baseApi } from "@/services/baseApi";

import type {
    DashboardResponse,
} from "./types";
import type { ApiResponse } from "@/services/types";

export const dashboardApi =
    baseApi.injectEndpoints({
        endpoints: (builder) => ({
            getDashboard: builder.query<ApiResponse<DashboardResponse>, void>({
                query: () => ({
                    url: "/api/dashboard",
                    method: "GET",
                }),

                providesTags: [
                    {
                        type: "Dashboard",
                        id: "MAIN",
                    },
                ],
            }),
        }),
    });

export const {
    useGetDashboardQuery,
} = dashboardApi;