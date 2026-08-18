import { ArrowLeft, Menu, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "@/components/ui";

interface PracticeHeaderProps {
    title: string;
    type: string;
    isSending: boolean;
    backPath: string;
    onOpenHistory: () => void;
}

function formatType(type: string) {
    return type
        .toLowerCase()
        .split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join(" ");
}

export function PracticeHeader({
    title,
    type,
    isSending,
    backPath,
    onOpenHistory,
}: PracticeHeaderProps) {
    return (
        <header className="z-30 flex h-16 shrink-0 items-center border-b border-(--vm-border) bg-(--vm-background)/95 backdrop-blur-xl">
            <Container className="flex h-full w-full items-center justify-between">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={onOpenHistory}
                        aria-label="Open practice history"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-(--vm-muted) hover:bg-(--vm-surface) hover:text-(--vm-text) lg:hidden"
                    >
                        <Menu size={19} />
                    </button>

                    <Link
                        to={backPath}
                        aria-label="Back"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-(--vm-muted) hover:bg-(--vm-surface) hover:text-(--vm-text)"
                    >
                        <ArrowLeft size={19} />
                    </Link>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h1 className="max-w-45 truncate text-sm font-semibold text-(--vm-text) sm:max-w-md sm:text-base">
                                {title}
                            </h1>

                            <span className="hidden h-4 w-px bg-(--vm-border) sm:block" />

                            <span className="hidden rounded-full bg-(--vm-surface-2) px-2 py-0.5 text-[10px] font-medium text-(--vm-muted) sm:block">
                                {formatType(type)}
                            </span>
                        </div>

                        <div className="mt-0.5 flex items-center gap-1.5">
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${isSending
                                        ? "animate-pulse bg-(--vm-primary)"
                                        : "bg-(--vm-success)"
                                    }`}
                            />

                            <span className="text-[11px] text-(--vm-muted)">
                                {isSending
                                    ? "Mentor is responding..."
                                    : "Practice session active"}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    aria-label="More options"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-(--vm-muted) hover:bg-(--vm-surface) hover:text-(--vm-text)"
                >
                    <MoreVertical size={19} />
                </button>
            </Container>
        </header>
    );
}