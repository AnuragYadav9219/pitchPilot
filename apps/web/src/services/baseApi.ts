import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store/store";
import { clearCredentials, setCredentials } from "@/features/auth/authSlice";
import { authStorage } from "@/features/auth/authStorage";
import type { AuthResponse } from "@/features/auth/types";
import type { ApiResponse } from "./types";

/* ============================================================
   CONFIGURATION
============================================================ */

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/* ============================================================
   RAW BASE QUERY
============================================================ */

const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState, arg }) => {
        const state = getState() as RootState;
        const url = typeof arg === "string" ? arg : arg.url;
        const isRefreshRequest = url === "/api/auth/refresh";

        /* Never send the expired access token with the refresh request. */
        if (!isRefreshRequest) {
            const accessToken = state.auth.accessToken;
            if (accessToken) {
                headers.set("Authorization", `Bearer ${accessToken}`);
            }
        }

        /* Only set JSON content type when the request doesn't provide one. */
        if (!headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json");
        }

        return headers;
    },
});

/* ============================================================
   REFRESH LOCK
============================================================ */

/*
 * Prevents multiple simultaneous refresh requests when several
 * API calls receive a 401 at the same time. Acts as an application-level lock.
 */
let refreshPromise: Promise<AuthResponse | null> | null = null;

/* ============================================================
   REFRESH TOKEN
============================================================ */

async function refreshAccessToken(
    api: Parameters<BaseQueryFn>[1],
    extraOptions: Parameters<BaseQueryFn>[2],
): Promise<AuthResponse | null> {
    const refreshToken = authStorage.getRefreshToken();
    if (!refreshToken) return null;

    /* If another request is already refreshing, wait for that promise. */
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const refreshResult = await rawBaseQuery(
                {
                    url: "/api/auth/refresh",
                    method: "POST",
                    body: { refreshToken },
                },
                api,
                extraOptions,
            );

            if (!refreshResult.data) return null;

            const response = refreshResult.data as ApiResponse<AuthResponse>;
            if (!response.success || !response.data) return null;

            /* Store new access + refresh tokens. */
            api.dispatch(setCredentials(response.data));
            return response.data;
        } catch {
            return null;
        } finally {
            /* Always release the lock. */
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

/* ============================================================
   BASE QUERY WITH RE-AUTH
============================================================ */

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    /* First attempt */
    let result = await rawBaseQuery(args, api, extraOptions);

    const url = typeof args === "string" ? args : args.url;
    const isRefreshRequest = url === "/api/auth/refresh";

    /* Only handle 401 for normal requests */
    if (result.error?.status !== 401 || isRefreshRequest) {
        return result;
    }

    /* Attempt to refresh the access token */
    const refreshed = await refreshAccessToken(api, extraOptions);

    /* Refresh failed */
    if (!refreshed) {
        authStorage.clear();
        api.dispatch(clearCredentials());
        return result;
    }

    /* Retry original request with the updated token from Redux */
    result = await rawBaseQuery(args, api, extraOptions);

    /* Prevent infinite loops if retry still returns 401 */
    if (result.error?.status === 401) {
        authStorage.clear();
        api.dispatch(clearCredentials());
    }

    return result;
};

/* ============================================================
   API
============================================================ */

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        "User",
        "Session",
        "Dashboard",
        "Scenario",
        "UserProfile",
        "Recommendation",
        "Conversation",
        "Evaluation",
        "Feedback",
    ],
    endpoints: () => ({}),
});