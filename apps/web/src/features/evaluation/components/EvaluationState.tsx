import { motion } from "framer-motion";
import {
    AlertCircle,
    ArrowLeft,
    Loader2,
    RefreshCw,
    Sparkles,
    Target,
} from "lucide-react";

interface GenerateEvaluationStateProps {
    onBack: () => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export function GenerateEvaluationState({
    onBack,
    onGenerate,
    isGenerating,
}: GenerateEvaluationStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 text-center"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-(--vm-primary)/5 blur-3xl" />

            {/* Icon */}
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-(--vm-primary)/20 bg-(--vm-primary)/10 text-(--vm-primary) shadow-[0_0_30px_rgba(99,102,241,0.08)]"
            >
                <Target className="h-7 w-7" />
                <span className="absolute inset-0 rounded-2xl border border-(--vm-primary)/10" />
            </motion.div>

            {/* Heading */}
            <h1 className="relative mt-6 text-xl font-semibold text-(--vm-text) sm:text-2xl">
                Evaluation is ready
            </h1>

            <p className="relative mt-2 max-w-md text-sm leading-6 text-(--vm-muted)">
                Generate an AI-powered evaluation of your interview to review your performance, strengths, improvement areas, and question-by-question feedback.
            </p>

            {/* Actions */}
            <div className="relative mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isGenerating}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-(--vm-border) bg-(--vm-surface)/60 px-5 py-3 text-sm font-semibold text-(--vm-text) transition-all duration-250 hover:bg-(--vm-surface) hover:border-(--vm-border-hover) disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>

                <motion.button
                    type="button"
                    onClick={onGenerate}
                    disabled={isGenerating}
                    whileHover={!isGenerating ? { y: -2 } : undefined}
                    whileTap={!isGenerating ? { scale: 0.98 } : undefined}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--vm-primary) px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-(--vm-primary)/10 transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="h-4 w-4" />
                            Generate Evaluation
                        </>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
}

interface EvaluationLoadingProps {
    message?: string;
}

export function EvaluationLoading({
    message = "Loading evaluation...",
}: EvaluationLoadingProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
        >
            {/* Loader */}
            <div className="relative flex h-14 w-14 items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-(--vm-border) border-t-(--vm-primary)"
                />
                <Sparkles className="h-5 w-5 text-(--vm-primary)" />
            </div>

            <p className="mt-5 text-sm font-medium text-(--vm-text)">{message}</p>
            <p className="mt-1 text-xs text-(--vm-muted)">Please wait a moment...</p>
        </motion.div>
    );
}

interface EvaluationErrorProps {
    message: string;
    onBack: () => void;
}

export function EvaluationError({ message, onBack }: EvaluationErrorProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
        >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
                <AlertCircle className="h-6 w-6" />
            </div>

            <h1 className="mt-5 text-lg font-semibold text-(--vm-text)">Something went wrong</h1>
            <p className="mt-2 max-w-md text-sm leading-6 text-(--vm-muted)">{message}</p>

            <button
                type="button"
                onClick={onBack}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-(--vm-border) px-5 py-2.5 text-sm font-semibold text-(--vm-text) transition-all duration-200 hover:bg-(--vm-surface)"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Interviews
            </button>
        </motion.div>
    );
}

interface EvaluationFailedProps {
    onRetry: () => void;
    isGenerating: boolean;
}

export function EvaluationFailed({ onRetry, isGenerating }: EvaluationFailedProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
        >
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <AlertCircle className="h-6 w-6" />
            </div>

            <h1 className="mt-5 text-lg font-semibold text-(--vm-text)">
                Evaluation couldn't be generated
            </h1>

            <p className="mt-2 max-w-md text-sm leading-6 text-(--vm-muted)">
                We couldn't generate your evaluation this time. You can try again and we'll process your interview once more.
            </p>

            <motion.button
                type="button"
                onClick={onRetry}
                disabled={isGenerating}
                whileHover={!isGenerating ? { y: -2 } : undefined}
                whileTap={!isGenerating ? { scale: 0.98 } : undefined}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--vm-primary) px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-(--vm-primary)/10 transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Retrying...
                    </>
                ) : (
                    <>
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                    </>
                )}
            </motion.button>
        </motion.div>
    );
}