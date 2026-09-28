import { useEvaluation } from "../hooks/useEvaluation";
import {
    EvaluationContent,
    EvaluationError,
    EvaluationFailed,
    EvaluationHeader,
    EvaluationLoading,
    GenerateEvaluationState,
} from "../components";

export default function EvaluationPage() {
    const {
        validInterviewId,
        evaluation,
        isLoading,
        isError,
        evaluationNotFound,
        isGenerating,
        handleGenerate,
        goToInterviews,
        goToPractice,
    } = useEvaluation();

    /* Invalid interview ID */
    if (!validInterviewId) {
        return (
            <EvaluationPageLayout>
                <EvaluationError message="Invalid interview ID." onBack={goToInterviews} />
            </EvaluationPageLayout>
        );
    }

    /* Initial loading */
    if (isLoading) {
        return (
            <EvaluationPageLayout>
                <EvaluationLoading />
            </EvaluationPageLayout>
        );
    }

    /* Evaluation does not exist yet */
    if (evaluationNotFound) {
        return (
            <EvaluationPageLayout>
                <EvaluationHeader onBack={goToInterviews} />
                <GenerateEvaluationState
                    onBack={goToPractice}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                />
            </EvaluationPageLayout>
        );
    }

    /* Failed to fetch evaluation */
    if (isError || !evaluation) {
        return (
            <EvaluationPageLayout>
                <EvaluationError message="Unable to load evaluation." onBack={goToInterviews} />
            </EvaluationPageLayout>
        );
    }

    /* Evaluation is currently being generated */
    if (evaluation.status === "PENDING" || evaluation.status === "EVALUATING") {
        return (
            <EvaluationPageLayout>
                <EvaluationLoading message="Evaluating your interview..." />
            </EvaluationPageLayout>
        );
    }

    /* Evaluation generation failed */
    if (evaluation.status === "FAILED") {
        return (
            <EvaluationPageLayout>
                <EvaluationFailed onRetry={handleGenerate} isGenerating={isGenerating} />
            </EvaluationPageLayout>
        );
    }

    /* Evaluation completed */
    return (
        <EvaluationPageLayout>
            <EvaluationHeader onBack={goToInterviews} />
            <EvaluationContent evaluation={evaluation} />
        </EvaluationPageLayout>
    );
}

/* Page Layout */
interface EvaluationPageLayoutProps {
    children: React.ReactNode;
}

function EvaluationPageLayout({ children }: EvaluationPageLayoutProps) {
    return (
        <main className="min-h-screen bg-(--vm-background) px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">{children}</div>
        </main>
    );
}