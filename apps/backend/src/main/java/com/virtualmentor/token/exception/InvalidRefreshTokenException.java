package com.virtualmentor.token.exception;

import org.springframework.http.HttpStatus;

import com.virtualmentor.common.exception.ApiException;

public class InvalidRefreshTokenException
        extends ApiException {

    public InvalidRefreshTokenException() {

        super(
                "Invalid or expired refresh token",
                HttpStatus.UNAUTHORIZED);
    }
}