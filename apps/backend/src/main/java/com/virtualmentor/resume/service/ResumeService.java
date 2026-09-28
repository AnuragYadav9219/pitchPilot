package com.virtualmentor.resume.service;

import java.util.List;
import java.util.UUID;

import com.virtualmentor.resume.entity.Resume;

public interface ResumeService {

    List<Resume> getUserResumes(UUID userId);

    Resume getResume(UUID userId, Long resumeId);

    Resume createResumeRecord(
            UUID userId,
            String fileName,
            String storageKey,
            String contentType,
            Long fileSize
    );
}
