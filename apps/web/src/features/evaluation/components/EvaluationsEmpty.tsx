import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function EvaluationsEmpty() {
    return (
        <div className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                <Sparkles size={20} />
            </div>

            <h2 className="mt-4 text-sm font-semibold text-(--vm-text)">
                No evaluations yet
            </h2>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-(--vm-muted)">
                Complete a practice session to receive your first AI evaluation.
            </p>

            <Link
                to="/scenarios"
                className="mt-5 inline-flex h-9 items-center rounded-lg bg-(--vm-primary) px-4 text-xs font-medium text-white"
            >
                Start practicing
            </Link>
        </div>
    );
}