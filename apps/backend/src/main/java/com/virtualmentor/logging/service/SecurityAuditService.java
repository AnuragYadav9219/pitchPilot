package com.virtualmentor.logging.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.logging.entity.SecurityAuditLog;
import com.virtualmentor.logging.entity.SecurityEventType;
import com.virtualmentor.logging.repository.SecurityAuditLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SecurityAuditService {

    private final SecurityAuditLogRepository repository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void log(
            SecurityEventType event,
            UUID userId,
            String email,
            String ipAddress,
            String userAgent) {

        SecurityAuditLog auditLog = SecurityAuditLog.builder()
                .eventType(event)
                .userId(userId)
                .email(email)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .build();

        repository.save(auditLog);
    }
}