import {
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useRegister } from "../hooks";

export function RegisterForm() {
    const {
        form,
        error,
        isLoading,
        showPassword,
        showConfirmPassword,

        updateField,
        togglePassword,
        toggleConfirmPassword,
        submit,
    } = useRegister();

    return (
        <form
            onSubmit={submit}
            className="space-y-4"
            noValidate
        >
            {error && (
                <div
                    role="alert"
                    className="rounded-(--vm-radius-md) border border-(--vm-danger)/30 bg-(--vm-danger)/10 px-4 py-3 text-sm text-(--vm-danger)"
                >
                    {error}
                </div>
            )}

            <div>
                <label
                    htmlFor="register-name"
                    className="mb-2 block text-sm font-medium text-(--vm-text)"
                >
                    Full name
                </label>

                <input
                    id="register-name"
                    type="text"
                    value={form.fullName}
                    onChange={(event) =>
                        updateField(
                            "fullName",
                            event.target.value,
                        )
                    }
                    placeholder="Your name"
                    autoComplete="name"
                    disabled={isLoading}
                    className="h-12 w-full rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) px-4 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
            </div>

            <div>
                <label
                    htmlFor="register-email"
                    className="mb-2 block text-sm font-medium text-(--vm-text)"
                >
                    Email address
                </label>

                <input
                    id="register-email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                        updateField(
                            "email",
                            event.target.value,
                        )
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isLoading}
                    className="h-12 w-full rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) px-4 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
            </div>

            <div>
                <label
                    htmlFor="register-password"
                    className="mb-2 block text-sm font-medium text-(--vm-text)"
                >
                    Password
                </label>

                <div className="relative">
                    <input
                        id="register-password"
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        value={form.password}
                        onChange={(event) =>
                            updateField(
                                "password",
                                event.target.value,
                            )
                        }
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        disabled={isLoading}
                        className="h-12 w-full rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) px-4 pr-12 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                        type="button"
                        onClick={
                            togglePassword
                        }
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-(--vm-muted) hover:text-(--vm-text)"
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>
            </div>

            <div>
                <label
                    htmlFor="register-confirm-password"
                    className="mb-2 block text-sm font-medium text-(--vm-text)"
                >
                    Confirm password
                </label>

                <div className="relative">
                    <input
                        id="register-confirm-password"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        value={
                            form.confirmPassword
                        }
                        onChange={(event) =>
                            updateField(
                                "confirmPassword",
                                event.target.value,
                            )
                        }
                        placeholder="Repeat your password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        className="h-12 w-full rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) px-4 pr-12 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                        type="button"
                        onClick={
                            toggleConfirmPassword
                        }
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-(--vm-muted) hover:text-(--vm-text)"
                        aria-label={
                            showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>
            </div>

            <label className="flex items-start gap-3 py-2">
                <input
                    type="checkbox"
                    required
                    disabled={isLoading}
                    className="mt-1 accent-(--vm-primary)"
                />

                <span className="text-xs leading-5 text-(--vm-muted)">
                    I agree to the{" "}
                    <Link
                        to="/terms"
                        className="text-(--vm-primary) hover:underline"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        to="/privacy"
                        className="text-(--vm-primary) hover:underline"
                    >
                        Privacy Policy
                    </Link>
                    .
                </span>
            </label>

            <button
                type="submit"
                disabled={isLoading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-(--vm-radius-md) bg-(--vm-primary) text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-px hover:bg-(--vm-primary-pressed) disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading && (
                    <Loader2
                        size={17}
                        className="animate-spin"
                    />
                )}

                {isLoading
                    ? "Creating account..."
                    : "Create account"}
            </button>
        </form>
    );
}

export default RegisterForm;