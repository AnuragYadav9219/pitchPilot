import { Link } from "react-router-dom";

import { Brand } from "@virtualmento/shared";
import { Container } from "@/components/ui";

export function Footer() {
    return (
        <footer className="border-t border-(--vm-border) bg-(--vm-background)">
            <Container>
                <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <Link
                            to="/"
                            className="text-xl font-bold tracking-tight text-(--vm-text)"
                        >
                            {Brand.name}
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-6 text-(--vm-muted)">
                            {Brand.description}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-(--vm-text)">
                            Product
                        </h3>

                        <div className="mt-4 flex flex-col gap-3">
                            <a
                                href="#features"
                                className="text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                            >
                                Features
                            </a>

                            <a
                                href="#how-it-works"
                                className="text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                            >
                                How It Works
                            </a>

                            <a
                                href="#use-cases"
                                className="text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                            >
                                Use Cases
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-(--vm-text)">
                            Account
                        </h3>

                        <div className="mt-4 flex flex-col gap-3">
                            <Link
                                to="/login"
                                className="text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                            >
                                Log in
                            </Link>

                            <Link
                                to="/login"
                                className="text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-(--vm-border) py-6 text-xs text-(--vm-muted) sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} {Brand.name}. All rights
                        reserved.
                    </p>

                    <p>
                        Built for better conversations.
                    </p>
                </div>
            </Container>
        </footer>
    );
}