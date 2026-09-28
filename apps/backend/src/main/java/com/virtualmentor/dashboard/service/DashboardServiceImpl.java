package com.virtualmentor.dashboard.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.dashboard.dto.DashboardActivity;
import com.virtualmentor.dashboard.dto.DashboardResponse;
import com.virtualmentor.dashboard.dto.DashboardSkillScore;
import com.virtualmentor.dashboard.dto.DashboardStats;
import com.virtualmentor.dashboard.dto.RecentInterviewResponse;
import com.virtualmentor.evaluation.entity.InterviewEvaluation;
import com.virtualmentor.evaluation.enums.EvaluationStatus;
import com.virtualmentor.evaluation.repository.InterviewEvaluationRepository;
import com.virtualmentor.interview.entity.Interview;
import com.virtualmentor.interview.enums.InterviewStatus;
import com.virtualmentor.interview.repository.InterviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

        private final InterviewRepository interviewRepository;
        private final InterviewEvaluationRepository evaluationRepository;

        @Override
        @Transactional(readOnly = true)
        public DashboardResponse getDashboard(UUID userId) {

                // BASIC INTERVIEW STATS
                long totalInterviews = interviewRepository.countByUserId(userId);

                long completedInterviews = interviewRepository.countByUserIdAndStatus(userId,
                                InterviewStatus.COMPLETED);

                // COMPLETED EVALUATIONS
                List<InterviewEvaluation> evaluations = evaluationRepository
                                .findByUserIdAndStatusOrderByCompletedAtDesc(userId, EvaluationStatus.COMPLETED);

                // SCORE STATS
                double averageScore = calculateAverageScore(evaluations);
                double highestScore = calculateHighestScore(evaluations);

                // ACTIVITY COUNTS
                Map<LocalDate, Integer> activityCounts = extractActivityCounts(evaluations);
                Set<LocalDate> activityDates = activityCounts.keySet();

                // STREAKS
                int currentStreak = calculateCurrentStreak(activityDates);
                int longestStreak = calculateLongestStreak(activityDates);

                // COMPLETION RATE
                double completionRate = calculateCompletionRate(totalInterviews, completedInterviews);

                // TOTAL PRACTICE TIME
                int totalPracticeMinutes = calculatePracticeMinutes(userId);

                // DASHBOARD STATS
                DashboardStats stats = new DashboardStats(
                                totalInterviews,
                                completedInterviews,
                                averageScore,
                                currentStreak,
                                longestStreak,
                                completionRate,
                                highestScore,
                                totalPracticeMinutes);

                // SKILL PERFORMANCE
                List<DashboardSkillScore> skills = calculateSkillScores(evaluations);

                // ACTIVITY HEATMAP
                List<DashboardActivity> activity = buildActivityHeatmap(activityCounts);

                // RECENT INTERVIEWS
                List<Interview> recentInterviews = interviewRepository
                                .findTop5ByUserIdAndStatusOrderByCompletedAtDesc(
                                                userId,
                                                InterviewStatus.COMPLETED);

                // EVALUATION LOOKUP
                Map<Long, InterviewEvaluation> evaluationMap = evaluations.stream()
                                .filter(evaluation -> evaluation.getInterviewId() != null)
                                .collect(
                                                Collectors.toMap(
                                                                InterviewEvaluation::getInterviewId,
                                                                Function.identity(),
                                                                (first, second) -> first));

                // RECENT INTERVIEW RESPONSE
                List<RecentInterviewResponse> recent = recentInterviews.stream()
                                .map(interview -> toRecentInterview(
                                                interview,
                                                evaluationMap))
                                .toList();

                // FINAL RESPONSE
                return new DashboardResponse(
                                stats,
                                skills,
                                activity,
                                recent);
        }

        // ===============================================================
        // ACTIVITY
        // ===============================================================

        private Map<LocalDate, Integer> extractActivityCounts(
                        List<InterviewEvaluation> evaluations) {

                return evaluations.stream()
                                .map(InterviewEvaluation::getCompletedAt)
                                .filter(date -> date != null)
                                .map(LocalDateTime::toLocalDate)
                                .collect(Collectors.groupingBy(
                                                Function.identity(),
                                                Collectors.collectingAndThen(
                                                                Collectors.counting(),
                                                                Long::intValue)));
        }

        /**
         * Creates activity data for the previous 84 days.
         * 84 days = 12 weeks.
         */
        private List<DashboardActivity> buildActivityHeatmap(Map<LocalDate, Integer> activityCounts) {

                LocalDate today = LocalDate.now();

                LocalDate currentWeekStart = today.with(DayOfWeek.MONDAY);

                LocalDate startDate = currentWeekStart.minusWeeks(11);

                LocalDate endDate = currentWeekStart.plusDays(6);

                List<DashboardActivity> activity = new ArrayList<>();

                for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                        int count = activityCounts.getOrDefault(date, 0);

                        activity.add(new DashboardActivity(date, count));
                }

                return activity;
        }

        // ===============================================================
        // CURRENT STREAK
        // ===============================================================

        private int calculateCurrentStreak(Set<LocalDate> activityDates) {

                if (activityDates.isEmpty()) {
                        return 0;
                }

                LocalDate today = LocalDate.now();

                LocalDate currentDate;

                if (activityDates.contains(today)) {

                        currentDate = today;

                } else if (activityDates.contains(today.minusDays(1))) {

                        currentDate = today.minusDays(1);

                } else {

                        return 0;
                }

                int streak = 0;

                while (activityDates.contains(currentDate)) {

                        streak++;
                        currentDate = currentDate.minusDays(1);
                }

                return streak;
        }

        // ===============================================================
        // LONGEST STREAK
        // ===============================================================

        private int calculateLongestStreak(Set<LocalDate> activityDates) {

                if (activityDates.isEmpty()) {
                        return 0;
                }

                List<LocalDate> dates = activityDates.stream()
                                .sorted()
                                .toList();

                int longest = 1;
                int current = 1;

                for (int i = 1; i < dates.size(); i++) {

                        LocalDate previous = dates.get(i - 1);
                        LocalDate currentDate = dates.get(i);

                        /*
                         * Consecutive calendar days.
                         */
                        if (currentDate.equals(previous.plusDays(1))) {

                                current++;
                                longest = Math.max(longest, current);

                        } else {
                                current = 1;
                        }
                }

                return longest;
        }

        // ===============================================================
        // COMPLETION RATE
        // ===============================================================

        private double calculateCompletionRate(long total, long completed) {

                if (total <= 0) {
                        return 0.0;
                }

                return round(((double) completed / total) * 100);
        }

        // ===============================================================
        // PRACTICE TIME
        // ===============================================================

        private int calculatePracticeMinutes(UUID userId) {

                Integer totalMinutes = interviewRepository
                                .sumDurationByUserIdAndStatus(userId, InterviewStatus.COMPLETED);

                return totalMinutes == null
                                ? 0
                                : totalMinutes;
        }

        // ===============================================================
        // SCORE
        // ===============================================================

        private double calculateAverageScore(List<InterviewEvaluation> evaluations) {

                return round(evaluations.stream()
                                .map(InterviewEvaluation::getOverallScore)
                                .filter(this::isValidScore)
                                .mapToDouble(Double::doubleValue)
                                .average()
                                .orElse(0.0));
        }

        private double calculateHighestScore(List<InterviewEvaluation> evaluations) {

                return round(evaluations.stream()
                                .map(InterviewEvaluation::getOverallScore)
                                .filter(this::isValidScore)
                                .mapToDouble(Double::doubleValue)
                                .max()
                                .orElse(0.0));
        }

        // ===============================================================
        // SKILLS
        // ===============================================================

        private List<DashboardSkillScore> calculateSkillScores(List<InterviewEvaluation> evaluations) {

                return List.of(

                                new DashboardSkillScore(
                                                "Technical",
                                                calculateAverage(
                                                                evaluations,
                                                                InterviewEvaluation::getTechnicalScore)),

                                new DashboardSkillScore(
                                                "Communication",
                                                calculateAverage(
                                                                evaluations,
                                                                InterviewEvaluation::getCommunicationScore)),

                                new DashboardSkillScore(
                                                "Problem Solving",
                                                calculateAverage(
                                                                evaluations,
                                                                InterviewEvaluation::getProblemSolvingScore)),

                                new DashboardSkillScore(
                                                "Confidence",
                                                calculateAverage(
                                                                evaluations,
                                                                InterviewEvaluation::getConfidenceScore)));
        }

        private double calculateAverage(
                        List<InterviewEvaluation> evaluations,
                        Function<InterviewEvaluation, Double> extractor) {

                return round(evaluations.stream()
                                .map(extractor)
                                .filter(this::isValidScore)
                                .mapToDouble(Double::doubleValue)
                                .average()
                                .orElse(0.0));
        }

        // ===============================================================
        // RECENT INTERVIEWS
        // ===============================================================

        private RecentInterviewResponse toRecentInterview(
                        Interview interview,
                        Map<Long, InterviewEvaluation> evaluationMap) {

                InterviewEvaluation evaluation = evaluationMap.get(interview.getId());

                double score = evaluation == null
                                ? 0.0
                                : valueOrZero(evaluation.getOverallScore());

                return new RecentInterviewResponse(
                                interview.getId(),
                                interview.getRole(),
                                interview.getType().name(),
                                interview.getDifficulty().name(),
                                round(score),
                                interview.getStatus().name(),
                                interview.getCompletedAt());
        }

        // ===============================================================
        // HELPERS
        // ===============================================================

        private boolean isValidScore(Double score) {

                return score != null
                                && !score.isNaN()
                                && !score.isInfinite();
        }

        private double valueOrZero(Double value) {

                return value == null
                                ? 0.0
                                : value;
        }

        private double round(double value) {

                return BigDecimal
                                .valueOf(value)
                                .setScale(1, RoundingMode.HALF_UP)
                                .doubleValue();
        }
}