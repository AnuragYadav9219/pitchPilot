import {
    AlertCircle,
    CheckCircle2,
    Mic,
    Radio,
    ShieldCheck,
    Sparkles,
    Volume2,
} from "lucide-react";

interface VoiceInterviewStatusProps {
    isConnecting: boolean;
    isConnected: boolean;
    isSpeaking: boolean;
    isListening: boolean;
    isCompleted: boolean;
    isError: boolean;
}

/* ============================================================
   VOICE INTERVIEW STATUS / LEFT PANEL
   ============================================================ */

export function VoiceInterviewStatus({
    isConnecting,
    isConnected,
    isSpeaking,
    isListening,
    isCompleted,
    isError,
}: VoiceInterviewStatusProps) {
    /* ========================================================
       CURRENT STATE
       ======================================================== */

    const status = isError
        ? {
              title: "Connection interrupted",
              description: "Check your connection and try again.",
              icon: <AlertCircle size={16} strokeWidth={1.8} />,
              container:
                  "border-(--vm-danger)/20 bg-(--vm-danger)/5",
              iconContainer:
                  "bg-(--vm-danger)/10 text-(--vm-danger)",
              dot:
                  "animate-pulse bg-(--vm-danger) shadow-[0_0_8px_var(--vm-danger)]",
          }
        : isCompleted
          ? {
                title: "Interview completed",
                description: "Your conversation has been saved.",
                icon: <CheckCircle2 size={16} strokeWidth={1.8} />,
                container:
                    "border-(--vm-success)/20 bg-(--vm-success)/5",
                iconContainer:
                    "bg-(--vm-success)/10 text-(--vm-success)",
                dot:
                    "bg-(--vm-success) shadow-[0_0_8px_var(--vm-success)]",
            }
          : isConnecting
            ? {
                  title: "Connecting",
                  description: "Preparing your voice session.",
                  icon: (
                      <Radio
                          size={16}
                          strokeWidth={1.8}
                          className="animate-pulse"
                      />
                  ),
                  container:
                      "border-(--vm-primary)/20 bg-(--vm-primary)/5",
                  iconContainer:
                      "bg-(--vm-primary)/10 text-(--vm-primary)",
                  dot:
                      "animate-pulse bg-(--vm-primary) shadow-[0_0_8px_var(--vm-primary)]",
              }
            : isSpeaking
              ? {
                    title: "AI is speaking",
                    description: "Listen naturally to your interviewer.",
                    icon: (
                        <Volume2
                            size={16}
                            strokeWidth={1.8}
                            className="animate-pulse"
                        />
                    ),
                    container:
                        "border-(--vm-primary)/20 bg-(--vm-primary)/5",
                    iconContainer:
                        "bg-(--vm-primary)/10 text-(--vm-primary)",
                    dot:
                        "animate-pulse bg-(--vm-primary) shadow-[0_0_8px_var(--vm-primary)]",
                }
              : isListening
                ? {
                      title: "Listening",
                      description: "Your microphone is ready for your response.",
                      icon: (
                          <Mic
                              size={16}
                              strokeWidth={1.8}
                              className="animate-pulse"
                          />
                      ),
                      container:
                          "border-(--vm-success)/20 bg-(--vm-success)/5",
                      iconContainer:
                          "bg-(--vm-success)/10 text-(--vm-success)",
                      dot:
                          "animate-pulse bg-(--vm-success) shadow-[0_0_8px_var(--vm-success)]",
                  }
                : isConnected
                  ? {
                        title: "Interview active",
                        description: "Your realtime voice session is active.",
                        icon: (
                            <Radio
                                size={16}
                                strokeWidth={1.8}
                                className="animate-pulse"
                            />
                        ),
                        container:
                            "border-(--vm-success)/20 bg-(--vm-success)/5",
                        iconContainer:
                            "bg-(--vm-success)/10 text-(--vm-success)",
                        dot:
                            "animate-pulse bg-(--vm-success) shadow-[0_0_8px_var(--vm-success)]",
                    }
                  : {
                        title: "Ready to begin",
                        description: "Start when you're ready.",
                        icon: (
                            <Mic
                                size={16}
                                strokeWidth={1.8}
                            />
                        ),
                        container:
                            "border-(--vm-border) bg-(--vm-surface)/80",
                        iconContainer:
                            "bg-(--vm-surface-2) text-(--vm-muted)",
                        dot: "bg-(--vm-muted)",
                    };

    return (
        <aside className="hidden w-72 shrink-0 border-r border-(--vm-border) bg-(--vm-surface)/15 xl:flex 2xl:w-80">
            <div className="flex h-full min-h-0 w-full flex-col overflow-hidden px-5 py-5 2xl:px-6">
                {/* ========================================================
                PANEL HEADER
                ======================================================== */}

                <div className="flex shrink-0 items-center justify-between">
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-(--vm-muted)">
                            Interview room
                        </p>

                        <p className="mt-1 text-[11px] text-(--vm-muted)">
                            Live voice session
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-(--vm-border) bg-(--vm-surface)/80 px-2.5 py-1">
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                        />

                        <span className="text-[9px] font-medium text-(--vm-muted)">
                            Voice
                        </span>
                    </div>
                </div>

                {/* ========================================================
                CURRENT STATUS
                ======================================================== */}

                <div
                    className={`mt-5 shrink-0 rounded-2xl border p-4 transition-all duration-500 ${status.container}`}
                >
                    <div className="flex items-center gap-3">
                        {/* Status icon */}

                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${status.iconContainer}`}
                        >
                            {status.icon}
                        </div>

                        {/* Status information */}

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${status.dot}`}
                                />

                                <p
                                    className={`truncate text-xs font-semibold ${
                                        isError
                                            ? "text-(--vm-danger)"
                                            : isCompleted
                                              ? "text-(--vm-success)"
                                              : "text-(--vm-text)"
                                    }`}
                                >
                                    {status.title}
                                </p>
                            </div>

                            <p className="mt-1 text-[10px] leading-4 text-(--vm-muted)">
                                {status.description}
                            </p>
                        </div>
                    </div>

                    {/* Active session indicator */}

                    {(isConnected || isConnecting) &&
                        !isCompleted &&
                        !isError && (
                            <div className="mt-4 border-t border-(--vm-border)/70 pt-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-(--vm-muted)">
                                        Session
                                    </span>

                                    <div className="flex items-center gap-1.5">
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${
                                                isConnecting
                                                    ? "animate-pulse bg-(--vm-primary)"
                                                    : "animate-pulse bg-(--vm-success)"
                                            }`}
                                        />

                                        <span className="text-[9px] font-medium text-(--vm-muted)">
                                            {isConnecting
                                                ? "Establishing"
                                                : "Realtime"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>

                {/* ========================================================
                INTERVIEW GUIDE
                ======================================================== */}

                <div className="mt-7 min-h-0 flex-1 overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--vm-primary)/8 text-(--vm-primary)">
                            <Sparkles
                                size={13}
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-(--vm-muted)">
                                Interview guide
                            </p>

                            <p className="mt-0.5 text-[9px] text-(--vm-muted)">
                                Keep these in mind
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 space-y-3">
                        <GuideItem
                            number="01"
                            title="Speak naturally"
                            description="Answer as if you're speaking with a real interviewer."
                        />

                        <GuideItem
                            number="02"
                            title="Take your time"
                            description="A short pause before answering is completely fine."
                        />

                        <GuideItem
                            number="03"
                            title="Use real examples"
                            description="Support your responses with relevant experience."
                        />

                        <GuideItem
                            number="04"
                            title="Stay conversational"
                            description="Focus on communicating clearly rather than being perfect."
                        />
                    </div>
                </div>

                {/* ========================================================
                PRIVACY / SESSION INFO
                ======================================================== */}

                <div className="mt-5 shrink-0">
                    <div className="rounded-2xl border border-(--vm-border) bg-(--vm-surface)/70 p-3.5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--vm-success)/8 text-(--vm-success)">
                                <ShieldCheck
                                    size={14}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-[10px] font-semibold text-(--vm-text)">
                                        Private session
                                    </p>

                                    <span className="h-1 w-1 rounded-full bg-(--vm-border)" />

                                    <span className="text-[9px] text-(--vm-success)">
                                        Secure
                                    </span>
                                </div>

                                <p className="mt-1 text-[9px] leading-4 text-(--vm-muted)">
                                    Your conversation is saved securely for
                                    history and evaluation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

/* ============================================================
   GUIDE ITEM
   ============================================================ */

function GuideItem({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <div className="group relative rounded-xl border border-transparent p-2.5 transition-all duration-300 hover:border-(--vm-border) hover:bg-(--vm-surface)/60">
            <div className="flex gap-3">
                {/* Number */}

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-(--vm-surface-2) text-[9px] font-semibold tabular-nums text-(--vm-muted) transition-all duration-300 group-hover:bg-(--vm-primary)/8 group-hover:text-(--vm-primary)">
                    {number}
                </div>

                {/* Content */}

                <div className="min-w-0 pt-0.5">
                    <p className="text-[11px] font-semibold text-(--vm-text)">
                        {title}
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-(--vm-muted)">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}


























// import {
//     CheckCircle2,
//     Clock3,
//     Lightbulb,
//     Lock,
//     Mic,
//     Radio,
//     Sparkles,
//     Target,
//     Volume2,
// } from "lucide-react";

// interface VoiceInterviewStatusProps {
//     isConnecting: boolean;
//     isConnected: boolean;
//     isSpeaking: boolean;
//     isListening: boolean;
//     isCompleted: boolean;
//     isError: boolean;

//     /**
//      * Optional values that can be supplied by the parent.
//      * They have sensible defaults so the component works immediately.
//      */
//     focus?: string;
//     focusDescription?: string;
//     answerFramework?: string;
//     frameworkSteps?: string[];
//     voiceTips?: string[];
//     questionsAnswered?: number;
//     sessionDuration?: string;
// }

// function getStatus(
//     isConnecting: boolean,
//     isConnected: boolean,
//     isSpeaking: boolean,
//     isListening: boolean,
//     isCompleted: boolean,
//     isError: boolean
// ) {
//     if (isError) {
//         return {
//             label: "Connection error",
//             icon: Radio,
//             className: "text-[var(--vm-danger)]",
//             dotClassName: "bg-[var(--vm-danger)]",
//         };
//     }

//     if (isCompleted) {
//         return {
//             label: "Interview completed",
//             icon: CheckCircle2,
//             className: "text-[var(--vm-success)]",
//             dotClassName: "bg-[var(--vm-success)]",
//         };
//     }

//     if (isConnecting) {
//         return {
//             label: "Connecting",
//             icon: Radio,
//             className: "text-[var(--vm-warning)]",
//             dotClassName: "bg-[var(--vm-warning)]",
//         };
//     }

//     if (isSpeaking) {
//         return {
//             label: "Interviewer speaking",
//             icon: Volume2,
//             className: "text-[var(--vm-primary)]",
//             dotClassName: "bg-[var(--vm-primary)]",
//         };
//     }

//     if (isListening) {
//         return {
//             label: "Listening to you",
//             icon: Mic,
//             className: "text-[var(--vm-success)]",
//             dotClassName: "bg-[var(--vm-success)]",
//         };
//     }

//     if (isConnected) {
//         return {
//             label: "Live",
//             icon: Radio,
//             className: "text-[var(--vm-success)]",
//             dotClassName: "bg-[var(--vm-success)]",
//         };
//     }

//     return {
//         label: "Waiting",
//         icon: Radio,
//         className: "text-[var(--vm-muted)]",
//         dotClassName: "bg-[var(--vm-muted)]",
//     };
// }

// export function VoiceInterviewStatus({
//     isConnecting,
//     isConnected,
//     isSpeaking,
//     isListening,
//     isCompleted,
//     isError,
//     focus = "Clear and specific answers",
//     focusDescription = "Support your answers with real examples and explain your reasoning clearly.",
//     answerFramework = "STAR Method",
//     frameworkSteps = ["Situation", "Task", "Action", "Result"],
//     voiceTips = [
//         "Speak naturally",
//         "Avoid rushing",
//         "Pause before answering",
//         "Keep your answer focused",
//     ],
//     questionsAnswered = 0,
//     sessionDuration = "00:00",
// }: VoiceInterviewStatusProps) {
//     const status = getStatus(
//         isConnecting,
//         isConnected,
//         isSpeaking,
//         isListening,
//         isCompleted,
//         isError
//     );

//     const StatusIcon = status.icon;

//     return (
//         <aside className="hidden h-full w-[300px] shrink-0 flex-col border-r border-[var(--vm-border)] bg-[var(--vm-surface)] xl:flex">
//             {/* =========================================================
//                 HEADER
//             ========================================================== */}
//             <div className="border-b border-[var(--vm-border)] px-5 py-4">
//                 <div className="flex items-center gap-2.5">
//                     <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--vm-border)] bg-[var(--vm-surface-2)]">
//                         <Sparkles className="h-4 w-4 text-[var(--vm-primary)]" />
//                     </div>

//                     <div className="min-w-0">
//                         <p className="text-sm font-semibold tracking-tight text-[var(--vm-text)]">
//                             Interview Console
//                         </p>

//                         <p className="mt-0.5 text-[10px] text-[var(--vm-muted)]">
//                             AI-powered voice interview
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* =========================================================
//                 CURRENT STATUS
//             ========================================================== */}
//             <div className="px-4 pt-4">
//                 <div className="flex items-center justify-between rounded-xl border border-[var(--vm-border)] bg-[var(--vm-surface-2)] px-3 py-2.5">
//                     <div className="flex min-w-0 items-center gap-2.5">
//                         <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--vm-background)]">
//                             <StatusIcon
//                                 className={`h-3.5 w-3.5 ${status.className}`}
//                             />
//                         </div>

//                         <div className="min-w-0">
//                             <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-[var(--vm-muted)]">
//                                 Session status
//                             </p>

//                             <p className="truncate text-xs font-medium text-[var(--vm-text)]">
//                                 {status.label}
//                             </p>
//                         </div>
//                     </div>

//                     {isConnected && !isCompleted && !isError && (
//                         <span className="relative flex h-2 w-2 shrink-0">
//                             <span
//                                 className={`absolute inline-flex h-full w-full animate-ping rounded-full ${status.dotClassName} opacity-60`}
//                             />

//                             <span
//                                 className={`relative inline-flex h-2 w-2 rounded-full ${status.dotClassName}`}
//                             />
//                         </span>
//                     )}
//                 </div>
//             </div>

//             {/* =========================================================
//                 MAIN CONTENT
//             ========================================================== */}
//             <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
//                 <div className="space-y-4">
//                     {/* -------------------------------------------------
//                         INTERVIEW GUIDE
//                     -------------------------------------------------- */}
//                     <section>
//                         <div className="mb-2.5 flex items-center gap-2">
//                             <Target className="h-3.5 w-3.5 text-[var(--vm-primary)]" />

//                             <h2 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--vm-muted)]">
//                                 Interview guide
//                             </h2>
//                         </div>

//                         <div className="rounded-xl border border-[var(--vm-border)] bg-[var(--vm-surface-2)] p-3.5">
//                             <div className="mb-2 flex items-start gap-2.5">
//                                 <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--vm-primary)]/10">
//                                     <Target className="h-3.5 w-3.5 text-[var(--vm-primary)]" />
//                                 </div>

//                                 <div className="min-w-0">
//                                     <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--vm-primary)]">
//                                         Current focus
//                                     </p>

//                                     <p className="mt-1 text-xs font-semibold leading-5 text-[var(--vm-text)]">
//                                         {focus}
//                                     </p>
//                                 </div>
//                             </div>

//                             <p className="text-[10px] leading-[1.6] text-[var(--vm-muted)]">
//                                 {focusDescription}
//                             </p>
//                         </div>
//                     </section>

//                     {/* -------------------------------------------------
//                         ANSWER FRAMEWORK
//                     -------------------------------------------------- */}
//                     <section>
//                         <div className="mb-2.5 flex items-center gap-2">
//                             <Lightbulb className="h-3.5 w-3.5 text-[var(--vm-warning)]" />

//                             <h2 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--vm-muted)]">
//                                 Answer framework
//                             </h2>
//                         </div>

//                         <div className="rounded-xl border border-[var(--vm-border)] bg-[var(--vm-surface-2)] p-3.5">
//                             <p className="mb-3 text-xs font-semibold text-[var(--vm-text)]">
//                                 {answerFramework}
//                             </p>

//                             <div className="space-y-2">
//                                 {frameworkSteps.map((step, index) => (
//                                     <div
//                                         key={`${step}-${index}`}
//                                         className="flex items-center gap-2.5"
//                                     >
//                                         <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--vm-border)] bg-[var(--vm-background)] text-[9px] font-semibold text-[var(--vm-muted)]">
//                                             {index + 1}
//                                         </div>

//                                         <span className="text-[10px] text-[var(--vm-text)]">
//                                             {step}
//                                         </span>

//                                         {index < frameworkSteps.length - 1 && (
//                                             <span className="ml-auto text-[10px] text-[var(--vm-muted)]">
//                                                 →
//                                             </span>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </section>

//                     {/* -------------------------------------------------
//                         VOICE TIPS
//                     -------------------------------------------------- */}
//                     <section>
//                         <div className="mb-2.5 flex items-center gap-2">
//                             <Mic className="h-3.5 w-3.5 text-[var(--vm-success)]" />

//                             <h2 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--vm-muted)]">
//                                 Voice tips
//                             </h2>
//                         </div>

//                         <div className="rounded-xl border border-[var(--vm-border)] bg-[var(--vm-surface-2)] p-3.5">
//                             <div className="space-y-2.5">
//                                 {voiceTips.map((tip, index) => (
//                                     <div
//                                         key={`${tip}-${index}`}
//                                         className="flex items-start gap-2"
//                                     >
//                                         <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--vm-primary)]" />

//                                         <p className="text-[10px] leading-4 text-[var(--vm-muted)]">
//                                             {tip}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </section>

//                     {/* -------------------------------------------------
//                         SESSION
//                     -------------------------------------------------- */}
//                     <section>
//                         <div className="mb-2.5 flex items-center gap-2">
//                             <Clock3 className="h-3.5 w-3.5 text-[var(--vm-muted)]" />

//                             <h2 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--vm-muted)]">
//                                 Session
//                             </h2>
//                         </div>

//                         <div className="grid grid-cols-2 gap-2">
//                             <div className="rounded-xl border border-[var(--vm-border)] bg-[var(--vm-surface-2)] px-3 py-3">
//                                 <p className="text-[9px] text-[var(--vm-muted)]">
//                                     Questions
//                                 </p>

//                                 <p className="mt-1 text-sm font-semibold text-[var(--vm-text)]">
//                                     {questionsAnswered}
//                                 </p>
//                             </div>

//                             <div className="rounded-xl border border-[var(--vm-border)] bg-[var(--vm-surface-2)] px-3 py-3">
//                                 <p className="text-[9px] text-[var(--vm-muted)]">
//                                     Duration
//                                 </p>

//                                 <p className="mt-1 text-sm font-semibold tabular-nums text-[var(--vm-text)]">
//                                     {sessionDuration}
//                                 </p>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </div>

//             {/* =========================================================
//                 PRIVATE SESSION FOOTER
//             ========================================================== */}
//             <div className="border-t border-[var(--vm-border)] px-4 py-3">
//                 <div className="flex items-center gap-2.5">
//                     <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--vm-success)]/10">
//                         <Lock className="h-3.5 w-3.5 text-[var(--vm-success)]" />
//                     </div>

//                     <div className="min-w-0">
//                         <p className="text-[10px] font-semibold text-[var(--vm-text)]">
//                             Private session
//                         </p>

//                         <p className="truncate text-[9px] text-[var(--vm-muted)]">
//                             Your interview data is protected
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </aside>
//     );
// }