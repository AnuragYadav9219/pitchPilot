import { CheckCircle2, Sparkles, Trophy } from "lucide-react";

import { Button, Card } from "@/components/ui";

interface FinishDialogProps {
    onCancel: () => void;
    onConfirm: () => void;
}

export function FinishDialog({
    onCancel,
    onConfirm,
}: FinishDialogProps) {
    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="finish-dialog-title"
        >
            <Card className="w-full max-w-md p-6 shadow-2xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <Trophy size={22} />
                </div>

                <h2
                    id="finish-dialog-title"
                    className="mt-5 text-lg font-semibold"
                >
                    Finish your practice?
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    Your conversation will be saved and VirtualMento will
                    evaluate your performance.
                </p>

                <div className="mt-5 rounded-xl border border-(--vm-border) bg-(--vm-surface-2)/50 p-4">
                    <div className="flex gap-3">
                        <Sparkles
                            size={16}
                            className="mt-0.5 shrink-0 text-(--vm-primary)"
                        />

                        <div>
                            <p className="text-xs font-semibold">
                                You'll receive
                            </p>

                            <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                                Scores for communication, clarity, confidence
                                and relevance, plus personalized improvements.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button
                        variant="secondary"
                        onClick={onCancel}
                        className="w-full sm:w-auto"
                    >
                        Continue practicing
                    </Button>

                    <Button
                        onClick={onConfirm}
                        className="w-full sm:w-auto"
                    >
                        <CheckCircle2 size={16} />
                        Get my evaluation
                    </Button>
                </div>
            </Card>
        </div>
    );
}