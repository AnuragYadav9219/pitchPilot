import { useCallback, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../authApi";
import { appToast } from "@/lib/toast";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

interface ApiError {
  data?: {
    message?: string;
    errors?: unknown;
  };
}

export const PENDING_EMAIL_KEY = "virtualmentor.pendingVerificationEmail";

export function useRegister() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = useCallback(
    (field: keyof RegisterFormData, value: string | boolean) => {
      setForm((curr) => ({ ...curr, [field]: value }));
      setError("");
      setSuccess("");
    },
    []
  );

  const togglePassword = useCallback(() => setShowPassword((prev) => !prev), []);
  const toggleConfirmPassword = useCallback(() => setShowConfirmPassword((prev) => !prev), []);

  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError("");
      setSuccess("");

      const fullName = form.fullName.trim();
      const email = form.email.trim().toLowerCase();

      if (!form.acceptedTerms) {
        return setError("You must accept the Terms of Service and Privacy Policy.");
      }
      if (!fullName) return setError("Please enter your full name.");
      if (fullName.length < 2) {
        return setError("Your full name must contain at least 2 characters.");
      }
      if (!email) return setError("Please enter your email address.");
      if (form.password.length < 8) {
        return setError("Your password must contain at least 8 characters.");
      }
      if (form.password !== form.confirmPassword) {
        return setError("Passwords do not match.");
      }

      try {
        await register({
          fullName,
          email,
          password: form.password,
          acceptedTerms: form.acceptedTerms,
        }).unwrap();

        sessionStorage.setItem(PENDING_EMAIL_KEY, email);
        appToast.success("Account created. Please verify your email.");

        navigate("/verify-otp", {
          replace: true,
          state: { email, purpose: "EMAIL_VERIFICATION" },
        });
      } catch (err) {
        const apiError = err as ApiError;
        setError(
          apiError.data?.message || "Unable to create your account right now."
        );
      }
    },
    [form, register, navigate]
  );

  return {
    form,
    error,
    success,
    isLoading,
    showPassword,
    showConfirmPassword,
    updateField,
    togglePassword,
    toggleConfirmPassword,
    submit,
  };
}