import { useCallback, useEffect, useRef, useState } from "react";
import { useCreateVoiceSessionMutation, useSaveConversationMessageMutation } from "../interviewApi";
import type { ConnectionStatus, TranscriptMessage } from "../types";

/* ============================================================
   GEMINI LIVE TYPES
============================================================ */
interface GeminiLiveMessage {
    setupComplete?: unknown;
    sessionResumptionUpdate?: { newHandle?: string; resumable?: boolean };
    usageMetadata?: unknown;
    serverContent?: {
        modelTurn?: { parts?: Array<{ text?: string; inlineData?: { data?: string; mimeType?: string } }> };
        inputTranscription?: { text?: string };
        interimInputTranscription?: { text?: string };
        outputTranscription?: { text?: string };
        turnComplete?: boolean;
        interrupted?: boolean;
        generationComplete?: boolean;
        waitingForInput?: boolean;
    };
}

interface UseGeminiLiveInterviewReturn {
    start: (interviewId: number) => Promise<void>;
    stop: () => Promise<void>;
    status: ConnectionStatus;
    error: string | null;
    connected: boolean;
    isSpeaking: boolean;
    currentUserTranscript: string;
    currentAssistantTranscript: string;
    transcriptMessages: TranscriptMessage[];
}

/* ============================================================
   CONSTANTS & HELPERS
============================================================ */
const GEMINI_WS_BASE = "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContentConstrained";
const INPUT_SAMPLE_RATE = 16_000;
const OUTPUT_SAMPLE_RATE = 24_000;
const MICROPHONE_BUFFER_SIZE = 2048;
const ASSISTANT_FINALIZE_DELAY_MS = 500;
const USER_FINALIZE_DELAY_MS = 350;

function int16ToBase64(data: Int16Array): string {
    const bytes = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, Math.min(i + chunkSize, bytes.length)));
    }
    return window.btoa(binary);
}

