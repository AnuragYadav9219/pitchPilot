interface EvaluationPaginationProps {
    page: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    onPageChange: (
        page: number,
    ) => void;
}

export function EvaluationPagination({
    page,
    totalPages,
    first,
    last,
    onPageChange,
}: EvaluationPaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-6 flex items-center justify-between border-t border-(--vm-border) pt-5">
            <button
                type="button"
                disabled={first}
                onClick={() =>
                    onPageChange(page - 1)
                }
                className="rounded-lg border border-(--vm-border) px-3 py-2 text-xs font-medium text-(--vm-text) hover:bg-(--vm-surface-2) disabled:pointer-events-none disabled:opacity-40"
            >
                Previous
            </button>

            <span className="text-xs text-(--vm-muted)">
                Page {page + 1} of {totalPages}
            </span>

            <button
                type="button"
                disabled={last}
                onClick={() =>
                    onPageChange(page + 1)
                }
                className="rounded-lg border border-(--vm-border) px-3 py-2 text-xs font-medium text-(--vm-text) hover:bg-(--vm-surface-2) disabled:pointer-events-none disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
}