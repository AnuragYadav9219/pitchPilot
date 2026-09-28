import { EmptyHistory, HistoryError, HistoryHeader, HistoryList, HistoryLoadMore, HistorySkeleton } from "../components";
import { useHistory } from "../hooks/useHistory";

export default function HistoryPage() {
    const { history, hasMore, initialLoading, loadingMore, error, retry } = useHistory();

    // Initial loading
    if (initialLoading) {
        return <HistorySkeleton />;
    }

    // Initial request failed
    if (error && history.length === 0) {
        return <HistoryError onRetry={retry} />;
    }

    // No interviews
    if (history.length === 0) {
        return <EmptyHistory />;
    }

    return (
        <main className="min-h-full bg-(--vm-background) px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-374">
                {/* Header */}
                <HistoryHeader totalInterviews={history.length} />

                {/* History */}
                <section className="mt-8">
                    <div className="overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface)">
                        <HistoryList interviews={history} />
                        <HistoryLoadMore isLoading={loadingMore} hasMore={hasMore} />
                    </div>
                </section>
            </div>
        </main>
    );
}