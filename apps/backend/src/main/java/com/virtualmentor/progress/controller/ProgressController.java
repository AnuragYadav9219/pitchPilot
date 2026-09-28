package com.virtualmentor.progress.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.security.CurrentUserProvider;
import com.virtualmentor.progress.dto.ProgressResponse;
import com.virtualmentor.progress.service.ProgressService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;
    private final CurrentUserProvider currentUserProvider;

    @GetMapping
    public ProgressResponse getProgress() {

        return progressService.getProgress(currentUserProvider.getUserId());
    }
}