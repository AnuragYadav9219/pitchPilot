import { motion } from "framer-motion";
import { Mic, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EmptyDashboard() {
    const useNavigateInstance = useNavigate();

    return (
        <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) p-8 text-center shadow-sm sm:p-12"
        >
            {/* Background subtle glowing accent */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-40 w-80 rounded-full bg-(--vm-primary)/10 blur-3xl pointer-events-none" />

            {/* Icon Badge */}
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-(--vm-primary) to-(--vm-primary)/80 text-white shadow-md shadow-(--vm-primary)/20">
                <Sparkles className="h-7 w-7 animate-pulse" />
            </div>

            {/* Title */}
            <h2 className="mt-6 text-xl sm:text-2xl font-bold tracking-tight text-(--vm-text)">
                Your interview journey starts here
            </h2>

            {/* Description */}
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-(--vm-muted)">
                Complete your first AI-powered voice interview and watch your dashboard dynamically track your cadence, confidence, and performance metrics.
            </p>

            {/* Action CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => useNavigateInstance("/interviews")}
                    className="group inline-flex items-center gap-2.5 rounded-xl bg-(--vm-primary) px-6 py-3 text-sm font-semibold text-white shadow-md shadow-(--vm-primary)/25 transition-all duration-200 hover:bg-(--vm-primary-pressed) hover:scale-[1.02] active:scale-95"
                >
                    <Mic className="h-4 w-4" />
                    <span>Start your first interview</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
            </div>

            {/* Feature reassurance bullet hints */}
            <div className="mt-10 pt-6 border-t border-(--vm-border)/60 flex flex-wrap items-center justify-center gap-6 text-xs text-(--vm-muted)">
                <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> Real-time AI feedback
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> Voice & text simulation
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> Comprehensive scoring
                </span>
            </div>
        </motion.section>
    );
}