import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGenerateEvaluationMutation, useGetEvaluationQuery } from "../evaluationApi";

export function useEvaluation() {
    const { interviewId } = useParams<{ interviewId: string }>();
    const navigate = useNavigate();

    const id = Number(interviewId);
    const validInterviewId = Number.isInteger(id) && id > 0;

    const { data, error, isLoading, isError, refetch } = useGetEvaluationQuery(id, {
        skip: !validInterviewId,
    });

    const [generateEvaluation, { isLoading: isGenerating }] = useGenerateEvaluationMutation();

    const evaluation = data?.data;

    /* RTK Query error status check */
    const errorStatus =
        isError && error && typeof error === "object" && "status" in error
            ? error.status
            : undefined;

    const evaluationNotFound = errorStatus === 404;

    const handleGenerate = useCallback(async () => {
        if (!validInterviewId || isGenerating) return;

        try {
            await generateEvaluation(id).unwrap();
            await refetch();
        } catch (error) {
            console.error("Failed to generate evaluation:", error);
        }
    }, [id, validInterviewId, isGenerating, generateEvaluation, refetch]);

    const goToInterviews = useCallback(() => {
        navigate("/dashboard");
    }, [navigate]);

    const goToPractice = useCallback(() => {
        navigate("/practice");
    }, [navigate]);

    return {
        interviewId: id,
        validInterviewId,
        evaluation,
        isLoading,
        isError,
        errorStatus,
        evaluationNotFound,
        isGenerating,
        handleGenerate,
        goToInterviews,
        goToPractice,
    };
}