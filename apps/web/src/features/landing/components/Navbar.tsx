import { useState } from "react";
import { Link } from "react-router-dom";
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
        href: "/#features",
    },
    {
        label: "How It Works",
        href: "/#how-it-works",
    },
    {
        label: "Use Cases",
        href: "/#use-cases",
    },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-(--vm-border) bg-(--vm-background)/80 backdrop-blur-xl">
            <Container>
                <nav
                    className="flex h-16 items-center justify-between"
                    aria-label="Main navigation"
                >
                    {/* Brand */}
                    <Logo />

                    {/* Desktop navigation */}
                    <div className="hidden items-center gap-8 md:flex">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <ThemeToggle />

                        <Link
                            to="/login"
                            className="text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                        >
                            Log in
                        </Link>

                        <Link to="/login">
                            <Button size="sm">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="rounded-(--vm-radius-sm) p-2 text-(--vm-text) transition-colors hover:bg-(--vm-surface) md:hidden"
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
                            <X
                                size={22}
                                aria-hidden="true"
                            />
                        ) : (
                            <Menu
                                size={22}
                                aria-hidden="true"
                            />
                        )}
                    </button>
                </nav>

                {/* Mobile navigation */}
                {mobileOpen && (
                    <div
                        id="mobile-navigation"
                        className="border-t border-(--vm-border) py-4 md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={closeMobileMenu}
                                    className="rounded-lg px-3 py-3 text-sm text-(--vm-text-secondary) transition-colors hover:bg-(--vm-surface) hover:text-(--vm-text)"
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="flex items-center justify-between px-3 py-3">
                                <span className="text-sm text-(--vm-text-secondary)">
                                    Appearance
                                </span>

                                <ThemeToggle />
                            </div>

                            <Link
                                to="/login"
                                onClick={closeMobileMenu}
                                className="rounded-lg px-3 py-3 text-sm text-(--vm-text-secondary) transition-colors hover:bg-(--vm-surface) hover:text-(--vm-text)"
                            >
                                Log in
                            </Link>

                            <Link
                                to="/login"
                                onClick={closeMobileMenu}
                                className="mt-2"
                            >
                                <Button className="w-full">
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