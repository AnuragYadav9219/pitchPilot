import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui";
import { useGeminiLiveInterview } from "../hooks/useGeminiLiveInterview";
import {
    VoiceInterviewBackground,
    VoiceInterviewHeader,
    VoiceInterviewStatus,
    VoiceInterviewerVisual,
    ConversationHistory,
    VoiceResponsePanel,
} from "../components/live";
import { useCompleteInterviewMutation } from "../interviewApi";

interface VoiceInterviewPageProps {
    interviewId: number;
}

export default function VoiceInterviewPage({ interviewId }: VoiceInterviewPageProps) {
    const navigate = useNavigate();
    const {
        status,
        error,
        connected,
        isSpeaking,
        currentUserTranscript,
        currentAssistantTranscript,
        start,
        stop,
    } = useGeminiLiveInterview();

    const [completeInterview, { isLoading: isCompleting }] = useCompleteInterviewMutation();

    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // Derived States
    const isConnecting = status === "creating-session" || status === "connecting";
    const isConnected = status === "connected";
    const isListening = isConnected && !isSpeaking;
    const isError = status === "error";
    const isCompleted = false;

    // Timer
    useEffect(() => {
        if (!isConnected) return;
        const interval = window.setInterval(() => {
            setElapsedSeconds((prev) => prev + 1);
        }, 1000);
        return () => window.clearInterval(interval);
    }, [isConnected]);

    // Current Speaker & Caption
    const liveSpeaker: "assistant" | "user" | null = isSpeaking
        ? "assistant"
        : isListening
            ? "user"
            : null;

    const liveCaption =
        liveSpeaker === "assistant"
            ? currentAssistantTranscript
            : liveSpeaker === "user"
                ? currentUserTranscript
                : "";

    // Ambient Background Classes
    const ambientBgClasses = isSpeaking
        ? "scale-125 bg-(--vm-primary)/10 opacity-100"
        : isListening
            ? "scale-110 bg-(--vm-success)/8 opacity-100"
            : isError
                ? "scale-100 bg-(--vm-danger)/8 opacity-100"
                : "scale-90 bg-(--vm-primary)/5 opacity-60";

    const handleStart = async () => {
        try {
            await start(interviewId);
        } catch (startError) {
            console.error("Failed to start interview:", startError);
        }
    };

    const handleEndInterview = async () => {
        if (isCompleting) {
            return;
        }

        try {

            stop();
            await completeInterview(interviewId).unwrap();

            navigate(`/interviews/${interviewId}/evaluation`);

        } catch (err) {
            console.error("Failed to complete interview: ", err);
        }
    };

    return (
        <div className="relative isolate min-h-dvh overflow-hidden bg-(--vm-background) text-(--vm-text)">
            <VoiceInterviewBackground isSpeaking={isSpeaking} isListening={isListening} />

            <div className="relative z-10 flex h-dvh w-full flex-col overflow-hidden text-(--vm-text)">
                <VoiceInterviewHeader
                    title="Job Interview"
                    backPath="/practice"
                    isConnecting={isConnecting}
                    isConnected={connected}
                    isSpeaking={isSpeaking}
                    isListening={isListening}
                    isFinalizing={false}
                    isCompleted={isCompleted}
                    elapsedSeconds={elapsedSeconds}
                    onStart={handleStart}
                    onEndInterview={handleEndInterview}
                />

                <div className="flex min-h-0 flex-1 overflow-hidden">
                    <VoiceInterviewStatus
                        isConnecting={isConnecting}
                        isConnected={connected}
                        isSpeaking={isSpeaking}
                        isListening={isListening}
                        isCompleted={isCompleted}
                        isError={isError}
                    />

                    <main className="min-w-0 flex-1 overflow-y-auto overscroll-contain scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <div className="min-h-full">
                            <Container className="min-h-full">
                                <div className="flex min-h-full w-full flex-col px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
                                    <section className="relative flex min-h-105 w-full flex-1 flex-col items-center justify-center overflow-hidden py-6 sm:min-h-120 sm:py-8">
                                        <div className={`pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-1000 ${ambientBgClasses}`} />

                                        {(isSpeaking || isListening) && (
                                            <>
                                                <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-(--vm-primary)/10" />
                                                <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-[pulse_3s_ease-in-out_infinite] rounded-full border border-(--vm-primary)/5" />
                                            </>
                                        )}

                                        {isError && (
                                            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-(--vm-danger)/15" />
                                        )}

                                        <div className="relative z-10 transition-all duration-500">
                                            <VoiceInterviewerVisual isSpeaking={isSpeaking} isListening={isListening} />
                                        </div>
                                    </section>

                                    <section className={`mx-auto w-full max-w-2xl shrink-0 transition-all duration-500 ${isListening ? "scale-[1.01]" : "scale-100"}`}>
                                        <VoiceResponsePanel
                                            liveSpeaker={liveSpeaker}
                                            liveCaption={liveCaption}
                                            isListening={isListening}
                                            isSpeaking={isSpeaking}
                                        />
                                    </section>

                                    <div className="flex shrink-0 flex-col items-center gap-2 py-5">
                                        {status === "creating-session" && (
                                            <div className="flex items-center gap-2 text-[10px] text-(--vm-muted)">
                                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--vm-primary)" />
                                                <span>Preparing interview...</span>
                                            </div>
                                        )}
                                        {status === "connecting" && (
                                            <div className="flex items-center gap-2 text-[10px] text-(--vm-muted)">
                                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--vm-primary)" />
                                                <span>Connecting to VirtualMentor...</span>
                                            </div>
                                        )}
                                        {status === "connected" && (
                                            <div className="flex items-center gap-2 text-[10px] text-(--vm-muted)">
                                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--vm-success)" />
                                                <span>Voice interview active</span>
                                            </div>
                                        )}
                                        {status === "stopped" && (
                                            <div className="text-[10px] text-(--vm-muted)">Interview ended</div>
                                        )}
                                    </div>

                                    {error && (
                                        <div className="mx-auto w-full max-w-lg shrink-0 pb-4">
                                            <div role="alert" className="flex items-center gap-3 rounded-xl border border-(--vm-danger)/25 bg-(--vm-danger)/8 px-4 py-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--vm-danger)/10 text-(--vm-danger)">
                                                    <Radio size={14} className="animate-pulse" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold text-(--vm-danger)">Voice connection error</p>
                                                    <p className="mt-0.5 wrap-break-word text-[10px] leading-4 text-(--vm-danger)/70">{error}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Container>
                        </div>
                    </main>

                    <aside className="hidden w-80 shrink-0 border-l border-(--vm-border) bg-(--vm-surface)/10 lg:flex 2xl:w-96">
                        <ConversationHistory interviewId={interviewId} />
                    </aside>
                </div>
            </div>
        </div>
    );
}