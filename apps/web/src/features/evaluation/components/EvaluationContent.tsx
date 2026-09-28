import {
    Award,
    ChevronDown,
    Lightbulb,
    MessageSquare,
    Target,
    TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";
import type { Evaluation } from "../types";

interface EvaluationContentProps {
    evaluation: Evaluation;
}

/* ============================================================
   ANIMATION VARIANTS
============================================================ */

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function EvaluationContent({ evaluation }: EvaluationContentProps) {
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            {/* HERO */}
            <motion.div variants={itemVariants}>
                <EvaluationHero evaluation={evaluation} />
            </motion.div>

            {/* SCORES */}
            <motion.div variants={itemVariants}>
                <EvaluationScores
                    overallScore={evaluation.overallScore}
                    technicalScore={evaluation.technicalScore}
                    communicationScore={evaluation.communicationScore}
                    problemSolvingScore={evaluation.problemSolvingScore}
                    confidenceScore={evaluation.confidenceScore}
                />
            </motion.div>

            {/* SUMMARY + STRENGTHS */}
            <div className="grid gap-6 lg:grid-cols-2">
                <motion.div variants={itemVariants}>
                    <EvaluationSection icon={<MessageSquare className="h-5 w-5" />} title="AI Summary">
                        <p className="text-sm leading-7 text-(--vm-muted)">
                            {evaluation.summary || "No summary available."}
                        </p>
                    </EvaluationSection>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <EvaluationSection icon={<TrendingUp className="h-5 w-5" />} title="Strengths">
                        <EvaluationBulletList items={evaluation.strengths ?? []} />
                    </EvaluationSection>
                </motion.div>
            </div>

            {/* IMPROVEMENTS + RECOMMENDATIONS */}
            <div className="grid gap-6 lg:grid-cols-2">
                <motion.div variants={itemVariants}>
                    <EvaluationSection icon={<Target className="h-5 w-5" />} title="Areas to Improve">
                        <EvaluationBulletList items={evaluation.areasToImprove ?? []} />
                    </EvaluationSection>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <EvaluationSection icon={<Lightbulb className="h-5 w-5" />} title="Recommendations">
                        <EvaluationBulletList items={evaluation.recommendations ?? []} />
                    </EvaluationSection>
                </motion.div>
            </div>

            {/* QUESTION ANALYSIS */}
            <motion.div variants={itemVariants}>
                <QuestionAnalysis questions={evaluation.questions ?? []} />
            </motion.div>
        </motion.div>
    );
}

/* ============================================================
   HERO & SCORE RING
============================================================ */

function EvaluationHero({ evaluation }: { evaluation: Evaluation }) {
    const score = Math.round(evaluation.overallScore ?? 0);

    return (
        <section className="relative overflow-hidden rounded-3xl border border-(--vm-border) bg-(--vm-surface) p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-(--vm-primary)/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-(--vm-primary)/5 blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--vm-primary)/20 bg-(--vm-primary)/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-(--vm-primary)"
                    >
                        <Award className="h-3.5 w-3.5" />
                        Interview Report
                    </motion.div>

                    <h1 className="text-2xl font-bold tracking-tight text-(--vm-text) sm:text-3xl">
                        Your interview performance
                    </h1>

                    <p className="mt-3 text-sm leading-7 text-(--vm-muted)">
                        Review your overall performance, understand your strengths, identify improvement areas, and explore detailed feedback for every question.
                    </p>
                </div>

                <div className="relative flex shrink-0 justify-center">
                    <ScoreRing score={score} />
                </div>
            </div>
        </section>
    );
}

function ScoreRing({ score }: { score: number }) {
    const radius = 48;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (score / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-36 w-36"
        >
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-(--vm-border)" />
                <motion.circle
                    cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                    className="text-(--vm-primary)"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: progress }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-3xl font-bold text-(--vm-text)"
                >
                    {score}
                </motion.span>
                <span className="text-[10px] uppercase tracking-wider text-(--vm-muted)">Overall</span>
            </div>
        </motion.div>
    );
}

/* ============================================================
   SCORES CARDS
============================================================ */

function EvaluationScores({
    overallScore,
    technicalScore,
    communicationScore,
    problemSolvingScore,
    confidenceScore,
}: {
    overallScore: number | null;
    technicalScore: number | null;
    communicationScore: number | null;
    problemSolvingScore: number | null;
    confidenceScore: number | null;
}) {
    return (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <ScoreCard label="Overall" score={overallScore} primary />
            <ScoreCard label="Technical" score={technicalScore} />
            <ScoreCard label="Communication" score={communicationScore} />
            <ScoreCard label="Problem Solving" score={problemSolvingScore} />
            <ScoreCard label="Confidence" score={confidenceScore} />
        </section>
    );
}

