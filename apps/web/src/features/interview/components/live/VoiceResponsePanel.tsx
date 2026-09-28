// import { Mic, Radio, Sparkles } from "lucide-react";

// interface VoiceResponsePanelProps {
//     liveSpeaker: "assistant" | "user" | null;
//     liveCaption: string;
//     isListening: boolean;
//     isSpeaking: boolean;
// }

// export function VoiceResponsePanel({
//     liveSpeaker,
//     liveCaption,
//     isListening,
//     isSpeaking,
// }: VoiceResponsePanelProps) {
//     const hasCaption = Boolean(liveCaption.trim());
//     const isAssistant = liveSpeaker === "assistant";

//     const title = isAssistant ? "AI Interviewer" : "Your response";
//     const subtitle = isAssistant ? "Speaking now" : "Your voice is being captured";

//     return (
//         <section className="relative overflow-hidden rounded-3xl border border-(--vm-border) bg-(--vm-surface)">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />

//             <div className="relative p-5">
//                 {/* Header Info */}
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <div
//                             className={[
//                                 "flex h-11 w-11 items-center justify-center rounded-2xl border",
//                                 isAssistant
//                                     ? "border-(--vm-primary)/30 bg-(--vm-primary)/10"
//                                     : "border-(--vm-success)/30 bg-(--vm-success)/10",
//                             ].join(" ")}
//                         >
//                             {isAssistant ? (
//                                 <Sparkles className="h-5 w-5 text-(--vm-primary)" />
//                             ) : (
//                                 <Mic className="h-5 w-5 text-(--vm-success)" />
//                             )}
//                         </div>

//                         <div>
//                             <h3 className="text-sm font-semibold text-(--vm-text)">
//                                 {title}
//                             </h3>
//                             <p className="mt-0.5 text-xs text-(--vm-muted)">
//                                 {subtitle}
//                             </p>
//                         </div>
//                     </div>

//                     <div
//                         className={[
//                             "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
//                             isAssistant
//                                 ? "border-(--vm-primary)/30 bg-(--vm-primary)/10 text-(--vm-primary)"
//                                 : "border-(--vm-success)/30 bg-(--vm-success)/10 text-(--vm-success)",
//                         ].join(" ")}
//                     >
//                         <Radio className="h-3.5 w-3.5" />
//                         {isAssistant
//                             ? "AI speaking"
//                             : isListening
//                                 ? "Listening"
//                                 : "Ready"}
//                     </div>
//                 </div>

//                 {/* Caption / Wave Box */}
//                 <div className="mt-5 min-h-24 rounded-2xl border border-(--vm-border) bg-(--vm-background)/60 p-4">
//                     {hasCaption ? (
//                         <div className="space-y-3">
//                             <div className="flex items-center gap-2">
//                                 <span
//                                     className={[
//                                         "h-2 w-2 rounded-full",
//                                         isAssistant ? "bg-(--vm-primary)" : "bg-(--vm-success)",
//                                     ].join(" ")}
//                                 />
//                                 <span className="text-xs font-semibold uppercase tracking-wider text-(--vm-muted)">
//                                     {isAssistant ? "AI Interviewer" : "You"}
//                                 </span>
//                             </div>

//                             <p className="text-sm leading-7 text-(--vm-text)">
//                                 {liveCaption}
//                             </p>

//                             <div className="flex items-center gap-1.5">
//                                 {[0, 1, 2, 3, 4].map((index) => (
//                                     <span
//                                         key={index}
//                                         className="vm-response-wave h-4 w-1 rounded-full bg-(--vm-primary)"
//                                         style={{
//                                             animationDelay: `${index * 90}ms`,
//                                         }}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="flex min-h-16 items-center justify-center text-center">
//                             <p className="text-sm text-(--vm-muted)">
//                                 {isSpeaking
//                                     ? "The interviewer is speaking..."
//                                     : "Speak naturally. I'm listening."}
//                             </p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }



























import {
    Mic,
    Radio,
    Sparkles,
} from "lucide-react";

interface VoiceResponsePanelProps {
    liveSpeaker: "assistant" | "user" | null;
    liveCaption: string;
    isListening: boolean;
    isSpeaking: boolean;
}

