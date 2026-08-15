import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";

export function ProtectedRoute() {
    const isAuthenticated =
        useAppSelector(
            (state) =>
                state.auth.isAuthenticated,
        );

    console.log(
        "ProtectedRoute:",
        isAuthenticated,
    );

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
}