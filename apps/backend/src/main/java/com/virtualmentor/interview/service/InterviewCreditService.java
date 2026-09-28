package com.virtualmentor.interview.service;

import java.util.UUID;

public interface InterviewCreditService {

    String reserveCredit(
            UUID userId,
            UUID referenceId);

    void consumeCredit(
            UUID userId,
            UUID referenceId);

    void releaseCredit(
            UUID userId,
            UUID referenceId);
}