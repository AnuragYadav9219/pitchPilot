import { lazy, Suspense } from "react";
import {
    createBrowserRouter,
    Outlet,
} from "react-router-dom";

import { PageLoader } from "@/components/feedback";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

const LandingPage = lazy(
    () =>
        import(
            "@/features/landing/pages/LandingPage"
        ),
);

const LoginPage = lazy(
    () =>
        import(
            "@/features/auth/pages/LoginPage"
        ),
);

const RegisterPage = lazy(
    () =>
        import(
            "@/features/auth/pages/RegisterPage"
        ),
);

const VerifyOtpPage = lazy(
    () =>
        import(
            "@/features/auth/pages/VerifyOtpPage"
        ),
);

const TermsPage = lazy(
    () =>
        import(
            "@/pages/TermsPage"
        ),
);

const PrivacyPage = lazy(
    () =>
        import(
            "@/pages/PrivacyPage"
        ),
);

const DashboardPage = lazy(
    () =>
        import(
            "@/features/dashboard/pages/DashboardPage"
        ),
);

function RootLayout() {
    return (
        <Suspense
            fallback={
                <PageLoader />
            }
        >
            <Outlet />
        </Suspense>
    );
}

export const router =
    createBrowserRouter([
        {
            element: <RootLayout />,
            children: [
                /*
                 * -------------------------
                 * PUBLIC ROUTES
                 * -------------------------
                 */

                {
                    path: "/",
                    element: <LandingPage />,
                },

                {
                    path: "/login",
                    element: <LoginPage />,
                },

                {
                    path: "/register",
                    element: <RegisterPage />,
                },

                {
                    path: "/verify-otp",
                    element: <VerifyOtpPage />,
                },

                {
                    path: "/terms",
                    element: <TermsPage />,
                },

                {
                    path: "/privacy",
                    element: <PrivacyPage />,
                },

                /*
                 * -------------------------
                 * PROTECTED APPLICATION
                 * -------------------------
                 */

                {
                    element: <ProtectedRoute />,
                    children: [
                        {
                            element: <AppLayout />,
                            children: [
                                {
                                    path: "/dashboard",
                                    element: <DashboardPage />,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);