package com.virtualmento.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmento.common.response.ApiResponse;

@RestController
public class TestController {

    @GetMapping("/hello")
    public ApiResponse<String> hello() {

        return ApiResponse.ok(
                "Backend is working"
        );

    }

}