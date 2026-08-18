import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function RecentSessionsEmpty() {
    return (
        <div className="mt-5 rounded-xl border border-dashed border-(--vm-border-strong) p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-(--vm-surface-2) text-(--vm-muted)">
                <MessageCircle size={17} />
            </div>

            <p className="mt-3 text-xs font-medium text-(--vm-text)">
                No evaluated sessions yet
            </p>

            <p className="mx-auto mt-1 max-w-xs text-[11px] leading-5 text-(--vm-muted)">
                Complete your first practice session to
                start tracking your progress.
            </p>

            <Link
                to="/scenarios"
                className="
                    mt-4 inline-flex items-center
                    gap-1.5 text-xs font-medium
                    text-(--vm-primary)
                    hover:underline
                "
            >
                Start practicing
                <ArrowRight size={13} />
            </Link>
        </div>
    );
}