import {
    CheckCircle2,
    Lightbulb,
    Target,
} from "lucide-react";

interface EvaluationFeedbackProps {
    strengths: string[];
    improvements: string[];
    recommendation: string | null;
    evaluatorFeedback: string | null;
}

export function EvaluationFeedback({
    strengths,
    improvements,
    recommendation,
    evaluatorFeedback,
}: EvaluationFeedbackProps) {
    return (
        <div className="space-y-4">

            {/* Evaluator feedback */}

            {evaluatorFeedback && (
                <section className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5">
                    <div className="flex items-center gap-2">
                        <Target
                            size={18}
                            className="text-(--vm-primary)"
                        />

                        <h3 className="font-semibold text-(--vm-text)">
                            Overall feedback
                        </h3>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-(--vm-muted)">
                        {evaluatorFeedback}
                    </p>
                </section>
            )}

            <div className="grid gap-4 lg:grid-cols-2">

                {/* Strengths */}

                <section className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5">
                    <div className="flex items-center gap-2">
                        <CheckCircle2
                            size={18}
                            className="text-(--vm-primary)"
                        />

                        <h3 className="font-semibold text-(--vm-text)">
                            Strengths
                        </h3>
                    </div>

                    <div className="mt-4 space-y-3">
                        {strengths.map(
                            (strength, index) => (
                                <div
                                    key={`${strength}-${index}`}
                                    className="flex gap-3 text-sm leading-6 text-(--vm-muted)"
                                >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--vm-primary)" />

                                    <span>
                                        {strength}
                                    </span>
                                </div>
                            ),
                        )}
                    </div>
                </section>

                {/* Improvements */}

                <section className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5">
                    <div className="flex items-center gap-2">
                        <Target
                            size={18}
                            className="text-(--vm-primary)"
                        />

                        <h3 className="font-semibold text-(--vm-text)">
                            Areas to improve
                        </h3>
                    </div>

                    <div className="mt-4 space-y-3">
                        {improvements.map(
                            (improvement, index) => (
                                <div
                                    key={`${improvement}-${index}`}
                                    className="flex gap-3 text-sm leading-6 text-(--vm-muted)"
                                >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--vm-primary)" />

                                    <span>
                                        {improvement}
                                    </span>
                                </div>
                            ),
                        )}
                    </div>
                </section>
            </div>

            {/* Recommendation */}

            {recommendation && (
                <section className="rounded-2xl border border-(--vm-primary)/20 bg-(--vm-primary)/5 p-5">
                    <div className="flex items-center gap-2">
                        <Lightbulb
                            size={18}
                            className="text-(--vm-primary)"
                        />

                        <h3 className="font-semibold text-(--vm-text)">
                            Your next step
                        </h3>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-(--vm-muted)">
                        {recommendation}
                    </p>
                </section>
            )}
        </div>
    );
}