function base64ToUint8Array(base64: string): Uint8Array {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

function int16ToFloat32(input: Int16Array): Float32Array {
    const output = new Float32Array(input.length);
    for (let i = 0; i < input.length; i++) output[i] = input[i] / 32768;
    return output;
}

function downsampleTo16k(input: Float32Array, inputSampleRate: number): Int16Array {
    if (input.length === 0) return new Int16Array(0);

    if (inputSampleRate === INPUT_SAMPLE_RATE) {
        const output = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) {
            const sample = Math.max(-1, Math.min(1, input[i]));
            output[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        }
        return output;
    }

    if (inputSampleRate < INPUT_SAMPLE_RATE) {
        const outputLength = Math.max(1, Math.round(input.length * (INPUT_SAMPLE_RATE / inputSampleRate)));
        const output = new Int16Array(outputLength);
        for (let i = 0; i < outputLength; i++) {
            const sourceIndex = i * (inputSampleRate / INPUT_SAMPLE_RATE);
            const index = Math.min(Math.floor(sourceIndex), input.length - 1);
            const sample = Math.max(-1, Math.min(1, input[index]));
            output[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        }
        return output;
    }

    const ratio = inputSampleRate / INPUT_SAMPLE_RATE;
    const outputLength = Math.floor(input.length / ratio);
    const output = new Int16Array(outputLength);
    let inputIndex = 0;

    for (let i = 0; i < outputLength; i++) {
        const nextInputIndex = Math.min(input.length, Math.max(inputIndex + 1, Math.round((i + 1) * ratio)));
        let sum = 0, count = 0;
        for (let j = inputIndex; j < nextInputIndex; j++) {
            sum += input[j];
            count++;
        }
        const sample = count > 0 ? sum / count : 0;
        const clamped = Math.max(-1, Math.min(1, sample));
        output[i] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
        inputIndex = nextInputIndex;
    }
    return output;
}

function normalizeText(text: string): string {
    return text.replace(/\s+/g, " ").trim();
}

function mergeIncrementalText(current: string, incoming: string): string {
    const next = normalizeText(incoming);
    if (!next) return current;
    if (!current || current === next) return next;
    if (next.startsWith(current)) return next;
    if (current.startsWith(next)) return current;

    const maxOverlap = Math.min(current.length, next.length);
    for (let overlap = maxOverlap; overlap > 0; overlap--) {
        if (current.slice(-overlap) === next.slice(0, overlap)) {
            return (current + next.slice(overlap)).trim();
        }
    }
    return `${current} ${next}`.trim();
}

/* ============================================================
   HOOK
============================================================ */
export function useGeminiLiveInterview(): UseGeminiLiveInterviewReturn {
    const [createVoiceSession] = useCreateVoiceSessionMutation();
    const [saveConversationMessage] = useSaveConversationMessageMutation();

    const [status, setStatus] = useState<ConnectionStatus>("idle");
    const [error, setError] = useState<string | null>(null);
    const [connected, setConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentUserTranscript, setCurrentUserTranscript] = useState("");
    const [currentAssistantTranscript, setCurrentAssistantTranscript] = useState("");
    const [transcriptMessages, setTranscriptMessages] = useState<TranscriptMessage[]>([]);

    const interviewIdRef = useRef<number | null>(null);
    const websocketRef = useRef<WebSocket | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const processorNodeRef = useRef<ScriptProcessorNode | null>(null);
    const microphoneGainRef = useRef<GainNode | null>(null);
    const playbackSourcesRef = useRef<AudioBufferSourceNode[]>([]);
    const playbackTimeRef = useRef(0);

    const startingRef = useRef(false);
    const stoppedRef = useRef(false);
    const isSpeakingRef = useRef(false);
    const microphoneStartedRef = useRef(false);
    const microphonePendingRef = useRef(false);
    const aiTurnCompleteRef = useRef(false);
    const openingQuestionRequestedRef = useRef(false);
    const sessionHandleRef = useRef<string | null>(null);

    const currentUserTranscriptRef = useRef("");
    const userTurnFinalizedRef = useRef(false);
    const userFinalizeTimerRef = useRef<number | null>(null);

    const currentAssistantTranscriptRef = useRef("");
    const assistantTurnFinalizedRef = useRef(false);
    const assistantModelTextRef = useRef("");
    const assistantOutputTranscriptRef = useRef("");
    const assistantOutputTranscriptionSeenRef = useRef(false);
    const assistantFinalizeTimerRef = useRef<number | null>(null);

    const setupPromiseRef = useRef<{ resolve: () => void; reject: (error: Error) => void } | null>(null);
    const persistenceQueueRef = useRef<Promise<void>>(Promise.resolve());
    const lastPersistenceErrorRef = useRef<unknown>(null);

    const setSpeakingState = useCallback((value: boolean) => {
        isSpeakingRef.current = value;
        setIsSpeaking(value);
    }, []);

    const addTranscriptMessage = useCallback((speaker: "assistant" | "user", text: string) => {
        const normalized = normalizeText(text);
        if (!normalized) return;
        setTranscriptMessages((prev) => [...prev, { id: crypto.randomUUID(), speaker, text: normalized, timestamp: Date.now() }]);
    }, []);

    const persistMessage = useCallback((role: "USER" | "ASSISTANT", content: string): Promise<void> => {
        const interviewId = interviewIdRef.current;
        if (interviewId === null) return Promise.resolve();
        const normalized = normalizeText(content);
        if (!normalized) return Promise.resolve();

        const operation = persistenceQueueRef.current.then(async () => {
            try {
                await saveConversationMessage({ interviewId, body: { role, content: normalized } }).unwrap();
            } catch (err) {
                lastPersistenceErrorRef.current = err;
                console.error(`❌ Failed to persist ${role} message:`, err);
                throw err;
            }
        });

        persistenceQueueRef.current = operation.catch(() => undefined);
        return operation;
    }, [saveConversationMessage]);

    const finalizeUserTranscript = useCallback(() => {
        if (userTurnFinalizedRef.current) return;
        const text = normalizeText(currentUserTranscriptRef.current);
        if (!text) return;

        userTurnFinalizedRef.current = true;
        if (userFinalizeTimerRef.current !== null) {
            window.clearTimeout(userFinalizeTimerRef.current);
            userFinalizeTimerRef.current = null;
        }

        addTranscriptMessage("user", text);
        currentUserTranscriptRef.current = "";
        setCurrentUserTranscript("");
        void persistMessage("USER", text);
    }, [addTranscriptMessage, persistMessage]);

    const scheduleUserFinalization = useCallback(() => {
        if (userFinalizeTimerRef.current !== null) window.clearTimeout(userFinalizeTimerRef.current);
        userFinalizeTimerRef.current = window.setTimeout(() => {
            userFinalizeTimerRef.current = null;
            if (!stoppedRef.current) finalizeUserTranscript();
        }, USER_FINALIZE_DELAY_MS);
    }, [finalizeUserTranscript]);

    const finalizeAssistantTranscript = useCallback(() => {
        if (assistantTurnFinalizedRef.current) return;
        const text = normalizeText(assistantOutputTranscriptRef.current) || normalizeText(assistantModelTextRef.current);
        if (!text) return;

        assistantTurnFinalizedRef.current = true;
        if (assistantFinalizeTimerRef.current !== null) {
            window.clearTimeout(assistantFinalizeTimerRef.current);
            assistantFinalizeTimerRef.current = null;
        }

        addTranscriptMessage("assistant", text);
        currentAssistantTranscriptRef.current = "";
        assistantModelTextRef.current = "";
        assistantOutputTranscriptRef.current = "";
        assistantOutputTranscriptionSeenRef.current = false;
        setCurrentAssistantTranscript("");
        void persistMessage("ASSISTANT", text);
    }, [addTranscriptMessage, persistMessage]);

    const scheduleAssistantFinalization = useCallback(() => {
        if (assistantFinalizeTimerRef.current !== null) window.clearTimeout(assistantFinalizeTimerRef.current);
        assistantFinalizeTimerRef.current = window.setTimeout(() => {
            assistantFinalizeTimerRef.current = null;
            if (!stoppedRef.current) finalizeAssistantTranscript();
        }, ASSISTANT_FINALIZE_DELAY_MS);
    }, [finalizeAssistantTranscript]);

    const releaseMicrophone = useCallback(() => {
        microphoneStartedRef.current = false;
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        try { sourceNodeRef.current?.disconnect(); } catch {}
        try { processorNodeRef.current?.disconnect(); } catch {}
        try { microphoneGainRef.current?.disconnect(); } catch {}
        sourceNodeRef.current = null;
        processorNodeRef.current = null;
        microphoneGainRef.current = null;
    }, []);

    const stopPlayback = useCallback(() => {
        playbackSourcesRef.current.forEach((source) => {
            try { source.onended = null; source.stop(); } catch {}
        });
        playbackSourcesRef.current = [];
        playbackTimeRef.current = 0;
        aiTurnCompleteRef.current = true;
        setSpeakingState(false);
    }, [setSpeakingState]);

    const closeWebSocket = useCallback(() => {
        const websocket = websocketRef.current;
        if (!websocket) return;
        websocket.onopen = websocket.onmessage = websocket.onerror = websocket.onclose = null;
        if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
            try { websocket.close(1000, "Interview ended"); } catch {}
        }
        websocketRef.current = null;
    }, []);

    const closeAudioContext = useCallback(() => {
        const context = audioContextRef.current;
        audioContextRef.current = null;
        if (context) void context.close().catch(() => undefined);
    }, []);

    const flushPersistence = useCallback(async () => {
        try { await persistenceQueueRef.current; } catch {}
        if (lastPersistenceErrorRef.current) {
            const err = lastPersistenceErrorRef.current;
            lastPersistenceErrorRef.current = null;
            console.error("❌ At least one conversation message failed to persist.", err);
            throw new Error("Some conversation messages could not be saved.");
        }
    }, []);

    const resetSessionState = useCallback(() => {
        currentUserTranscriptRef.current = "";
        currentAssistantTranscriptRef.current = "";
        assistantModelTextRef.current = "";
        assistantOutputTranscriptRef.current = "";
        userTurnFinalizedRef.current = false;
        assistantTurnFinalizedRef.current = false;
        microphonePendingRef.current = false;
        microphoneStartedRef.current = false;
        aiTurnCompleteRef.current = false;
        openingQuestionRequestedRef.current = false;
        sessionHandleRef.current = null;
        setCurrentUserTranscript("");
        setCurrentAssistantTranscript("");
        setConnected(false);
        setSpeakingState(false);
    }, [setSpeakingState]);

    const cleanup = useCallback(() => {
        stoppedRef.current = true;
        startingRef.current = false;
        setupPromiseRef.current?.reject(new Error("Voice interview stopped."));
        setupPromiseRef.current = null;
        if (userFinalizeTimerRef.current !== null) { window.clearTimeout(userFinalizeTimerRef.current); userFinalizeTimerRef.current = null; }
        if (assistantFinalizeTimerRef.current !== null) { window.clearTimeout(assistantFinalizeTimerRef.current); assistantFinalizeTimerRef.current = null; }
        releaseMicrophone();
        stopPlayback();
        closeWebSocket();
        closeAudioContext();
        resetSessionState();
    }, [closeAudioContext, closeWebSocket, releaseMicrophone, resetSessionState, stopPlayback]);

    const startMicrophone = useCallback(async (websocket: WebSocket) => {
        if (microphoneStartedRef.current || stoppedRef.current || websocket.readyState !== WebSocket.OPEN) return;
        if (!navigator.mediaDevices?.getUserMedia) throw new Error("Microphone access is not supported.");

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        });

        if (stoppedRef.current) {
            stream.getTracks().forEach((track) => track.stop());
            return;
        }

        mediaStreamRef.current = stream;
        const audioContext = audioContextRef.current;
        if (!audioContext) {
            stream.getTracks().forEach((track) => track.stop());
            throw new Error("Audio context unavailable.");
        }

        const source = audioContext.createMediaStreamSource(stream);
        sourceNodeRef.current = source;
        const processor = audioContext.createScriptProcessor(MICROPHONE_BUFFER_SIZE, 1, 1);
        processorNodeRef.current = processor;
        const silentGain = audioContext.createGain();
        silentGain.gain.value = 0;
        microphoneGainRef.current = silentGain;

        processor.onaudioprocess = (event) => {
            if (stoppedRef.current || websocket.readyState !== WebSocket.OPEN || isSpeakingRef.current) return;
            const input = event.inputBuffer.getChannelData(0);
            const pcm16 = downsampleTo16k(input, audioContext.sampleRate);
            if (pcm16.length === 0) return;

            try {
                websocket.send(JSON.stringify({
                    realtimeInput: { audio: { data: int16ToBase64(pcm16), mimeType: "audio/pcm;rate=16000" } },
                }));
            } catch (err) {
                console.error("❌ Failed to send microphone audio:", err);
            }
        };

        source.connect(processor);
        processor.connect(silentGain);
        silentGain.connect(audioContext.destination);
        microphoneStartedRef.current = true;
    }, []);

    const playAudio = useCallback((base64Audio: string) => {
        const audioContext = audioContextRef.current;
        if (!audioContext || stoppedRef.current) return;

        try {
            const bytes = base64ToUint8Array(base64Audio);
            if (bytes.byteLength < 2) return;
            const pcmData = new Int16Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 2));
            const floatData = int16ToFloat32(pcmData);
            const audioBuffer = audioContext.createBuffer(1, floatData.length, OUTPUT_SAMPLE_RATE);
            audioBuffer.getChannelData(0).set(floatData);

            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);

            const startTime = Math.max(audioContext.currentTime, playbackTimeRef.current);
            source.start(startTime);
            playbackTimeRef.current = startTime + audioBuffer.duration;
            playbackSourcesRef.current.push(source);

            setSpeakingState(true);
            microphonePendingRef.current = true;
            aiTurnCompleteRef.current = false;

            source.onended = () => {
                playbackSourcesRef.current = playbackSourcesRef.current.filter((item) => item !== source);
                if (playbackSourcesRef.current.length > 0) return;

                playbackTimeRef.current = 0;
                setSpeakingState(false);

                if (microphonePendingRef.current && !microphoneStartedRef.current) {
                    microphonePendingRef.current = false;
                    const ws = websocketRef.current;
                    if (ws && ws.readyState === WebSocket.OPEN) {
                        void startMicrophone(ws);
                    }
                }
            };
        } catch (err) {
            console.error("❌ Audio playback failed:", err);
            playbackSourcesRef.current = [];
            playbackTimeRef.current = 0;
            setSpeakingState(false);
        }
    }, [setSpeakingState, startMicrophone]);

    const requestOpeningQuestion = useCallback((websocket: WebSocket) => {
        if (openingQuestionRequestedRef.current || stoppedRef.current || websocket.readyState !== WebSocket.OPEN) return;
        openingQuestionRequestedRef.current = true;
        assistantTurnFinalizedRef.current = false;
        assistantModelTextRef.current = "";
        assistantOutputTranscriptRef.current = "";
        assistantOutputTranscriptionSeenRef.current = false;
        currentAssistantTranscriptRef.current = "";
        setCurrentAssistantTranscript("");
        aiTurnCompleteRef.current = false;

        websocket.send(JSON.stringify({
            clientContent: {
                turns: [{
                    role: "user",
                    parts: [{ text: "Begin the interview now. Briefly greet the candidate and immediately ask the first interview question based on the interview configuration and candidate context in your system instructions. Do not wait for the candidate to speak first. Ask exactly one question. Keep the response concise and natural for a voice interview." }],
                }],
                turnComplete: true,
            },
        }));
    }, []);

    const handleGeminiMessage = useCallback((message: GeminiLiveMessage) => {
        if (message.setupComplete) {
            if (stoppedRef.current) return;
            setStatus("connected");
            setConnected(true);
            setupPromiseRef.current?.resolve();
            setupPromiseRef.current = null;
            const websocket = websocketRef.current;
            if (websocket && websocket.readyState === WebSocket.OPEN) {
                requestOpeningQuestion(websocket);
            }
            return;
        }

        if (message.sessionResumptionUpdate?.newHandle) {
            sessionHandleRef.current = message.sessionResumptionUpdate.newHandle;
        }

        const serverContent = message.serverContent;
        if (!serverContent) return;

        const interimUser = serverContent.interimInputTranscription?.text;
        if (interimUser) {
            if (userTurnFinalizedRef.current) {
                userTurnFinalizedRef.current = false;
                currentUserTranscriptRef.current = "";
            }
            if (userFinalizeTimerRef.current !== null) {
                window.clearTimeout(userFinalizeTimerRef.current);
                userFinalizeTimerRef.current = null;
            }
            const merged = mergeIncrementalText(currentUserTranscriptRef.current, interimUser);
            currentUserTranscriptRef.current = merged;
            setCurrentUserTranscript(merged);
        }

        const finalUser = serverContent.inputTranscription?.text;
        if (finalUser) {
            if (userTurnFinalizedRef.current) {
                userTurnFinalizedRef.current = false;
                currentUserTranscriptRef.current = "";
            }
            const merged = mergeIncrementalText(currentUserTranscriptRef.current, finalUser);
            currentUserTranscriptRef.current = merged;
            setCurrentUserTranscript(merged);
            scheduleUserFinalization();
        }

        if (serverContent.modelTurn?.parts) {
            if (assistantTurnFinalizedRef.current) {
                assistantTurnFinalizedRef.current = false;
                assistantModelTextRef.current = "";
                assistantOutputTranscriptRef.current = "";
                assistantOutputTranscriptionSeenRef.current = false;
                currentAssistantTranscriptRef.current = "";
            }
            aiTurnCompleteRef.current = false;
            if (assistantFinalizeTimerRef.current !== null) {
                window.clearTimeout(assistantFinalizeTimerRef.current);
                assistantFinalizeTimerRef.current = null;
            }

            for (const part of serverContent.modelTurn.parts) {
                if (part.inlineData?.data) playAudio(part.inlineData.data);
                if (part.text) {
                    const merged = mergeIncrementalText(assistantModelTextRef.current, part.text);
                    assistantModelTextRef.current = merged;
                    if (!assistantOutputTranscriptionSeenRef.current) {
                        currentAssistantTranscriptRef.current = merged;
                        setCurrentAssistantTranscript(merged);
                    }
                }
            }
        }

        const outputText = serverContent.outputTranscription?.text;
        if (outputText) {
            assistantOutputTranscriptionSeenRef.current = true;
            if (assistantTurnFinalizedRef.current) {
                assistantTurnFinalizedRef.current = false;
                assistantOutputTranscriptRef.current = "";
                assistantModelTextRef.current = "";
            }
            if (assistantFinalizeTimerRef.current !== null) {
                window.clearTimeout(assistantFinalizeTimerRef.current);
                assistantFinalizeTimerRef.current = null;
            }
            const merged = mergeIncrementalText(assistantOutputTranscriptRef.current, outputText);
            assistantOutputTranscriptRef.current = merged;
            currentAssistantTranscriptRef.current = merged;
            setCurrentAssistantTranscript(merged);
        }

        if (serverContent.interrupted) {
            stopPlayback();
            if (userFinalizeTimerRef.current !== null) { window.clearTimeout(userFinalizeTimerRef.current); userFinalizeTimerRef.current = null; }
            if (assistantFinalizeTimerRef.current !== null) { window.clearTimeout(assistantFinalizeTimerRef.current); assistantFinalizeTimerRef.current = null; }
            if (!assistantTurnFinalizedRef.current) finalizeAssistantTranscript();
            microphonePendingRef.current = false;
            aiTurnCompleteRef.current = true;
            return;
        }

        if (serverContent.turnComplete) {
            aiTurnCompleteRef.current = true;
            if (!userTurnFinalizedRef.current && currentUserTranscriptRef.current.trim()) {
                finalizeUserTranscript();
            }
            scheduleAssistantFinalization();
        }
    }, [finalizeAssistantTranscript, finalizeUserTranscript, playAudio, requestOpeningQuestion, scheduleAssistantFinalization, scheduleUserFinalization, stopPlayback]);

    const stop = useCallback(async () => {
        if (stoppedRef.current && websocketRef.current === null) return;
        stoppedRef.current = true;

        if (userFinalizeTimerRef.current !== null) { window.clearTimeout(userFinalizeTimerRef.current); userFinalizeTimerRef.current = null; }
        if (assistantFinalizeTimerRef.current !== null) { window.clearTimeout(assistantFinalizeTimerRef.current); assistantFinalizeTimerRef.current = null; }

        if (!userTurnFinalizedRef.current && currentUserTranscriptRef.current.trim()) finalizeUserTranscript();
        if (!assistantTurnFinalizedRef.current && (assistantOutputTranscriptRef.current.trim() || assistantModelTextRef.current.trim() || currentAssistantTranscriptRef.current.trim())) {
            finalizeAssistantTranscript();
        }

        releaseMicrophone();
        stopPlayback();
        closeWebSocket();
        closeAudioContext();

        try {
            await flushPersistence();
        } catch (err) {
            console.error("❌ Persistence failed during stop:", err);
            setError(err instanceof Error ? err.message : "Some messages could not be saved.");
        }

        startingRef.current = false;
        resetSessionState();
        setStatus("stopped");
    }, [closeAudioContext, closeWebSocket, finalizeAssistantTranscript, finalizeUserTranscript, flushPersistence, releaseMicrophone, resetSessionState, stopPlayback]);

    const start = useCallback(async (interviewId: number) => {
        if (startingRef.current || websocketRef.current?.readyState === WebSocket.OPEN) return;

        interviewIdRef.current = interviewId;
        startingRef.current = true;
        stoppedRef.current = false;
        microphoneStartedRef.current = false;
        microphonePendingRef.current = false;
        aiTurnCompleteRef.current = false;
        openingQuestionRequestedRef.current = false;
        sessionHandleRef.current = null;
        userTurnFinalizedRef.current = false;
        assistantTurnFinalizedRef.current = false;
        currentUserTranscriptRef.current = "";
        currentAssistantTranscriptRef.current = "";
        assistantModelTextRef.current = "";
        assistantOutputTranscriptRef.current = "";
        assistantOutputTranscriptionSeenRef.current = false;
        lastPersistenceErrorRef.current = null;
        persistenceQueueRef.current = Promise.resolve();

        if (userFinalizeTimerRef.current !== null) { window.clearTimeout(userFinalizeTimerRef.current); userFinalizeTimerRef.current = null; }
        if (assistantFinalizeTimerRef.current !== null) { window.clearTimeout(assistantFinalizeTimerRef.current); assistantFinalizeTimerRef.current = null; }

        setError(null);
        setConnected(false);
        setSpeakingState(false);
        setCurrentUserTranscript("");
        setCurrentAssistantTranscript("");
        setTranscriptMessages([]);

        try {
            setStatus("creating-session");
            const apiResponse = await createVoiceSession(interviewId).unwrap();
            const session = apiResponse.data;
            if (!session?.accessToken) throw new Error("Gemini access token is missing.");

            const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
            if (!AudioContextClass) throw new Error("Web Audio API is not supported.");

            const audioContext = new AudioContextClass();
            audioContextRef.current = audioContext;
            if (audioContext.state === "suspended") await audioContext.resume();

            setStatus("connecting");
            const model = session.model.startsWith("models/") ? session.model : `models/${session.model}`;
            const websocketUrl = `${GEMINI_WS_BASE}?access_token=${encodeURIComponent(session.accessToken)}`;
            const websocket = new WebSocket(websocketUrl);
            websocket.binaryType = "arraybuffer";
            websocketRef.current = websocket;

            const setupPromise = new Promise<void>((resolve, reject) => {
                setupPromiseRef.current = { resolve, reject };
            });

            websocket.onopen = () => {
                if (stoppedRef.current) return;
                websocket.send(JSON.stringify({ setup: { model } }));
            };

            websocket.onmessage = async (event) => {
                try {
                    let rawData = "";
                    if (typeof event.data === "string") rawData = event.data;
                    else if (event.data instanceof Blob) rawData = await event.data.text();
                    else if (event.data instanceof ArrayBuffer) rawData = new TextDecoder().decode(event.data);
                    else return;

                    if (!rawData) return;
                    handleGeminiMessage(JSON.parse(rawData) as GeminiLiveMessage);
                } catch (err) {
                    console.error("❌ Failed to process Gemini Live message:", err);
                }
            };

            websocket.onerror = () => {
                const err = new Error("Unable to connect to Gemini Live.");
                setupPromiseRef.current?.reject(err);
                setupPromiseRef.current = null;
                setError(err.message);
                setConnected(false);
                setStatus("error");
            };

            websocket.onclose = (event) => {
                setConnected(false);
                setSpeakingState(false);
                microphoneStartedRef.current = false;
                if (!stoppedRef.current) {
                    setStatus("stopped");
                    if (event.code !== 1000) setError(event.reason || "Connection closed unexpectedly.");
                }
            };

            await setupPromise;
        } catch (err) {
            cleanup();
            setConnected(false);
            setStatus("error");
            const message = err instanceof Error ? err.message : "Failed to start voice interview.";
            setError(message);
            throw err;
        } finally {
            startingRef.current = false;
        }
    }, [cleanup, createVoiceSession, handleGeminiMessage, setSpeakingState]);

    useEffect(() => {
        return () => { cleanup(); };
    }, [cleanup]);

    return {
        start,
        stop,
        status,
        error,
        connected,
        isSpeaking,
        currentUserTranscript,
        currentAssistantTranscript,
        transcriptMessages,
    };
}