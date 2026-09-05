import { useState, useEffect } from "react";
import { ArrowRight, BarChart3, CheckCircle2, Mic, Play, Target, TrendingUp, Users, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/app/theme/ThemeProvider";
import heroBackground from "@/assets/images/virtual-mentor.webp";

type ThemeColors = ReturnType<typeof useTheme>["colors"];
type HeroProps = { colors: ThemeColors; onStart: () => void };

/** Theme-safe transparency helper */
function alpha(color: string, percentage: number) {
    return `color-mix(in srgb, ${color} ${percentage}%, transparent)`;
}

export function Hero({ colors, onStart }: HeroProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <section className="vm-hero relative isolate w-full overflow-hidden" style={{ backgroundColor: colors.background }}>
                {/* Mouse Glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -z-10 h-115 w-115 rounded-full blur-[140px] transition-[left,top] duration-150 ease-out"
                    style={{
                        left: `${mousePos.x - 230}px`,
                        top: `${mousePos.y - 230}px`,
                        background: `radial-gradient(circle, ${alpha(colors.primary, 12)} 0%, ${alpha(colors.primary, 5)} 35%, transparent 72%)`,
                    }}
                />

                {/* Light Beams */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
                    <div
                        className="vm-beam vm-beam-1 absolute -top-1/2 left-1/4 h-[200%] w-27.5 rotate-35 blur-xl"
                        style={{ background: `linear-gradient(to bottom, transparent, ${alpha(colors.primary, 14)}, transparent)` }}
                    />
                    <div
                        className="vm-beam vm-beam-2 absolute -top-1/2 left-2/3 h-[200%] w-37.5 rotate-35 blur-2xl"
                        style={{ background: `linear-gradient(to bottom, transparent, ${alpha(colors.gradientMiddle, 10)}, transparent)` }}
                    />
                </div>

                {/* Background Image */}
                <div
                    aria-hidden="true"
                    className="vm-hero-background pointer-events-none absolute inset-0 -z-30"
                    style={{ backgroundImage: `url(${heroBackground})`, backgroundRepeat: "no-repeat" }}
                />

                {/* Mobile Overlay */}
                <div
                    aria-hidden="true"
                    className="vm-mobile-overlay pointer-events-none absolute inset-0 -z-20 hidden"
                    style={{
                        background: `linear-gradient(to bottom, ${alpha(colors.background, 94)} 0%, ${alpha(colors.background, 72)} 40%, ${alpha(colors.background, 82)} 68%, ${alpha(colors.background, 96)} 100%)`,
                    }}
                />

                {/* Desktop Readability Overlay */}
                <div
                    aria-hidden="true"
                    className="vm-desktop-overlay pointer-events-none absolute inset-0 -z-20"
                    style={{
                        background: `linear-gradient(90deg, ${colors.background} 0%, ${alpha(colors.background, 98)} 22%, ${alpha(colors.background, 90)} 38%, ${alpha(colors.background, 58)} 53%, ${alpha(colors.background, 20)} 70%, transparent 100%)`,
                    }}
                />

                {/* Top/Bottom Atmosphere */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-20"
                    style={{
                        background: `linear-gradient(to bottom, ${alpha(colors.background, 28)} 0%, transparent 18%, transparent 76%, ${colors.background} 100%)`,
                    }}
                />

                {/* Main Content */}
                <Container>
                    <div className="relative min-h-[calc(100vh-4rem)] lg:min-h-190">
                        <div className="grid min-h-[calc(100vh-4rem)] items-center lg:min-h-190 lg:grid-cols-[0.92fr_1.08fr]">
                            <div className="relative z-30 w-full max-w-full px-2 py-12 sm:px-0 sm:py-16 lg:max-w-135 lg:py-0">
                                {/* Headline */}
                                <h1
                                    className="vm-fade-up w-full wrap-break-word text-[2.75rem] font-black leading-[0.98] tracking-[-0.04em] sm:text-[3.8rem] lg:text-[4.25rem]"
                                    style={{ color: colors.text, animationDelay: "100ms" }}
                                >
                                    Master your next interview{" "}
                                    <span
                                        className="vm-animated-text block bg-clip-text text-transparent"
                                        style={{
                                            backgroundImage: `linear-gradient(120deg, ${colors.gradientStart}, ${colors.gradientMiddle}, ${colors.gradientEnd}, ${colors.gradientStart})`,
                                            backgroundSize: "200% auto",
                                        }}
                                    >
                                        with AI precision.
                                    </span>
                                </h1>

                                {/* Subtitle */}
                                <p
                                    className="vm-fade-up mt-5 w-full max-w-120 wrap-break-word text-[14px] leading-relaxed sm:text-base sm:leading-7"
                                    style={{ color: colors.textSecondary, animationDelay: "180ms" }}
                                >
                                    Practice hyper-realistic mock interviews with real-time feedback, adaptivity, and voice assessment tailored specifically to your target roles.
                                </p>

                                {/* Buttons */}
                                <div className="vm-fade-up mt-7 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row" style={{ animationDelay: "260ms" }}>
                                    <Button
                                        size="lg"
                                        onClick={onStart}
                                        className="vm-cta-primary group relative min-h-12 w-full overflow-hidden px-6 shadow-xl sm:w-auto"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                                            Start Practicing Now
                                            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1.5" />
                                        </span>
                                        <div className="vm-shine absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                                    </Button>

                                    <a href="#how-it-works" className="inline-flex w-full sm:w-auto">
                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            className="min-h-12 w-full px-6 backdrop-blur-md transition-all duration-300 sm:w-auto"
                                            style={{
                                                borderColor: alpha(colors.borderStrong, 65),
                                                backgroundColor: alpha(colors.surface, 55),
                                                color: colors.text,
                                            }}
                                        >
                                            <Play size={14} className="fill-current" />
                                            Watch Demo
                                        </Button>
                                    </a>
                                </div>

                                {/* Trust Points */}
                                <div className="vm-fade-up mt-6 flex max-w-full flex-wrap gap-x-4 gap-y-2.5" style={{ animationDelay: "340ms" }}>
                                    <TrustPoint colors={colors} text="Realistic AI Voice" />
                                    <TrustPoint colors={colors} text="Instant Metrics" />
                                    <TrustPoint colors={colors} text="Custom Scenarios" />
                                </div>

                                {/* Social Proof */}
                                <div
                                    className="vm-fade-up mt-7 flex w-max max-w-full items-center gap-3 rounded-2xl border p-2.5 pr-4 backdrop-blur-md"
                                    style={{
                                        animationDelay: "420ms",
                                        borderColor: alpha(colors.border, 60),
                                        backgroundColor: alpha(colors.surface, 52),
                                        boxShadow: `0 12px 35px ${alpha(colors.primary, 6)}`,
                                    }}
                                >
                                    <div className="flex shrink-0 -space-x-2">
                                        {["A", "S", "R", "P", "K"].map((letter, index) => (
                                            <div
                                                key={letter}
                                                className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[9px] font-bold shadow-sm"
                                                style={{
                                                    borderColor: colors.background,
                                                    backgroundColor: index % 2 === 0 ? alpha(colors.primary, 14) : alpha(colors.secondary, 14),
                                                    color: colors.primary,
                                                }}
                                            >
                                                {letter}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-[11px] font-bold leading-tight" style={{ color: colors.text }}>
                                            Join 10,000+ candidates
                                        </p>
                                        <p className="mt-0.5 truncate text-[9px] font-medium" style={{ color: colors.muted }}>
                                            Interviewing at top Tech companies
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Visual Space */}
                            <div aria-hidden="true" className="hidden lg:block" />
                        </div>
                    </div>
                </Container>

                {/* Floating Capability Cards */}
                <FloatingCapability
                    colors={colors}
                    icon={Mic}
                    title="Real-time Voice"
                    subtitle="Spoken follow-ups & probes"
                    className="vm-float-card-one top-[38%] right-[1%]"
                />
                <FloatingCapability
                    colors={colors}
                    icon={BarChart3}
                    title="Deep Diagnostics"
                    subtitle="Comprehensive performance breakdown"
                    className="vm-float-card-two top-[20%] right-[32%]"
                />
                <FloatingCapability
                    colors={colors}
                    icon={TrendingUp}
                    title="Adaptive Difficulty"
                    subtitle="Evolves as you master answers"
                    className="vm-float-card-three top-[62%] right-[24%]"
                />
            </section>

            {/* Value Strip */}
            <HeroValueStrip colors={colors} />

            {/* Animations + Styles */}
            <style>{`
                .vm-hero-background {
                    background-position: center center !important;
                    background-size: cover !important;
                    animation: vmBackgroundBreath 12s ease-in-out infinite;
                    transform-origin: center center;
                    will-change: transform;
                }

                @keyframes vmFadeUp {
                    from { opacity: 0; transform: translateY(22px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .vm-fade-up { opacity: 0; animation: vmFadeUp 700ms cubic-bezier(.22, 1, .36, 1) forwards; }

                @keyframes vmAnimatedGradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .vm-animated-text { animation: vmAnimatedGradient 6s ease infinite; }

                @keyframes vmBeamMove {
                    0%, 100% { transform: translateY(-10%) rotate(35deg); opacity: 0.12; }
                    50% { transform: translateY(10%) rotate(35deg); opacity: 0.24; }
                }
                .vm-beam-1 { animation: vmBeamMove 8s infinite ease-in-out; }
                .vm-beam-2 { animation: vmBeamMove 12s infinite ease-in-out reverse; }

                @keyframes vmBackgroundBreath {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.015); }
                }

                @keyframes vmFloatOne { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -11px, 0); } }
                @keyframes vmFloatTwo { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -8px, 0); } }
                @keyframes vmFloatThree { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -10px, 0); } }

                .vm-float-card-one { animation: vmFloatOne 5s ease-in-out infinite; }
                .vm-float-card-two { animation: vmFloatTwo 6s ease-in-out infinite 600ms; }
                .vm-float-card-three { animation: vmFloatThree 5.5s ease-in-out infinite 1200ms; }
                .vm-shine { pointer-events: none; }

                @media (max-width: 1023px) {
                    .vm-hero-background { background-position: right top !important; background-size: cover !important; }
                    .vm-desktop-overlay { display: none !important; }
                    .vm-mobile-overlay { display: block !important; }
                }

                @media (max-width: 640px) {
                    .vm-hero-background { background-position: 85% top !important; background-size: cover !important; }
                    .vm-hero { min-height: auto; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .vm-hero-background, .vm-fade-up, .vm-float-card-one, .vm-float-card-two, .vm-float-card-three, .vm-animated-text, .vm-beam {
                        animation: none !important; opacity: 1 !important; transform: none !important;
                    }
                }
            `}</style>
        </>
    );
}

function TrustPoint({ colors, text }: { colors: ThemeColors; text: string }) {
    return (
        <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 backdrop-blur-sm"
            style={{ backgroundColor: alpha(colors.surface, 35), border: `1px solid ${alpha(colors.border, 25)}` }}
        >
            <CheckCircle2 size={13} className="shrink-0" style={{ color: colors.success }} />
            <span className="truncate text-[11px] font-medium" style={{ color: colors.muted }}>{text}</span>
        </div>
    );
}

function FloatingCapability({ colors, icon: Icon, title, subtitle, className }: { colors: ThemeColors; icon: typeof Mic; title: string; subtitle: string; className: string }) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute z-40 hidden w-52.5 overflow-hidden rounded-2xl border p-3.5 shadow-xl backdrop-blur-xxl xl:block ${className}`}
            style={{
                backgroundColor: alpha(colors.surfaceSolid, 76),
                borderColor: alpha(colors.borderStrong, 55),
                boxShadow: `0 18px 40px -18px ${alpha(colors.primary, 20)}, 0 8px 20px -12px ${alpha(colors.text, 12)}`,
            }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${alpha(colors.gradientStart, 65)}, ${alpha(colors.gradientEnd, 65)}, transparent)` }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-3xl"
                style={{ backgroundColor: alpha(colors.primary, 8) }}
            />
            <div className="relative flex items-center gap-3">
                <div
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: alpha(colors.primary, 10), color: colors.primary, border: `1px solid ${alpha(colors.primary, 18)}` }}
                >
                    <Icon size={17} strokeWidth={2.1} />
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2" style={{ backgroundColor: colors.success, borderColor: colors.surfaceSolid }} />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-bold leading-4" style={{ color: colors.text }}>{title}</p>
                    <p className="mt-1 truncate text-[10px] font-medium leading-4" style={{ color: colors.textSecondary }}>{subtitle}</p>
                </div>
            </div>
        </div>
    );
}

