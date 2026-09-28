export function CareerLoading() {
    return (
        <div className="space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-32" />
                ))}
            </div>

            {/* Main */}
            <div className="grid gap-5 lg:grid-cols-2">
                <Skeleton className="h-105" />
                <Skeleton className="h-105" />
            </div>

            {/* Locations */}
            <Skeleton className="h-56" />

            {/* AI */}
            <Skeleton className="h-100" />

            {/* Roadmap */}
            <Skeleton className="h-80" />
        </div>
    );
}

interface SkeletonProps {
    className?: string;
}

function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-surface-2) ${className}`}
        />
    );
}