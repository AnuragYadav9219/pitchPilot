import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type ClipboardEvent,
    type FormEvent,
    type KeyboardEvent,
} from "react";
import { useNavigate } from "react-router-dom";

import {
    useSendOtpMutation,
    useVerifyOtpMutation,
} from "../authApi";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;

interface ApiError {
    data?: {
        message?: string;
        errors?: unknown;
    };
}

export function useOtpVerification(email: string) {
    const navigate = useNavigate();

    const [
        sendOtp,
        { isLoading: isSendingOtp },
    ] = useSendOtpMutation();

    const [
        verifyOtp,
        { isLoading: isVerifyingOtp },
    ] = useVerifyOtpMutation();

    const [otp, setOtp] = useState<string[]>(
        () => Array(OTP_LENGTH).fill(""),
    );

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [resendCooldown, setResendCooldown] =
        useState(0);

    const inputRefs = useRef<
        Array<HTMLInputElement | null>
    >([]);

    const initialOtpSent = useRef(false);

    const redirectTimer = useRef<
        number | null
    >(null);

    const isLoading =
        isSendingOtp || isVerifyingOtp;

    /*
     * --------------------------------------------------
     * OTP input helpers
     * --------------------------------------------------
     */

    const focusInput = useCallback(
        (index: number) => {
            inputRefs.current[index]?.focus();
        },
        [],
    );

    const updateOtp = useCallback(
        (index: number, value: string) => {
            const digit = value
                .replace(/\D/g, "")
                .slice(-1);

            setOtp((current) => {
                const next = [...current];

                next[index] = digit;

                return next;
            });

            setError("");

            if (
                digit &&
                index < OTP_LENGTH - 1
            ) {
                focusInput(index + 1);
            }
        },
        [focusInput],
    );

    const handleKeyDown = useCallback(
        (
            index: number,
            event: KeyboardEvent<HTMLInputElement>,
        ) => {
            if (
                event.key === "Backspace" &&
                !otp[index] &&
                index > 0
            ) {
                focusInput(index - 1);
            }

            if (
                event.key === "ArrowLeft" &&
                index > 0
            ) {
                focusInput(index - 1);
            }

            if (
                event.key === "ArrowRight" &&
                index < OTP_LENGTH - 1
            ) {
                focusInput(index + 1);
            }
        },
        [otp, focusInput],
    );

    const handlePaste = useCallback(
        (
            event: ClipboardEvent<HTMLInputElement>,
        ) => {
            event.preventDefault();

            const pasted = event.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, OTP_LENGTH);

            if (!pasted) {
                return;
            }

            const next = Array(
                OTP_LENGTH,
            ).fill("");

            pasted
                .split("")
                .forEach((digit, index) => {
                    next[index] = digit;
                });

            setOtp(next);
            setError("");

            const focusIndex = Math.min(
                pasted.length,
                OTP_LENGTH - 1,
            );

            focusInput(focusIndex);
        },
        [focusInput],
    );

    /*
     * --------------------------------------------------
     * Send OTP
     * --------------------------------------------------
     */

    const sendVerificationOtp =
        useCallback(async () => {
            if (!email) {
                return;
            }

            setError("");
            setSuccess("");

            try {
                const response =
                    await sendOtp({
                        email,
                        purpose:
                            "EMAIL_VERIFICATION",
                    }).unwrap();

                setSuccess(
                    response.message ||
                    "A verification code has been sent to your email.",
                );

                setResendCooldown(
                    RESEND_COOLDOWN,
                );

                return true;
            } catch (error) {
                const apiError =
                    error as ApiError;

                setError(
                    apiError.data?.message ||
                    "Unable to send the verification code.",
                );

                return false;
            }
        }, [email, sendOtp]);

    /*
     * Automatically send the first OTP
     * when the verification page opens.
     */
    useEffect(() => {
        if (
            !email ||
            initialOtpSent.current
        ) {
            return;
        }

        initialOtpSent.current = true;

        void sendVerificationOtp();
    }, [email, sendVerificationOtp]);

    /*
     * --------------------------------------------------
     * Resend countdown
     * --------------------------------------------------
     */

    useEffect(() => {
        if (resendCooldown <= 0) {
            return;
        }

        const timer =
            window.setInterval(() => {
                setResendCooldown(
                    (current) =>
                        Math.max(
                            current - 1,
                            0,
                        ),
                );
            }, 1000);

        return () => {
            window.clearInterval(timer);
        };
    }, [resendCooldown]);

    /*
     * --------------------------------------------------
     * Initial focus
     * --------------------------------------------------
     */

    useEffect(() => {
        focusInput(0);
    }, [focusInput]);

    /*
     * --------------------------------------------------
     * Verify OTP
     * --------------------------------------------------
     */

    const verify = useCallback(
        async (
            event?: FormEvent<HTMLFormElement>,
        ) => {
            event?.preventDefault();

            setError("");
            setSuccess("");

            const otpValue =
                otp.join("");

            if (
                otpValue.length !==
                OTP_LENGTH
            ) {
                setError(
                    "Please enter the complete 6-digit OTP.",
                );

                focusInput(0);

                return;
            }

            try {
                const response =
                    await verifyOtp({
                        email,
                        otp: otpValue,
                    }).unwrap();

                setSuccess(
                    response.message ||
                    "Email verified successfully.",
                );

                /*
                 * Give the user a short moment
                 * to see the success message.
                 */
                redirectTimer.current =
                    window.setTimeout(() => {
                        navigate("/login", {
                            replace: true,
                            state: {
                                email,
                                verified: true,
                            },
                        });
                    }, 700);
            } catch (error) {
                const apiError =
                    error as ApiError;

                setError(
                    apiError.data?.message ||
                    "The OTP is invalid or expired. Please try again.",
                );

                setOtp(
                    Array(
                        OTP_LENGTH,
                    ).fill(""),
                );

                focusInput(0);
            }
        },
        [
            email,
            otp,
            verifyOtp,
            navigate,
            focusInput,
        ],
    );

    /*
     * --------------------------------------------------
     * Resend OTP
     * --------------------------------------------------
     */

    const resend = useCallback(
        async () => {
            if (
                resendCooldown > 0 ||
                isLoading
            ) {
                return;
            }

            setOtp(
                Array(
                    OTP_LENGTH,
                ).fill(""),
            );

            focusInput(0);

            await sendVerificationOtp();
        },
        [
            resendCooldown,
            isLoading,
            sendVerificationOtp,
            focusInput,
        ],
    );

    /*
     * --------------------------------------------------
     * Cleanup
     * --------------------------------------------------
     */

    useEffect(() => {
        return () => {
            if (
                redirectTimer.current !== null
            ) {
                window.clearTimeout(
                    redirectTimer.current,
                );
            }
        };
    }, []);

    return {
        otp,
        error,
        success,
        resendCooldown,
        isLoading,
        isSendingOtp,
        isVerifyingOtp,
        inputRefs,
        updateOtp,
        handleKeyDown,
        handlePaste,
        handleSubmit: verify,
        resend,
        focusInput,
    };
}