import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function EvaluationHero() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative mb-6 overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-6 sm:p-7"
        >
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-(--vm-primary)/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl" />

            {/* Content */}
            <div className="relative">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                    className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--vm-primary)/20 bg-(--vm-primary)/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-(--vm-primary)"
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Interview Evaluation</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                    className="text-2xl font-bold tracking-tight text-(--vm-text) sm:text-3xl"
                >
                    Your Interview Results
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                    className="mt-3 max-w-2xl text-sm leading-6 text-(--vm-muted) sm:text-[15px]"
                >
                    Get a detailed breakdown of your interview performance, including your strengths, areas for improvement, and question-by-question feedback.
                </motion.p>
            </div>
        </motion.section>
    );
}