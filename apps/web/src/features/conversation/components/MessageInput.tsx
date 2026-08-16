import { ArrowUp, Sparkles } from "lucide-react";
import { useMessageInput } from "../hooks/useMessageInput";

interface MessageInputProps {
    onSend: (content: string) => void | Promise<void>;
    disabled?: boolean;
}

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
    const {
        value,
        textareaRef,
        characterCount,
        maxLength,
        canSend,
        isNearLimit,
        handleChange,
        handleKeyDown,
        submit,
    } = useMessageInput({ onSend, disabled });

    return (
        <div className="relative">
            {/* Composer glow */}
            <div
                className={`pointer-events-none absolute -inset-1 rounded-[1.35rem] bg-(--vm-primary)/10 blur-xl transition-opacity duration-300 ${canSend ? "opacity-100" : "opacity-0"
                    }`}
            />

            {/* Composer */}
            <div className="relative rounded-[1.25rem] border border-(--vm-border) bg-(--vm-surface) p-2 shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-200 focus-within:border-(--vm-primary)/60 focus-within:ring-2 focus-within:ring-(--vm-primary)/10">
                <div className="flex items-end gap-2">
                    {/* AI indicator */}
                    <div className="hidden shrink-0 items-center self-end pb-1 pl-1 sm:flex">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                            <Sparkles size={16} strokeWidth={2} />
                        </div>
                    </div>

                    {/* Input */}
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(event) => handleChange(event.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        rows={1}
                        maxLength={maxLength}
                        placeholder={disabled ? "Starting practice session..." : "Type your response..."}
                        aria-label="Your response"
                        className="min-h-12 max-h-48 flex-1 resize-none overflow-y-auto border-0 bg-transparent px-2 py-2.5 text-sm leading-6 text-(--vm-text) outline-none placeholder:text-(--vm-muted) disabled:cursor-not-allowed disabled:opacity-50 scrollbar-thin [scrollbar-color:var(--vm-border)_transparent]"
                    />

                    {/* Send */}
                    <button
                        type="button"
                        onClick={() => void submit()}
                        disabled={!canSend}
                        aria-label="Send message"
                        className={`group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200 disabled:cursor-not-allowed ${canSend
                                ? "bg-(--vm-primary) text-white shadow-lg shadow-(--vm-primary)/20 hover:bg-(--vm-primary-pressed) hover:-translate-y-0.5 active:translate-y-0"
                                : "bg-(--vm-surface-2) text-(--vm-muted) opacity-60"
                            }`}
                    >
                        <ArrowUp
                            size={18}
                            strokeWidth={2.4}
                            className={`transition-transform duration-200 ${canSend ? "group-hover:-translate-y-0.5" : ""}`}
                        />
                    </button>
                </div>

                {/* Character counter */}
                {characterCount > 0 && (
                    <div className="mt-1 flex justify-end px-2">
                        <span
                            className={`text-[10px] font-medium ${isNearLimit ? "text-(--vm-warning)" : "text-(--vm-muted)"
                                }`}
                        >
                            {characterCount.toLocaleString()} / {maxLength.toLocaleString()}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}