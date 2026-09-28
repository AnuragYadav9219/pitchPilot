import { useEffect, useRef } from "react";

interface VoiceInterviewBackgroundProps {
    className?: string;
    isSpeaking?: boolean;
    isListening?: boolean;
}

interface Particle {
    x: number;
    y: number;
    size: number;
    speed: number;
    phase: number;
    opacity: number;
}

const PARTICLE_COUNT = 42;

export function VoiceInterviewBackground({
    className = "",
    isSpeaking = false,
    isListening = false,
}: VoiceInterviewBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const particlesRef = useRef<Particle[]>(
        Array.from(
            { length: PARTICLE_COUNT },
            () => ({
                x: Math.random(),
                y: Math.random(),
                size: Math.random() * 1.8 + 0.6,
                speed: Math.random() * 0.12 + 0.035,
                phase: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.28 + 0.08,
            }),
        ),
    );

    const activityRef = useRef({
        speaking: isSpeaking,
        listening: isListening,
    });

    useEffect(() => {
        activityRef.current = {
            speaking: isSpeaking,
            listening: isListening,
        };
    }, [isSpeaking, isListening]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext("2d", {
            alpha: true,
        });

        if (!context) {
            return;
        }

        let animationFrame = 0;
        let width = 0;
        let height = 0;
        let time = 0;

        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

        const resize = () => {
            const rect =
                canvas.getBoundingClientRect();

            width = rect.width;
            height = rect.height;

            const dpr = Math.min(
                window.devicePixelRatio || 1,
                2,
            );

            canvas.width =
                Math.max(1, Math.floor(width * dpr));

            canvas.height =
                Math.max(1, Math.floor(height * dpr));

            context.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0,
            );
        };

        const drawAmbientGlow = () => {
            const { speaking, listening } =
                activityRef.current;

            const centerX = width * 0.52;
            const centerY = height * 0.43;

            const intensity = speaking
                ? 0.30
                : listening
                    ? 0.20
                    : 0.14;

            const radius = Math.max(
                width,
                height,
            ) * 0.62;

            const gradient =
                context.createRadialGradient(
                    centerX,
                    centerY,
                    0,
                    centerX,
                    centerY,
                    radius,
                );

            gradient.addColorStop(
                0,
                `rgba(240, 100, 73, ${intensity})`,
            );

            gradient.addColorStop(
                0.28,
                `rgba(249, 115, 22, ${intensity * 0.32})`,
            );

            gradient.addColorStop(
                0.62,
                "rgba(249, 115, 22, 0.025)",
            );

            gradient.addColorStop(
                1,
                "rgba(249, 115, 22, 0)",
            );

            context.fillStyle = gradient;
            context.fillRect(
                0,
                0,
                width,
                height,
            );
        };

        const drawWaves = () => {
            const { speaking, listening } =
                activityRef.current;

            const activityMultiplier = speaking
                ? 1.45
                : listening
                    ? 1.12
                    : 0.82;

            for (let wave = 0; wave < 4; wave += 1) {
                context.beginPath();

                const baseY =
                    height *
                    (0.42 + wave * 0.065);

                for (
                    let x = -60;
                    x <= width + 60;
                    x += 10
                ) {
                    const normalizedX =
                        x / Math.max(width, 1);

                    const primaryWave =
                        Math.sin(
                            normalizedX * 7 +
                                time * 0.85 +
                                wave * 0.65,
                        ) *
                        (24 + wave * 7) *
                        activityMultiplier;

                    const secondaryWave =
                        Math.sin(
                            normalizedX * 16 -
                                time * 0.45 +
                                wave,
                        ) *
                        9 *
                        activityMultiplier;

                    const y =
                        baseY +
                        primaryWave +
                        secondaryWave;

                    if (x === -60) {
                        context.moveTo(x, y);
                    } else {
                        context.lineTo(x, y);
                    }
                }

                const gradient =
                    context.createLinearGradient(
                        0,
                        0,
                        width,
                        0,
                    );

                gradient.addColorStop(
                    0,
                    "rgba(249, 115, 22, 0)",
                );

                gradient.addColorStop(
                    0.18,
                    "rgba(249, 115, 22, 0.10)",
                );

                gradient.addColorStop(
                    0.42,
                    "rgba(240, 100, 73, 0.22)",
                );

                gradient.addColorStop(
                    0.62,
                    "rgba(240, 100, 73, 0.16)",
                );

                gradient.addColorStop(
                    0.85,
                    "rgba(194, 65, 45, 0.07)",
                );

                gradient.addColorStop(
                    1,
                    "rgba(194, 65, 45, 0)",
                );

                context.strokeStyle = gradient;

                context.lineWidth =
                    wave === 1
                        ? speaking
                            ? 1.8
                            : 1.4
                        : 1;

                context.globalAlpha =
                    0.75 - wave * 0.12;

                context.stroke();
            }

            context.globalAlpha = 1;
        };

        const drawParticles = () => {
            particlesRef.current.forEach(
                (particle) => {
                    const x =
                        particle.x * width;

                    const movement =
                        Math.sin(
                            time * 0.7 +
                                particle.phase,
                        ) * 0.018;

                    const normalizedY =
                        (particle.y +
                            time *
                                particle.speed +
                            movement) %
                        1;

                    const y =
                        normalizedY * height;

                    const pulse =
                        (Math.sin(
                            time * 2 +
                                particle.phase,
                        ) +
                            1) /
                        2;

                    const alpha =
                        particle.opacity *
                        (0.65 + pulse * 0.35);

                    context.beginPath();

                    context.arc(
                        x,
                        y,
                        particle.size,
                        0,
                        Math.PI * 2,
                    );

                    context.fillStyle = `rgba(240, 100, 73, ${alpha})`;

                    context.fill();
                },
            );
        };

        const drawCentralPulse = () => {
            const { speaking, listening } =
                activityRef.current;

            const centerX = width * 0.52;
            const centerY = height * 0.43;

            const pulse =
                (Math.sin(time * 1.8) + 1) / 2;

            const activityScale = speaking
                ? 1.45
                : listening
                    ? 1.18
                    : 0.85;

            const rings = [
                {
                    radius:
                        (70 + pulse * 18) *
                        activityScale,
                    opacity: speaking
                        ? 0.11
                        : 0.055,
                },
                {
                    radius:
                        (120 + pulse * 28) *
                        activityScale,
                    opacity: speaking
                        ? 0.065
                        : 0.03,
                },
                {
                    radius:
                        (175 + pulse * 38) *
                        activityScale,
                    opacity: speaking
                        ? 0.035
                        : 0.015,
                },
            ];

            rings.forEach(
                ({ radius, opacity }) => {
                    context.beginPath();

                    context.arc(
                        centerX,
                        centerY,
                        radius,
                        0,
                        Math.PI * 2,
                    );

                    context.strokeStyle =
                        `rgba(240, 100, 73, ${
                            opacity +
                            pulse * opacity
                        })`;

                    context.lineWidth = 1;

                    context.stroke();
                },
            );
        };

        const render = () => {
            time += prefersReducedMotion
                ? 0
                : 0.008;

            context.clearRect(
                0,
                0,
                width,
                height,
            );

            drawAmbientGlow();
            drawWaves();
            drawParticles();
            drawCentralPulse();

            animationFrame =
                requestAnimationFrame(render);
        };

        resize();

        const resizeObserver =
            new ResizeObserver(resize);

        resizeObserver.observe(canvas);

        animationFrame =
            requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(
                animationFrame,
            );

            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
        >
            {/* Base */}
            <div className="absolute inset-0 bg-(--vm-background,#0d0d11)" />

            {/* Large atmospheric glow */}
            <div className="absolute -right-24 -top-24 h-125 w-125 rounded-full bg-linear-to-br from-(--vm-primary)/12 to-orange-500/5 blur-[120px]" />

            <div className="absolute bottom-[-8rem] right-[20%] h-96 w-96 rounded-full bg-orange-600/5 blur-[110px]" />

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
            />

            {/* Grid */}
            <svg
                className="absolute inset-0 h-full w-full opacity-50"
                viewBox="0 0 1200 700"
                preserveAspectRatio="none"
            >
                <defs>
                    <pattern
                        id="vm-voice-grid"
                        width="48"
                        height="48"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 48 0 L 0 0 0 48"
                            fill="none"
                            stroke="currentColor"
                            className="text-(--vm-primary)"
                            strokeWidth="0.8"
                            opacity="0.07"
                        />
                    </pattern>

                    <radialGradient
                        id="vm-voice-grid-mask"
                        cx="50%"
                        cy="42%"
                        r="68%"
                    >
                        <stop
                            offset="0%"
                            stopColor="white"
                            stopOpacity="1"
                        />

                        <stop
                            offset="50%"
                            stopColor="white"
                            stopOpacity="0.45"
                        />

                        <stop
                            offset="100%"
                            stopColor="white"
                            stopOpacity="0"
                        />
                    </radialGradient>

                    <mask id="vm-voice-grid-fade">
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#vm-voice-grid-mask)"
                        />
                    </mask>
                </defs>

                <rect
                    width="100%"
                    height="100%"
                    fill="url(#vm-voice-grid)"
                    mask="url(#vm-voice-grid-fade)"
                />
            </svg>

            {/* Center focus */}
            <div className="absolute left-1/2 top-[43%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--vm-primary)/5 bg-(--vm-primary)/2 shadow-[0_0_120px_color-mix(in_srgb,var(--vm-primary)_5%,transparent)]" />

            {/* Readability vignettes */}
            <div className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-(--vm-background) to-transparent" />

            <div className="absolute inset-x-0 bottom-0 h-52 bg-linear-to-t from-(--vm-background) to-transparent" />

            <div className="absolute inset-y-0 left-0 w-[35%] bg-linear-to-r from-(--vm-background) via-(--vm-background)/75 to-transparent" />

            <div className="absolute inset-y-0 right-0 w-[25%] bg-linear-to-l from-(--vm-background)/70 to-transparent" />
        </div>
    );
}