import { MessageCircle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui";

interface PracticeEmptyStateProps {
    existingConversation?: boolean;
}

export function PracticeEmptyState({
    existingConversation = false,
}: PracticeEmptyStateProps) {
    const title = existingConversation
        ? "No messages yet"
        : "Your mentor is ready";

    const description = existingConversation
        ? "This practice session doesn't contain any messages yet."
        : "Start the conversation below and treat this like a real practice session.";

    return (
        <div className="flex min-h-[55vh] items-center justify-center px-4">
            <Card className="w-full max-w-md border-(--vm-border) bg-(--vm-surface) p-7 text-center sm:p-8">
                {/* Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    {existingConversation ? (
                        <MessageCircle size={23} strokeWidth={1.8} />
                    ) : (
                        <Sparkles size={23} strokeWidth={1.8} />
                    )}
                </div>

                {/* Title */}
                <h2 className="mt-5 text-lg font-semibold tracking-tight text-(--vm-text)">
                    {title}
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    {description}
                </p>
            </Card>
        </div>
    );
}