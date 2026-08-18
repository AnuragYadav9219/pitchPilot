import { Sparkles } from "lucide-react";

interface PracticeLoadingPageProps {
    existingConversation?: boolean;
}

export function PracticeLoadingPage({
    existingConversation = false,
}: PracticeLoadingPageProps) {
    const title = existingConversation
        ? "Restoring your practice"
        : "Preparing your mentor";

    const description = existingConversation
        ? "Loading your conversation and getting you back where you left off."
        : "Setting up your practice environment.";

    return (
        <main className="flex min-h-[calc(70dvh-4rem)] w-full items-center justify-center bg-(--vm-background) px-5 text-(--vm-text)">
            <div className="flex w-full max-w-sm flex-col items-center text-center">
                {/* Animated icon */}
                <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-(--vm-primary)/20 blur-xl animate-pulse" />

                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-(--vm-border) bg-(--vm-surface) text-(--vm-primary) shadow-sm">
                        <Sparkles
                            size={23}
                            strokeWidth={1.8}
                            className="animate-[mentor-float_2.5s_ease-in-out_infinite]"
                        />
                    </div>
                </div>

                {/* Content */}
                <h1 className="mt-5 text-base font-semibold tracking-tight text-(--vm-text) sm:text-lg">
                    {title}
                </h1>

                <p className="mt-1.5 max-w-xs text-xs leading-5 text-(--vm-muted) sm:text-sm">
                    {description}
                </p>

                {/* Minimal progress line */}
                <div className="mt-4 h-1 w-40 overflow-hidden rounded-full bg-(--vm-surface-2)">
                    <div className="h-full w-1/3 rounded-full bg-(--vm-primary) animate-[loading-progress_1.8s_ease-in-out_infinite]" />
                </div>
            </div>
        </main>
    );
}