import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_TEXTAREA_HEIGHT = 192;
const NEAR_LIMIT_THRESHOLD = MAX_MESSAGE_LENGTH * 0.9;

interface UseMessageInputOptions {
    onSend: (content: string) => void | Promise<void>;
    disabled?: boolean;
}

export function useMessageInput({ onSend, disabled = false }: UseMessageInputOptions) {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
    }, [value]);

    const submit = useCallback(async () => {
        const content = value.trim();

        if (!content || disabled || content.length > MAX_MESSAGE_LENGTH) {
            return;
        }

        setValue("");
        await onSend(content);
    }, [value, disabled, onSend]);

    const handleChange = useCallback((nextValue: string) => {
        if (nextValue.length > MAX_MESSAGE_LENGTH) {
            return;
        }
        setValue(nextValue);
    }, []);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void submit();
            }
        },
        [submit]
    );

    const characterCount = value.length;
    const canSend = !disabled && value.trim().length > 0 && characterCount <= MAX_MESSAGE_LENGTH;
    const isNearLimit = characterCount >= NEAR_LIMIT_THRESHOLD;

    return {
        value,
        textareaRef,
        characterCount,
        maxLength: MAX_MESSAGE_LENGTH,
        canSend,
        isNearLimit,
        handleChange,
        handleKeyDown,
        submit,
    };
}