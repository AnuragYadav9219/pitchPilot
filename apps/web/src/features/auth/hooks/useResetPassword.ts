import { useCallback, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../authApi";
import { useOtpInput } from "./useOtpInput";
import { appToast } from "@/lib/toast";

interface ApiErrorData {
    message?: string;
}

interface ApiError {
    data?: ApiErrorData | string;
    error?: string;
}

interface UseResetPasswordOptions {
    identifier: string;
    channel: "EMAIL" | "PHONE";
}

export function useResetPassword({
    identifier,
    channel,
}: UseResetPasswordOptions) {
    const navigate = useNavigate();

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const otpInput = useOtpInput(6);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const updatePassword = useCallback((value: string) => {
        setNewPassword(value);
        setError("");
    }, []);

    const updateConfirmPassword = useCallback((value: string) => {
        setConfirmPassword(value);
        setError("");
    }, []);

    const submit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setError("");

            if (!identifier) {
                setError(
                    "Your password reset session has expired. Please request a new OTP."
                );
                return;
            }

            if (!otpInput.isComplete) {
                setError("Please enter the 6-digit OTP.");
                return;
            }

            if (!newPassword) {
                setError("Please enter a new password.");
                return;
            }

            if (newPassword.length < 8) {
                setError("Your password must be at least 8 characters.");
                return;
            }

            if (newPassword !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            try {
                await resetPassword({
                    identifier,
                    channel,
                    otp: otpInput.otpValue,
                    newPassword,
                }).unwrap();

                appToast.success(
                    "Password reset successfully. Please sign in."
                );

                navigate("/login", {
                    replace: true,
                    state: {
                        email: identifier,
                    },
                });
            } catch (caughtError) {
                console.error("RESET PASSWORD FAILED:", caughtError);

                const apiError = caughtError as ApiError;
                let message = "";

                if (typeof apiError.data === "string") {
                    message = apiError.data;
                } else {
                    message = apiError.data?.message || apiError.error || "";
                }

                if (!message) {
                    message =
                        "Unable to reset your password. Please check the OTP and try again.";
                }

                setError(message);
            }
        },
        [
            identifier,
            channel,
            otpInput,
            newPassword,
            confirmPassword,
            resetPassword,
            navigate,
        ]
    );

    return {
        ...otpInput,
        newPassword,
        confirmPassword,
        error,
        isLoading,
        showPassword,
        showConfirmPassword,
        updatePassword,
        updateConfirmPassword,
        setShowPassword,
        setShowConfirmPassword,
        submit,
    };
}