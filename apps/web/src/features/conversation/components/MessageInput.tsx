import { ArrowUp, Trophy } from "lucide-react";
import { useMessageInput } from "../hooks/useMessageInput";
import { Button } from "@/components/ui";

interface MessageInputProps {
    onSend: (content: string) => void | Promise<void>;
    onFinish?: () => void | Promise<void>;

    disabled?: boolean;
    finishing?: boolean;
}

export function MessageInput({
    onSend,
    onFinish,
    disabled = false,
    finishing = false,
}: MessageInputProps) {
    const isDisabled = disabled || finishing;

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
    } = useMessageInput({
        onSend,
        disabled: isDisabled,
    });

    return (
        <div className="w-full">
            {/* ===================================================== */}
            {/* COMPOSER */}
            {/* ===================================================== */}
            <div
                className={[
                    "relative overflow-hidden rounded-2xl border border-(--vm-border)",
                    "bg-(--vm-surface) shadow-sm transition-all duration-200",
                    "focus-within:border-(--vm-primary)/50 focus-within:ring-2 focus-within:ring-(--vm-primary)/10",
                ].join(" ")}
            >
                {/* ================================================= */}
                {/* TEXT INPUT */}
                {/* ================================================= */}
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(event) => handleChange(event.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isDisabled}
                    rows={2}
                    maxLength={maxLength}
                    placeholder={
                        disabled
                            ? "Starting practice session..."
                            : "Start the conversation"
                    }
                    aria-label="Your response"
                    className={[
                        "block w-full resize-none min-h-19 max-h-40 border-0 bg-transparent",
                        "px-4 pt-4 pb-2 text-sm leading-6 text-(--vm-text) outline-none",
                        "placeholder:text-(--vm-muted) disabled:cursor-not-allowed disabled:opacity-50",
                        "scrollbar-thin [scrollbar-color:var(--vm-border)_transparent]",
                    ].join(" ")}
                />

                {/* ================================================= */}
                {/* BOTTOM TOOLBAR */}
                {/* ================================================= */}
                <div className="flex items-center justify-between gap-2 px-3 pb-3">
                    {/* ================================================= */}
                    {/* LEFT ACTION — FINISH */}
                    {/* ================================================= */}
                    <div className="flex min-w-0 items-center gap-2">
                        {onFinish && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                disabled={isDisabled}
                                loading={finishing}
                                onClick={() => void onFinish()}
                                title="Finish this practice session and get your evaluation"
                                aria-label="Finish practice session and get evaluation"
                                className={[
                                    "group relative h-9 shrink-0 rounded-xl border border-(--vm-primary)/25",
                                    "bg-(--vm-primary)/8 px-3 text-xs font-semibold text-(--vm-primary)",
                                    "transition-all duration-200 hover:border-(--vm-primary)/50",
                                    "hover:bg-(--vm-primary)/15 hover:text-(--vm-primary) hover:shadow-md hover:shadow-(--vm-primary)/10",
                                    "focus-visible:ring-2 focus-visible:ring-(--vm-primary)/40 active:scale-[0.97]",
                                ].join(" ")}
                            >
                                {!finishing && (
                                    <Trophy
                                        size={15}
                                        strokeWidth={2.2}
                                        className="transition-transform duration-200 group-hover:-translate-y-0.5"
                                    />
                                )}
                                <span>{finishing ? "Finishing..." : "Finish"}</span>
                            </Button>
                        )}

                        {/* Character count */}
                        {characterCount > 0 && (
                            <span
                                className={[
                                    "hidden sm:inline text-[10px] font-medium",
                                    isNearLimit
                                        ? "text-(--vm-warning)"
                                        : "text-(--vm-muted)",
                                ].join(" ")}
                            >
                                {characterCount.toLocaleString()} /{" "}
                                {maxLength.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* ================================================= */}
                    {/* RIGHT ACTION — SEND */}
                    {/* ================================================= */}
                    <button
                        type="button"
                        onClick={() => void submit()}
                        disabled={!canSend}
                        aria-label="Send message"
                        className={[
                            "group flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                            canSend
                                ? [
                                    "bg-(--vm-primary) text-white shadow-md shadow-(--vm-primary)/20",
                                    "hover:bg-(--vm-primary-pressed) hover:-translate-y-0.5 active:translate-y-0",
                                ].join(" ")
                                : [
                                    "cursor-not-allowed bg-(--vm-surface-2) text-(--vm-muted) opacity-50",
                                ].join(" "),
                        ].join(" ")}
                    >
                        <ArrowUp
                            size={17}
                            strokeWidth={2.4}
                            className={
                                canSend
                                    ? "transition-transform duration-200 group-hover:-translate-y-0.5"
                                    : ""
                            }
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}