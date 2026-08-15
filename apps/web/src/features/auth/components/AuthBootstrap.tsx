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

interface AuthBootstrapProps {
    children: ReactNode;
}

export function AuthBootstrap({
    children,
}: AuthBootstrapProps) {
    const dispatch = useAppDispatch();

    const [refresh] =
        useRefreshMutation();

    const [
        isChecking,
        setIsChecking,
    ] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function restoreSession() {
            const refreshToken =
                authStorage.getRefreshToken();

            /*
             * No existing session.
             */
            if (!refreshToken) {
                if (mounted) {
                    setIsChecking(false);
                }

                return;
            }

            try {
                const response =
                    await refresh({
                        refreshToken,
                    }).unwrap();

                if (!response.data) {
                    throw new Error(
                        "Invalid refresh response.",
                    );
                }

                /*
                 * Restore Redux state.
                 */
                dispatch(
                    setCredentials(
                        response.data,
                    ),
                );

                /*
                 * Persist rotated tokens
                 * and refreshed user data.
                 */
                authStorage.setSession({
                    accessToken:
                        response.data
                            .accessToken,

                    refreshToken:
                        response.data
                            .refreshToken,

                    user:
                        response.data.user,
                });
            } catch (error) {
                console.warn(
                    "Session restoration failed:",
                    error,
                );

                /*
                 * Refresh token is invalid,
                 * expired, revoked, etc.
                 */
                authStorage.clear();

                dispatch(
                    clearCredentials(),
                );
            } finally {
                if (mounted) {
                    setIsChecking(false);
                }
            }
        }

        void restoreSession();

        return () => {
            mounted = false;
        };
    }, [dispatch, refresh]);

    if (isChecking) {
        return (
            <PageLoader
                label="Restoring your session..."
            />
        );
    }

    return children;
}