import { ArrowRight, Sparkles } from "lucide-react";

import { Brand } from "@virtualmentor/shared";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

import saasGrid from "@/assets/backgrounds/saas-grid.svg";
import { HeroBackground } from "@/assets/backgrounds/HeroBackground";
import { useTheme } from "@/app/theme/ThemeProvider";

type HeroProps = {
    onEarlyAccess: () => void;
};

export function Hero({
    onEarlyAccess,
}: HeroProps) {
    const { colors } = useTheme();

    return (
        <section className="relative isolate overflow-hidden">
            <HeroBackground />

            {/* SaaS background grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-20"
                style={{
                    backgroundImage: `url(${saasGrid})`,
                    backgroundPosition: "center top",
                    backgroundSize: "900px auto",
                    opacity: 0.35,
                }}
            />

            {/* Background fade */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-(--vm-background)/10 via-transparent to-(--vm-background)"
            />

            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 -top-30 h-125 w-125 -translate-x-1/2 rounded-full bg-(--vm-glow-purple) opacity-30 blur-[120px]" />

                <div className="absolute -right-45 top-[35%] h-100 w-100 rounded-full bg-(--vm-glow-purple) opacity-15 blur-[110px]" />

                <div className="absolute -left-45 top-[60%] h-75 w-75 rounded-full bg-(--vm-glow-green) opacity-10 blur-[100px]" />
            </div>

            <Container>
                <div className="grid min-h-[calc(100vh-4rem)] items-center gap-16 py-20 lg:grid-cols-2 lg:py-24">
                    {/* Hero content */}
                    <div className="relative z-10">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-(--vm-border) bg-(--vm-surface) px-3 py-1.5 text-sm text-(--vm-text-secondary) shadow-sm backdrop-blur-md">
                            <Sparkles
                                size={15}
                                className="text-(--vm-primary)"
                                aria-hidden="true"
                            />

                            AI-powered personal mentoring
                        </div>

                        <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-(--vm-text) sm:text-6xl lg:text-7xl">
                            Your AI mentor for{" "}
                            <span className="relative text-(--vm-primary)">
                                real-world growth.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-(--vm-text-secondary) sm:text-xl">
                            {Brand.description}
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            <Button
                                size="lg"
                                onClick={onEarlyAccess}
                                className="cursor-pointer"
                            >
                                Join Early Access

                                <ArrowRight
                                    size={18}
                                    aria-hidden="true"
                                />
                            </Button>

                            <Button
                                variant="secondary"
                                size="lg"
                                className="cursor-pointer"
                            >
                                Explore {Brand.name}
                            </Button>
                        </div>

                        <p className="mt-5 text-sm text-(--vm-muted)">
                            Practice conversations. Build confidence. Improve
                            every day.
                        </p>

                        {/* Trust indicators */}
                        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-(--vm-muted)">
                            <span className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-(--vm-success)" />
                                AI-powered feedback
                            </span>

                            <span className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-(--vm-primary)" />
                                Personalized practice
                            </span>

                            <span className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-(--vm-secondary)" />
                                Learn at your pace
                            </span>
                        </div>
                    </div>

                    {/* AI preview */}
                    <div className="relative z-10">
                        {/* Warm ambient glow */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-8 rounded-(--vm-radius-xl) blur-[80px]"
                            style={{ backgroundColor: colors.glowCoral, opacity: 0.3 }}
                        />

                        {/* Glass window */}
                        <div
                            className="relative overflow-hidden rounded-(--vm-radius-xl) border p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1"
                            style={{ backgroundColor: colors.surface, borderColor: colors.borderStrong }}
                        >
                            {/* Glass highlight */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0"
                                style={{
                                    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.10), transparent 45%, ${colors.glowCoral})`,
                                }}
                            />

                            {/* Window header */}
                            <div className="relative z-10 mb-5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors.danger, opacity: 0.6 }} />
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors.warning, opacity: 0.6 }} />
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors.success, opacity: 0.6 }} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold" style={{ color: colors.text }}>{Brand.name}</p>
                                        <p className="text-xs" style={{ color: colors.muted }}>Interview practice</p>
                                    </div>
                                </div>

                                <div
                                    className="flex h-9 w-9 items-center justify-center rounded-full border"
                                    style={{ borderColor: colors.border, backgroundColor: colors.glowCoral }}
                                >
                                    <Sparkles size={18} style={{ color: colors.primary }} aria-hidden="true" />
                                </div>
                            </div>

                            {/* Conversation */}
                            <div className="relative z-10 space-y-4">
                                {/* User message */}
                                <div
                                    className="ml-auto max-w-[82%] rounded-2xl rounded-br-md p-4 text-sm font-medium leading-6 text-white shadow-lg"
                                    style={{
                                        background: `linear-gradient(90deg, ${colors.gradientStart}, ${colors.gradientMiddle}, ${colors.gradientEnd})`,
                                        boxShadow: `0 12px 30px ${colors.glowCoral}`,
                                    }}
                                >
                                    How would you answer:<br />"Tell me about yourself?"
                                </div>

                                {/* AI response */}
                                <div
                                    className="max-w-[88%] rounded-2xl rounded-bl-md border p-4 text-sm leading-6 backdrop-blur-md"
                                    style={{ backgroundColor: colors.surface2, borderColor: colors.border, color: colors.textSecondary }}
                                >
                                    Start with your current role or education, highlight relevant strengths, then connect them to what you want to accomplish next.
                                </div>

                                {/* Feedback */}
                                <div
                                    className="rounded-xl border p-4 backdrop-blur-md"
                                    style={{ backgroundColor: colors.surface2, borderColor: colors.border }}
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-xs font-semibold" style={{ color: colors.text }}>AI Feedback</span>
                                        <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: colors.success }}>
                                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colors.success }} />
                                            Strong
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full" style={{ backgroundColor: colors.surface3 }}>
                                        <div
                                            className="h-full w-[82%] rounded-full"
                                            style={{ background: `linear-gradient(90deg, ${colors.gradientStart}, ${colors.gradientMiddle}, ${colors.gradientEnd})` }}
                                        />
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <p className="text-xs" style={{ color: colors.muted }}>Response quality</p>
                                        <p className="text-xs font-semibold" style={{ color: colors.textSecondary }}>82%</p>
                                    </div>

                                    <p className="mt-3 text-xs leading-5" style={{ color: colors.muted }}>
                                        Good structure. Try adding one concrete achievement to make your answer more memorable.
                                    </p>
                                </div>
                            </div>

                            {/* Bottom status */}
                            <div
                                className="relative z-10 mt-5 flex items-center justify-between border-t pt-4"
                                style={{ borderColor: colors.border }}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50" style={{ backgroundColor: colors.success }} />
                                        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: colors.success }} />
                                    </span>
                                    <span className="text-xs" style={{ color: colors.muted }}>AI mentor ready</span>
                                </div>

                                <span className="text-xs" style={{ color: colors.muted }}>Personalized session</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}