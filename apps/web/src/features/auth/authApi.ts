import { baseApi } from "@/services/baseApi";

import {
    clearCredentials
} from "./authSlice";

import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    RefreshTokenRequest,
    ResendVerificationRequest,
    VerifyEmailRequest,
    User,
    SendOtpRequest,
    VerifyOtpRequest,
} from "./types";
import type { ApiResponse } from "@/services/types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<ApiResponse<User>, RegisterRequest>({
            query: (body) => ({
                url: "/api/auth/register",
                method: "POST",
                body,
            }),
        }),

        login: builder.mutation<ApiResponse<AuthResponse>, LoginRequest>({
            query: (body) => ({
                url: "/api/auth/login",
                method: "POST",
                body,
            }),
        }),

        refresh: builder.mutation<ApiResponse<AuthResponse>, RefreshTokenRequest>({
            query: (body) => ({
                url: "/api/auth/refresh",
                method: "POST",
                body,
            }),
        }),

        sendOtp: builder.mutation<ApiResponse<null>, SendOtpRequest>({
            query: (body) => ({
                url: "/api/otp/send",
                method: "POST",
                body,
            }),
        }),

        verifyOtp: builder.mutation<ApiResponse<null>, VerifyOtpRequest>({
            query: (body) => ({
                url: "/api/otp/verify",
                method: "POST",
                body,
            }),
        }),

        logout: builder.mutation<ApiResponse<null>, RefreshTokenRequest>({
            query: (body) => ({
                url: "/api/auth/logout",
                method: "POST",
                body,
            }),

            async onQueryStarted(
                _arg,
                { dispatch, queryFulfilled }
            ) {
                try {
                    await queryFulfilled;
                } finally {
                    dispatch(clearCredentials());
                    dispatch(baseApi.util.resetApiState());
                }
            },
        }),

        verifyEmail: builder.mutation<ApiResponse<null>, VerifyEmailRequest>({
            query: (body) => ({
                url: "/api/auth/verify-email",
                method: "POST",
                body,
            }),
        }),

        resendVerification: builder.mutation<ApiResponse<null>, ResendVerificationRequest>({
            query: (body) => ({
                url: "/api/auth/resend-verification",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useRefreshMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useLogoutMutation,
    useVerifyEmailMutation,
    useResendVerificationMutation,
} = authApi;