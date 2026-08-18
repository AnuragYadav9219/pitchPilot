export interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
    emailVerified?: boolean;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface VerifyEmailRequest {
    token: string;
}

export interface ResendVerificationRequest {
    email: string;
}

export interface SendOtpRequest {
    email: string;
    purpose: "EMAIL_VERIFICATION";
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: User;
}

export interface Session {
    id: string;
    [key: string]: unknown;
}