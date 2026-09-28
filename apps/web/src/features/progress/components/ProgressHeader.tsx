import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ProgressHeader() {

    return (
        <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden pb-2"
        >
            {/* Ambient background blur elements */}
            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-(--vm-primary)/10 blur-3xl"
            />

            <motion.div
                aria-hidden="true"
                animate={{ x: [0, 10, 0], y: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute right-24 top-4 h-16 w-16 rounded-full bg-(--vm-orange)/8 blur-2xl"
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                {/* Left Side: Title & Description */}
                <div className="max-w-3xl space-y-2">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="flex items-center gap-2"
                    >
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--vm-primary)/10 text-(--vm-primary)">
                            <Sparkles className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--vm-primary)">
                            Performance Insights
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="text-3xl font-extrabold tracking-tight text-(--vm-text) sm:text-4xl"
                    >
                        Your Progress
                        <span className="ml-1 text-(--vm-primary)">.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="max-w-2xl text-sm leading-relaxed text-(--vm-muted) sm:text-base"
                    >
                        Track your interview performance, understand your strengths,
                        and focus on the skills that can make your next interview better.
                    </motion.p>
                </div>
            </div>

            {/* Decorative Gradient Divider */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
                className="mt-6 h-px w-full bg-linear-to-r from-(--vm-primary)/40 via-(--vm-border) to-transparent"
            />
        </motion.header>
    );
}