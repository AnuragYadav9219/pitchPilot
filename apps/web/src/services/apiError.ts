import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface ApiErrorInfo {
    message: string;
    status?: number;
    code?: string;
}

/**
 * Converts an RTK Query error into a user-friendly error.
 */
export function getApiErrorInfo(
    error: unknown,
): ApiErrorInfo {
    if (!error) {
        return {
            message:
                "Something went wrong. Please try again.",
        };
    }

    /*
     * RTK Query / fetchBaseQuery error
     */
    if (isFetchBaseQueryError(error)) {
        const status =
            typeof error.status === "number"
                ? error.status
                : undefined;

        /*
         * Backend response usually looks like:
         *
         * {
         *   success: false,
         *   message: "...",
         *   data: ...
         * }
         */
        if (
            typeof error.data === "object" &&
            error.data !== null
        ) {
            const data =
                error.data as {
                    message?: string;
                    code?: string;
                };

            if (data.message) {
                return {
                    message: data.message,
                    status,
                    code: data.code,
                };
            }
        }

        /*
         * HTTP status based fallback
         */
        return {
            message: getStatusMessage(status),
            status,
        };
    }

    /*
     * Standard JavaScript Error
     */
    if (error instanceof Error) {
        return {
            message:
                error.message ||
                "Something went wrong. Please try again.",
        };
    }

    return {
        message:
            "Something went wrong. Please try again.",
    };
}

/**
 * Convenience helper when only the message is needed.
 */
export function getApiErrorMessage(
    error: unknown,
): string {
    return getApiErrorInfo(error).message;
}

/* ============================================================
   TYPE GUARD
============================================================ */

function isFetchBaseQueryError(
    error: unknown,
): error is FetchBaseQueryError {
    return (
        typeof error === "object" &&
        error !== null &&
        "status" in error
    );
}

/* ============================================================
   HTTP STATUS MESSAGES
============================================================ */

function getStatusMessage(
    status?: number,
): string {
    switch (status) {
        case 400:
            return "The request could not be processed.";

        case 401:
            return "Your session has expired. Please sign in again.";

        case 403:
            return "You don't have permission to perform this action.";

        case 404:
            return "The requested resource could not be found.";

        case 409:
            return "This request conflicts with existing data.";

        case 422:
            return "Some of the information provided is invalid.";

        case 429:
            return "Too many requests. Please wait a moment and try again.";

        case 500:
            return "Something went wrong on our server.";

        case 502:
        case 503:
        case 504:
            return "The service is temporarily unavailable. Please try again.";

        default:
            return "Something went wrong. Please try again.";
    }
}