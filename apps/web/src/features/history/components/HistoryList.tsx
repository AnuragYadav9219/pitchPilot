import { HistoryCard } from "./HistoryCard";
import type { HistoryItem } from "../types";

interface HistoryListProps {
    interviews: HistoryItem[];
}

export function HistoryList({
    interviews,
}: HistoryListProps) {
    return (
        <div
            className="divide-y divide-(--vm-border) overflow-hidden"
            aria-label="Interview history"
        >
            {interviews.map((interview) => (
                <HistoryCard
                    key={interview.interviewId}
                    interview={interview}
                />
            ))}
        </div>
    );
}