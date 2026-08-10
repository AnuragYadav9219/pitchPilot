import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface LoginFormData {
    email: string;
    password: string;
}

export function LoginForm() {
    const [form, setForm] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function updateField(
        field: keyof LoginFormData,
        value: string,
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        if (error) {
            setError("");
        }
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError("");

        if (!form.email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        if (!form.password) {
            setError("Please enter your password.");
            return;
        }

        setLoading(true);

        try {
            /*
             * Backend authentication will be connected here.
             *
             * Example later:
             *
             * await login({
             *     email: form.email,
             *     password: form.password,
             * });
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 800),
            );

            console.log("Login:", form);
        } catch {
            setError(
                "Unable to sign in right now. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
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
                    className={[
                        "h-12 w-full rounded-(--vm-radius-md)",
                        "border border-(--vm-border)",
                        "bg-(--vm-surface)",
                        "px-4 text-sm text-(--vm-text)",
                        "outline-none",
                        "placeholder:text-(--vm-muted)",
                        "transition-all",
                        "focus:border-(--vm-primary)",
                        "focus:ring-2 focus:ring-(--vm-primary)/20",
                    ].join(" ")}
                />
            </div>

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
                        className="text-xs font-medium text-(--vm-primary) transition-colors hover:text-(--vm-primary-pressed)"
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
                        className={[
                            "h-12 w-full rounded-(--vm-radius-md)",
                            "border border-(--vm-border)",
                            "bg-(--vm-surface)",
                            "px-4 pr-12 text-sm text-(--vm-text)",
                            "outline-none",
                            "placeholder:text-(--vm-muted)",
                            "transition-all",
                            "focus:border-(--vm-primary)",
                            "focus:ring-2 focus:ring-(--vm-primary)/20",
                        ].join(" ")}
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(
                                (current) => !current,
                            )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showPassword ? (
                            <EyeOff
                                size={18}
                                aria-hidden="true"
                            />
                        ) : (
                            <Eye
                                size={18}
                                aria-hidden="true"
                            />
                        )}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={[
                    "flex h-12 w-full items-center justify-center gap-2",
                    "rounded-(--vm-radius-md)",
                    "bg-(--vm-primary)",
                    "text-sm font-semibold text-white",
                    "shadow-lg",
                    "transition-all duration-(--vm-animation-fast)",
                    "hover:bg-(--vm-primary-pressed)",
                    "hover:-translate-y-px",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                ].join(" ")}
            >
                {loading && (
                    <Loader2
                        size={17}
                        className="animate-spin"
                        aria-hidden="true"
                    />
                )}

                {loading
                    ? "Signing in..."
                    : "Continue"}
            </button>
        </form>
    );
}