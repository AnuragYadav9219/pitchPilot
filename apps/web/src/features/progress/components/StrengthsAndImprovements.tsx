import { CheckCircle2, CircleAlert } from "lucide-react";

interface StrengthsAndImprovementsProps {
    strengths: string[];
    areasToImprove: string[];
}

export default function StrengthsAndImprovements({
    strengths,
    areasToImprove,
}: StrengthsAndImprovementsProps) {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--vm-success)/10 text-(--vm-success)">
                        <CheckCircle2 className="h-4 w-4" />
                    </div>

                    <div>
                        <h2 className="font-semibold text-(--vm-text)">
                            Strengths
                        </h2>

                        <p className="text-xs text-(--vm-muted)">
                            What you're doing well
                        </p>
                    </div>
                </div>

                <div className="mt-5 space-y-2">
                    {strengths.length > 0 ? (
                        strengths.map((strength, index) => (
                            <div
                                key={`${strength}-${index}`}
                                className="flex items-start gap-2.5 rounded-xl bg-(--vm-surface-2) px-3 py-2.5"
                            >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-(--vm-success)" />

                                <span className="text-sm leading-5 text-(--vm-text)">
                                    {strength}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-(--vm-muted)">
                            Complete more interviews to identify your strengths.
                        </p>
                    )}
                </div>
            </section>

            <section className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--vm-accent)/10 text-(--vm-accent)">
                        <CircleAlert className="h-4 w-4" />
                    </div>

                    <div>
                        <h2 className="font-semibold text-(--vm-text)">
                            Areas to improve
                        </h2>

                        <p className="text-xs text-(--vm-muted)">
                            Where you can improve next
                        </p>
                    </div>
                </div>

                <div className="mt-5 space-y-2">
                    {areasToImprove.length > 0 ? (
                        areasToImprove.map((area, index) => (
                            <div
                                key={`${area}-${index}`}
                                className="flex items-start gap-2.5 rounded-xl bg-(--vm-surface-2) px-3 py-2.5"
                            >
                                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-(--vm-accent)" />

                                <span className="text-sm leading-5 text-(--vm-text)">
                                    {area}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-(--vm-muted)">
                            Your next evaluation will provide more improvement insights.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}