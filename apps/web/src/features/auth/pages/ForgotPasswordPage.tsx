import { ArrowLeft } from "lucide-react";

import {
    Link,
} from "react-router-dom";

import {
    Brand,
} from "@virtualmentor/shared";

import loginPanel from "@/assets/images/authpanel.webp";

import {
    Logo,
} from "@/components/branding/Logo";
import { ForgotPasswordForm } from "../components";

export function ForgotPasswordPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-(--vm-background)">

            {/* Ambient Background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div className="absolute left-[15%] top-[-20%] h-125 w-125 rounded-full bg-(--vm-glow-purple) opacity-20 blur-[140px]" />

                <div className="absolute bottom-[-20%] right-[5%] h-125 w-125 rounded-full bg-(--vm-glow-green) opacity-10 blur-[140px]" />
            </div>

            {/* Main Layout */}
            <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-2">

                {/* Visual Panel */}
                <section className="relative hidden min-h-screen overflow-hidden lg:block">

                    <img
                        src={loginPanel}
                        alt={`${Brand.name} AI mentoring`}
                        width={1536}
                        height={1024}
                        fetchPriority="high"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-(--vm-background)/10"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-linear-to-br from-(--vm-primary)/10 via-transparent to-(--vm-glow-purple)/15"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black/30 to-transparent"
                    />

                    <div className="absolute left-8 top-8 z-10">
                        <Logo size="md" />
                    </div>
                </section>

                {/* Form Section */}
                <section className="relative flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-12 xl:px-20">

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--vm-glow-purple) opacity-10 blur-[130px]"
                    />

                    <div className="relative w-full max-w-md">

                        {/* Header */}
                        <div className="mb-10 flex items-center justify-between lg:mb-12">

                            <div className="lg:hidden">
                                <Logo size="md" />
                            </div>

                            <Link
                                to="/login"
                                aria-label="Back to login"
                                className="group ml-auto inline-flex items-center gap-1.5 rounded-full border border-(--vm-border) bg-(--vm-surface) px-3 py-1.5 text-xs font-medium text-(--vm-muted) transition-all duration-(--vm-animation-fast) hover:border-(--vm-border-strong) hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                            >
                                <ArrowLeft
                                    size={14}
                                    className="transition-transform duration-200 group-hover:-translate-x-0.5"
                                    aria-hidden="true"
                                />

                                Back to login
                            </Link>
                        </div>

                        {/* Content */}
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-(--vm-primary)">
                                Account recovery
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-(--vm-text) sm:text-4xl">
                                Forgot your password?
                            </h1>

                            <p className="mt-3 max-w-md text-sm leading-6 text-(--vm-muted)">
                                Enter the email address associated with your {Brand.name} account and we'll send you a one-time password to reset it.
                            </p>
                        </div>

                        {/* Form */}
                        <div className="mt-8">
                            <ForgotPasswordForm />
                        </div>

                        {/* Security Note */}
                        <p className="mt-8 text-center text-[11px] leading-5 text-(--vm-muted)">
                            For your security, we'll show the same confirmation whether or not an account exists with that email.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default ForgotPasswordPage;