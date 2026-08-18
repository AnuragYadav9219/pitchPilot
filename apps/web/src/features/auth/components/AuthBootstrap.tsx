import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { useAppDispatch } from "@/app/store/hooks";

import { PageLoader } from "@/components/feedback";

import {
    clearCredentials,
    setCredentials,
} from "../authSlice";

import { authStorage } from "../authStorage";

import { useRefreshMutation } from "../authApi";

import type {
    AuthResponse,
} from "../types";
import type { ApiResponse } from "@/services/types";

interface AuthBootstrapProps {
    children: ReactNode;
}

/*
 * Only one refresh request can exist at a time.
 */
let restoreSessionPromise:
    Promise<
        ApiResponse<AuthResponse>
    > | null = null;

export function AuthBootstrap({
    children,
}: AuthBootstrapProps) {
    const dispatch =
        useAppDispatch();

    const [
        refresh,
        {
            isLoading: isRefreshing,
        },
    ] = useRefreshMutation();

    const [
        isChecking,
        setIsChecking,
    ] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function restoreSession() {
            console.log(
                "AuthBootstrap: restoring session...",
            );

            const refreshToken =
                authStorage.getRefreshToken();

            /*
             * No stored refresh token.
             */
            if (!refreshToken) {
                if (!cancelled) {
                    setIsChecking(false);
                }

                return;
            }

            try {
                /*
                 * =============================================
                 * SINGLE-FLIGHT REFRESH
                 * =============================================
                 */
                if (
                    !restoreSessionPromise
                ) {
                    console.log(
                        "AuthBootstrap: starting refresh request...",
                    );

                    restoreSessionPromise =
                        refresh({
                            refreshToken,
                        }).unwrap();
                } else {
                    console.log(
                        "AuthBootstrap: waiting for existing refresh request...",
                    );
                }

                const response =
                    await restoreSessionPromise;

                console.log(
                    "AuthBootstrap: refresh response:",
                    response,
                );

                if (
                    !response.success ||
                    !response.data
                ) {
                    throw new Error(
                        response.message ||
                            "Invalid refresh response.",
                    );
                }

                /*
                 * Update Redux.
                 *
                 * setCredentials() also stores the
                 * NEW rotated refresh token.
                 */
                dispatch(
                    setCredentials(
                        response.data,
                    ),
                );

                console.log(
                    "AuthBootstrap: session restored.",
                );
            } catch (error) {
                console.error(
                    "AuthBootstrap: session restoration failed:",
                    error,
                );

                /*
                 * Only clear the session when the
                 * shared refresh request actually failed.
                 */
                authStorage.clear();

                dispatch(
                    clearCredentials(),
                );
            } finally {
                /*
                 * Important:
                 *
                 * The request is finished, so a future
                 * browser refresh can create a new one.
                 */
                restoreSessionPromise = null;

                if (!cancelled) {
                    setIsChecking(false);
                }
            }
        }

        void restoreSession();

        return () => {
            cancelled = true;
        };
    }, [
        dispatch,
        refresh,
    ]);

    if (
        isChecking ||
        isRefreshing
    ) {
        return (
            <PageLoader
                label="Restoring your session..."
            />
        );
    }

    return children;
}