function ScoreCard({ label, score, primary = false }: { label: string; score: number | null; primary?: boolean }) {
    const value = Math.round(score ?? 0);

    return (
        <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className={`group rounded-2xl border p-5 transition-colors ${primary ? "border-(--vm-primary)/20 bg-(--vm-primary)/5" : "border-(--vm-border) bg-(--vm-surface)"
                }`}
        >
            <div className="flex items-center justify-between">
                <p className="text-xs text-(--vm-muted)">{label}</p>
                <span className={`text-[10px] font-semibold ${primary ? "text-(--vm-primary)" : "text-(--vm-muted)"}`}>
                    {value}%
                </span>
            </div>

            <div className="mt-3 flex items-end gap-1">
                <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`text-2xl font-bold ${primary ? "text-(--vm-primary)" : "text-(--vm-text)"}`}
                >
                    {value}
                </motion.span>
                <span className="mb-1 text-xs text-(--vm-muted)">/100</span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-(--vm-border)">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-(--vm-primary)"
                />
            </div>
        </motion.div>
    );
}

/* ============================================================
   SECTIONS & LISTS
============================================================ */

function EvaluationSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <motion.section
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="h-full rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 sm:p-6"
        >
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    {icon}
                </div>
                <h2 className="text-sm font-semibold text-(--vm-text)">{title}</h2>
            </div>
            {children}
        </motion.section>
    );
}

function EvaluationBulletList({ items }: { items: string[] }) {
    if (!items.length) {
        return <p className="text-sm text-(--vm-muted)">No information available.</p>;
    }

    return (
        <ul className="space-y-3">
            {items.map((item, index) => (
                <motion.li
                    key={`${item}-${index}`}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="group flex gap-3 text-sm leading-6 text-(--vm-muted)"
                >
                    <span className="mt-2 flex h-1.5 w-1.5 shrink-0 rounded-full bg-(--vm-primary) transition-transform group-hover:scale-150" />
                    <span>{item}</span>
                </motion.li>
            ))}
        </ul>
    );
}

/* ============================================================
   QUESTION ANALYSIS ACCORDION
============================================================ */

function QuestionAnalysis({ questions }: { questions: Evaluation["questions"] }) {
    const [openQuestion, setOpenQuestion] = useState<string | null>(questions[0]?.id ?? null);

    return (
        <section className="overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface)">
            <div className="border-b border-(--vm-border) px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-(--vm-text)">Question Analysis</h2>
                        <p className="mt-1 text-xs text-(--vm-muted)">Detailed feedback for each interview question.</p>
                    </div>
                    {questions.length > 0 && (
                        <span className="w-fit rounded-full border border-(--vm-border) px-2.5 py-1 text-[10px] font-medium text-(--vm-muted)">
                            {questions.length} {questions.length === 1 ? "question" : "questions"}
                        </span>
                    )}
                </div>
            </div>

            {questions.length > 0 ? (
                <div className="divide-y divide-(--vm-border)">
                    {questions.map((question, index) => {
                        const isOpen = openQuestion === question.id;

                        return (
                            <motion.div
                                key={question.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.35, delay: index * 0.04 }}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenQuestion(isOpen ? null : question.id)}
                                    className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-(--vm-background)/60 sm:px-6"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-xs font-bold text-(--vm-primary)">
                                        {question.questionNumber}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-(--vm-text)">{question.question}</p>
                                        <p className="mt-1 text-xs text-(--vm-muted)">Score {question.score} /10</p>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-3">
                                        <ScoreBadge score={question.score} />
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown className="h-4 w-4 text-(--vm-muted)" />
                                        </motion.div>
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="border-t border-(--vm-border) bg-(--vm-background)/40 px-5 py-5 sm:px-6">
                                                <div className="grid gap-4 lg:grid-cols-2">
                                                    <AnswerBlock title="Your Answer" content={question.userAnswer} />
                                                    <AnswerBlock title="AI Feedback" content={question.feedback} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="p-8 text-center">
                    <p className="text-sm text-(--vm-muted)">No question-level analysis is available.</p>
                </div>
            )}
        </section>
    );
}

function ScoreBadge({ score }: { score: number }) {
    return (
        <span className="rounded-lg border border-(--vm-primary)/20 bg-(--vm-primary)/10 px-2.5 py-1 text-xs font-semibold text-(--vm-primary)">
            {score}/10
        </span>
    );
}

function AnswerBlock({ title, content }: { title: string; content: string }) {
    return (
        <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-(--vm-muted)">{title}</p>
            <div className="max-h-64 overflow-y-auto rounded-xl border border-(--vm-border) bg-(--vm-surface) p-4">
                <p className="whitespace-pre-wrap text-sm leading-6 text-(--vm-muted)">
                    {content || "No information available."}
                </p>
            </div>
        </div>
    );
}