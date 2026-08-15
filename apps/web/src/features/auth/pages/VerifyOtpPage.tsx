import { useLocation, Navigate, Link } from "react-router-dom";

import {
    PENDING_EMAIL_KEY,
} from "../hooks";
import { Logo } from "@/components/branding/Logo";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Brand } from "@virtualmento/shared";
import { OtpVerificationForm } from "../components";

interface VerifyOtpLocationState {
    email?: string;
    purpose?: "EMAIL_VERIFICATION";
}

export default function VerifyOtpPage() {
    const location = useLocation();

    const state =
        location.state as
        | VerifyOtpLocationState
        | null;

    const stateEmail =
        state?.email
            ?.trim()
            .toLowerCase();

    const storedEmail =
        sessionStorage.getItem(
            PENDING_EMAIL_KEY,
        );

    const email =
        stateEmail || storedEmail;

    if (!email) {
        return (
            <Navigate
                to="/register"
                replace
            />
        );
    }

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
                    to="/register"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-(--vm-border) bg-(--vm-surface) px-3 py-1.5 text-xs font-medium text-(--vm-muted) transition-colors hover:border-(--vm-border-strong) hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                >
                    <ArrowLeft
                        size={14}
                        className="transition-transform group-hover:-translate-x-0.5"
                    />

                    Back
                </Link>
            </header>

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-xl items-center px-5 pb-12 pt-4 sm:px-8">
                <section className="w-full rounded-(--vm-radius-xl) border border-(--vm-border) bg-(--vm-surface)/70 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
                    {/* Icon */}
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                        <ShieldCheck
                            size={28}
                            aria-hidden="true"
                        />
                    </div>

                    {/* Heading */}
                    <div className="mt-6 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--vm-primary)">
                            Verify your email
                        </p>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-(--vm-text) sm:text-4xl">
                            Almost there.
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-(--vm-muted)">
                            Enter the 6-digit verification
                            code we sent to your email to
                            activate your {Brand.name} account.
                        </p>
                    </div>

                    {/* OTP form */}
                    <div className="mt-8">
                        <OtpVerificationForm
                            email={email}
                        />
                    </div>

                    <p className="mt-8 text-center text-[11px] leading-5 text-(--vm-muted)">
                        Verification helps keep your{" "}
                        {Brand.name} account secure.
                    </p>
                </section>
            </div>
        </main>
    );
}