export function VoiceResponsePanel({
    liveSpeaker,
    liveCaption,
    isListening,
    isSpeaking,
}: VoiceResponsePanelProps) {
    const hasCaption = Boolean(
        liveCaption.trim(),
    );

    const isAssistant =
        liveSpeaker === "assistant";

    const isUser =
        liveSpeaker === "user";

    /*
     * ------------------------------------------------------------
     * STATE
     * ------------------------------------------------------------
     */

    const title = isAssistant
        ? "AI Interviewer"
        : isUser
            ? "Your response"
            : "Voice Interview";

    const subtitle = isAssistant
        ? "Speaking now"
        : isUser
            ? "Your voice is being captured"
            : isListening
                ? "Listening..."
                : "Ready";

    const statusLabel = isAssistant
        ? "AI speaking"
        : isUser
            ? "Listening"
            : isListening
                ? "Listening"
                : "Ready";

    /*
     * ------------------------------------------------------------
     * COLORS
     * ------------------------------------------------------------
     */

    const iconContainerClass =
        isAssistant
            ? "border-(--vm-primary)/30 bg-(--vm-primary)/10"
            : isUser
                ? "border-(--vm-success)/30 bg-(--vm-success)/10"
                : "border-(--vm-border) bg-(--vm-background)/50";

    const iconClass =
        isAssistant
            ? "text-(--vm-primary)"
            : isUser
                ? "text-(--vm-success)"
                : "text-(--vm-muted)";

    const statusClass =
        isAssistant
            ? "border-(--vm-primary)/30 bg-(--vm-primary)/10 text-(--vm-primary)"
            : isUser
                ? "border-(--vm-success)/30 bg-(--vm-success)/10 text-(--vm-success)"
                : "border-(--vm-border) bg-(--vm-background)/50 text-(--vm-muted)";

    const dotClass =
        isAssistant
            ? "bg-(--vm-primary)"
            : isUser
                ? "bg-(--vm-success)"
                : "bg-(--vm-muted)";

    /*
     * ------------------------------------------------------------
     * ICON
     * ------------------------------------------------------------
     */

    const Icon = isAssistant
        ? Sparkles
        : Mic;

    return (
        <section className="relative overflow-hidden rounded-3xl border border-(--vm-border) bg-(--vm-surface)">
            {/* ====================================================
                AMBIENT BACKGROUND
            ==================================================== */}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />

            <div className="relative p-5">
                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex items-center justify-between gap-4">
                    {/* LEFT */}

                    <div className="flex min-w-0 items-center gap-3">
                        <div
                            className={[
                                "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300",
                                iconContainerClass,
                            ].join(" ")}
                        >
                            <Icon
                                className={[
                                    "h-5 w-5 transition-all duration-300",
                                    iconClass,
                                ].join(" ")}
                            />
                        </div>

                        <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-(--vm-text)">
                                {title}
                            </h3>

                            <p className="mt-0.5 truncate text-xs text-(--vm-muted)">
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    {/* STATUS */}

                    <div
                        className={[
                            "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300",
                            statusClass,
                        ].join(" ")}
                    >
                        <Radio
                            className={[
                                "h-3.5 w-3.5",
                                isAssistant || isUser
                                    ? "animate-pulse"
                                    : "",
                            ].join(" ")}
                        />

                        <span>
                            {statusLabel}
                        </span>
                    </div>
                </div>

                {/* =================================================
                    CAPTION
                ================================================= */}

                <div className="mt-5 min-h-24 rounded-2xl border border-(--vm-border) bg-(--vm-background)/60 p-4">
                    {hasCaption ? (
                        <div className="space-y-3">
                            {/* SPEAKER */}

                            <div className="flex items-center gap-2">
                                <span
                                    className={[
                                        "h-2 w-2 rounded-full",
                                        dotClass,
                                        isAssistant ||
                                        isUser
                                            ? "animate-pulse"
                                            : "",
                                    ].join(" ")}
                                />

                                <span className="text-xs font-semibold uppercase tracking-wider text-(--vm-muted)">
                                    {isAssistant
                                        ? "AI Interviewer"
                                        : isUser
                                            ? "You"
                                            : "Voice"}
                                </span>
                            </div>

                            {/* CAPTION */}

                            <p className="max-h-32 overflow-y-auto text-sm leading-7 text-(--vm-text) scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                {liveCaption}
                            </p>

                            {/* AUDIO WAVE */}

                            {(isAssistant ||
                                isUser) && (
                                <div className="flex h-5 items-center gap-1.5">
                                    {[0, 1, 2, 3, 4].map(
                                        (index) => (
                                            <span
                                                key={
                                                    index
                                                }
                                                className={[
                                                    "vm-response-wave h-4 w-1 rounded-full",
                                                    isAssistant
                                                        ? "bg-(--vm-primary)"
                                                        : "bg-(--vm-success)",
                                                ].join(
                                                    " ",
                                                )}
                                                style={{
                                                    animationDelay: `${index * 90}ms`,
                                                }}
                                            />
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        /* =================================================
                           EMPTY STATE
                        ================================================= */

                        <div className="flex min-h-16 items-center justify-center text-center">
                            <div className="space-y-1">
                                <p className="text-sm text-(--vm-muted)">
                                    {isSpeaking
                                        ? "The interviewer is speaking..."
                                        : isListening
                                            ? "Speak naturally. I'm listening."
                                            : "Your voice interview is ready."}
                                </p>

                                {!isSpeaking &&
                                    !isListening && (
                                        <p className="text-[10px] text-(--vm-muted)/60">
                                            Start speaking when you're ready.
                                        </p>
                                    )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}