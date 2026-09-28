package com.virtualmentor.progress.service;

import java.util.UUID;

import com.virtualmentor.progress.dto.ProgressResponse;

public interface ProgressService {

    ProgressResponse getProgress(UUID userId);
}