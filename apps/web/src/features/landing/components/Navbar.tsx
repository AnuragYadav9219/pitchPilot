import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Button, Container, ThemeToggle } from "@/components/ui";
import { Logo } from "@/components/branding/Logo";

interface NavigationItem {
    label: string;
    href: string;
}

const navigationItems: NavigationItem[] = [
    {
        label: "Features",
        href: "#features",
    },
    {
        label: "How It Works",
        href: "#how-it-works",
    },
    {
        label: "Use Cases",
        href: "#use-cases",
    },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <header className="sticky top-0 z-50 border-b border-(--vm-border) bg-(--vm-background)/85 backdrop-blur-2xl">
            <Container>
                <nav
                    className="relative flex h-18 items-center justify-between"
                    aria-label="Main navigation"
                >
                    {/* Logo */}
                    <Link
                        to="/"
                        aria-label="VirtualMentor home"
                        className="relative z-10 shrink-0 transition-opacity duration-200 hover:opacity-80"
                    >
                        <Logo showName />
                    </Link>

                    {/* Center Navigation */}
                    <div className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">
                        <div className="flex items-center gap-1 rounded-full border border-(--vm-border) bg-(--vm-surface)/50 p-1 shadow-sm">
                            {navigationItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-full px-5 py-2 text-[13px] font-medium text-(--vm-muted) transition-all duration-200 hover:bg-(--vm-surface) hover:text-(--vm-text)"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden items-center gap-2.5 md:flex">
                        <ThemeToggle />

                        <Link
                            to="/login"
                            className="rounded-lg px-3.5 py-2 text-sm font-medium text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                        >
                            Log in
                        </Link>

                        <Link to="/register">
                            <Button size="sm" className="min-w-28 shadow-sm">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Trigger */}
                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--vm-border) bg-(--vm-surface)/50 text-(--vm-text) transition-all duration-200 hover:bg-(--vm-surface) md:hidden"
                        aria-label={
                            mobileOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setMobileOpen((open) => !open)}
                    >
                        {mobileOpen ? (
                            <X size={20} strokeWidth={1.8} aria-hidden="true" />
                        ) : (
                            <Menu size={20} strokeWidth={1.8} aria-hidden="true" />
                        )}
                    </button>
                </nav>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div
                        id="mobile-navigation"
                        className="border-t border-(--vm-border) py-5 md:hidden"
                    >
                        <div className="flex flex-col gap-1">
                            {navigationItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    className="rounded-xl px-4 py-3 text-sm font-medium text-(--vm-text-secondary) transition-colors hover:bg-(--vm-surface) hover:text-(--vm-text)"
                                >
                                    {item.label}
                                </a>
                            ))}

                            <div className="my-2 flex items-center justify-between rounded-xl border border-(--vm-border) bg-(--vm-surface)/40 px-4 py-3">
                                <span className="text-sm font-medium text-(--vm-text-secondary)">
                                    Appearance
                                </span>

                                <ThemeToggle />
                            </div>

                            <Link
                                to="/login"
                                onClick={closeMobileMenu}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-(--vm-text-secondary) transition-colors hover:bg-(--vm-surface) hover:text-(--vm-text)"
                            >
                                Log in
                            </Link>

                            <Link
                                to="/register"
                                onClick={closeMobileMenu}
                                className="mt-2"
                            >
                                <Button className="h-11 w-full">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </Container>
        </header>
    );
}