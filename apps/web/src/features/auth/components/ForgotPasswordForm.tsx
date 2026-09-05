import {
    Mail,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import {
    Button,
} from "@/components/ui";
import { useForgotPassword } from "../hooks";

export function ForgotPasswordForm() {
    const {
        form,
        error,
        isLoading,
        updateEmail,
        submit,
    } = useForgotPassword();

    return (
        <form
            onSubmit={submit}
            className="space-y-5"
            noValidate
        >
            {/* Error */}
            {error && (
                <div
                    role="alert"
                    className="rounded-(--vm-radius-md) border border-(--vm-danger)/30 bg-(--vm-danger)/10 px-4 py-3 text-sm text-(--vm-danger)"
                >
                    {error}
                </div>
            )}

            {/* Email */}
            <div>
                <label
                    htmlFor="forgot-password-email"
                    className="mb-2 block text-sm font-medium text-(--vm-text)"
                >
                    Email address
                </label>

                <div className="relative">
                    <Mail
                        size={18}
                        aria-hidden="true"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-(--vm-muted)"
                    />

                    <input
                        id="forgot-password-email"
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                            updateEmail(
                                event.target.value,
                            )
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                        autoFocus
                        className="h-12 w-full rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) pl-11 pr-4 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20"
                    />
                </div>
            </div>

            {/* Submit */}
            <Button
                type="submit"
                loading={isLoading}
                className="w-full"
            >
                {isLoading
                    ? "Sending OTP..."
                    : "Send reset OTP"}
            </Button>

            {/* Back to Login */}
            <p className="text-center text-sm text-(--vm-muted)">
                Remember your password?{" "}

                <Link
                    to="/login"
                    className="font-semibold text-(--vm-primary) transition-colors hover:text-(--vm-primary-pressed)"
                >
                    Sign in
                </Link>
            </p>
        </form>
    );
}