import { motion } from "framer-motion";
import { CheckCircle2, MessageSquareText, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { Evaluation } from "../types";

interface QuestionResultProps {
    question: Evaluation["questions"][number];
}

export function QuestionResult({ question }: QuestionResultProps) {
    const score = Math.round(question.score ?? 0);
    const scorePercentage = Math.min(100, Math.max(0, score * 10));

    return (
        <motion.article
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="group overflow-hidden border-b border-(--vm-border) last:border-b-0"
        >
            <div className="p-5 sm:p-6">
                {/* Question header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-(--vm-primary)/10 px-2.5 py-1 text-[11px] font-semibold text-(--vm-primary)">
                                <MessageSquareText className="h-3 w-3" />
                                Question {question.questionNumber}
                            </span>
                        </div>

                        <h3 className="mt-3 text-sm font-semibold leading-6 text-(--vm-text) sm:text-[15px]">
                            {question.question}
                        </h3>
                    </div>

                    {/* Score */}
                    <div className="flex shrink-0 items-center gap-3 rounded-xl border border-(--vm-primary)/20 bg-(--vm-primary)/5 px-3.5 py-2.5">
                        <div className="text-right">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-(--vm-muted)">Score</p>
                            <p className="mt-0.5 text-lg font-bold text-(--vm-primary)">
                                {score}
                                <span className="ml-0.5 text-xs font-normal text-(--vm-muted)">/10</span>
                            </p>
                        </div>

                        <div className="relative h-9 w-9">
                            <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
                                <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-(--vm-border)" />
                                <motion.circle
                                    cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                                    strokeDasharray={94.2}
                                    initial={{ strokeDashoffset: 94.2 }}
                                    animate={{ strokeDashoffset: 94.2 - (94.2 * scorePercentage) / 100 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className="text-(--vm-primary)"
                                />
                            </svg>
                            <CheckCircle2 className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-(--vm-primary)" />
                        </div>
                    </div>
                </div>

                {/* Score bar */}
                <div className="mt-4">
                    <div className="h-1 overflow-hidden rounded-full bg-(--vm-border)">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${scorePercentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="h-full rounded-full bg-(--vm-primary)"
                        />
                    </div>
                </div>

                {/* Answer & Feedback */}
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <FeedbackBlock
                        icon={<MessageSquareText className="h-4 w-4" />}
                        label="Your Answer"
                        content={question.userAnswer || "No answer recorded."}
                    />
                    <FeedbackBlock
                        icon={<Sparkles className="h-4 w-4" />}
                        label="AI Feedback"
                        content={question.feedback || "No feedback available."}
                        highlighted
                    />
                </div>
            </div>
        </motion.article>
    );
}

interface FeedbackBlockProps {
    icon: ReactNode;
    label: string;
    content: string;
    highlighted?: boolean;
}

function FeedbackBlock({ icon, label, content, highlighted = false }: FeedbackBlockProps) {
    return (
        <div className={`rounded-xl border p-4 transition-colors duration-200 ${highlighted ? "border-(--vm-primary)/15 bg-(--vm-primary)/5" : "border-(--vm-border) bg-(--vm-background)"
            }`}>
            <div className="mb-3 flex items-center gap-2">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${highlighted ? "bg-(--vm-primary)/10 text-(--vm-primary)" : "bg-(--vm-surface) text-(--vm-muted)"
                    }`}>
                    {icon}
                </span>

                <p className={`text-xs font-semibold uppercase tracking-wide ${highlighted ? "text-(--vm-primary)" : "text-(--vm-muted)"
                    }`}>
                    {label}
                </p>
            </div>

            <p className="text-sm leading-6 text-(--vm-muted)">{content}</p>
        </div>
    );
}