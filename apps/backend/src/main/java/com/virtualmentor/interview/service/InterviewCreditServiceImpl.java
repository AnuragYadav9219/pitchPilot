package com.virtualmentor.interview.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.virtualmentor.credit.service.CreditService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewCreditServiceImpl implements InterviewCreditService {

    private static final long INTERVIEW_COST = 1L;
    private final CreditService creditService;

    @Override
    public String reserveCredit(UUID userId, UUID referenceId) {

        String idempotencyKey = "INTERVIEW_RESERVE:" + referenceId;

        creditService.reserve(
                userId,
                INTERVIEW_COST,
                "VOICE_INTERVIEW_RESERVATION",
                referenceId,
                idempotencyKey,
                "Credit reserved for voice interview");

        return idempotencyKey;
    }

    @Override
    public void consumeCredit(UUID userId, UUID referenceId) {

        String idempotencyKey = "INTERVIEW_CONSUME:" + referenceId;

        creditService.consumeReservation(
                userId,
                INTERVIEW_COST,
                "VOICE_INTERVIEW_USAGE",
                referenceId,
                idempotencyKey,
                "Credit consumed for completed voice interview");
    }

    @Override
    public void releaseCredit(UUID userId, UUID referenceId) {

        String idempotencyKey = "INTERVIEW_RELEASE:" + referenceId;

        creditService.releaseReservation(
                userId,
                INTERVIEW_COST,
                "VOICE_INTERVIEW_RELEASE",
                referenceId,
                idempotencyKey,
                "Reserved credit released for voice interview");
    }

}
