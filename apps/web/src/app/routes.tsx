import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

const LandingPage = lazy(
    () => import("@/features/landing/pages/LandingPage"),
);

const LoginPage = lazy(
    () => import("@/features/auth/pages/LoginPage"),
);

function PageLoader() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-(--vm-background) text-(--vm-text)">
            Loading VirtualMento...
        </div>
    );
}

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
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },
]);