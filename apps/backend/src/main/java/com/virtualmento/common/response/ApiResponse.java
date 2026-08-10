package com.virtualmento.common.response;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(

                boolean success,
                String message,
                T data,
                Object errors,
                Instant timestamp) {

        public static <T> ApiResponse<T> ok(T data) {
                return ApiResponse.<T>builder()
                                .success(true)
                                .message("Success")
                                .data(data)
                                .timestamp(Instant.now())
                                .build();
        }

        public static <T> ApiResponse<T> ok(
                        String message,
                        T data) {
                return ApiResponse.<T>builder()
                                .success(true)
                                .message(message)
                                .data(data)
                                .timestamp(Instant.now())
                                .build();
        }

        public static ApiResponse<Void> fail(String message) {
                return ApiResponse.<Void>builder()
                                .success(false)
                                .message(message)
                                .timestamp(Instant.now())
                                .build();
        }

        public static ApiResponse<Void> fail(
                        String message,
                        Object errors) {
                return ApiResponse.<Void>builder()
                                .success(false)
                                .message(message)
                                .errors(errors)
                                .timestamp(Instant.now())
                                .build();
        }
}