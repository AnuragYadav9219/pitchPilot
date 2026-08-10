package com.virtualmento.user.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmento.common.response.ApiResponse;
import com.virtualmento.common.response.ResponseBuilder;
import com.virtualmento.user.dto.UserResponse;
import com.virtualmento.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ResponseBuilder responseBuilder;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> me(
            Authentication authentication) {

        UUID userId = UUID.fromString(authentication.getName());

        UserResponse user = userService.getById(userId);

        return responseBuilder.ok(
                "Current user fetched successfully",
                user);
    }
}
