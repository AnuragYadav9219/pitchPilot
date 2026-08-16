import type {
    ApiResponse,
    AuthResponse,
} from "./types";

let refreshPromise: Promise<ApiResponse<AuthResponse>> | null = null;

export function getRefreshPromise(
    refresh: (
        request: {
            refreshToken: string;
        },
    ) => Promise<
        ApiResponse<AuthResponse>
    >,
    refreshToken: string,
) {
    if (!refreshPromise) {
        refreshPromise =
            refresh({
                refreshToken,
            }).finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
}