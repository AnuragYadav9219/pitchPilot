import {
    ArrowLeft,
    RotateCcw,
    Sparkles,
} from "lucide-react";

import type { SessionEvaluation } from "../../types";

import { ScoreCircle } from "./ScoreCircle";
import { EvaluationScoreGrid } from "./EvaluationScoreGrid";
import { EvaluationFeedback } from "./EvaluationFeedback";

interface SessionEvaluationCardProps {
    evaluation: SessionEvaluation;
    onPracticeAgain: () => void;
    onBackToHistory: () => void;
}

export function SessionEvaluationCard({
    evaluation,
    onPracticeAgain,
    onBackToHistory,
}: SessionEvaluationCardProps) {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

            {/* Header */}

            <div className="mb-8">
                <button
                    type="button"
                    onClick={onBackToHistory}
                    className="mb-5 inline-flex items-center gap-2 border px-1 rounded-2xl cursor-pointer hover:scale-105 text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                >
                    <ArrowLeft size={15} />
                    Back to history
                </button>

                <div className="flex items-center gap-2 text-(--vm-primary)">
                    <Sparkles size={17} />

                    <span className="text-sm font-medium">
                        Practice evaluation
                    </span>
                </div>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-(--vm-text) sm:text-4xl">
                    Practice Complete
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-(--vm-muted) sm:text-base">
                    Here's how you performed in this practice session.
                </p>
            </div>

            {/* Overall score */}

            <section className="mb-5 rounded-3xl border border-(--vm-border) bg-(--vm-surface) p-6 sm:p-8">
                <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-sm font-medium text-(--vm-muted)">
                        Overall score
                    </p>

                    <div className="mt-5">
                        <ScoreCircle
                            score={
                                evaluation.overallScore ?? 0
                            }
                        />
                    </div>
                </div>
            </section>

            {/* Category scores */}

            <section className="mb-5">
                <h2 className="mb-3 text-lg font-semibold text-(--vm-text)">
                    Performance breakdown
                </h2>

                <EvaluationScoreGrid
                    communication={
                        evaluation.communicationScore ?? 0
                    }
                    clarity={
                        evaluation.clarityScore ?? 0
                    }
                    confidence={
                        evaluation.confidenceScore ?? 0
                    }
                    relevance={
                        evaluation.relevanceScore ?? 0
                    }
                />
            </section>

            {/* Feedback */}

            <section className="mb-8">
                <h2 className="mb-3 text-lg font-semibold text-(--vm-text)">
                    Detailed feedback
                </h2>

                <EvaluationFeedback
                    strengths={
                        evaluation.strengths
                    }
                    improvements={
                        evaluation.improvements
                    }
                    recommendation={
                        evaluation.recommendation
                    }
                    evaluatorFeedback={
                        evaluation.evaluatorFeedback
                    }
                />
            </section>

            {/* Actions */}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onBackToHistory}
                    className="inline-flex cursor-pointer h-11 items-center justify-center rounded-xl border border-(--vm-border) bg-(--vm-surface) px-5 text-sm font-medium text-(--vm-text) transition-colors hover:bg-(--vm-surface-2)"
                >
                    Back to history
                </button>

                <button
                    type="button"
                    onClick={onPracticeAgain}
                    className="inline-flex cursor-pointer h-11 items-center justify-center gap-2 rounded-xl bg-(--vm-primary) px-5 text-sm font-medium text-white transition-colors hover:bg-(--vm-primary-pressed)"
                >
                    <RotateCcw size={16} />
                    Practice Again
                </button>
            </div>
        </div>
    );
}