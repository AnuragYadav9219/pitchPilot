import { Mic2, Sparkles, Waves } from "lucide-react";

interface VoiceInterviewerVisualProps {
    isSpeaking: boolean;
    isListening: boolean;
}

export function VoiceInterviewerVisual({ isSpeaking, isListening }: VoiceInterviewerVisualProps) {
    const isIdle = !isSpeaking && !isListening;

    return (
        <div className="flex w-full min-w-0 flex-col items-center overflow-hidden">
            {/* Avatar Stage */}
            <div className="relative flex w-full max-w-85 items-center justify-center overflow-hidden px-4 py-4 sm:max-w-100 sm:px-6 sm:py-5 lg:max-w-md xl:max-w-120">
                {/* Ambient Background Glow */}
                <div className={`absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-700 sm:h-48 sm:w-48 lg:h-56 lg:w-56 ${
                    isSpeaking ? "bg-(--vm-primary)/20 opacity-100 scale-125 animate-pulse" : isListening ? "bg-(--vm-success)/15 opacity-100 scale-110" : "bg-(--vm-primary)/5 opacity-50 scale-90"
                }`} />

                {/* Outer Pulse Ring */}
                <div className={`absolute aspect-square w-[88%] max-w-75 rounded-full border transition-all duration-700 sm:max-w-85 lg:max-w-95 ${
                    isSpeaking ? "animate-pulse border-(--vm-primary)/30 shadow-[0_0_20px_var(--vm-primary)]/10" : isListening ? "border-(--vm-success)/25" : "border-(--vm-border)"
                }`} />

                {/* Second Active Ring */}
                {(isSpeaking || isListening) && (
                    <div className={`absolute aspect-square w-[76%] max-w-65 rounded-full border transition-all duration-700 animate-spin-slow ${
                        isSpeaking ? "border-(--vm-primary)/20" : "border-(--vm-success)/20"
                    }`} />
                )}

                {/* Central Avatar Box */}
                <div className={`relative z-10 flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-[2.25rem] border shadow-2xl transition-all duration-700 sm:h-48 sm:w-48 sm:rounded-[2.5rem] lg:h-56 lg:w-56 xl:h-60 xl:w-60 ${
                    isSpeaking ? "scale-[1.04] border-(--vm-primary)/40 bg-(--vm-primary)/10 shadow-[0_0_30px_var(--vm-primary)]/20" : isListening ? "scale-[1.02] border-(--vm-success)/35 bg-(--vm-success)/8 shadow-[0_0_25px_var(--vm-success)]/15" : "border-(--vm-border) bg-(--vm-surface)"
                }`}>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-(--vm-surface-2)/70 via-transparent to-(--vm-primary)/10" />

                    {/* Icon & State Container */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-500 sm:h-18 sm:w-18 ${
                            isSpeaking ? "border-(--vm-primary)/30 bg-(--vm-primary)/15 text-(--vm-primary) scale-110 shadow-lg" : isListening ? "border-(--vm-success)/30 bg-(--vm-success)/12 text-(--vm-success) scale-105" : "border-(--vm-border) bg-(--vm-surface-2) text-(--vm-muted)"
                        }`}>
                            {isSpeaking ? <Sparkles size={30} strokeWidth={1.5} className="animate-bounce" /> : isListening ? <Waves size={30} strokeWidth={1.5} className="animate-pulse" /> : <Mic2 size={30} strokeWidth={1.5} />}
                        </div>
                        <span className="mt-3 text-[10px] font-medium tracking-wide text-(--vm-muted)">Virtual Interviewer</span>
                    </div>

                    {/* Avatar Shine Effect */}
                    {(isSpeaking || isListening) && (
                        <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-linear-to-t from-transparent via-transparent to-white/10" />
                    )}
                </div>
            </div>

            {/* Identity & Status */}
            <div className="mt-1 flex flex-col items-center text-center">
                <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${
                        isSpeaking ? "animate-pulse bg-(--vm-primary) shadow-[0_0_8px_var(--vm-primary)]" : isListening ? "animate-pulse bg-(--vm-success) shadow-[0_0_8px_var(--vm-success)]" : "bg-(--vm-muted)"
                    }`} />
                    <p className="text-sm font-semibold tracking-[-0.01em] text-(--vm-text)">AI Interviewer</p>
                </div>
                <p className="mt-1 text-xs text-(--vm-muted)">
                    {isSpeaking ? "Speaking" : isListening ? "Listening to you" : "Ready"}
                </p>
            </div>

            {/* Speaking Waveform */}
            <div className={`mt-3 flex h-5 items-center justify-center gap-1 transition-all duration-300 ${isSpeaking ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0 pointer-events-none"}`} aria-hidden="true">
                <WaveBar delay="0s" height="h-2" />
                <WaveBar delay="0.1s" height="h-4" />
                <WaveBar delay="0.2s" height="h-5" />
                <WaveBar delay="0.3s" height="h-4" />
                <WaveBar delay="0.4s" height="h-2" />
            </div>

            {/* Listening Indicator */}
            <div className={`mt-3 flex items-center gap-2 rounded-full border px-3.5 py-1.5 transition-all duration-300 ${
                isListening ? "translate-y-0 border-(--vm-success)/20 bg-(--vm-success)/10 opacity-100 shadow-[0_0_15px_var(--vm-success)]/10" : "pointer-events-none translate-y-1 border-transparent bg-transparent opacity-0"
            }`}>
                <div className="flex items-center gap-1">
                    <ListeningDot delay="0s" />
                    <ListeningDot delay="0.2s" />
                    <ListeningDot delay="0.4s" />
                </div>
                <span className="text-[9px] font-medium text-(--vm-success)">Listening for your response</span>
            </div>

            {/* Idle Message */}
            <p className={`mt-3 text-[10px] text-(--vm-muted) transition-opacity duration-300 ${isIdle ? "opacity-100" : "opacity-0"}`}>
                Your virtual interviewer is ready
            </p>
        </div>
    );
}

/* ============================================================
   SPEAKING WAVE BAR
   ============================================================ */

function WaveBar({ delay, height }: { delay: string; height: string }) {
    return (
        <span
            className={`vm-voice-wave ${height} w-1 origin-center rounded-full bg-(--vm-primary) shadow-[0_0_6px_var(--vm-primary)]`}
            style={{ animationDelay: delay }}
        />
    );
}

/* ============================================================
   LISTENING DOT
   ============================================================ */

function ListeningDot({ delay }: { delay: string }) {
    return (
        <span
            className="vm-listening-dot h-1 w-1 rounded-full bg-(--vm-success)"
            style={{ animationDelay: delay }}
        />
    );
}