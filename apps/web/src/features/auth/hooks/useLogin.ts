import { useCallback, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../authApi";
import { setCredentials } from "../authSlice";
import { useAppDispatch } from "@/app/store/hooks";
import { appToast } from "@/lib/toast";

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginLocationState {
    email?: string;
    verified?: boolean;
}

interface ApiErrorData {
    success?: boolean;
    message?: string;
    errors?: unknown;
}

interface ApiError {
    status?: number | string;
    data?: ApiErrorData | string;
    error?: string;
}

export function useLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const locationState = location.state as LoginLocationState | null;

    const [form, setForm] = useState<LoginFormData>({
        email: locationState?.email ?? "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // =========================
    // UPDATE FIELD
    // =========================

    const updateField = useCallback(
        (field: keyof LoginFormData, value: string) => {
            setForm((current) => ({
                ...current,
                [field]: value,
            }));

            setError("");
        },
        []
    );

    // =========================
    // TOGGLE PASSWORD
    // =========================

    const togglePassword = useCallback(() => {
        setShowPassword((current) => !current);
    }, []);

    // =========================
    // SUBMIT
    // =========================

    const submit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            setError("");

            const email = form.email.trim().toLowerCase();

            // -------------------------
            // VALIDATION
            // -------------------------

            if (!email) {
                setError("Please enter your email address.");
                return;
            }

            if (!form.password) {
                setError("Please enter your password.");
                return;
            }

            try {
                // -------------------------
                // LOGIN API
                // -------------------------

                const response = await login({
                    email,
                    password: form.password,
                }).unwrap();

                if (!response.data) {
                    throw new Error(
                        "The server did not return authentication data."
                    );
                }

                // -------------------------
                // STORE AUTHENTICATION
                // -------------------------

                dispatch(setCredentials(response.data));

                // -------------------------
                // SUCCESS
                // -------------------------

                appToast.success("Welcome back!");

                navigate("/dashboard", {
                    replace: true,
                });
            } catch (caughtError) {
                console.error("LOGIN FAILED:", caughtError);

                const apiError = caughtError as ApiError;

                // -------------------------
                // EXTRACT API MESSAGE
                // -------------------------

                let message = "";

                if (typeof apiError.data === "string") {
                    message = apiError.data;
                } else {
                    message =
                        apiError.data?.message ||
                        apiError.error ||
                        "";
                }

                // -------------------------
                // FALLBACK ERROR MESSAGE
                // -------------------------

                if (!message && caughtError instanceof Error) {
                    message = caughtError.message;
                }

                const normalizedMessage = message.toLowerCase().trim();

                // -------------------------
                // EMAIL NOT VERIFIED
                // -------------------------

                const emailNotVerified =
                    normalizedMessage.includes("email not verified") ||
                    normalizedMessage.includes("email is not verified") ||
                    normalizedMessage.includes("email verification") ||
                    normalizedMessage.includes("verify your email") ||
                    normalizedMessage.includes("verify email");

                if (emailNotVerified) {
                    appToast.info("Please verify your email first.");

                    navigate("/verify-otp", {
                        replace: true,
                        state: {
                            email,
                            purpose: "EMAIL_VERIFICATION",
                        },
                    });

                    return;
                }

                // -------------------------
                // DISPLAY ERROR
                // -------------------------

                setError(
                    message ||
                    "Unable to sign in right now. Please check your credentials and try again."
                );
            }
        },
        [form.email, form.password, login, dispatch, navigate]
    );

    return {
        form,
        error,
        isLoading,
        showPassword,
        updateField,
        togglePassword,
        submit,
    };
}