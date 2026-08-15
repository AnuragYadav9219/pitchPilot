package com.virtualmento.common.exception;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.virtualmento.ai.exception.AiProviderRateLimitException;
import com.virtualmento.ai.exception.AiProviderUnavailableException;
import com.virtualmento.common.response.ApiResponse;
import com.virtualmento.common.response.ResponseBuilder;
import com.virtualmento.notification.exception.EmailNotVerifiedException;
import com.virtualmento.notification.exception.InvalidEmailVerificationTokenException;
import com.virtualmento.otp.exception.InvalidOtpException;
import com.virtualmento.otp.exception.OtpExpiredException;
import com.virtualmento.otp.exception.OtpLockedException;
import com.virtualmento.otp.exception.OtpRateLimitException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

        private final ResponseBuilder responseBuilder;

        /**
         * Handles application-level exceptions.
         */
        @ExceptionHandler(ApiException.class)
        public ResponseEntity<ApiResponse<Void>> handleApiException(
                        ApiException ex) {

                return responseBuilder.error(
                                ex.getStatus(),
                                ex.getMessage());
        }

        /**
         * Handles @Valid validation errors.
         */
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ApiResponse<Void>> handleValidation(
                        MethodArgumentNotValidException ex) {

                Map<String, String> errors = new LinkedHashMap<>();

                ex.getBindingResult()
                                .getFieldErrors()
                                .forEach(error -> errors.put(
                                                error.getField(),
                                                error.getDefaultMessage()));

                return responseBuilder.error(
                                HttpStatus.BAD_REQUEST,
                                "Validation failed",
                                errors);
        }

        /**
         * Handles unexpected exceptions.
         *
         * Never expose the actual exception message
         * to the client.
         */
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ApiResponse<Void>> handleException(
                        Exception ex) {

                log.error(
                                "Unexpected application error",
                                ex);

                return responseBuilder.error(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                "An unexpected error occurred");
        }

        @ExceptionHandler(InvalidEmailVerificationTokenException.class)
        public ResponseEntity<ApiResponse<Void>> handleInvalidEmailVerificationToken(
                        InvalidEmailVerificationTokenException ex) {

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(
                                                ApiResponse.fail(
                                                                ex.getMessage(),
                                                                null));
        }

        @ExceptionHandler(EmailNotVerifiedException.class)
        public ResponseEntity<ApiResponse<Void>> handleEmailNotVerified(
                        EmailNotVerifiedException ex) {

                return ResponseEntity
                                .status(HttpStatus.FORBIDDEN)
                                .body(
                                                ApiResponse.fail(
                                                                ex.getMessage(),
                                                                null));
        }

        @ExceptionHandler(InvalidOtpException.class)
        public ResponseEntity<ApiResponse<Void>> handleInvalidOtp(InvalidOtpException ex) {

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(ApiResponse.fail(
                                                ex.getMessage(),
                                                null));
        }

        @ExceptionHandler(OtpExpiredException.class)
        public ResponseEntity<ApiResponse<Void>> handleOtpExpired(OtpExpiredException ex) {

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(ApiResponse.fail(
                                                ex.getMessage(),
                                                null));
        }

        @ExceptionHandler(OtpLockedException.class)
        public ResponseEntity<ApiResponse<Void>> handleOtpLocked(
                        OtpLockedException ex) {

                return ResponseEntity
                                .status(HttpStatus.TOO_MANY_REQUESTS)
                                .body(
                                                ApiResponse.fail(
                                                                ex.getMessage(),
                                                                null));
        }

        @ExceptionHandler(OtpRateLimitException.class)
        public ResponseEntity<ApiResponse<Void>> handleOtpRateLimit(
                        OtpRateLimitException ex) {

                return ResponseEntity
                                .status(HttpStatus.TOO_MANY_REQUESTS)
                                .body(
                                                ApiResponse.fail(
                                                                ex.getMessage(),
                                                                null));
        }

        @ExceptionHandler(AiProviderRateLimitException.class)
        public ResponseEntity<ApiResponse<Void>> handleAiRateLimit(AiProviderRateLimitException ex) {

                return ResponseEntity
                                .status(HttpStatus.TOO_MANY_REQUESTS)
                                .body(ApiResponse.fail(
                                                "AI service is temporarily busy. Please try again.",
                                                null));
        }

        @ExceptionHandler(AiProviderUnavailableException.class)
        public ResponseEntity<ApiResponse<Void>> handleAiUnavailable(AiProviderUnavailableException ex) {

                return ResponseEntity
                                .status(HttpStatus.SERVICE_UNAVAILABLE)
                                .body(ApiResponse.fail(
                                                "AI service is temporarily unavailable. Please try again later.",
                                                null));
        }
}