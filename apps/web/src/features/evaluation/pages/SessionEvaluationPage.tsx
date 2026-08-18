import { LoaderCircle, Sparkles, RefreshCw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useGenerateEvaluationMutation,
    useGetEvaluationQuery,
} from "../../conversation/conversationApi";
import { Brand } from "@virtualmento/shared";
import { SessionEvaluationCard } from "../components/SessionEvaluationCard";

export default function SessionEvaluationPage() {
    const { conversationId } = useParams<{ conversationId: string }>();
    const navigate = useNavigate();

    const [generateEvaluation, { isLoading: isGenerating, error: generationError }] =
        useGenerateEvaluationMutation();

    const {
        data,
        isLoading,
        isFetching,
        error: evaluationError,
    } = useGetEvaluationQuery(conversationId ?? "", {
        skip: !conversationId,
    });

    const handleGenerate = async () => {
        if (!conversationId) return;

        try {
            console.log("Generating evaluation:", conversationId);
            const response = await generateEvaluation(conversationId).unwrap();
            console.log("Evaluation generated:", response);
        } catch (error) {
            console.error("Evaluation generation failed:", error);
        }
    };

    const handlePracticeAgain = () => navigate("/scenarios");
    const handleHistory = () => navigate("/history");

    // 1. Invalid ID Guard
    if (!conversationId) {
        return <EvaluationError message="Conversation not found." onBack={handleHistory} />;
    }

    // 2. Loading Guards
    if (isGenerating || isLoading || isFetching) {
        return <EvaluationLoading />;
    }

    // 3. Generation Error Guard
    if (generationError) {
        return (
            <EvaluationError
                title="Evaluation failed"
                message={getApiErrorMessage(generationError)}
                onBack={handleHistory}
                onRetry={handleGenerate}
            />
        );
    }

    const evaluation = data?.data;

    // 4. Evaluation Status Guards
    if (evaluation) {
        if (evaluation.status === "PROCESSING") {
            return <EvaluationProcessing />;
        }

        if (evaluation.status === "FAILED") {
            return (
                <EvaluationError
                    title="Evaluation failed"
                    message={`${Brand.name} could not complete the evaluation for this session.`}
                    onBack={handleHistory}
                    onRetry={handleGenerate}
                />
            );
        }

        if (evaluation.status === "COMPLETED") {
            return (
                <SessionEvaluationCard
                    evaluation={evaluation}
                    onPracticeAgain={handlePracticeAgain}
                    onBackToHistory={handleHistory}
                />
            );
        }
    }

    // 5. Not Found / Ready Guard
    if (isEvaluationNotFoundError(evaluationError)) {
        return <EvaluationReady onGenerate={handleGenerate} onBack={handleHistory} />;
    }

    // 6. Unknown API Error Guard
    if (evaluationError) {
        return (
            <EvaluationError
                title="Unable to load evaluation"
                message={getApiErrorMessage(evaluationError)}
                onBack={handleHistory}
                onRetry={() => window.location.reload()}
            />
        );
    }

    // Default Fallback State
    return <EvaluationReady onGenerate={handleGenerate} onBack={handleHistory} />;
}

/* =============================================================
 * ERROR HELPERS & UTILITIES
 * ============================================================= */

interface ApiErrorShape {
    status?: number | string;
    data?: {
        message?: string;
        error?: string;
    };
}

function isEvaluationNotFoundError(error: unknown): boolean {
    if (!error || typeof error !== "object") return false;
    const apiError = error as ApiErrorShape;
    return apiError.status === 404 || apiError.status === 400;
}

function getApiErrorMessage(error: unknown): string {
    if (!error || typeof error !== "object") {
        return "Something went wrong while evaluating this session.";
    }

    const apiError = error as ApiErrorShape;

    if (apiError.data?.message) return apiError.data.message;
    if (apiError.data?.error) return apiError.data.error;

    switch (apiError.status) {
        case 400:
            return "The practice session could not be evaluated. Make sure the session contains completed messages.";
        case 401:
            return "Your session has expired. Please sign in again.";
        case 404:
            return "The conversation could not be found.";
        default:
            return typeof apiError.status === "number"
                ? `Evaluation request failed with status ${apiError.status}.`
                : "Something went wrong while evaluating this session.";
    }
}

/* =============================================================
 * SUB-COMPONENTS
 * ============================================================= */

function EvaluationLoading() {
    return (
        <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-3xl border border-(--vm-border) bg-(--vm-surface) p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <LoaderCircle size={25} className="animate-spin" />
                </div>
                <h1 className="mt-5 text-xl font-semibold text-(--vm-text)">
                    Preparing your evaluation
                </h1>
                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    {Brand.name} is analyzing your practice session.
                </p>
                <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-(--vm-surface-2)">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-(--vm-primary)" />
                </div>
            </div>
        </div>
    );
}

function EvaluationProcessing() {
    return (
        <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-3xl border border-(--vm-border) bg-(--vm-surface) p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <LoaderCircle size={25} className="animate-spin" />
                </div>
                <h1 className="mt-5 text-xl font-semibold text-(--vm-text)">
                    Evaluation in progress
                </h1>
                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    {Brand.name} is analyzing your communication, clarity, confidence, and relevance.
                </p>
            </div>
        </div>
    );
}

interface EvaluationErrorProps {
    title?: string;
    message: string;
    onBack: () => void;
    onRetry?: () => void;
}

function EvaluationError({
    title = "Evaluation unavailable",
    message,
    onBack,
    onRetry,
}: EvaluationErrorProps) {
    return (
        <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-3xl border border-(--vm-border) bg-(--vm-surface) p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-danger)/10 text-(--vm-danger)">
                    <Sparkles size={24} />
                </div>
                <h1 className="mt-5 text-xl font-semibold text-(--vm-text)">{title}</h1>
                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">{message}</p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    {onRetry && (
                        <button
                            type="button"
                            onClick={onRetry}
                            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--vm-primary) px-5 text-sm font-medium text-white transition-colors hover:bg-(--vm-primary-pressed)"
                        >
                            <RefreshCw size={15} />
                            Try again
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onBack}
                        className="h-11 cursor-pointer rounded-xl border border-(--vm-border) bg-(--vm-surface) px-5 text-sm font-medium text-(--vm-text) transition-colors hover:bg-(--vm-surface-2)"
                    >
                        Back to history
                    </button>
                </div>
            </div>
        </div>
    );
}

interface EvaluationReadyProps {
    onGenerate: () => void;
    onBack: () => void;
}

function EvaluationReady({ onGenerate, onBack }: EvaluationReadyProps) {
    return (
        <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-3xl border border-(--vm-border) bg-(--vm-surface) p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <Sparkles size={24} />
                </div>
                <h1 className="mt-5 text-xl font-semibold text-(--vm-text)">
                    Ready for your evaluation?
                </h1>
                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    We'll analyze your practice session and provide actionable feedback.
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <button
                        type="button"
                        onClick={onGenerate}
                        className="h-11 cursor-pointer rounded-xl bg-(--vm-primary) px-5 text-sm font-medium text-white transition-colors hover:bg-(--vm-primary-pressed)"
                    >
                        Evaluate session
                    </button>
                    <button
                        type="button"
                        onClick={onBack}
                        className="h-11 cursor-pointer rounded-xl border border-(--vm-border) px-5 text-sm font-medium text-(--vm-text) transition-colors hover:bg-(--vm-surface-2)"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}