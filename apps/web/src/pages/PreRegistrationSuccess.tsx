import { useEffect, useState } from "react";
import {
    CheckCircle2,
    Loader2,
    XCircle,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { Brand } from "@virtualmento/shared";

type Status = "loading" | "success" | "error";

export default function PreRegistrationSuccess() {
    const [status, setStatus] =
        useState<Status>("loading");

    const [message, setMessage] =
        useState("");

    useEffect(() => {
        let mounted = true;

        const completeRegistration = async () => {
            try {
                /*
                 * Supabase may return a PKCE `code`
                 * in the URL after email verification.
                 */
                const url = new URL(window.location.href);

                const code = url.searchParams.get("code");

                if (code) {
                    const { error } =
                        await supabase.auth.exchangeCodeForSession(
                            code,
                        );

                    if (error) {
                        throw error;
                    }
                }

                /*
                 * Get the authenticated user after
                 * Supabase has processed the callback.
                 */
                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError) {
                    throw userError;
                }

                if (!user) {
                    throw new Error(
                        "We couldn't verify your registration. Please try the verification link again.",
                    );
                }

                if (!user.email) {
                    throw new Error(
                        "No email address was found for this registration.",
                    );
                }

                /*
                 * Name was stored in Supabase user_metadata
                 * when the user submitted the form.
                 */
                const name =
                    user.user_metadata?.name;

                if (!name) {
                    throw new Error(
                        "Your registration information is incomplete.",
                    );
                }

                /*
                 * Save the verified registration.
                 */
                const { error: registrationError } =
                    await supabase
                        .from("pre_registrations")
                        .upsert(
                            {
                                user_id: user.id,
                                name,
                                email: user.email,
                                verified: true,
                                verified_at:
                                    new Date().toISOString(),
                            },
                            {
                                onConflict: "user_id",
                            },
                        );

                if (registrationError) {
                    throw registrationError;
                }

                if (!mounted) {
                    return;
                }

                setStatus("success");

                setMessage(
                    "Your email has been verified and you're officially on the VirtualMento early-access list.",
                );
            } catch (error) {
                console.error(
                    "Registration verification failed:",
                    error,
                );

                if (!mounted) {
                    return;
                }

                setStatus("error");

                setMessage(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while verifying your email.",
                );
            }
        };

        completeRegistration();

        return () => {
            mounted = false;
        };
    }, []);

    if (status === "loading") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-(--vm-background) px-6">
                <div className="text-center">
                    <Loader2
                        size={42}
                        className="mx-auto animate-spin text-(--vm-primary)"
                    />

                    <h1 className="mt-6 text-2xl font-bold text-(--vm-text)">
                        Verifying your email...
                    </h1>

                    <p className="mt-2 text-sm text-(--vm-muted)">
                        Please wait a moment.
                    </p>
                </div>
            </main>
        );
    }

    if (status === "error") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-(--vm-background) px-6">
                <div className="w-full max-w-md text-center">
                    <XCircle
                        size={52}
                        className="mx-auto text-(--vm-danger)"
                    />

                    <h1 className="mt-6 text-3xl font-bold text-(--vm-text)">
                        Verification failed
                    </h1>

                    <p className="mt-4 text-sm leading-6 text-(--vm-text-secondary)">
                        {message}
                    </p>

                    <a
                        href="/"
                        className="mt-8 inline-flex rounded-(--vm-radius-md) bg-(--vm-primary) px-6 py-3 font-semibold text-white transition hover:bg-(--vm-primary-pressed)"
                    >
                        Back to {Brand.name}
                    </a>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-(--vm-background) px-6">
            <div className="w-full max-w-md text-center">
                <CheckCircle2
                    size={56}
                    className="mx-auto text-(--vm-success)"
                />

                <h1 className="mt-6 text-3xl font-bold text-(--vm-text)">
                    You're in! 🎉
                </h1>

                <p className="mt-4 text-sm leading-6 text-(--vm-text-secondary)">
                    {message}
                </p>

                <a
                    href="/"
                    className="mt-8 inline-flex rounded-(--vm-radius-md) bg-(--vm-primary) px-6 py-3 font-semibold text-white transition hover:bg-(--vm-primary-pressed)"
                >
                    Back to {Brand.name}
                </a>
            </div>
        </main>
    );
}