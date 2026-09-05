import { Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import { OtpInput } from "./OtpInput";
import { Button } from "@/components/ui";
import { useResetPassword } from "../hooks";

interface ResetPasswordFormProps {
    identifier: string;
    channel: "EMAIL" | "PHONE";
}

export function ResetPasswordForm({
    identifier,
    channel,
}: ResetPasswordFormProps) {
    const {
        otp,
        inputRefs,
        updateOtp,
        handleKeyDown,
        handlePaste,
        isComplete,
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
    } = useResetPassword({
        identifier,
        channel,
    });

    return (
        <form onSubmit={submit} className="space-y-6" noValidate>
            {/* Error */}
            {error && (
                <div
                    role="alert"
                    className="rounded-(--vm-radius-md) border border-(--vm-danger)/30 bg-(--vm-danger)/10 px-4 py-3 text-sm text-(--vm-danger)"
                >
                    {error}
                </div>
            )}

            {/* OTP */}
            <div>
                <label className="mb-3 block text-sm font-medium text-(--vm-text)">
                    Verification code
                </label>

                <OtpInput
                    value={otp}
                    inputRefs={inputRefs}
                    onChange={updateOtp}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    disabled={isLoading}
                />

                <p className="mt-3 text-center text-xs text-(--vm-muted)">
                    Enter the 6-digit code sent to{" "}
                    <span className="font-medium text-(--vm-text)">
                        {identifier}
                    </span>
                </p>
            </div>

            {/* New Password */}
            <div>
                <label
                    htmlFor="reset-password"
                    className="mb-2 block text-sm font-medium text-(--vm-text)"
                >
                    New password
                </label>

                <div className="relative">
                    <Lock
                        size={18}
                        aria-hidden="true"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-(--vm-muted)"
                    />

                    <input
                        id="reset-password"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(event) => updatePassword(event.target.value)}
                        placeholder="Enter your new password"
                        autoComplete="new-password"
                        className="h-12 w-full rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) px-11 pr-12 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-(--vm-muted) hover:text-(--vm-text)"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {/* Confirm Password */}
            <div>
                <label
                    htmlFor="confirm-reset-password"
                    className="mb-2 block text-sm font-medium text-(--vm-text)"
                >
                    Confirm new password
                </label>

                <div className="relative">
                    <KeyRound
                        size={18}
                        aria-hidden="true"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-(--vm-muted)"
                    />

                    <input
                        id="confirm-reset-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(event) => updateConfirmPassword(event.target.value)}
                        placeholder="Confirm your new password"
                        autoComplete="new-password"
                        className="h-12 w-full rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) px-11 pr-12 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20"
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((current) => !current)}
                        aria-label={
                            showConfirmPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-(--vm-muted) hover:text-(--vm-text)"
                    >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {/* Submit */}
            <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading || !isComplete}
                className="w-full"
            >
                {isLoading ? "Resetting password..." : "Reset password"}
            </Button>
        </form>
    );
}