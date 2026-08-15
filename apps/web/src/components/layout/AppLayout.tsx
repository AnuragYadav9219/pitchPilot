import {
    useEffect,
    useState,
} from "react";

import { Header } from "./Header";
import { MobileSidebar } from "./MobileSidebar";
import { Sidebar } from "./Sidebar";

import { Outlet } from "react-router-dom";

export function AppLayout() {
    const [
        mobileSidebarOpen,
        setMobileSidebarOpen,
    ] = useState(false);

    useEffect(() => {
        if (!mobileSidebarOpen) {
            return;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow =
                previousOverflow;
        };
    }, [mobileSidebarOpen]);

    return (
        <div className="min-h-dvh bg-(--vm-background) text-(--vm-text)">
            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-(--vm-border) bg-(--vm-surface) lg:flex">
                <Sidebar />
            </aside>

            {/* Mobile Sidebar */}
            <MobileSidebar
                open={mobileSidebarOpen}
                onClose={() =>
                    setMobileSidebarOpen(false)
                }
            />

            {/* Application */}
            <div className="flex min-h-dvh min-w-0 flex-col lg:ml-64">
                <Header
                    onMenuClick={() =>
                        setMobileSidebarOpen(true)
                    }
                />

                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}