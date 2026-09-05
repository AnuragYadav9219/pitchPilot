import type { ApiResponse } from "@/types/types";
import type {
    AuthResponse,
} from "./types";

type RefreshRequest = {
    refreshToken: string;
};

type RefreshFunction = (
    request: RefreshRequest,
) => Promise<ApiResponse<AuthResponse>>;

let refreshPromise:
    Promise<ApiResponse<AuthResponse>> | null = null;

export function getRefreshPromise(
    refresh: RefreshFunction,
    refreshToken: string,
): Promise<ApiResponse<AuthResponse>> {

    if (!refreshPromise) {
        refreshPromise = refresh({
            refreshToken,
        }).finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
}