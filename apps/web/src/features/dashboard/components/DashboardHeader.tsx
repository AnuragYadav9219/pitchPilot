import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
    userName: string;
    currentStreak: number;
}

export function DashboardHeader({
    userName,
    currentStreak,
}: DashboardHeaderProps) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
            <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-(--vm-muted)">
                    <Sparkles className="h-4 w-4 text-(--vm-accent)" />
                    Your interview workspace
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-(--vm-text) sm:text-3xl">
                    Welcome back, {userName}
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-(--vm-text-secondary)">
                    Keep building your interview confidence.{" "}
                    {currentStreak > 0
                        ? `You're on a ${currentStreak}-day streak.`
                        : "Start a practice session today and build your streak."}
                </p>
            </div>

            <button
                type="button"
                onClick={() => navigate("/practice")}
                className="group cursor-pointer inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-(--vm-primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--vm-primary-pressed) focus:outline-none focus:ring-2 focus:ring-(--vm-primary) focus:ring-offset-2 focus:ring-offset-(--vm-background)"
            >
                 Let's Practice

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
        </motion.div>
    );
}