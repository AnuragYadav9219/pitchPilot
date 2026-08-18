import { Card, Container } from "@/components/ui";
import { MessageInput } from "@/features/conversation/components";

interface PracticeComposerProps {
    onSend: (content: string) => void | Promise<void>;
    onFinish: () => void;
    finishing: boolean;
    disabled: boolean;
}

export function PracticeComposer({
    onSend,
    onFinish,
    finishing,
    disabled,
}: PracticeComposerProps) {
    return (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 pb-3 sm:pb-5">
            <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-(--vm-background) via-(--vm-background)/85 to-transparent" />

            <Container className="relative">
                <Card className="pointer-events-auto mx-auto max-w-4xl border-(--vm-border) bg-(--vm-surface)/95 p-2 shadow-2xl backdrop-blur-xl">
                    <MessageInput
                        onSend={onSend}
                        onFinish={onFinish}
                        finishing={finishing}
                        disabled={disabled}
                    />
                </Card>
            </Container>
        </div>
    );
}