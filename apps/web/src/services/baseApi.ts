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

import { authStorage } from "@/features/auth/authStorage";

import type {
    ApiResponse,
    AuthResponse,
} from "@/features/auth/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/*
 * --------------------------------------------------
 * Raw request
 * --------------------------------------------------
 */

const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,

    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;

        const token = state.auth.accessToken;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        headers.set("Content-Type", "application/json");

        return headers;
    },
});

/*
 * --------------------------------------------------
 * Refresh request
 * --------------------------------------------------
 */

const refreshBaseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,

    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");

        return headers;
    },
});

/*
 * Prevent multiple simultaneous requests from
 * independently refreshing the token.
 */
let refreshPromise:
    | Promise<boolean>
    | null = null;

async function refreshSession(
    api: Parameters<BaseQueryFn>[1],
): Promise<boolean> {
    const refreshToken = authStorage.getRefreshToken();

    if (!refreshToken) {
        return false;
    }

    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise =
        (async () => {
            try {
                const result = await refreshBaseQuery(
                    {
                        url: "/api/auth/refresh",
                        method: "POST",
                        body: {
                            refreshToken,
                        },
                    },
                    api,
                    {},
                );

                if (result.data) {
                    const response = result.data as ApiResponse<AuthResponse>;

                    if (response.success && response.data) {
                        api.dispatch(
                            setCredentials(
                                response.data,
                            ),
                        );

                        return true;
                    }
                }

                api.dispatch(clearCredentials());

                return false;
            } catch {
                api.dispatch(clearCredentials());

                return false;
            } finally {
                refreshPromise = null;
            }
        })();

    return refreshPromise;
}

/*
 * --------------------------------------------------
 * Base query with automatic token refresh
 * --------------------------------------------------
 */

const baseQueryWithReauth:
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
        args,
        api,
        extraOptions,
    ) => {
        let result = await rawBaseQuery(
            args,
            api,
            extraOptions,
        );

        /*
         * Access token expired / invalid.
         */
        if (result.error && result.error.status === 401) {
            const refreshed =
                await refreshSession(
                    api,
                );

            if (refreshed) {
                result =
                    await rawBaseQuery(
                        args,
                        api,
                        extraOptions,
                    );
            } else {
                api.dispatch(clearCredentials());
            }
        }

        return result;
    };

/*
 * --------------------------------------------------
 * RTK Query API
 * --------------------------------------------------
 */

export const baseApi = createApi({
    reducerPath: "api",

    baseQuery: baseQueryWithReauth,

    tagTypes: [
        "User",
        "Session",
        "Scenario",
        "Conversation",
        "Feedback",
    ],

    endpoints: () => ({}),
});