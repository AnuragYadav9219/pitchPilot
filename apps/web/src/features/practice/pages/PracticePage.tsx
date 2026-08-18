import { Navigate, useParams } from "react-router-dom";

import { ChatMessage, TypingIndicator } from "@/features/conversation/components";
import { Container } from "@/components/ui";

import { usePracticePage } from "../hooks/usePracticePage";
import { FinishDialog, PracticeComposer, PracticeEmptyState, PracticeErrorScreen, PracticeHeader, PracticeLoadingPage, PracticeSidebar } from "../components";

/* ============================================================= */
/* SUB-COMPONENTS                                                */
/* ============================================================= */

function ErrorMessage({ message }: { message: string }) {
    return (
        <div
            role="alert"
            className="mx-auto max-w-md rounded-xl border border-(--vm-danger)/30 bg-(--vm-danger)/10 px-4 py-3 text-center text-sm text-(--vm-danger)"
        >
            {message}
        </div>
    );
}

/* ============================================================= */
/* MAIN COMPONENT                                                */
/* ============================================================= */

export default function PracticePage() {
    const { scenarioId, conversationId } = useParams<{
        scenarioId?: string;
        conversationId?: string;
    }>();

    const practice = usePracticePage(scenarioId, conversationId);

    // Route Guards
    if (!scenarioId && !conversationId) {
        return <Navigate to="/scenarios" replace />;
    }

    if (scenarioId && !practice.scenario) {
        return <Navigate to="/scenarios" replace />;
    }

    if (conversationId && practice.isLoadingConversation) {
        return <PracticeLoadingPage existingConversation />;
    }

    if (conversationId && practice.conversationError) {
        return <PracticeErrorScreen />;
    }

    const {
        title,
        type,
        backPath,
        messages,
        error,
        isLoading,
        isSendingMessage,
        historyOpen,
        finishOpen,
        bottomRef,
        openHistory,
        closeHistory,
        setFinishOpen,
        send,
        finish,
        confirmFinish,
    } = practice;

    const hasMessages = messages.length > 0;

    return (
        <div className="flex h-dvh overflow-hidden bg-(--vm-background) text-(--vm-text)">
            <PracticeSidebar
                currentConversationId={conversationId ?? null}
                mobileOpen={historyOpen}
                onCloseMobile={closeHistory}
            />

            <section className="flex min-w-0 flex-1 flex-col">
                <PracticeHeader
                    title={title}
                    type={type}
                    isSending={isSendingMessage}
                    backPath={backPath}
                    onOpenHistory={openHistory}
                />

                <main className="relative min-h-0 flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto scrollbar-thin">
                        <Container className="h-full">
                            <div className="mx-auto max-w-3xl pb-48 pt-6 sm:pb-52 sm:pt-8">
                                {isLoading && (
                                    <PracticeLoadingPage
                                        existingConversation={Boolean(conversationId)}
                                    />
                                )}

                                {practice.showEmptyState && (
                                    <PracticeEmptyState
                                        existingConversation={Boolean(conversationId)}
                                    />
                                )}

                                {!isLoading && hasMessages && (
                                    <div className="space-y-5">
                                        {messages.map((message) => (
                                            <ChatMessage
                                                key={message.id}
                                                message={message}
                                            />
                                        ))}

                                        {isSendingMessage && <TypingIndicator />}

                                        {error && <ErrorMessage message={error} />}
                                    </div>
                                )}

                                {!isLoading && !hasMessages && error && (
                                    <ErrorMessage message={error} />
                                )}

                                <div ref={bottomRef} />
                            </div>
                        </Container>
                    </div>

                    <PracticeComposer
                        onSend={send}
                        onFinish={finish}
                        finishing={finishOpen}
                        disabled={isLoading || isSendingMessage}
                    />
                </main>
            </section>

            {finishOpen && (
                <FinishDialog
                    onCancel={() => setFinishOpen(false)}
                    onConfirm={confirmFinish}
                />
            )}
        </div>
    );
}