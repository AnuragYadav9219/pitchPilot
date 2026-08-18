import { Card } from "@/components/ui";
import type { RecentSession } from "../types";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { RecentSessionsEmpty } from "./RecentSessionsEmpty";
import { RecentSessionItem } from "./RecentSessionItem";

interface RecentSessionsProps {
    sessions: RecentSession[];
}

export function RecentSessions({
    sessions,
}: RecentSessionsProps) {
    return (
        <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-(--vm-text)">
                        Recent practice
                    </p>

                    <p className="mt-1 text-xs text-(--vm-muted)">
                        Your latest evaluated sessions.
                    </p>
                </div>

                <Link
                    to="/history"
                    className="inline-flex items-center gap-1 text-xs font-medium text-(--vm-primary) hover:underline"
                >
                    View all
                    <ArrowRight size={13} />
                </Link>
            </div>

            {sessions.length === 0 ? (
                <RecentSessionsEmpty />
            ) : (
                <div className="mt-5 space-y-2">
                    {sessions.map((session) => (
                        <RecentSessionItem
                            key={session.conversationId}
                            session={session}
                        />
                    ))}
                </div>
            )}
        </Card>
    );
}