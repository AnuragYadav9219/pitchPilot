import { Card } from "@/components/ui";
import { MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
    isFetching: boolean;
}

export function DashboardHeader({
    isFetching,
}: DashboardHeaderProps) {
    return (
        <Card className="relative overflow-hidden rounded-(--vm-radius-xl) border border-(--vm-border) bg-(--vm-surface) p-6 sm:p-8">
            {/* Glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-(--vm-primary)/10 blur-3xl"
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-(--vm-primary)">
                        <Sparkles
                            size={16}
                            strokeWidth={2}
                        />

                        <span className="text-xs font-semibold uppercase tracking-wider">
                            Your progress
                        </span>

                        {isFetching && (
                            <span className="text-[10px] text-(--vm-muted)">
                                Updating...
                            </span>
                        )}
                    </div>

                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-(--vm-text) sm:text-3xl">
                        Welcome back 👋
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-(--vm-muted)">
                        Keep practicing, review your performance, and build stronger communication skills.
                    </p>
                </div>

                <Link
                    to="/scenarios"
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-(--vm-radius-md) bg-(--vm-primary) px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-(--vm-primary-pressed) hover:-translate-y-0.5"
                >
                    <MessageCircle size={17} />
                    Start Practice
                </Link>
            </div>
        </Card>
    );
}