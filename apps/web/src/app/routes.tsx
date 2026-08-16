import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";

import { PageLoader } from "@/components/feedback";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

// --- Public Pages ---
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const VerifyOtpPage = lazy(() => import("@/features/auth/pages/VerifyOtpPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));

// --- Protected Feature Pages ---
const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const ScenarioPage = lazy(() => import("@/features/scenario/pages/ScenarioPage"));
const PracticePage = lazy(() => import("@/features/practice/pages/PracticePage"));
const HistoryPage = lazy(() => import("@/features/conversation/pages/HistoryPage"));

function RootLayout() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Outlet />
        </Suspense>
    );
}

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        // errorElement: <ErrorPage />, // Recommended: Add a fallback error boundary component here
        children: [
            /*
             * -------------------------
             * PUBLIC ROUTES
             * -------------------------
             */
            { path: "/", element: <LandingPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/verify-otp", element: <VerifyOtpPage /> },
            { path: "/terms", element: <TermsPage /> },
            { path: "/privacy", element: <PrivacyPage /> },

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
                            { path: "/dashboard", element: <DashboardPage /> },
                            { path: "/scenarios", element: <ScenarioPage /> },
                            { path: "/practice/:scenarioId", element: <PracticePage /> },
                            { path: "/history", element: <HistoryPage /> },
                        ],
                    },
                ],
            },

            /*
             * -------------------------
             * CATCH-ALL / 404
             * -------------------------
             */
            {
                path: "*",
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);