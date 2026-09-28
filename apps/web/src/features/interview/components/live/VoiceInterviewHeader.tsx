import { Logo } from "@/components/branding/Logo";
import { Brand } from "@virtualmentor/shared";
import {
    ArrowLeft,
    Check,
    CheckCircle2,
    Clock3,
    LoaderCircle,
    Mic,
    MicOff,
    MoreVertical,
    PhoneOff,
    Radio,
    Volume2,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface VoiceInterviewHeaderProps {
    title: string;
    backPath?: string;
    isConnecting: boolean;
    isConnected: boolean;
    isSpeaking: boolean;
    isListening: boolean;
    isFinalizing: boolean;
    isCompleted?: boolean;
    elapsedSeconds?: number;
    onStart?: () => void;
    onEndInterview?: () => void;
}

const formatDuration = (totalSeconds: number) =>
    `${String(Math.floor(totalSeconds / 60)).padStart(2, "0")}:${String(totalSeconds % 60).padStart(2, "0")}`;

export function VoiceInterviewHeader({
    title,
    backPath = "/practice",
    isConnecting,
    isConnected,
    isSpeaking,
    isListening,
    isFinalizing,
    isCompleted = false,
    elapsedSeconds = 0,
    onStart,
    onEndInterview,
}: VoiceInterviewHeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [muted, setMuted] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu on click outside or Escape
    useEffect(() => {
        if (!menuOpen) return;
        const handlePointer = (e: PointerEvent) => menuRef.current && !menuRef.current.contains(e.target as Node) && setMenuOpen(false);
        const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);

        document.addEventListener("pointerdown", handlePointer);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("pointerdown", handlePointer);
            document.removeEventListener("keydown", handleKey);
        };
    }, [menuOpen]);

    const hasStarted = isConnecting || isConnected;

    // Resolve Status Properties
    const getStatusConfig = () => {
        if (isCompleted) return { label: "Completed", icon: <CheckCircle2 size={13} />, class: "border-(--vm-success)/20 bg-(--vm-success)/8 text-(--vm-success)", dot: "bg-(--vm-success)" };
        if (isConnecting) return { label: "Connecting", icon: <LoaderCircle size={13} className="animate-spin" />, class: "border-(--vm-primary)/20 bg-(--vm-primary)/8 text-(--vm-primary)", dot: "animate-pulse bg-(--vm-primary) shadow-[0_0_7px_var(--vm-primary)]" };
        if (isSpeaking) return { label: "Speaking", icon: <Volume2 size={13} />, class: "border-(--vm-primary)/20 bg-(--vm-primary)/8 text-(--vm-primary)", dot: "animate-pulse bg-(--vm-primary) shadow-[0_0_7px_var(--vm-primary)]" };
        if (isListening) return { label: "Listening", icon: <Mic size={13} />, class: "border-(--vm-success)/20 bg-(--vm-success)/8 text-(--vm-success)", dot: "animate-pulse bg-(--vm-success) shadow-[0_0_7px_var(--vm-success)]" };
        if (isConnected) return { label: "Live", icon: <Radio size={13} />, class: "border-(--vm-success)/20 bg-(--vm-success)/8 text-(--vm-success)", dot: "animate-pulse bg-(--vm-success) shadow-[0_0_7px_var(--vm-success)]" };
        return { label: "Offline", icon: <Radio size={13} />, class: "border-(--vm-border) bg-(--vm-background)/50 text-(--vm-muted)", dot: "bg-(--vm-muted)" };
    };

    const status = getStatusConfig();

    return (
        <header className="relative z-40 h-18 w-full shrink-0 border-b border-(--vm-border) bg-(--vm-surface)/80 backdrop-blur-xl">
            <div className="flex h-full w-full">
                {/* Left */}
                <div className="hidden w-72 shrink-0 items-center border-r border-(--vm-border) px-5 xl:flex 2xl:w-80 2xl:px-6">
                    <Logo showName size="md" />
                </div>

                {/* Center */}
                <div className="flex min-w-0 flex-1 items-center px-4 sm:px-6 lg:px-7">
                    <div className="flex min-w-0 items-center gap-3">
                        <Link to={backPath} aria-label="Back to scenarios" className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-(--vm-muted) transition-all hover:bg-(--vm-surface-2) hover:text-(--vm-text)">
                            <ArrowLeft size={20} strokeWidth={1.8} className="transition-transform group-hover:-translate-x-0.5" />
                        </Link>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h1 className="truncate text-sm font-semibold tracking-[-0.01em] text-(--vm-text) sm:text-base">{title}</h1>
                                <span className="hidden h-4 w-px bg-(--vm-border) sm:block" />
                                <span className="hidden text-[10px] font-medium text-(--vm-muted) sm:block">Voice interview</span>
                            </div>
                            <div className="mt-0.5 flex items-center gap-1.5">
                                <span className="truncate text-[10px] text-(--vm-muted)">{Brand.name} interview room</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="flex shrink-0 items-center justify-end gap-2 px-3 sm:px-4 2xl:px-5">
                    {/* Primary Action Button */}
                    {!hasStarted && !isCompleted ? (
                        <button
                            type="button"
                            onClick={() => { setMenuOpen(false); onStart?.(); }}
                            disabled={isConnecting}
                            className="group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-(--vm-primary) px-2.5 text-[11px] font-semibold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:px-3.5"
                        >
                            <Mic size={13} strokeWidth={2} className={isConnecting ? "animate-pulse" : "group-hover:scale-105"} />
                            <span className="sm:hidden">{isConnecting ? "..." : "Start"}</span>
                            <span className="hidden sm:inline">{isConnecting ? "Connecting..." : "Start interview"}</span>
                        </button>
                    ) : isConnected && !isCompleted ? (
                        <button
                            type="button"
                            onClick={() => { setMenuOpen(false); onEndInterview?.(); }}
                            disabled={isFinalizing}
                            aria-label={isFinalizing ? "Ending interview" : "End interview"}
                            className="group inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-(--vm-danger)/25 bg-(--vm-danger)/10 px-2.5 text-[11px] font-semibold text-(--vm-danger) shadow-sm transition-all hover:scale-[1.02] hover:bg-(--vm-danger)/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:px-3.5"
                        >
                            {isFinalizing ? <span className="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-(--vm-danger)/30 border-t-(--vm-danger)" /> : <PhoneOff size={13} strokeWidth={2} className="shrink-0 group-hover:scale-105" />}
                            <span className="whitespace-nowrap">{isFinalizing ? "Ending" : "End"}</span>
                            <span className="hidden whitespace-nowrap sm:inline">{isFinalizing ? "..." : " interview"}</span>
                        </button>
                    ) : (
                        <div className={`flex h-9 items-center gap-1.5 rounded-lg border px-2.5 transition-all sm:gap-2 sm:px-3 ${status.class}`}>
                            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${status.dot}`} />
                            <span className="flex items-center gap-1.5">
                                {status.icon}
                                <span className="hidden text-[10px] font-semibold sm:inline">{status.label}</span>
                            </span>
                        </div>
                    )}

                    {/* Timer */}
                    <div className="flex h-9 items-center gap-1.5 rounded-lg border border-(--vm-border) bg-(--vm-background)/50 px-2.5 sm:gap-2 sm:px-3">
                        <Clock3 size={13} className="shrink-0 text-(--vm-muted)" />
                        <span className="text-[11px] font-semibold tabular-nums text-(--vm-text) sm:text-xs">{formatDuration(elapsedSeconds)}</span>
                    </div>

                    {/* Menu Toggle & Dropdown */}
                    <div ref={menuRef} className="relative">
                        <button
                            type="button"
                            aria-label="Interview options"
                            aria-haspopup="menu"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((c) => !c)}
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all ${menuOpen ? "border-(--vm-border) bg-(--vm-surface-2) text-(--vm-text)" : "border-transparent text-(--vm-muted) hover:border-(--vm-border) hover:bg-(--vm-surface-2) hover:text-(--vm-text)"}`}
                        >
                            <MoreVertical size={18} strokeWidth={1.8} />
                        </button>

                        <div role="menu" className={`absolute right-0 top-[calc(100%+10px)] w-64 origin-top-right rounded-2xl border border-(--vm-border) bg-(--vm-surface-solid) p-1.5 shadow-2xl transition-all ${menuOpen ? "visible translate-y-0 scale-100 opacity-100" : "pointer-events-none invisible -translate-y-2 scale-95 opacity-0"}`}>
                            <div className="px-3 py-2.5">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-(--vm-muted)">Interview controls</p>
                            </div>

                            <div className="mb-1 rounded-xl bg-(--vm-surface-2)/60 px-3 py-2.5">
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${status.class}`}>{status.icon}</div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-(--vm-text)">{status.label}</p>
                                        <p className="mt-0.5 text-[9px] text-(--vm-muted)">{isCompleted ? "Session finished" : isConnecting ? "Establishing voice connection" : isSpeaking ? "Interviewer is speaking" : isListening ? "Microphone is active" : isConnected ? "Realtime voice connection" : "Interview has not started"}</p>
                                    </div>
                                </div>
                            </div>

                            <button type="button" role="menuitem" onClick={() => setMuted((c) => !c)} disabled={!isConnected} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-(--vm-surface-2) disabled:cursor-not-allowed disabled:opacity-40">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--vm-surface-2) text-(--vm-muted)">
                                    {muted ? <MicOff size={15} /> : <Mic size={15} />}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-(--vm-text)">{muted ? "Microphone muted" : "Microphone active"}</p>
                                    <p className="mt-0.5 text-[9px] text-(--vm-muted)">{muted ? "Microphone control" : "Voice input is enabled"}</p>
                                </div>
                                {muted && <Check size={15} className="text-(--vm-success)" />}
                            </button>

                            <MenuInfoItem icon={<Radio size={15} />} title="Voice connection" subtitle={isConnected ? "Realtime connection active" : isConnecting ? "Connecting..." : "Offline"} dot={isConnected ? "bg-(--vm-success) shadow-[0_0_7px_var(--vm-success)] animate-pulse" : isConnecting ? "bg-(--vm-primary) shadow-[0_0_7px_var(--vm-primary)] animate-pulse" : "bg-(--vm-muted)"} />
                            <MenuInfoItem icon={<Clock3 size={15} />} title="Session duration" subtitle={formatDuration(elapsedSeconds)} />

                            <div className="my-1.5 h-px bg-(--vm-border)" />

                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => { setMenuOpen(false); onEndInterview?.(); }}
                                disabled={!isConnected || isFinalizing}
                                aria-label={isFinalizing ? "Ending interview" : "End interview"}
                                className="flex w-full min-w-0 cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-(--vm-danger) transition-colors hover:bg-(--vm-danger)/8 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--vm-danger)/8">
                                    {isFinalizing ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-(--vm-danger)/30 border-t-(--vm-danger)" /> : <PhoneOff size={15} strokeWidth={2} />}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-medium">{isFinalizing ? "Ending interview..." : "End interview"}</p>
                                    <p className="mt-0.5 truncate text-[9px] text-(--vm-danger)/70">{isFinalizing ? "Please wait" : "Finish this conversation"}</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

// Helper sub-component to eliminate duplicate block structures inside the menu
function MenuInfoItem({ icon, title, subtitle, dot }: { icon: ReactNode; title: string; subtitle: string; dot?: string }) {
    return (
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--vm-surface-2) text-(--vm-muted)">{icon}</div>
            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-(--vm-text)">{title}</p>
                <p className="mt-0.5 text-[9px] text-(--vm-muted)">{subtitle}</p>
            </div>
            {dot && <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />}
        </div>
    );
}