function HeroValueStrip({ colors }: { colors: ThemeColors }) {
    return (
        <div className="relative z-40 mx-auto -mt-6 max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
            <div
                className="grid overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4"
                style={{
                    borderColor: alpha(colors.borderStrong, 55),
                    backgroundColor: alpha(colors.surface, 94),
                    boxShadow: `0 24px 60px -30px ${alpha(colors.primary, 18)}`,
                }}
            >
                <ValueCard colors={colors} icon={Users} title="24/7 Availability" description="Practice whenever you need" />
                <ValueCard colors={colors} icon={Zap} title="Instant AI Analysis" description="Immediate detailed feedback" />
                <ValueCard colors={colors} icon={Target} title="Targeted Training" description="Role & company specific" />
                <ValueCard colors={colors} icon={TrendingUp} title="Track Progress" description="Visualize improvement over time" />
            </div>
        </div>
    );
}

function ValueCard({ colors, icon: Icon, title, description }: { colors: ThemeColors; icon: typeof Users; title: string; description: string }) {
    return (
        <div className="group flex items-center gap-3.5 border-b p-5 transition-colors duration-300 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0" style={{ borderColor: alpha(colors.border, 55) }}>
            <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: alpha(colors.primary, 9), color: colors.primary, border: `1px solid ${alpha(colors.primary, 10)}` }}
            >
                <Icon size={18} />
            </div>
            <div className="min-w-0">
                <p className="text-xs font-bold tracking-tight" style={{ color: colors.text }}>{title}</p>
                <p className="mt-0.5 text-[10px] font-medium" style={{ color: colors.muted }}>{description}</p>
            </div>
        </div>
    );
}