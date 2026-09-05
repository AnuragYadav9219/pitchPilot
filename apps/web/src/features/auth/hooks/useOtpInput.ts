import {
    useCallback,
    useRef,
    useState,
    type ClipboardEvent,
    type KeyboardEvent,
} from "react";

const DEFAULT_LENGTH = 6;

export function useOtpInput(length = DEFAULT_LENGTH) {
    const [otp, setOtp] = useState<string[]>(() =>
        Array(length).fill("")
    );

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const updateOtp = useCallback(
        (index: number, value: string) => {
            const digits = value.replace(/\D/g, "").slice(0, 1);

            setOtp((current) => {
                const next = [...current];
                next[index] = digits;
                return next;
            });

            if (digits && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        },
        [length]
    );

    const handleKeyDown = useCallback(
        (index: number, event: KeyboardEvent<HTMLInputElement>) => {
            if (
                event.key === "Backspace" &&
                !otp[index] &&
                index > 0
            ) {
                inputRefs.current[index - 1]?.focus();
                return;
            }

            if (event.key === "ArrowLeft" && index > 0) {
                inputRefs.current[index - 1]?.focus();
                return;
            }

            if (event.key === "ArrowRight" && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        },
        [otp, length]
    );

    const handlePaste = useCallback(
        (event: ClipboardEvent<HTMLInputElement>) => {
            event.preventDefault();

            const pasted = event.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, length);

            if (!pasted) {
                return;
            }

            const digits = pasted.split("");

            setOtp(
                Array.from(
                    { length },
                    (_, index) => digits[index] ?? ""
                )
            );

            const focusIndex = Math.min(pasted.length, length - 1);
            inputRefs.current[focusIndex]?.focus();
        },
        [length]
    );

    const resetOtp = useCallback(() => {
        setOtp(Array(length).fill(""));
        inputRefs.current[0]?.focus();
    }, [length]);

    const otpValue = otp.join("");

    return {
        otp,
        otpValue,
        isComplete: otpValue.length === length,
        inputRefs,
        updateOtp,
        handleKeyDown,
        handlePaste,
        resetOtp,
    };
}