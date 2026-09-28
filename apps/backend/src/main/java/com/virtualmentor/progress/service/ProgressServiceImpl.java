package com.virtualmentor.progress.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.evaluation.entity.InterviewEvaluation;
import com.virtualmentor.evaluation.enums.EvaluationStatus;
import com.virtualmentor.evaluation.repository.InterviewEvaluationRepository;
import com.virtualmentor.interview.entity.Interview;
import com.virtualmentor.interview.enums.InterviewStatus;
import com.virtualmentor.interview.repository.InterviewRepository;
import com.virtualmentor.progress.dto.FocusArea;
import com.virtualmentor.progress.dto.GoalProgress;
import com.virtualmentor.progress.dto.InterviewProgressItem;
import com.virtualmentor.progress.dto.ProgressResponse;
import com.virtualmentor.progress.dto.ScoreTrendPoint;
import com.virtualmentor.progress.dto.SkillProgress;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProgressServiceImpl implements ProgressService {

        private static final int WEEKLY_GOAL = 5;

        private final InterviewEvaluationRepository evaluationRepository;
        private final InterviewRepository interviewRepository;

        @Override
        public ProgressResponse getProgress(UUID userId) {

                List<InterviewEvaluation> evaluations = evaluationRepository
                                .findByUserIdAndStatusOrderByCompletedAtDesc(userId, EvaluationStatus.COMPLETED);

                List<Interview> interviews = interviewRepository.findByUserIdOrderByCreatedAtDesc(userId);

                if (evaluations.isEmpty() && interviews.isEmpty()) {
                        return emptyResponse();
                }

                // ================================================================
                // SCORE SUMMARY
                // ================================================================

                double overallScore = latestScore(evaluations, InterviewEvaluation::getOverallScore);
                double previousScore = calculatePreviousOverallScore(evaluations);
                double improvementPercentage = calculateImprovement(previousScore, overallScore);

                double highestScore = evaluations.stream()
                                .map(InterviewEvaluation::getOverallScore)
                                .filter(Objects::nonNull)
                                .mapToDouble(Double::doubleValue)
                                .max()
                                .orElse(0.0);

                // ================================================================
                // INTERVIEW COUNTS
                // ================================================================

                int totalInterviews = interviews.size();

                int completedInterviews = (int) interviews.stream()
                                .filter(this::isCompleted)
                                .count();

                // ================================================================
                // TIME-BASED COUNTS
                // ================================================================

                LocalDate today = LocalDate.now();
                LocalDate weekStart = today.with(DayOfWeek.MONDAY);
                LocalDate weekEnd = weekStart.plusDays(6);
                YearMonth currentMonth = YearMonth.from(today);

                int weeklyInterviews = (int) evaluations.stream()
                                .filter(evaluation -> evaluation.getCompletedAt() != null)
                                .map(InterviewEvaluation::getCompletedAt)
                                .map(LocalDateTime::toLocalDate)
                                .filter(date -> !date.isBefore(weekStart) && !date.isAfter(weekEnd))
                                .count();

                int monthlyInterviews = (int) evaluations.stream()
                                .filter(evaluation -> evaluation.getCompletedAt() != null)
                                .map(InterviewEvaluation::getCompletedAt)
                                .map(LocalDateTime::toLocalDate)
                                .filter(date -> YearMonth.from(date).equals(currentMonth))
                                .count();

                List<SkillProgress> skills = buildSkillProgress(evaluations);

                // ================================================================
                // SCORE TREND
                // ================================================================

                List<ScoreTrendPoint> scoreTrend = evaluations.stream()
                                .filter(evaluation -> evaluation.getCompletedAt() != null)
                                .sorted(Comparator.comparing(InterviewEvaluation::getCompletedAt))
                                .map(evaluation -> new ScoreTrendPoint(
                                                evaluation.getCompletedAt().toLocalDate(),
                                                round(valueOrZero(evaluation.getOverallScore()))))
                                .toList();

                List<InterviewProgressItem> history = buildInterviewHistory(evaluations, userId);

                // ================================================================
                // STRENGTHS / AREAS TO IMPROVE
                // ================================================================

                List<String> strengths = evaluations.isEmpty()
                                ? List.of()
                                : extractLines(evaluations.get(0).getStrengths());

                List<String> areasToImprove = evaluations.isEmpty()
                                ? List.of()
                                : extractLines(evaluations.get(0).getAreasToImprove());

                // ================================================================
                // STREAKS
                // ================================================================

                Set<LocalDate> activityDates = buildActivityDates(evaluations);
                int currentStreak = calculateCurrentStreak(activityDates, today);
                int longestStreak = calculateLongestStreak(activityDates);

                FocusArea focusArea = buildFocusArea(skills, overallScore);

                // ================================================================
                // WEEKLY GOAL
                // ================================================================

                double weeklyPercentage = Math.min(100.0, (weeklyInterviews * 100.0) / WEEKLY_GOAL);

                GoalProgress weeklyGoal = new GoalProgress(
                                weeklyInterviews,
                                WEEKLY_GOAL,
                                round(weeklyPercentage));

                // ================================================================
                // RESPONSE
                // ================================================================

                return new ProgressResponse(
                                round(overallScore),
                                round(previousScore),
                                round(improvementPercentage),

                                totalInterviews,
                                completedInterviews,
                                round(highestScore),

                                currentStreak,
                                longestStreak,

                                weeklyInterviews,
                                monthlyInterviews,

                                skills,
                                scoreTrend,
                                history,

                                strengths,
                                areasToImprove,

                                focusArea,
                                weeklyGoal);
        }

        // ================================================================
        // SKILL PROGRESS
        // ================================================================

        private List<SkillProgress> buildSkillProgress(List<InterviewEvaluation> evaluations) {

                if (evaluations.isEmpty()) {
                        return List.of();
                }

                return List.of(
                                buildSkill(
                                                "Technical",
                                                evaluations,
                                                InterviewEvaluation::getTechnicalScore),
                                buildSkill(
                                                "Communication",
                                                evaluations,
                                                InterviewEvaluation::getCommunicationScore),
                                buildSkill(
                                                "Problem Solving",
                                                evaluations,
                                                InterviewEvaluation::getProblemSolvingScore),
                                buildSkill(
                                                "Confidence",
                                                evaluations,
                                                InterviewEvaluation::getConfidenceScore));
        }

        private SkillProgress buildSkill(
                        String name,
                        List<InterviewEvaluation> evaluations,
                        Function<InterviewEvaluation, Double> extractor) {

                double currentScore = latestScore(evaluations, extractor);

                double previousScore = previousScore(evaluations, extractor);

                return new SkillProgress(
                                name,
                                currentScore,
                                previousScore,
                                calculateImprovement(previousScore, currentScore));
        }

        private double latestScore(
                        List<InterviewEvaluation> evaluations,
                        Function<InterviewEvaluation, Double> extractor) {

                return evaluations.stream()
                                .map(extractor)
                                .filter(Objects::nonNull)
                                .findFirst()
                                .map(this::round)
                                .orElse(0.0);
        }

        private double previousScore(
                        List<InterviewEvaluation> evaluations,
                        Function<InterviewEvaluation, Double> extractor) {

                return evaluations.stream()
                                .skip(1)
                                .map(extractor)
                                .filter(Objects::nonNull)
                                .findFirst()
                                .map(this::round)
                                .orElse(0.0);
        }

        // ================================================================
        // PREVIOUS OVERALL SCORE
        // ================================================================

        private double calculatePreviousOverallScore(List<InterviewEvaluation> evaluations) {

                return evaluations.stream()
                                .skip(1)
                                .map(InterviewEvaluation::getOverallScore)
                                .filter(Objects::nonNull)
                                .findFirst()
                                .map(this::round)
                                .orElse(0.0);
        }

        // ================================================================
        // INTERVIEW HISTORY
        // ================================================================

        private List<InterviewProgressItem> buildInterviewHistory(
                        List<InterviewEvaluation> evaluations,
                        UUID userId) {

                if (evaluations.isEmpty()) {
                        return List.of();
                }

                List<Long> interviewIds = evaluations.stream()
                                .map(InterviewEvaluation::getInterviewId)
                                .filter(Objects::nonNull)
                                .distinct()
                                .toList();

                if (interviewIds.isEmpty()) {
                        return List.of();
                }

                List<Interview> interviews = interviewRepository.findByUserIdAndIdIn(userId, interviewIds);

                Map<Long, Interview> interviewMap = interviews.stream()
                                .collect(Collectors.toMap(Interview::getId, Function.identity()));

                return evaluations.stream()
                                .map(evaluation -> {

                                        Interview interview = interviewMap.get(evaluation.getInterviewId());

                                        if (interview == null) {
                                                return null;
                                        }

                                        return new InterviewProgressItem(
                                                        interview.getId(),
                                                        interview.getRole(),
                                                        round(valueOrZero(evaluation.getOverallScore())),
                                                        interview.getCompletedAt());
                                })
                                .filter(Objects::nonNull)
                                .toList();
        }

        // ================================================================
        // FOCUS AREA
        // ================================================================

        private FocusArea buildFocusArea(
                        List<SkillProgress> skills,
                        double overallScore) {

                if (skills.isEmpty()) {
                        return null;
                }

                SkillProgress weakestSkill = skills.stream()
                                .min(Comparator.comparingDouble(SkillProgress::currentScore))
                                .orElse(null);

                if (weakestSkill == null) {
                        return null;
                }

                double gap = Math.max(0, overallScore - weakestSkill.currentScore());

                return new FocusArea(
                                weakestSkill.name(),
                                weakestSkill.currentScore(),
                                round(gap),
                                buildRecommendation(weakestSkill.name()));
        }

        private String buildRecommendation(String skill) {

                if (skill == null) {
                        return "Practice through more mock interviews.";
                }

                return switch (skill.toLowerCase()) {

                        case "technical" ->
                                "Review core concepts and practice solving technical interview questions.";

                        case "communication" ->
                                "Practice explaining technical concepts clearly and concisely.";

                        case "problem solving" ->
                                "Practice breaking complex problems into smaller, structured steps.";

                        case "confidence" ->
                                "Practice speaking clearly and answering questions without overthinking.";

                        default ->
                                "Practice this skill through more mock interviews.";
                };
        }

        // ================================================================
        // ACTIVITY DATES
        // ================================================================

        private Set<LocalDate> buildActivityDates(List<InterviewEvaluation> evaluations) {

                return evaluations.stream()
                                .map(InterviewEvaluation::getCompletedAt)
                                .filter(Objects::nonNull)
                                .map(LocalDateTime::toLocalDate)
                                .collect(Collectors.toCollection(HashSet::new));
        }

        // ================================================================
        // CURRENT STREAK
        // ================================================================

        private int calculateCurrentStreak(
                        Set<LocalDate> activityDates,
                        LocalDate today) {

                if (activityDates.isEmpty()) {
                        return 0;
                }

                LocalDate startDate;

                if (activityDates.contains(today)) {
                        startDate = today;
                } else if (activityDates.contains(today.minusDays(1))) {
                        startDate = today.minusDays(1);
                } else {
                        return 0;
                }

                int streak = 0;
                LocalDate cursor = startDate;

                while (activityDates.contains(cursor)) {
                        streak++;
                        cursor = cursor.minusDays(1);
                }

                return streak;
        }

        // ================================================================
        // LONGEST STREAK
        // ================================================================

        private int calculateLongestStreak(Set<LocalDate> activityDates) {

                if (activityDates.isEmpty()) {
                        return 0;
                }

                List<LocalDate> sortedDates = activityDates.stream()
                                .sorted()
                                .toList();

                int longest = 1;
                int current = 1;

                for (int i = 1; i < sortedDates.size(); i++) {

                        LocalDate previous = sortedDates.get(i - 1);
                        LocalDate currentDate = sortedDates.get(i);

                        if (previous.plusDays(1).equals(currentDate)) {
                                current++;
                        } else {
                                current = 1;
                        }

                        longest = Math.max(longest, current);
                }

                return longest;
        }

        // ================================================================
        // COMPLETED INTERVIEW
        // ================================================================

        private boolean isCompleted(Interview interview) {

                return interview != null && interview.getStatus() == InterviewStatus.COMPLETED;
        }

        // ================================================================
        // IMPROVEMENT
        // ================================================================

        private double calculateImprovement(double previous, double current) {

                if (previous <= 0) {
                        return 0;
                }

                return round(((current - previous) / previous) * 100);
        }

        // ================================================================
        // STRING EXTRACTION
        // ================================================================

        private List<String> extractLines(String value) {

                if (value == null || value.isBlank()) {
                        return List.of();
                }

                return Arrays.stream(value.split("\\R"))
                                .map(String::trim)
                                .filter(line -> !line.isBlank())
                                .map(this::removeBulletPrefix)
                                .toList();
        }

        private String removeBulletPrefix(String value) {

                return value
                                .replaceFirst("^[-*•]\\s*", "")
                                .trim();
        }

        // ================================================================
        // NULL SAFE SCORE
        // ================================================================

        private double valueOrZero(Double value) {
                return value == null ? 0.0 : value;
        }

        // ================================================================
        // ROUND
        // ================================================================

        private double round(double value) {

                return BigDecimal
                                .valueOf(value)
                                .setScale(1, RoundingMode.HALF_UP)
                                .doubleValue();
        }

        // ================================================================
        // EMPTY RESPONSE
        // ================================================================

        private ProgressResponse emptyResponse() {

                return new ProgressResponse(
                                0.0,
                                0.0,
                                0.0,

                                0,
                                0,
                                0.0,

                                0,
                                0,

                                0,
                                0,

                                List.of(),
                                List.of(),
                                List.of(),

                                List.of(),
                                List.of(),

                                null,

                                new GoalProgress(0, WEEKLY_GOAL, 0.0));
        }
}