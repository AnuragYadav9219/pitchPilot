import {
    Check,
    Loader2,
} from "lucide-react";

interface HistoryLoadMoreProps {
    isLoading: boolean;
    hasMore: boolean;
}

export function HistoryLoadMore({
    isLoading,
    hasMore,
}: HistoryLoadMoreProps) {
    if (isLoading) {
        return (
            <div className="flex h-14 items-center justify-center border-t border-(--vm-border)">
                <div className="flex items-center gap-2.5 text-xs text-(--vm-muted)">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-(--vm-primary)" />

                    <span>
                        Loading more interviews
                    </span>

                    <span className="flex items-center gap-0.5">
                        <span className="h-1 w-1 animate-pulse rounded-full bg-(--vm-primary)" />
                        <span className="h-1 w-1 animate-pulse rounded-full bg-(--vm-primary) [animation-delay:150ms]" />
                        <span className="h-1 w-1 animate-pulse rounded-full bg-(--vm-primary) [animation-delay:300ms]" />
                    </span>
                </div>
            </div>
        );
    }

    if (!hasMore) {
        return (
            <div className="flex h-14 items-center justify-center border-t border-(--vm-border)">
                <div className="flex items-center gap-2 text-[11px] text-(--vm-muted)">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-(--vm-success)/10 text-(--vm-success)">
                        <Check className="h-3 w-3" />
                    </span>

                    <span>
                        You've reached the end
                    </span>
                </div>
            </div>
        );
    }

    return <div className="h-8" />;
}