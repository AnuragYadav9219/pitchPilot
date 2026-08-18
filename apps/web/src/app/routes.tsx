import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { PageLoader } from "@/components/feedback";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

/* ============================================================= */
/* PUBLIC PAGES                                                  */
/* ============================================================= */

const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const VerifyOtpPage = lazy(() => import("@/features/auth/pages/VerifyOtpPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));

/* ============================================================= */
/* PROTECTED PAGES                                               */
/* ============================================================= */

const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const ScenarioPage = lazy(() => import("@/features/scenario/pages/ScenarioPage"));
const PracticePage = lazy(() => import("@/features/practice/pages/PracticePage"));
const HistoryPage = lazy(() => import("@/features/conversation/pages/HistoryPage"));
const SessionEvaluationPage = lazy(() => import("@/features/conversation/pages/SessionEvaluationPage"));
const ProgressPage = lazy(() => import("@/features/progress/pages/ProgressPage"));
const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));

/* ============================================================= */
/* ROOT LAYOUT                                                   */
/* ============================================================= */

function RootLayout() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Outlet />
        </Suspense>
    );
}

/* ============================================================= */
/* ROUTER CONFIGURATION                                          */
/* ============================================================= */

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            /* Public Routes */
            { path: "/", element: <LandingPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/verify-otp", element: <VerifyOtpPage /> },
            { path: "/terms", element: <TermsPage /> },
            { path: "/privacy", element: <PrivacyPage /> },

            /* Protected Routes */
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <AppLayout />,
                        children: [
                            { path: "/dashboard", element: <DashboardPage /> },
                            { path: "/scenarios", element: <ScenarioPage /> },
                            { path: "/history", element: <HistoryPage /> },
                            { path: "/progress", element: <ProgressPage /> },
                            { path: "/profile", element: <ProfilePage /> },
                            
                            { path: "/practice/scenario/:scenarioId", element: <PracticePage /> },
                            { path: "/practice/conversation/:conversationId", element: <PracticePage /> },
                            { path: "/practice/:conversationId/evaluation", element: <SessionEvaluationPage /> },
                        ],
                    },
                ],
            },

            /* Fallback / 404 */
            { path: "*", element: <Navigate to="/" replace /> },
        ],
    },
]);