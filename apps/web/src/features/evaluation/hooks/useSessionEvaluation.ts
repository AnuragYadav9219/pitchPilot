import {
    useGenerateEvaluationMutation,
    useGetEvaluationQuery,
} from "../conversationApi";

export function useSessionEvaluation(
    conversationId: string | null,
) {
    const {
        data,
        isLoading: isLoadingEvaluation,
        isFetching: isFetchingEvaluation,
        error: evaluationError,
    } = useGetEvaluationQuery(
        conversationId ?? "",
        {
            skip: !conversationId,
        },
    );

    const [
        generateEvaluation,
        {
            isLoading: isGenerating,
            error: generateError,
        },
    ] = useGenerateEvaluationMutation();

    async function evaluate() {
        if (!conversationId) {
            throw new Error(
                "Conversation ID is required",
            );
        }

        return generateEvaluation(
            conversationId,
        ).unwrap();
    }

    return {
        evaluation:
            data?.data ?? null,

        isLoadingEvaluation,
        isFetchingEvaluation,

        isGenerating,

        evaluationError,
        generateError,

        evaluate,
    };
}