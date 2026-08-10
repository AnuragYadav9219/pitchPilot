import { useState } from "react";
import type { FormEventHandler } from "react";
import {
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

import { createPreRegistration } from "@/services/preRegistrationService";

import {
    Radius,
    Typography,
} from "@virtualmento/shared";

type FormState = {
    name: string;
    email: string;
};

type PreRegistrationFormProps = {
    onSuccess?: () => void;
};

const initialForm: FormState = {
    name: "",
    email: "",
};

export default function PreRegistrationForm({
    onSuccess,
}: PreRegistrationFormProps) {
    const [form, setForm] =
        useState<FormState>(initialForm);

    const [loading, setLoading] =
        useState(false);

    const [submitted, setSubmitted] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleSubmit: FormEventHandler<
        HTMLFormElement
    > = async (event) => {
        event.preventDefault();

        if (loading) {
            return;
        }

        setError("");
        setLoading(true);

        try {
            await createPreRegistration(form);

            setSubmitted(true);

            /*
             * Give the user a moment to see the
             * success state before closing the modal.
             */
            window.setTimeout(() => {
                onSuccess?.();
            }, 1800);
        } catch (error) {
            console.error(
                "Early access registration failed:",
                error,
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    const updateField = <
        K extends keyof FormState,
    >(
        field: K,
        value: FormState[K],
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    /*
     * Success state
     */
    if (submitted) {
        return (
            <div
                className="p-6 text-center sm:p-8"
                style={{
                    borderRadius: Radius.xl,
                    border:
                        "1px solid var(--vm-border)",
                    background:
                        "var(--vm-surface)",
                }}
            >
                <div
                    className="mx-auto flex h-14 w-14 items-center justify-center"
                    style={{
                        borderRadius: Radius.full,
                        background:
                            "var(--vm-glow-green)",
                    }}
                >
                    <CheckCircle2
                        size={28}
                        className="text-(--vm-success)"
                        aria-hidden="true"
                    />
                </div>

                <h3
                    className="mt-5 font-bold text-(--vm-text)"
                    style={{
                        fontSize: Typography.h3,
                    }}
                >
                    You're on the list!
                </h3>

                <p
                    className="mx-auto mt-3 max-w-md text-(--vm-text-secondary)"
                    style={{
                        fontSize: Typography.small,
                        lineHeight: 1.7,
                    }}
                >
                    Thanks for joining the VirtualMento
                    early-access community.
                </p>

                <p
                    className="mt-3 text-(--vm-muted)"
                    style={{
                        fontSize: Typography.tiny,
                        lineHeight: 1.6,
                    }}
                >
                    We'll keep you updated about the
                    launch and early-access availability.
                </p>

                <p
                    className="mt-5 text-(--vm-muted)"
                    style={{
                        fontSize: Typography.tiny,
                    }}
                >
                    Closing...
                </p>
            </div>
        );
    }

    /*
     * Registration form
     */
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            {/* Name */}
            <div>
                <label
                    htmlFor="early-access-name"
                    className="mb-2 block text-xs font-semibold text-(--vm-text-secondary)"
                >
                    Name
                </label>

                <input
                    id="early-access-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                        updateField(
                            "name",
                            event.target.value,
                        )
                    }
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    minLength={2}
                    disabled={loading}
                    className="w-full border border-(--vm-border-strong) bg-(--vm-background) px-4 py-3 text-sm text-(--vm-text) outline-none transition focus:border-(--vm-primary) disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                        borderRadius: Radius.md,
                    }}
                />
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="early-access-email"
                    className="mb-2 block text-xs font-semibold text-(--vm-text-secondary)"
                >
                    Email address
                </label>

                <input
                    id="early-access-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                        updateField(
                            "email",
                            event.target.value,
                        )
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    disabled={loading}
                    className="w-full border border-(--vm-border-strong) bg-(--vm-background) px-4 py-3 text-sm text-(--vm-text) outline-none transition focus:border-(--vm-primary) disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                        borderRadius: Radius.md,
                    }}
                />
            </div>

            {/* Error */}
            {error && (
                <div
                    role="alert"
                    className="border border-(--vm-danger)/20 bg-(--vm-danger)/5 p-3 text-sm text-(--vm-danger)"
                    style={{
                        borderRadius: Radius.md,
                    }}
                >
                    {error}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="group flex w-full cursor-pointer items-center justify-center gap-2 bg-(--vm-primary) px-5 py-3 font-semibold text-white transition hover:bg-(--vm-primary-pressed) disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                    borderRadius: Radius.md,
                }}
            >
                {loading
                    ? "Joining..."
                    : "Join Early Access"}

                {!loading && (
                    <ArrowRight
                        size={17}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                    />
                )}
            </button>
        </form>
    );
}