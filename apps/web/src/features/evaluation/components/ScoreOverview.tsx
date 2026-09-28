import { motion, type Variants } from "framer-motion";
import { Award, Brain, MessageCircle, Puzzle, ShieldCheck } from "lucide-react";
import type { ElementType } from "react";

interface ScoreOverviewProps {
    overallScore: number | null;
    technicalScore: number | null;
    communicationScore: number | null;
    problemSolvingScore: number | null;
    confidenceScore: number | null;
}

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ScoreOverview({
    overallScore,
    technicalScore,
    communicationScore,
    problemSolvingScore,
    confidenceScore,
}: ScoreOverviewProps) {
    const overall = Math.round(overallScore ?? 0);

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
            {/* Overall */}
            <motion.div
                variants={cardVariants}
                className="relative overflow-hidden rounded-2xl border border-(--vm-primary)/20 bg-(--vm-primary)/5 p-5 sm:col-span-2 lg:col-span-1"
            >
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium text-(--vm-muted)">Overall Score</p>
                        <div className="mt-2 flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-(--vm-primary)">{overall}</span>
                            <span className="text-sm text-(--vm-muted)">/100</span>
                        </div>
                    </div>
                    <div className="rounded-xl bg-(--vm-primary)/10 p-2">
                        <Award className="h-5 w-5 text-(--vm-primary)" />
                    </div>
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-(--vm-primary)/10">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${overall}%` }}
                        transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
                        className="h-full rounded-full bg-(--vm-primary)"
                    />
                </div>

                <p className="mt-2 text-[11px] text-(--vm-muted)">Overall interview performance</p>
            </motion.div>

            <ScoreCard label="Technical" score={technicalScore} icon={Brain} />
            <ScoreCard label="Communication" score={communicationScore} icon={MessageCircle} />
            <ScoreCard label="Problem Solving" score={problemSolvingScore} icon={Puzzle} />
            <ScoreCard label="Confidence" score={confidenceScore} icon={ShieldCheck} />
        </motion.section>
    );
}

interface ScoreCardProps {
    label: string;
    score: number | null;
    icon: ElementType;
}

function ScoreCard({ label, score, icon: Icon }: ScoreCardProps) {
    const value = Math.round(score ?? 0);

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="group rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 transition-colors duration-200 hover:border-(--vm-primary)/20"
        >
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-(--vm-muted)">{label}</p>
                <div className="rounded-lg bg-(--vm-background) p-2 transition-colors group-hover:bg-(--vm-primary)/10">
                    <Icon className="h-4 w-4 text-(--vm-muted) transition-colors group-hover:text-(--vm-primary)" />
                </div>
            </div>

            <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-(--vm-text)">{value}</span>
                <span className="text-xs text-(--vm-muted)">/100</span>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-(--vm-border)">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="h-full rounded-full bg-(--vm-primary)"
                />
            </div>
        </motion.div>
    );
}