package com.virtualmento.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmento.common.response.ApiResponse;
import com.virtualmento.common.response.ResponseBuilder;
import com.virtualmento.user.dto.UpdateUserRequest;
import com.virtualmento.user.dto.UserResponse;
import com.virtualmento.user.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ResponseBuilder responseBuilder;

    // =========================================================
    // CURRENT USER
    // =========================================================

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> me() {

        return responseBuilder.ok(
                "User profile fetched successfully",
                userService.getCurrentUser());
    }

    // =========================================================
    // UPDATE CURRENT USER
    // =========================================================

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> update(
            @Valid @RequestBody UpdateUserRequest request) {

        return responseBuilder.ok(
                "User profile updated successfully",
                userService.updateCurrentUser(request));
    }
}
