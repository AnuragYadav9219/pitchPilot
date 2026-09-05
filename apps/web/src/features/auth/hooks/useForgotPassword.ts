import { useCallback, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../authApi";
import { appToast } from "@/lib/toast";

interface ForgotPasswordFormData {
    email: string;
}

interface ApiErrorData {
    message?: string;
}

interface ApiError {
    data?: ApiErrorData | string;
    error?: string;
}

export function useForgotPassword() {
    const navigate = useNavigate();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const [form, setForm] = useState<ForgotPasswordFormData>({
        email: "",
    });

    const [error, setError] = useState("");

    const updateEmail = useCallback((value: string) => {
        setForm({ email: value });
        setError("");
    }, []);

    const submit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setError("");

            const email = form.email.trim().toLowerCase();

            if (!email) {
                setError("Please enter your email address.");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                setError("Please enter a valid email address.");
                return;
            }

            try {
                await forgotPassword({
                    identifier: email,
                    channel: "EMAIL",
                }).unwrap();

                appToast.success(
                    "If the account exists, a password reset OTP has been sent."
                );

                navigate("/reset-password", {
                    replace: true,
                    state: {
                        identifier: email,
                        channel: "EMAIL",
                    },
                });
            } catch (caughtError) {
                console.error("FORGOT PASSWORD FAILED:", caughtError);

                const apiError = caughtError as ApiError;
                let message = "";

                if (typeof apiError.data === "string") {
                    message = apiError.data;
                } else {
                    message = apiError.data?.message || apiError.error || "";
                }

                setError(
                    message ||
                    "Unable to process your request right now. Please try again."
                );
            }
        },
        [form.email, forgotPassword, navigate]
    );

    return {
        form,
        error,
        isLoading,
        updateEmail,
        submit,
    };
}