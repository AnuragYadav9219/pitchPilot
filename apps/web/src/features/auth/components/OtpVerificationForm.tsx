import { CheckCircle2, Loader2, Mail, RefreshCw } from "lucide-react";
import { useOtpVerification } from "../hooks";
import { OtpInput } from "./OtpInput";

interface OtpVerificationFormProps {
  email: string;
}

export function OtpVerificationForm({ email }: OtpVerificationFormProps) {
  const {
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
    handleSubmit,
    resend,
  } = useOtpVerification(email);

  return (
    <div className="space-y-6">
      {/* Email */}
      <div className="flex items-center gap-4 rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface-2)/50 p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)/10 text-(--vm-primary)">
          <Mail size={20} aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-(--vm-muted)">
            Verification code sent to
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-(--vm-text)">
            {email}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="rounded-(--vm-radius-md) border border-(--vm-danger)/30 bg-(--vm-danger)/10 px-4 py-3 text-sm text-(--vm-danger)"
        >
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-(--vm-radius-md) border border-(--vm-primary)/30 bg-(--vm-primary)/10 px-4 py-3 text-sm text-(--vm-text)"
        >
          <CheckCircle2
            size={17}
            className="mt-0.5 shrink-0 text-(--vm-primary)"
          />
          <span>{success}</span>
        </div>
      )}

      {/* OTP Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-3 block text-center text-sm font-medium text-(--vm-text)">
            Enter verification code
          </label>

          <OtpInput
            value={otp}
            inputRefs={inputRefs}
            onChange={updateOtp}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || otp.join("").length !== 6}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-(--vm-radius-md) bg-(--vm-primary) text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-px hover:bg-(--vm-primary-pressed) disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isVerifyingOtp && (
            <Loader2 size={17} className="animate-spin" aria-hidden="true" />
          )}
          {isVerifyingOtp ? "Verifying..." : "Verify email"}
        </button>
      </form>

      {/* Resend */}
      <div className="text-center">
        <p className="text-sm text-(--vm-muted)">Didn't receive the code?</p>

        <button
          type="button"
          onClick={resend}
          disabled={resendCooldown > 0 || isLoading}
          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-(--vm-primary) transition-colors hover:text-(--vm-primary-pressed) disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={isSendingOtp ? "animate-spin" : ""}
            aria-hidden="true"
          />
          {resendCooldown > 0
            ? `Resend in ${resendCooldown}s`
            : "Resend code"}
        </button>
      </div>
    </div>
  );
}