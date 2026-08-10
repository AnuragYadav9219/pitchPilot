package com.virtualmento.common.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component("virtualMentoResponseBuilder")
public class ResponseBuilder {

    public <T> ResponseEntity<ApiResponse<T>> ok(T data) {

        return ResponseEntity.ok(
                ApiResponse.ok(data));
    }

    public <T> ResponseEntity<ApiResponse<T>> ok(
            String message,
            T data) {

        return ResponseEntity.ok(
                ApiResponse.ok(message, data));
    }

    public <T> ResponseEntity<ApiResponse<T>> created(
            String message,
            T data) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.ok(message, data));
    }

    public ResponseEntity<Void> noContent() {

        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<ApiResponse<Void>> error(
            HttpStatus status,
            String message) {

        return ResponseEntity
                .status(status)
                .body(ApiResponse.fail(message));
    }

    public ResponseEntity<ApiResponse<Void>> error(
            HttpStatus status,
            String message,
            Object errors) {

        return ResponseEntity
                .status(status)
                .body(ApiResponse.fail(message, errors));
    }

    public ResponseEntity<ApiResponse<Void>> badRequest(
            String message) {

        return error(HttpStatus.BAD_REQUEST, message);
    }

    public ResponseEntity<ApiResponse<Void>> unauthorized(
            String message) {

        return error(HttpStatus.UNAUTHORIZED, message);
    }

    public ResponseEntity<ApiResponse<Void>> forbidden(
            String message) {

        return error(HttpStatus.FORBIDDEN, message);
    }

    public ResponseEntity<ApiResponse<Void>> notFound(
            String message) {

        return error(HttpStatus.NOT_FOUND, message);
    }

    public ResponseEntity<ApiResponse<Void>> conflict(
            String message) {

        return error(HttpStatus.CONFLICT, message);
    }

    public ResponseEntity<ApiResponse<Void>> internalServerError(
            String message) {

        return error(
                HttpStatus.INTERNAL_SERVER_ERROR,
                message);
    }
}