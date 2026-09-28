package com.virtualmentor.voice.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.ai.context.InterviewAiContext;
import com.virtualmentor.ai.context.InterviewContextService;
import com.virtualmentor.ai.context.InterviewPromptBuilder;
import com.virtualmentor.billing.entity.Feature;
import com.virtualmentor.billing.service.FeatureAccessService;
import com.virtualmentor.interview.entity.Interview;
import com.virtualmentor.interview.enums.InterviewStatus;
import com.virtualmentor.interview.repository.InterviewRepository;
import com.virtualmentor.voice.model.VoiceSessionRequest;
import com.virtualmentor.voice.model.VoiceSessionResponse;
import com.virtualmentor.voice.provider.VoiceProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VoiceSessionServiceImpl implements VoiceSessionService {

        private final InterviewRepository interviewRepository;
        private final InterviewContextService contextService;
        private final InterviewPromptBuilder promptBuilder;
        private final VoiceProvider voiceProvider;
        private final FeatureAccessService featureAccessService;

        @Override
        @Transactional
        public VoiceSessionResponse createSession(Long interviewId, UUID userId) {

                Interview interview = interviewRepository
                                .findByIdAndUserId(interviewId, userId)
                                .orElseThrow(() -> new IllegalArgumentException("Interview not found"));

                validateInterview(interview);

                boolean creditReserved = interview.getStatus() == InterviewStatus.CREDIT_RESERVED;

                try {

                        InterviewAiContext context = contextService.build(interviewId, userId);

                        String systemInstruction = promptBuilder.build(context);

                        VoiceSessionResponse response = voiceProvider
                                        .createSession(new VoiceSessionRequest(interviewId, systemInstruction));

                        if (creditReserved) {
                                interview.setStatus(InterviewStatus.IN_PROGRESS);
                                interview.setStartedAt(LocalDateTime.now());
                        }

                        interview.setVoiceProvider(response.provider());

                        interviewRepository.save(interview);

                        return response;

                } catch (RuntimeException ex) {

                        if (creditReserved) {

                                featureAccessService.cancel(userId, Feature.VOICE_INTERVIEW, interview.getBillingReferenceId());

                                interview.setStatus(InterviewStatus.FAILED);

                                interviewRepository.save(interview);
                        }

                        throw ex;
                }
        }

        private void validateInterview(Interview interview) {

                InterviewStatus status = interview.getStatus();

                if (status == InterviewStatus.CREDIT_RESERVED) {
                        return;
                }

                if (status == InterviewStatus.IN_PROGRESS) {
                        return;
                }

                throw new IllegalStateException("Interview cannot be started from status: " + status);
        }
}