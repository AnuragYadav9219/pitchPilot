import {
    useCallback,
    useState,
    type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../authApi";
import { appToast } from "@/lib/toast";

interface RegisterFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ApiError {
    data?: {
        message?: string;
        errors?: unknown;
    };
}

const PENDING_EMAIL_KEY = "virtualmento.pendingVerificationEmail";

export function useRegister() {
    const navigate = useNavigate();

    const [
        register,
        { isLoading },
    ] = useRegisterMutation();

    const [form, setForm] =
        useState<RegisterFormData>({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

    const [showPassword, setShowPassword] = useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const updateField = useCallback(
        (
            field: keyof RegisterFormData,
            value: string,
        ) => {
            setForm((current) => ({
                ...current,
                [field]: value,
            }));

            setError("");
            setSuccess("");
        },
        [],
    );

    const togglePassword = useCallback(() => {
        setShowPassword(
            (current) => !current,
        );
    }, []);

    const toggleConfirmPassword =
        useCallback(() => {
            setShowConfirmPassword(
                (current) => !current,
            );
        }, []);

    const submit = useCallback(
        async (
            event: FormEvent<HTMLFormElement>,
        ) => {
            event.preventDefault();

            setError("");
            setSuccess("");

            const fullName =
                form.fullName.trim();

            const email =
                form.email
                    .trim()
                    .toLowerCase();

            if (!fullName) {
                setError(
                    "Please enter your full name.",
                );
                return;
            }

            if (fullName.length < 2) {
                setError(
                    "Your full name must contain at least 2 characters.",
                );
                return;
            }

            if (!email) {
                setError(
                    "Please enter your email address.",
                );
                return;
            }

            if (form.password.length < 8) {
                setError(
                    "Your password must contain at least 8 characters.",
                );
                return;
            }

            if (
                form.password !==
                form.confirmPassword
            ) {
                setError(
                    "Passwords do not match.",
                );
                return;
            }

            try {
                const response =
                    await register({
                        fullName,
                        email,
                        password: form.password,
                    }).unwrap();

                sessionStorage.setItem(
                    PENDING_EMAIL_KEY,
                    email,
                );

                appToast.success(
                    "Account created. Please verify your email.",
                );

                navigate("/verify-otp", {
                    replace: true,
                    state: {
                        email,
                        purpose:
                            "EMAIL_VERIFICATION",
                    },
                });
            } catch (error) {
                const apiError =
                    error as ApiError;

                setError(
                    apiError.data?.message ||
                    "Unable to create your account right now.",
                );
            }
        },
        [
            form,
            register,
            navigate,
        ],
    );

    return {
        form,
        error,
        success,
        isLoading,
        showPassword,
        showConfirmPassword,

        updateField,
        togglePassword,
        toggleConfirmPassword,
        submit,
    };
}

export {
    PENDING_EMAIL_KEY,
};