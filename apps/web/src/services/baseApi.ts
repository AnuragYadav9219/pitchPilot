import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type { RootState } from "@/app/store/store";

import {
    clearCredentials,
    setCredentials,
} from "@/features/auth/authSlice";

import {
    authStorage,
} from "@/features/auth/authStorage";

import type {
    ApiResponse,
    AuthResponse,
} from "@/features/auth/types";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,

    prepareHeaders: (
        headers,
        { getState, arg },
    ) => {
        const state =
            getState() as RootState;

        const url =
            typeof arg === "string"
                ? arg
                : arg.url;

        const isRefreshRequest =
            url === "/api/auth/refresh";

        /*
         * Never attach the old access token
         * to the refresh request.
         */
        if (!isRefreshRequest) {
            const token =
                state.auth.accessToken;

            if (token) {
                headers.set(
                    "Authorization",
                    `Bearer ${token}`,
                );
            }
        }

        headers.set(
            "Content-Type",
            "application/json",
        );

        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (
    args,
    api,
    extraOptions,
) => {
    let result =
        await rawBaseQuery(
            args,
            api,
            extraOptions,
        );

    const url =
        typeof args === "string"
            ? args
            : args.url;

    const isRefreshRequest =
        url === "/api/auth/refresh";

    /*
     * NEVER refresh the refresh request itself.
     *
     * This prevents:
     *
     * refresh → 401 → refresh → 401 → ...
     */
    if (
        result.error?.status === 401 &&
        !isRefreshRequest
    ) {
        const refreshToken =
            authStorage.getRefreshToken();

        if (!refreshToken) {
            api.dispatch(
                clearCredentials(),
            );

            return result;
        }

        /*
         * Use rawBaseQuery here.
         *
         * DO NOT use baseQueryWithReauth.
         */
        const refreshResult =
            await rawBaseQuery(
                {
                    url: "/api/auth/refresh",
                    method: "POST",
                    body: {
                        refreshToken,
                    },
                },
                api,
                extraOptions,
            );

        if (
            refreshResult.data
        ) {
            const response =
                refreshResult.data as ApiResponse<AuthResponse>;

            if (
                response.success &&
                response.data
            ) {
                /*
                 * Update Redux + localStorage.
                 */
                api.dispatch(
                    setCredentials(
                        response.data,
                    ),
                );

                /*
                 * Retry original request
                 * using the new access token.
                 */
                result =
                    await rawBaseQuery(
                        args,
                        api,
                        extraOptions,
                    );
            } else {
                authStorage.clear();

                api.dispatch(
                    clearCredentials(),
                );
            }
        } else {
            /*
             * Refresh token is invalid/expired.
             */
            authStorage.clear();

            api.dispatch(
                clearCredentials(),
            );
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",

    baseQuery:
        baseQueryWithReauth,

    tagTypes: [
        "User",
        "Session",
        "Dashboard",
        "Scenario",
        "Conversation",
        "Evaluation",
        "Feedback",
    ],

    endpoints: () => ({}),
});