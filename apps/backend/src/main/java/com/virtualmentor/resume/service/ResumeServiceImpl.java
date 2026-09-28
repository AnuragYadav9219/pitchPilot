package com.virtualmentor.resume.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.virtualmentor.resume.entity.Resume;
import com.virtualmentor.resume.enums.ResumeStatus;
import com.virtualmentor.resume.repository.ResumeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;

    @Override
    public List<Resume> getUserResumes(UUID userId) {

        return resumeRepository
                .findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public Resume getResume(UUID userId, Long resumeId) {

        return resumeRepository
                .findByIdAndUserId(resumeId, userId)
                .orElseThrow(() -> new RuntimeException(
                        "Resume not found"));
    }

    @Override
    public Resume createResumeRecord(UUID userId, String fileName, String storageKey, String contentType,
            Long fileSize) {

        Resume resume = Resume.builder()
                .userId(userId)
                .fileName(fileName)
                .storageKey(storageKey)
                .contentType(contentType)
                .fileSize(fileSize)
                .status(ResumeStatus.UPLOADED)
                .build();

        return resumeRepository.save(resume);
    }

}
