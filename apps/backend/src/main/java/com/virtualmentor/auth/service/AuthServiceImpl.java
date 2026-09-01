package com.virtualmentor.auth.service;

import com.virtualmentor.logging.entity.SecurityEventType;
import com.virtualmentor.logging.service.SecurityAuditService;
import com.virtualmentor.notification.exception.EmailNotVerifiedException;
import com.virtualmentor.otp.entity.OtpChannel;
import com.virtualmentor.otp.entity.OtpPurpose;
import com.virtualmentor.otp.exception.InvalidOtpException;
import com.virtualmentor.otp.service.OtpService;

import com.virtualmentor.user.service.UserIdentityService;
import java.util.List;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.auth.dto.AuthResponse;
import com.virtualmentor.auth.security.JwtService;
import com.virtualmentor.auth.verification.EmailVerificationService;
import com.virtualmentor.common.enums.Role;
import com.virtualmentor.common.exception.InvalidCredentialsException;
import com.virtualmentor.common.exception.ResourceAlreadyExistsException;
import com.virtualmentor.common.web.ClientContext;
import com.virtualmentor.common.web.DeviceInfoResolver;
import com.virtualmentor.token.dto.SessionResponse;
import com.virtualmentor.token.service.RefreshTokenService;
import com.virtualmentor.user.dto.LoginRequest;
import com.virtualmentor.user.dto.RegisterRequest;
import com.virtualmentor.user.dto.UserResponse;
import com.virtualmentor.user.entity.User;
import com.virtualmentor.user.mapper.UserMapper;
import com.virtualmentor.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

        private final UserIdentityService userIdentityService;
        private final SecurityAuditService securityAuditService;
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final UserMapper userMapper;

        private final AuthenticationManager authenticationManager;
        private final JwtService jwtService;
        private final OtpService otpService;
        private final RefreshTokenService refreshTokenService;
        private final EmailVerificationService emailVerificationService;

        private final DeviceInfoResolver deviceInfoResolver;

        // =========================================================
        // REGISTER
        // =========================================================

        @Override
        public UserResponse register(RegisterRequest request) {

                String email = request.email();

                if (userRepository.existsByEmail(email)) {
                        throw new ResourceAlreadyExistsException(
                                        "An account with this email already exists");
                }

                User user = User.builder()
                                .fullName(request.fullName())
                                .email(email)
                                .password(passwordEncoder.encode(request.password()))
                                .role(Role.USER)
                                .enabled(true)
                                .build();

                User savedUser = userRepository.save(user);
                emailVerificationService.sendVerificationEmail(user);

                return userMapper.toResponse(savedUser);
        }

        // =========================================================
        // LOGIN
        // =========================================================

        @Override
        @Transactional
        public AuthResponse login(LoginRequest request, ClientContext clientContext) {

                String email = request.email();

                Authentication authentication;

                try {

                        authentication = authenticationManager.authenticate(
                                        UsernamePasswordAuthenticationToken
                                                        .unauthenticated(
                                                                        email,
                                                                        request.password()));

                } catch (AuthenticationException ex) {

                        securityAuditService.log(
                                        SecurityEventType.LOGIN_FAILED,
                                        null,
                                        email,
                                        clientContext.ipAddress(),
                                        clientContext.userAgent());

                        throw new InvalidCredentialsException();
                }

                UserDetails userDetails = (UserDetails) authentication.getPrincipal();

                User user = userRepository
                                .findByEmail(userDetails.getUsername())
                                .orElseThrow(InvalidCredentialsException::new);

                if (!Boolean.TRUE.equals(user.getEnabled())) {

                        securityAuditService.log(
                                        SecurityEventType.LOGIN_FAILED,
                                        user.getId(),
                                        user.getEmail(),
                                        clientContext.ipAddress(),
                                        clientContext.userAgent());

                        throw new InvalidCredentialsException();
                }

                if (!Boolean.TRUE.equals(
                                user.getEmailVerified())) {

                        throw new EmailNotVerifiedException();
                }

                RefreshTokenService.GeneratedRefreshToken refreshToken = refreshTokenService.create(
                                user,
                                deviceInfoResolver.resolveDeviceName(clientContext.userAgent()),
                                clientContext.userAgent(),
                                clientContext.ipAddress());

                String accessToken = jwtService.generateAccessToken(user, refreshToken.id());

                securityAuditService.log(
                                SecurityEventType.LOGIN_SUCCESS,
                                user.getId(),
                                user.getEmail(),
                                clientContext.ipAddress(),
                                clientContext.userAgent());

                return new AuthResponse(
                                accessToken,
                                refreshToken.token(),
                                "Bearer",
                                jwtService.getAccessTokenExpiration(),
                                userMapper.toResponse(user));
        }

        @Override
        @Transactional
        public AuthResponse refresh(String rawRefreshToken) {

                RefreshTokenService.RotatedRefreshToken rotated = refreshTokenService.rotate(rawRefreshToken);

                User user = rotated.user();
                String accessToken = jwtService.generateAccessToken(user, rotated.id());

                return new AuthResponse(
                                accessToken,
                                rotated.token(),
                                "Bearer",
                                jwtService.getAccessTokenExpiration(),
                                userMapper.toResponse(user));
        }

        @Override
        @Transactional
        public void logout(String refreshToken) {

                refreshTokenService.revoke(refreshToken);
        }

        @Override
        @Transactional
        public void logoutAll(UUID userId) {

                refreshTokenService.revokeAllByUserId(userId);
        }

        @Override
        @Transactional
        public void logoutOtherDevices(String currentRefreshToken) {

                refreshTokenService.revokedAllExceptCurrent(currentRefreshToken);
        }

        // =========================================================
        // GET SESSIONS
        // =========================================================

        @Override
        @Transactional(readOnly = true)
        public List<SessionResponse> getSessions(UUID userId, UUID currentSessionId) {

                return refreshTokenService
                                .getActiveSessions(
                                                userId,
                                                currentSessionId);
        }

        // =========================================================
        // REVOKE SESSIONS
        // =========================================================

        @Override
        @Transactional
        public void revokeSession(UUID userId, UUID sessionId) {

                refreshTokenService.revokeSession(
                                userId,
                                sessionId);
        }

        @Override
        @Transactional
        public void verifyEmail(String token) {

                emailVerificationService.verify(token);
        }

        @Override
        public void resendVerificationEmail(String email) {

                userRepository.findByEmail(email)
                                .ifPresent(user -> {
                                        if (!Boolean.TRUE.equals(user.getEmailVerified())) {
                                                emailVerificationService.resendVerificationEmail(user);
                                        }
                                });
        }

        @Override
        public void forgotPassword(String identifier, OtpChannel channel) {

                userIdentityService.findForChannel(identifier, channel)
                                .ifPresent(user -> {
                                        if (!Boolean.TRUE.equals(user.getEnabled())) {
                                                return;
                                        }

                                        otpService.send(
                                                        user,
                                                        OtpPurpose.PASSWORD_RESET,
                                                        channel);

                                        securityAuditService.log(
                                                        SecurityEventType.PASSWORD_RESET_REQUESTED,
                                                        user.getId(),
                                                        user.getEmail(),
                                                        null,
                                                        null);
                                });
        }

        @Override
        public void resetPassword(String identifier, OtpChannel channel, String otp, String newPassword) {

                User user = userIdentityService.findForChannel(identifier, channel)
                                .orElseThrow(InvalidOtpException::new);

                otpService.verify(
                                user,
                                OtpPurpose.PASSWORD_RESET,
                                channel,
                                otp);

                user.setPassword(passwordEncoder.encode(newPassword));

                refreshTokenService.revokeAllByUserId(user.getId());

                securityAuditService.log(
                                SecurityEventType.PASSWORD_RESET_COMPLETED,
                                user.getId(),
                                user.getEmail(),
                                null,
                                null);
        }
}
