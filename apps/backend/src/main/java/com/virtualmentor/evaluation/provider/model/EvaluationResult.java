package com.virtualmentor.evaluation.provider.model;

import java.util.List;

public record EvaluationResult(

                double overallScore,

                double technicalScore,

                double communicationScore,

                double problemSolvingScore,

                double confidenceScore,

                String summary,

                List<String> strengths,

                List<String> areasToImprove,

                List<String> recommendations,

                List<QuestionEvaluation> questions) {
}