import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet, useParams } from "react-router-dom";

import { PageLoader } from "@/components/feedback";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import VoiceInterviewPage from "@/features/interview/pages/VoiceInterviewPage";

/* ============================================================= */
/* PUBLIC PAGES                                                  */
/* ============================================================= */

const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const VerifyOtpPage = lazy(() => import("@/features/auth/pages/VerifyOtpPage"));
const ForgotPasswordPage = lazy(() => import("@/features/auth/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/features/auth/pages/ResetPasswordPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));

/* ============================================================= */
/* PROTECTED PAGES                                               */
/* ============================================================= */

const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const ScenarioPage = lazy(() => import("@/features/interview/pages/ScenarioPage"));
const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));
const SettingsPage = lazy(() => import("@/features/settings/pages/SettingsPage"));
const SubscriptionPage = lazy(() => import("@/features/subscription/pages/SubscriptionPage"));
const EvaluationPage = lazy(() => import("@/features/evaluation/pages/EvaluationPage"));
const CareerPage = lazy(() => import("@/features/career/pages/CareerPage"));
const ProgressPage = lazy(() => import("@/features/progress/pages/ProgressPage"));
const HistoryPage = lazy(() => import("@/features/history/pages/HistoryPage"));

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

function VoiceInterviewPageWrapper() {
    const { interviewId } = useParams<{ interviewId: string }>();
    const parsedInterviewId = Number(interviewId);

    if (!interviewId || !Number.isInteger(parsedInterviewId) || parsedInterviewId <= 0) {
        return <Navigate to="/practice" replace />;
    }

    return <VoiceInterviewPage interviewId={parsedInterviewId} />
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
            { path: "/forgot-password", element: <ForgotPasswordPage /> },
            { path: "/reset-password", element: <ResetPasswordPage /> },
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
                            { path: "/practice", element: <ScenarioPage /> },
                            { path: "/career", element: <CareerPage /> },
                            { path: "/progress", element: <ProgressPage /> },
                            { path: "/history", element: <HistoryPage /> },
                            { path: "/profile", element: <ProfilePage /> },
                            { path: "/subscription", element: <SubscriptionPage /> },
                            { path: "/settings", element: <SettingsPage /> },
                            { path: "/interviews/:interviewId/evaluation", element: <EvaluationPage /> },
                        ],
                    },

                    { path: "/voice-interview/:interviewId", element: <VoiceInterviewPageWrapper /> },
                ],
            },

            /* Fallback / 404 */
            { path: "*", element: <Navigate to="/" replace /> },
        ],
    },
]);