import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Brand } from "@virtualmentor/shared";

import { Logo } from "@/components/branding/Logo";
import authPanel from "@/assets/images/authpanel.webp";

import {
    RegisterForm,
} from "../components";

export function RegisterPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-(--vm-background)">
            {/* ========================================================= */}
            {/* AMBIENT BACKGROUND */}
            {/* ========================================================= */}

            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 overflow-hidden"
            >
                <div className="absolute left-[10%] top-[-20%] h-100 w-100 rounded-full bg-(--vm-glow-orange) opacity-20 blur-[130px]" />

                <div className="absolute bottom-[-20%] right-[5%] h-100 w-100 rounded-full bg-(--vm-glow-coral) opacity-15 blur-[130px]" />
            </div>

            {/* ========================================================= */}
            {/* SPLIT LAYOUT */}
            {/* ========================================================= */}

            <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-2">
                {/* ===================================================== */}
                {/* LEFT — ILLUSTRATION */}
                {/* ===================================================== */}

                <section className="relative hidden min-h-screen overflow-hidden lg:block">
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
                        className="absolute inset-0 bg-(--vm-background)/10"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-linear-to-br from-(--vm-primary)/8 via-transparent to-(--vm-glow-orange)/15"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/25 to-transparent"
                    />

                    <div className="absolute left-7 top-7 z-10">
                        <Logo showName size="md" />
                    </div>
                </section>

                {/* ===================================================== */}
                {/* RIGHT — REGISTER */}
                {/* ===================================================== */}

                <section className="relative flex min-h-screen items-center justify-center px-5 py-5 sm:px-8 lg:px-10 xl:px-16">
                    {/* Ambient glow */}

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--vm-glow-orange) opacity-10 blur-[120px]"
                    />

                    <div className="relative w-full max-w-md">
                        {/* ================================================= */}
                        {/* TOP */}
                        {/* ================================================= */}

                        <div className="mb-6 flex items-center justify-between">
                            {/* Mobile logo */}

                            <div className="lg:hidden">
                                <Logo showName size="md" />
                            </div>

                            <Link
                                to="/"
                                aria-label="Back to home"
                                className={[
                                    "group ml-auto inline-flex items-center gap-1.5",
                                    "rounded-full",
                                    "border border-(--vm-border)",
                                    "bg-(--vm-surface)",
                                    "px-3 py-1.5",
                                    "text-xs font-medium",
                                    "text-(--vm-muted)",
                                    "transition-all duration-(--vm-animation-fast)",
                                    "hover:border-(--vm-border-strong)",
                                    "hover:bg-(--vm-surface-2)",
                                    "hover:text-(--vm-text)",
                                ].join(" ")}
                            >
                                <ArrowLeft
                                    size={14}
                                    className="transition-transform duration-200 group-hover:-translate-x-0.5"
                                    aria-hidden="true"
                                />

                                Back
                            </Link>
                        </div>

                        {/* ================================================= */}
                        {/* HEADING */}
                        {/* ================================================= */}

                        <div>
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--vm-primary)">
                                Get started
                            </p>

                            <h1 className="text-2xl font-bold tracking-tight text-(--vm-text) sm:text-3xl">
                                Create your account.
                            </h1>

                            <p className="mt-2 max-w-md text-sm leading-5 text-(--vm-muted)">
                                Create your {Brand.name} account and start building real-world confidence.
                            </p>
                        </div>

                        {/* ================================================= */}
                        {/* REGISTER FORM */}
                        {/* ================================================= */}

                        <div className="mt-6">
                            <RegisterForm />
                        </div>

                        {/* ================================================= */}
                        {/* LOGIN */}
                        {/* ================================================= */}

                        <p className="mt-5 text-center text-sm text-(--vm-muted)">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-(--vm-primary) transition-colors hover:text-(--vm-primary-pressed)"
                            >
                                Log in
                            </Link>
                        </p>

                        {/* ================================================= */}
                        {/* TERMS */}
                        {/* ================================================= */}

                        <p className="mt-5 text-center text-[10px] leading-4 text-(--vm-muted)/70">
                            By creating an account, you agree to the terms and policies of {Brand.name}.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default RegisterPage;