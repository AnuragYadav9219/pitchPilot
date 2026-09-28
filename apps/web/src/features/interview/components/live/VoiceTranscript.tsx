import { MessageCircle, Sparkles, User } from "lucide-react";

interface VoiceTranscriptProps {
    userTranscript: string;
    assistantTranscript: string;
}

export function VoiceTranscript({
    userTranscript,
    assistantTranscript,
}: VoiceTranscriptProps) {
    const hasTranscript = Boolean(assistantTranscript) || Boolean(userTranscript);

    return (
        <section className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 shadow-sm transition-all duration-300 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-(--vm-border) pb-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--vm-primary)/10 text-(--vm-primary)">
                        <MessageCircle size={15} strokeWidth={1.8} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-(--vm-muted)">
                        Live transcript
                    </span>
                </div>
                {hasTranscript && (
                    <span className="flex items-center gap-1.5 rounded-full border border-(--vm-success)/20 bg-(--vm-success)/10 px-2.5 py-0.5 text-[9px] font-medium text-(--vm-success)">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--vm-success)" />
                        Active
                    </span>
                )}
            </div>

            {/* Content Body */}
            <div className="mt-5 space-y-4">
                {/* AI Interviewer Transcript */}
                {assistantTranscript && (
                    <div className="group flex gap-3 rounded-xl border border-(--vm-border) bg-(--vm-surface-2)/40 p-3.5 transition-all duration-300 hover:border-(--vm-primary)/30">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-(--vm-primary)/10 text-(--vm-primary) shadow-xs">
                            <Sparkles size={13} strokeWidth={2} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold text-(--vm-text)">
                                AI interviewer
                            </p>
                            <p className="mt-1 text-xs leading-6 text-(--vm-text)">
                                {assistantTranscript}
                            </p>
                        </div>
                    </div>
                )}

                {/* User Transcript */}
                {userTranscript && (
                    <div className="group flex gap-3 rounded-xl border border-(--vm-success)/20 bg-(--vm-success)/5 p-3.5 transition-all duration-300 hover:border-(--vm-success)/40">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-(--vm-success)/10 text-(--vm-success) shadow-xs">
                            <User size={13} strokeWidth={2} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold text-(--vm-text)">
                                You
                            </p>
                            <p className="mt-1 text-xs leading-6 text-(--vm-text)">
                                {userTranscript}
                            </p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!hasTranscript && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--vm-border) bg-(--vm-surface-2) text-(--vm-muted)">
                            <MessageCircle size={18} strokeWidth={1.5} />
                        </div>
                        <p className="mt-3 text-xs font-medium text-(--vm-text)">
                            Waiting for conversation
                        </p>
                        <p className="mt-1 text-[10px] leading-4 text-(--vm-muted)">
                            Your interview transcript will appear here once the conversation starts.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}