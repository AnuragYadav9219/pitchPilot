import { motion } from "framer-motion";
import { ArrowRight, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FocusArea as FocusAreaType } from "../types";

interface FocusAreaProps {
  focusArea: FocusAreaType | null;
}

export default function FocusArea({
  focusArea,
}: FocusAreaProps) {
  const navigate = useNavigate();

  if (!focusArea) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 shadow-xs transition-shadow duration-300 hover:shadow-md sm:p-6"
    >
      {/* Subtle ambient background glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-(--vm-primary)/5 blur-2xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Left Side: Icon & Details */}
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
            <Target className="h-5 w-5" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-(--vm-primary)">
              Recommended focus
            </span>

            <h2 className="text-xl font-bold tracking-tight text-(--vm-text)">
              Improve your {focusArea.skill}
            </h2>

            <p className="max-w-2xl text-sm leading-relaxed text-(--vm-muted)">
              {focusArea.recommendation}
            </p>
          </div>
        </div>

        {/* Right Side: Score Box & Action Button */}
        <div className="flex flex-wrap items-center gap-3.5 sm:shrink-0">
          <div className="rounded-xl border border-(--vm-border) bg-(--vm-surface)/50 px-4 py-2.5 text-center">
            <p className="text-lg font-bold text-(--vm-primary)">
              {focusArea.score.toFixed(0)}%
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-(--vm-muted)">
              Current score
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/practice")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-(--vm-primary) px-4 py-3 text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:bg-(--vm-primary-pressed) hover:shadow-sm active:scale-98"
          >
            Practice
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}