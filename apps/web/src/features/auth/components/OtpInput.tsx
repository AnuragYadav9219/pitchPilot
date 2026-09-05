import type {
    ClipboardEvent,
    KeyboardEvent,
} from "react";

interface OtpInputProps {
    value: string[];
    inputRefs: React.MutableRefObject<
        Array<HTMLInputElement | null>
    >;
    onChange: (
        index: number,
        value: string,
    ) => void;
    onKeyDown: (
        index: number,
        event: KeyboardEvent<HTMLInputElement>,
    ) => void;
    onPaste: (
        event: ClipboardEvent<HTMLInputElement>,
    ) => void;
    disabled?: boolean;
    length?: number;
}

export function OtpInput({
    value,
    inputRefs,
    onChange,
    onKeyDown,
    onPaste,
    disabled = false,
    length = 6,
}: OtpInputProps) {
    return (
        <div
            className="flex justify-center gap-2 sm:gap-3"
            aria-label="One-time password"
        >
            {Array.from({
                length,
            }).map((_, index) => (
                <input
                    key={index}
                    id={`otp-${index}`}
                    ref={(element) => {
                        inputRefs.current[
                            index
                        ] = element;
                    }}
                    value={
                        value[index] ?? ""
                    }
                    onChange={(event) =>
                        onChange(
                            index,
                            event.target.value,
                        )
                    }
                    onKeyDown={(event) =>
                        onKeyDown(
                            index,
                            event,
                        )
                    }
                    onPaste={onPaste}
                    inputMode="numeric"
                    maxLength={1}
                    autoComplete={
                        index === 0
                            ? "one-time-code"
                            : "off"
                    }
                    disabled={disabled}
                    aria-label={`OTP digit ${
                        index + 1
                    }`}
                    className="h-12 w-10 rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) text-center text-lg font-semibold text-(--vm-text) outline-none transition-all focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20 disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:w-12"
                />
            ))}
        </div>
    );
}