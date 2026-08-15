import {
    Eye,
    EyeOff,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useLogin } from "../hooks";
import { Button } from "@/components/ui";

export function LoginForm() {
    const {
        form,
        error,
        isLoading,
        showPassword,
        updateField,
        togglePassword,
        submit,
    } = useLogin();

    return (
        <form
            onSubmit={submit}
            className="space-y-5"
            noValidate
        >
            {/* error */}

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
                    htmlFor="login-email"
                    className="mb-2 block text-sm font-medium text-(--vm-text)"
                >
                    Email address
                </label>

                <input
                    id="login-email"
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
                    className="h-12 w-full rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) px-4 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20"
                />
            </div>

            {/* Password */}

            <div>
                <div className="mb-2 flex items-center justify-between">
                    <label
                        htmlFor="login-password"
                        className="text-sm font-medium text-(--vm-text)"
                    >
                        Password
                    </label>

                    <Link
                        to="/forgot-password"
                        className="text-xs font-medium text-(--vm-primary)"
                    >
                        Forgot password?
                    </Link>
                </div>

                <div className="relative">
                    <input
                        id="login-password"
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
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="h-12 w-full rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) px-4 pr-12 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20"
                    />

                    <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-(--vm-muted) hover:text-(--vm-text)"
                    >
                        {showPassword ? (
                            <EyeOff
                                size={18}
                            />
                        ) : (
                            <Eye
                                size={18}
                            />
                        )}
                    </button>
                </div>
            </div>

            {/* Submit */}

            <Button
                type="submit"
                loading={isLoading}
                className="w-full"
            >
                {isLoading
                    ? "Signing in..."
                    : "Continue"}
            </Button>
        </form>
    );
}