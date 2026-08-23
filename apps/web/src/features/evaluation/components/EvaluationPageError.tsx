import { ApiErrorState } from "@/components/ui";

interface EvaluationPageErrorProps {
    message?: string;
    onRetry: () => void;
}

export function EvaluationPageError({
    message,
    onRetry,
}: EvaluationPageErrorProps) {
    return (
        <ApiErrorState
            title="Unable to load evaluations"
            message={
                message ??
                "We couldn't retrieve your evaluation history right now."
            }
            onRetry={onRetry}
            showHome
        />
    );
}