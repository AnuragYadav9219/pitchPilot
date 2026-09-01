package com.virtualmentor.auth.dto;

import com.virtualmentor.user.dto.UserResponse;

public record AuthResponse(

                String accessToken,

                String refreshToken,

                String tokenType,

                long expiresIn,

                UserResponse user

) {
}