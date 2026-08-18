import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import type { RecentSession } from "../types";
import { formatDate, formatSessionType } from "../hooks/useFormatters";
import { Card } from "@/components/ui";

interface RecentSessionItemProps {
    session: RecentSession;
}

export function RecentSessionItem({
    session,
}: RecentSessionItemProps) {
    return (
        <Card>
            <Link
                to={`/practice/${session.conversationId}/evaluation`}
                className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 transition-colors hover:border-(--vm-border) hover:bg-(--vm-surface-2)"
            >
                <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)"
                >
                    <BookOpen size={16} />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-(--vm-text)">
                        {session.title}
                    </p>

                    <p className="mt-0.5 text-[10px] text-(--vm-muted)">
                        {formatSessionType(session.type)}
                        {" · "}
                        {formatDate(session.completedAt)}
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <span className="text-sm font-semibold text-(--vm-text)">
                        {session.score ?? "—"}
                    </span>

                    <ArrowRight
                        size={14}
                        className="text-(--vm-muted) transition-transform group-hover:translate-x-0.5"
                    />
                </div>
            </Link>
        </Card>
    );
}