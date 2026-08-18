package com.virtualmento.recommendation.service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.common.security.CurrentUserProvider;
import com.virtualmento.evaluation.entity.EvaluationStatus;
import com.virtualmento.evaluation.entity.SessionEvaluation;
import com.virtualmento.evaluation.repository.SessionEvaluationRepository;
import com.virtualmento.recommendation.dto.RecommendationResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl
        implements RecommendationService {

    private final SessionEvaluationRepository evaluationRepository;
    private final CurrentUserProvider currentUserProvider;

    @Override
    @Transactional(readOnly = true)
    public RecommendationResponse getRecommendation() {

        UUID userId = currentUserProvider.getUserId();

        List<SessionEvaluation> evaluations = evaluationRepository.findUserEvaluations(
                userId,
                EvaluationStatus.COMPLETED);

        if (evaluations.isEmpty()) {
            return noRecommendation();
        }

        SessionEvaluation evaluation = evaluations.get(0);

        SkillScore weakestSkill = findWeakestSkill(evaluation);

        return new RecommendationResponse(
                true,
                weakestSkill.name(),
                weakestSkill.score(),
                buildReason(
                        weakestSkill.name(),
                        weakestSkill.score()));
    }

    private SkillScore findWeakestSkill(
            SessionEvaluation evaluation) {

        return List.of(
                new SkillScore(
                        "CONFIDENCE",
                        evaluation.getConfidenceScore()),

                new SkillScore(
                        "CLARITY",
                        evaluation.getClarityScore()),

                new SkillScore(
                        "COMMUNICATION",
                        evaluation.getCommunicationScore()),

                new SkillScore(
                        "RELEVANCE",
                        evaluation.getRelevanceScore()))
                .stream()
                .filter(skill -> skill.score() != null)
                .min(
                        Comparator.comparingInt(
                                SkillScore::score))
                .orElseGet(() -> new SkillScore(
                        "GENERAL",
                        evaluation.getOverallScore()));
    }

    private String buildReason(
            String skill,
            Integer score) {

        String readableSkill = skill.toLowerCase()
                .replace("_", " ");

        return String.format(
                "Your %s score is %d. "
                        + "This practice is designed to help you improve it.",
                readableSkill,
                score);
    }

    private RecommendationResponse noRecommendation() {

        return new RecommendationResponse(
                false,
                null,
                null,
                "Complete a practice session "
                        + "to receive a personalized recommendation.");
    }

    private record SkillScore(
            String name,
            Integer score) {
    }
}