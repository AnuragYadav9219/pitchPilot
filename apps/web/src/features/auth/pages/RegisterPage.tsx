import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Brand } from "@virtualmento/shared";

import { Logo } from "@/components/branding/Logo";
import authPanel from "@/assets/images/virtualmento-login-panel.webp";

import {
    AuthDivider,
    RegisterForm,
    SocialLogin,
} from "../components";

export function RegisterPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-(--vm-background)">
            {/* Background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div className="absolute left-1/2 top-[-25%] h-150 w-150 -translate-x-1/2 rounded-full bg-(--vm-glow-purple) opacity-25 blur-[150px]" />

                <div className="absolute bottom-[-20%] right-[-10%] h-125 w-125 rounded-full bg-(--vm-glow-green) opacity-15 blur-[150px]" />
            </div>

            {/* Header */}
            <header className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-8">
                <Logo size="sm" />

                <Link
                    to="/"
                    aria-label="Back to home"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-(--vm-border) bg-(--vm-surface) px-3 py-1.5 text-xs font-medium text-(--vm-muted) transition-colors hover:border-(--vm-border-strong) hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                >
                    <ArrowLeft
                        size={14}
                        className="transition-transform group-hover:-translate-x-0.5"
                        aria-hidden="true"
                    />

                    Back
                </Link>
            </header>

            {/* Main */}
            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl items-center px-4 pb-10 pt-4 sm:px-6 lg:px-8">
                <div className="grid w-full overflow-hidden rounded-(--vm-radius-xl) border border-(--vm-border) bg-(--vm-surface)/60 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
                    {/* Left image */}
                    <section className="relative hidden min-h-170 overflow-hidden lg:block">
                        <img
                            src={authPanel}
                            alt={`${Brand.name} AI mentoring`}
                            width={890}
                            height={1200}
                            fetchPriority="high"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-linear-to-r from-transparent to-(--vm-background)/20"
                        />

                        <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/40 to-transparent"
                        />
                    </section>

                    {/* Right form */}
                    <section className="flex min-h-170 items-center p-6 sm:p-10 lg:p-12 xl:p-16">
                        <div className="mx-auto w-full max-w-md">
                            {/* Mobile logo */}
                            <div className="mb-8 lg:hidden">
                                <Logo size="md" />
                            </div>

                            {/* Heading */}
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-(--vm-primary)">
                                    Get started
                                </p>

                                <h1 className="text-3xl font-bold tracking-tight text-(--vm-text) sm:text-4xl">
                                    Create your account.
                                </h1>

                                <p className="mt-3 text-sm leading-6 text-(--vm-muted)">
                                    Create your {Brand.name} account and start
                                    building real-world confidence.
                                </p>
                            </div>

                            {/* Form */}
                            <div className="mt-8">
                                <RegisterForm />
                            </div>

                            <AuthDivider />

                            <SocialLogin />

                            <p className="mt-7 text-center text-sm text-(--vm-muted)">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-(--vm-primary) transition-colors hover:text-(--vm-primary-pressed)"
                                >
                                    Log in
                                </Link>
                            </p>

                            <p className="mt-8 text-center text-[11px] leading-5 text-(--vm-muted)">
                                By creating an account, you agree to the terms
                                and policies of {Brand.name}.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default RegisterPage;