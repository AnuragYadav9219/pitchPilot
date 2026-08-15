package com.virtualmento.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmento.common.response.ApiResponse;
import com.virtualmento.common.response.ResponseBuilder;
import com.virtualmento.user.dto.UpdateUserProfileRequest;
import com.virtualmento.user.dto.UserProfileResponse;
import com.virtualmento.user.service.UserProfileService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users/me/profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService profileService;
    private final ResponseBuilder responseBuilder;

    // =========================================================
    // GET PROFILE
    // =========================================================

    @GetMapping
    public ResponseEntity<ApiResponse<UserProfileResponse>> getMyProfile() {

        UserProfileResponse profile = profileService.getMyProfile();

        return responseBuilder.ok(
                "Profile retrieved successfully",
                profile);
    }

    // =========================================================
    // UPDATE PROFILE
    // =========================================================

    @PutMapping
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateMyProfile(
            @Valid @RequestBody UpdateUserProfileRequest request) {

        UserProfileResponse profile = profileService.updateMyProfile(request);

        return responseBuilder.ok(
                "Profile updated successfully",
                profile);
    }
}