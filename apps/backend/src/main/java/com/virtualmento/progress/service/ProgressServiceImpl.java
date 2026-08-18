package com.virtualmento.progress.service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.common.security.CurrentUserProvider;
import com.virtualmento.progress.dto.ProgressResponse;
import com.virtualmento.evaluation.entity.EvaluationStatus;
import com.virtualmento.evaluation.entity.SessionEvaluation;
import com.virtualmento.evaluation.repository.SessionEvaluationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProgressServiceImpl implements ProgressService {

    private final SessionEvaluationRepository evaluationRepository;
    private final CurrentUserProvider currentUserProvider;

    @Override
    @Transactional(readOnly = true)
    public ProgressResponse getProgress() {

        UUID userId = currentUserProvider.getUserId();

        List<SessionEvaluation> evaluations = evaluationRepository.findCompletedEvaluations(
                userId,
                EvaluationStatus.COMPLETED);

        if (evaluations.isEmpty()) {
            return emptyProgress();
        }

        SessionEvaluation latest = evaluations.get(evaluations.size() - 1);

        SessionEvaluation previous = evaluations.size() > 1
                ? evaluations.get(evaluations.size() - 2)
                : null;

        Integer currentScore = latest.getOverallScore();

        Integer previousScore = previous == null
                ? null
                : previous.getOverallScore();

        Double change = calculateChange(
                previousScore,
                currentScore);

        ProgressResponse.ScoreSummary overall = new ProgressResponse.ScoreSummary(
                currentScore,
                previousScore,
                change);

        ProgressResponse.SkillScores skills = new ProgressResponse.SkillScores(
                latest.getCommunicationScore(),
                latest.getClarityScore(),
                latest.getConfidenceScore(),
                latest.getRelevanceScore());

        List<ProgressResponse.TrendPoint> trend = buildTrend(evaluations);

        ProgressResponse.SkillInsight strongest = findStrongestSkill(skills);

        ProgressResponse.SkillInsight weakest = findWeakestSkill(skills);

        return new ProgressResponse(
                overall,
                skills,
                trend,
                strongest,
                weakest);
    }

    private List<ProgressResponse.TrendPoint> buildTrend(
            List<SessionEvaluation> evaluations) {

        return java.util.stream.IntStream
                .range(0, evaluations.size())
                .mapToObj(index -> {

                    SessionEvaluation evaluation = evaluations.get(index);

                    return new ProgressResponse.TrendPoint(
                            index + 1,
                            evaluation.getOverallScore(),
                            evaluation.getCompletedAt());
                })
                .toList();
    }

    private ProgressResponse.SkillInsight findStrongestSkill(
            ProgressResponse.SkillScores skills) {

        return List.of(
                new ProgressResponse.SkillInsight(
                        "Communication",
                        skills.communication()),
                new ProgressResponse.SkillInsight(
                        "Clarity",
                        skills.clarity()),
                new ProgressResponse.SkillInsight(
                        "Confidence",
                        skills.confidence()),
                new ProgressResponse.SkillInsight(
                        "Relevance",
                        skills.relevance()))
                .stream()
                .filter(skill -> skill.score() != null)
                .max(Comparator.comparingInt(
                        ProgressResponse.SkillInsight::score))
                .orElse(null);
    }

    private ProgressResponse.SkillInsight findWeakestSkill(
            ProgressResponse.SkillScores skills) {

        return List.of(
                new ProgressResponse.SkillInsight(
                        "Communication",
                        skills.communication()),
                new ProgressResponse.SkillInsight(
                        "Clarity",
                        skills.clarity()),
                new ProgressResponse.SkillInsight(
                        "Confidence",
                        skills.confidence()),
                new ProgressResponse.SkillInsight(
                        "Relevance",
                        skills.relevance()))
                .stream()
                .filter(skill -> skill.score() != null)
                .min(Comparator.comparingInt(
                        ProgressResponse.SkillInsight::score))
                .orElse(null);
    }

    private Double calculateChange(
            Integer previous,
            Integer current) {

        if (previous == null ||
                current == null ||
                previous == 0) {
            return null;
        }

        return Math.round(
                ((current - previous) * 100.0 / previous)
                        * 10.0)
                / 10.0;
    }

    private ProgressResponse emptyProgress() {

        return new ProgressResponse(
                new ProgressResponse.ScoreSummary(
                        null,
                        null,
                        null),
                new ProgressResponse.SkillScores(
                        null,
                        null,
                        null,
                        null),
                List.of(),
                null,
                null);
    }
}