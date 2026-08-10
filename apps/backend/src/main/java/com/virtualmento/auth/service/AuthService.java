package com.virtualmento.auth.service;

import java.util.List;
import java.util.UUID;

import com.virtualmento.auth.dto.AuthResponse;
import com.virtualmento.common.web.ClientContext;
import com.virtualmento.otp.entity.OtpChannel;
import com.virtualmento.token.dto.SessionResponse;
import com.virtualmento.user.dto.LoginRequest;
import com.virtualmento.user.dto.RegisterRequest;
import com.virtualmento.user.dto.UserResponse;

public interface AuthService {

        UserResponse register(RegisterRequest request);

        AuthResponse login(LoginRequest request, ClientContext clientContext);

        AuthResponse refresh(String rawRefreshToken);

        void logout(String refreshToken);

        void logoutOtherDevices(String currentRefreshToken);

        void logoutAll(UUID userId);

        List<SessionResponse> getSessions(
                        UUID userId,
                        UUID currentSessionId);

        void revokeSession(
                        UUID userId,
                        UUID sessionId);

        void forgotPassword(String identifier, OtpChannel channel);

        void resetPassword(
                        String identifier,
                        OtpChannel channel,
                        String otp,
                        String newPassword);

        void verifyEmail(String token);

        void resendVerificationEmail(String email);
}
