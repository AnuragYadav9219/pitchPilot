import {
    Navigate,
    Link,
    useLocation,
} from "react-router-dom";

import {
    ArrowLeft,
    LockKeyhole,
} from "lucide-react";

import {
    Brand,
} from "@virtualmentor/shared";

import {
    Logo,
} from "@/components/branding/Logo";
import { ResetPasswordForm } from "../components";

interface ResetPasswordLocationState {
    identifier?: string;
    channel?: "EMAIL" | "PHONE";
}

export default function ResetPasswordPage() {
    const location = useLocation();

    const state =
        location.state as
            | ResetPasswordLocationState
            | null;

    const identifier =
        state?.identifier
            ?.trim()
            .toLowerCase();

    const channel =
        state?.channel ?? "EMAIL";

    if (!identifier) {
        return (
            <Navigate
                to="/forgot-password"
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
                    to="/login"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-(--vm-border) bg-(--vm-surface) px-3 py-1.5 text-xs font-medium text-(--vm-muted) transition-colors hover:border-(--vm-border-strong) hover:bg-(--vm-surface-2) hover:text-(--vm-text)"
                >
                    <ArrowLeft
                        size={14}
                        className="transition-transform group-hover:-translate-x-0.5"
                        aria-hidden="true"
                    />

                    Back to login
                </Link>
            </header>

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-xl items-center px-5 pb-12 pt-4 sm:px-8">

                <section className="w-full rounded-(--vm-radius-xl) border border-(--vm-border) bg-(--vm-surface)/70 p-6 shadow-2xl backdrop-blur-xl sm:p-10">

                    {/* Icon */}
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                        <LockKeyhole
                            size={28}
                            aria-hidden="true"
                        />
                    </div>

                    {/* Heading */}
                    <div className="mt-6 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--vm-primary)">
                            Password recovery
                        </p>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-(--vm-text) sm:text-4xl">
                            Create a new password.
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-(--vm-muted)">
                            Enter the verification code we sent to your email, then choose a new password for your{" "}
                            {Brand.name} account.
                        </p>
                    </div>

                    {/* Reset Form */}
                    <div className="mt-8">
                        <ResetPasswordForm
                            identifier={identifier}
                            channel={channel}
                        />
                    </div>

                    <p className="mt-8 text-center text-[11px] leading-5 text-(--vm-muted)">
                        Your existing sessions will be signed out after your password is changed.
                    </p>
                </section>
            </div>
        </main>
    );
}