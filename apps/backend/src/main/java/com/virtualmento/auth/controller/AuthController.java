package com.virtualmento.auth.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmento.auth.dto.AuthResponse;
import com.virtualmento.auth.dto.ForgotPasswordRequest;
import com.virtualmento.auth.dto.RefreshTokenRequest;
import com.virtualmento.auth.dto.ResendVerificationRequest;
import com.virtualmento.auth.dto.ResetPasswordRequest;
import com.virtualmento.auth.dto.VerifyEmailRequest;
import com.virtualmento.auth.service.AuthService;
import com.virtualmento.common.response.ApiResponse;
import com.virtualmento.common.response.ResponseBuilder;
import com.virtualmento.common.web.ClientContext;
import com.virtualmento.token.dto.SessionResponse;
import com.virtualmento.user.dto.LoginRequest;
import com.virtualmento.user.dto.RegisterRequest;
import com.virtualmento.user.dto.UserResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

        private final AuthService authService;
        private final ResponseBuilder responseBuilder;

        // =========================================================
        // REGISTER
        // =========================================================

        @PostMapping("/register")
        public ResponseEntity<ApiResponse<UserResponse>> register(
                        @Valid @RequestBody RegisterRequest request) {

                UserResponse response = authService.register(request);

                return responseBuilder.created(
                                "Account created successfully",
                                response);
        }

        // =========================================================
        // LOGIN
        // =========================================================

        @PostMapping("/login")
        public ResponseEntity<ApiResponse<AuthResponse>> login(
                        @Valid @RequestBody LoginRequest request,
                        HttpServletRequest httpRequest) {

                ClientContext clientContext = new ClientContext(
                                resolveClientIp(httpRequest),
                                httpRequest.getHeader("User-Agent"));

                AuthResponse response = authService.login(request, clientContext);

                return responseBuilder.ok(
                                "Login successful",
                                response);
        }

        private String resolveClientIp(
                        HttpServletRequest request) {
                return request.getRemoteAddr();
        }

        // =========================================================
        // REFRESH
        // =========================================================

        @PostMapping("/refresh")
        public ResponseEntity<ApiResponse<AuthResponse>> refresh(
                        @Valid @RequestBody RefreshTokenRequest request) {

                AuthResponse authResponse = authService.refresh(request.refreshToken());

                return responseBuilder.ok(
                                "Token refreshed successfully",
                                authResponse);
        }

        // =========================================================
        // LOGOUT CURRENT DEVICE
        // =========================================================

        @PostMapping("/logout")
        public ResponseEntity<ApiResponse<Void>> logout(
                        @Valid @RequestBody RefreshTokenRequest request) {

                authService.logout(request.refreshToken());

                return responseBuilder.ok(
                                "Logged out successfully",
                                null);
        }

        // =========================================================
        // LOGOUT OTHER DEVICE
        // =========================================================

        @PostMapping("/logout-other-devices")
        public ResponseEntity<ApiResponse<Void>> logoutOtherDevices(
                        @Valid @RequestBody RefreshTokenRequest request) {

                authService.logoutOtherDevices(request.refreshToken());

                return responseBuilder.ok(
                                "Logged out from other devices successfully",
                                null);
        }

        // =========================================================
        // LOGOUT ALL DEVICE
        // =========================================================

        @PostMapping("/logout-all")
        public ResponseEntity<ApiResponse<Void>> logoutAll(Authentication authentication) {

                UUID userId = UUID.fromString(authentication.getName());

                authService.logoutAll(userId);

                return responseBuilder.ok(
                                "Logged out from all devices successfully",
                                null);
        }

        // =========================================================
        // GET SESSIONS
        // =========================================================

        @GetMapping("/sessions")
        public ResponseEntity<ApiResponse<List<SessionResponse>>> sessions(
                        Authentication authentication) {

                JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;

                UUID userId = UUID.fromString(
                                jwtAuthenticationToken
                                                .getToken()
                                                .getSubject());

                UUID sessionId = UUID.fromString(
                                jwtAuthenticationToken
                                                .getToken()
                                                .getClaimAsString("sid"));

                List<SessionResponse> sessions = authService.getSessions(
                                userId,
                                sessionId);

                return responseBuilder.ok(
                                "Sessions fetched successfully",
                                sessions);
        }

        // =========================================================
        // REVOKE SPECIFIC SESSION
        // =========================================================

        @DeleteMapping("/sessions/{sessionId}")
        public ResponseEntity<ApiResponse<Void>> revokeSession(
                        @PathVariable UUID sessionId,
                        Authentication authentication) {

                UUID userId = UUID.fromString(
                                authentication.getName());

                authService.revokeSession(
                                userId,
                                sessionId);

                return responseBuilder.ok(
                                "Session revoked successfully",
                                null);
        }

        // =========================================================
        // VERIFY EMAIL
        // =========================================================

        @PostMapping("/verify-email")
        public ResponseEntity<ApiResponse<Void>> verifyEmail(
                        @Valid @RequestBody VerifyEmailRequest request) {

                authService.verifyEmail(request.token());

                return responseBuilder.ok(
                                "Email verified successfully",
                                null);
        }

        // =========================================================
        // RESEND VERIFICATION
        // =========================================================

        @PostMapping("/resend-verification")
        public ResponseEntity<ApiResponse<Void>> resendVerification(
                        @Valid @RequestBody ResendVerificationRequest request) {

                authService.resendVerificationEmail(request.email());

                return responseBuilder.ok(
                                "If the account exists and is not verified, "
                                                + "a verification email has been sent",
                                null);
        }

        // =========================================================
        // FORGOT PASSWORD
        // =========================================================

        @PostMapping("/forgot-password")
        public ResponseEntity<ApiResponse<Void>> forgotPassword(
                        @Valid @RequestBody ForgotPasswordRequest request) {

                authService.forgotPassword(request.identifier(), request.channel());

                return responseBuilder.ok(
                                "If the account exists, a password reset OTP has been sent",
                                null);
        }

        // =========================================================
        // RESET PASSWORD
        // =========================================================

        @PostMapping("/reset-password")
        public ResponseEntity<ApiResponse<Void>> resetPassword(
                        @Valid @RequestBody ResetPasswordRequest request) {

                authService.resetPassword(
                                request.identifier(),
                                request.channel(),
                                request.otp(),
                                request.newPassword());

                return responseBuilder.ok(
                                "Password reset successfully",
                                null);
        }
}