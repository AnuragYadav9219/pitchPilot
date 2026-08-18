import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Header } from "./Header";
import { MobileSidebar } from "./MobileSidebar";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
    const location = useLocation();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Practice pages have their own layout (no global chrome/sidebar/header)
    const isPracticeExperience =
        location.pathname === "/practice" ||
        location.pathname.startsWith("/practice/");

    // Lock body scroll when mobile sidebar is open
    useEffect(() => {
        if (!mobileSidebarOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [mobileSidebarOpen]);

    // Close mobile navigation on route change
    useEffect(() => {
        setMobileSidebarOpen(false);
    }, [location.pathname]);

    if (isPracticeExperience) {
        return (
            <div className="min-h-dvh bg-(--vm-background) text-(--vm-text)">
                <main className="min-h-dvh min-w-0">
                    <Outlet />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-dvh bg-(--vm-background) text-(--vm-text)">
            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 overflow-hidden border-r border-(--vm-border) bg-(--vm-surface) lg:flex">
                <Sidebar />
            </aside>

            {/* Mobile Sidebar */}
            <MobileSidebar
                open={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
            />

            {/* Main Application */}
            <div className="flex min-h-dvh min-w-0 flex-col lg:ml-64">
                <Header onMenuClick={() => setMobileSidebarOpen(true)} />
                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}