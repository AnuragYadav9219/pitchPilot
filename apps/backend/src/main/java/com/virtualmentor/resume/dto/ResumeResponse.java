package com.virtualmentor.resume.dto;

import com.virtualmentor.resume.enums.ResumeStatus;

import java.time.LocalDateTime;

public record ResumeResponse(

        Long id,

        String fileName,

        String contentType,

        Long fileSize,

        ResumeStatus status,

        LocalDateTime createdAt,

        LocalDateTime updatedAt

) {
}