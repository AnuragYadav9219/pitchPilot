import { Navigate, useParams } from "react-router-dom";
import { ChatMessage, SubscriptionLimitScreen, TypingIndicator } from "@/features/conversation/components";
import { Container } from "@/components/ui";
import { usePracticePage } from "../hooks/usePracticePage";
import {
    FinishDialog,
    PracticeComposer,
    PracticeEmptyState,
    PracticeErrorScreen,
    PracticeHeader,
    PracticeLoadingPage,
    PracticeSidebar,
} from "../components";

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

export default function PracticePage() {
    const { scenarioId, conversationId } = useParams<{
        scenarioId?: string;
        conversationId?: string;
    }>();

    const practice = usePracticePage(scenarioId, conversationId);

    if (!scenarioId && !conversationId) {
        return <Navigate to="/scenarios" replace />;
    }

    if (scenarioId && !practice.scenario) {
        return <Navigate to="/scenarios" replace />;
    }

    /*
     * Existing conversation failed to load.
     * Don't show the generic practice UI.
     */
    if (conversationId && practice.conversationError && !practice.subscriptionLimitReached && !practice.isLoading) {
        return <PracticeErrorScreen />;
    }

    const {
        title,
        type,
        backPath,
        messages,
        error,
        subscriptionLimitReached,
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
        showEmptyState,
    } = practice;

    const hasMessages = messages.length > 0;

    return (
        <div className="flex h-dvh overflow-hidden bg-(--vm-background) text-(--vm-text)">
            {/* SIDEBAR */}
            <PracticeSidebar
                currentConversationId={conversationId ?? null}
                mobileOpen={historyOpen}
                onCloseMobile={closeHistory}
            />

            {/* MAIN CONTENT SECTION */}
            <section className="flex min-w-0 flex-1 flex-col">
                <PracticeHeader
                    title={title}
                    type={type}
                    isSending={isSendingMessage}
                    backPath={backPath}
                    onOpenHistory={openHistory}
                />

                <main className="relative min-h-0 flex-1 overflow-hidden">
                    {subscriptionLimitReached ? (
                        <div className="h-full overflow-y-auto scrollbar-thin">
                            <Container className="h-full">
                                <div className="mx-auto max-w-3xl pb-12 pt-6 sm:pt-8">
                                    <SubscriptionLimitScreen />
                                </div>
                            </Container>
                        </div>
                    ) : (
                        <>
                            <div className="h-full overflow-y-auto scrollbar-thin">
                                <Container className="h-full">
                                    <div className="mx-auto max-w-3xl pb-48 pt-6 sm:pb-52 sm:pt-8">
                                        {isLoading && (
                                            <PracticeLoadingPage
                                                existingConversation={Boolean(conversationId)}
                                            />
                                        )}

                                        {!isLoading && showEmptyState && (
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
                                            </div>
                                        )}

                                        {!isLoading && error && (
                                            <div className="mt-4">
                                                <ErrorMessage message={error} />
                                            </div>
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
                        </>
                    )}
                </main>
            </section>

            {/* FINISH DIALOG */}
            {finishOpen && (
                <FinishDialog
                    onCancel={() => setFinishOpen(false)}
                    onConfirm={confirmFinish}
                />
            )}
        </div>
    );
}