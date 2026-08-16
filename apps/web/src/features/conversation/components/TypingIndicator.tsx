import { Bot } from "lucide-react";

export function TypingIndicator() {
    return (
        <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)/10 text-(--vm-primary)">
                <Bot size={17} />
            </div>

            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-(--vm-border) bg-(--vm-surface) px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-(--vm-muted)" />
                <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-(--vm-muted)"
                    style={{
                        animationDelay:
                            "120ms",
                    }}
                />
                <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-(--vm-muted)"
                    style={{
                        animationDelay:
                            "240ms",
                    }}
                />
            </div>
        </div>
    );
}