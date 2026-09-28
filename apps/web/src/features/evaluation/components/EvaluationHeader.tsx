import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface EvaluationHeaderProps {
    onBack: () => void;
}

export function EvaluationHeader({ onBack }: EvaluationHeaderProps) {
    return (
        <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-8 flex justify-between gap-4 sm:flex-row sm:items-center"
        >
            {/* Left */}
            <div className="flex items-center gap-3">
                <motion.button
                    type="button"
                    onClick={onBack}
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-(--vm-border) bg-(--vm-surface)/60 px-2.5 py-1.5 text-sm font-medium text-(--vm-muted) backdrop-blur-sm transition-all duration-200 hover:border-(--vm-border-hover) hover:bg-(--vm-surface) hover:text-(--vm-text)"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    <span>Back</span>
                </motion.button>
            </div>

            {/* Right */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.08)]"
            >
                <span className="relative flex h-4 w-4 items-center justify-center">
                    <motion.span
                        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-emerald-400"
                    />
                    <CheckCircle2 className="relative h-4 w-4" />
                </span>
                <span>Evaluation Complete</span>
            </motion.div>
        </motion.header>
    );
}