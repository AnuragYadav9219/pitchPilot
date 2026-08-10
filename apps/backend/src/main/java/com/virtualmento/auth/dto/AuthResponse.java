package com.virtualmento.auth.dto;

import com.virtualmento.user.dto.UserResponse;

public record AuthResponse(

        String accessToken,

        String refreshToken,

        String tokenType,

        long expiresIn,

        UserResponse user

) {
}