import { ArrowRight, CheckCircle2, Mic, Sparkles } from "lucide-react";
import { Button, Container } from "@/components/ui";
import type { useTheme } from "@/app/theme/ThemeProvider";

type ThemeColors = ReturnType<typeof useTheme>["colors"];

export function FinalCTA({
    colors,
    onStart,
}: {
    colors: ThemeColors;
    onStart: () => void;
}) {
    const benefits = [
        "Realistic interviews",
        "Personalized feedback",
        "Practice at your pace",
    ];

    return (
        <section
            className="relative isolate overflow-hidden border-t py-10 sm:py-14 lg:py-16"
            style={{
                borderColor: colors.border,
                backgroundColor: colors.background,
            }}
        >
            {/* BACKGROUND */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div
                    className="final-cta-glow absolute left-1/2 top-1/2 h-75 w-162.5 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
                    style={{
                        background: `radial-gradient(ellipse, color-mix(in srgb, ${colors.primary} 6%, transparent), transparent 70%)`,
                    }}
                />

                <div
                    className="final-cta-glow-reverse absolute -right-32 top-1/3 h-55 w-55 rounded-full blur-[100px]"
                    style={{
                        background: `color-mix(in srgb, ${colors.orange} 3%, transparent)`,
                    }}
                />
            </div>

            <Container className="relative z-10">
                {/* CTA CARD */}
                <div
                    className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border"
                    style={{
                        borderColor: colors.borderStrong,
                        backgroundColor: colors.surface,
                        boxShadow: `0 24px 80px color-mix(in srgb, ${colors.primary} 6%, transparent)`,
                    }}
                >
                    {/* Top accent */}
                    <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-0 h-px w-48 -translate-x-1/2"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
                        }}
                    />

                    <div className="px-5 py-9 text-center sm:px-8 sm:py-11 lg:px-12 lg:py-12">
                        {/* ICON */}
                        <div
                            className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-xl border"
                            style={{
                                backgroundColor: `color-mix(in srgb, ${colors.primary} 7%, transparent)`,
                                borderColor: `color-mix(in srgb, ${colors.primary} 14%, transparent)`,
                            }}
                        >
                            <Mic
                                className="h-4 w-4"
                                style={{ color: colors.primary }}
                            />
                            <span className="final-cta-icon-ring absolute -inset-1.5 rounded-[14px] border" />
                        </div>

                        {/* EYEBROW */}
                        <div
                            className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em]"
                            style={{ color: colors.primary }}
                        >
                            <Sparkles className="h-3 w-3" />
                            Your next interview starts here
                        </div>

                        {/* HEADING */}
                        <h2
                            className="mx-auto mt-3 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-4xl lg:text-5xl"
                            style={{ color: colors.text }}
                        >
                            <span className="block">
                                Stop preparing for interviews.
                            </span>
                            <span
                                className="mt-1 block"
                                style={{ color: colors.primary }}
                            >
                                Start practicing for them.
                            </span>
                        </h2>

                        {/* DESCRIPTION */}
                        <p
                            className="mx-auto mt-4 max-w-xl text-sm leading-6 sm:text-base"
                            style={{ color: colors.muted }}
                        >
                            Practice with an AI mentor that interviews you,
                            challenges your answers, and shows you exactly
                            where to improve.
                        </p>

                        {/* CTA */}
                        <div className="mt-6">
                            <Button
                                size="lg"
                                onClick={onStart}
                                className="group px-6"
                            >
                                Start Practicing — It's Free to try
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </div>

                        {/* BENEFITS */}
                        <div className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-x-5 gap-y-2">
                            {benefits.map((item) => (
                                <span
                                    key={item}
                                    className="flex items-center gap-1.5 text-[11px]"
                                    style={{ color: colors.muted }}
                                >
                                    <CheckCircle2
                                        className="h-3.5 w-3.5 shrink-0"
                                        style={{ color: colors.success }}
                                    />
                                    {item}
                                </span>
                            ))}
                        </div>

                        {/* STATUS */}
                        <div
                            className="mx-auto mt-5 flex w-fit items-center gap-2 border-t pt-3"
                            style={{ borderColor: colors.border }}
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span
                                    className="final-cta-pulse absolute inset-0 rounded-full"
                                    style={{ backgroundColor: colors.success }}
                                />
                                <span
                                    className="relative h-1.5 w-1.5 rounded-full"
                                    style={{ backgroundColor: colors.success }}
                                />
                            </span>

                            <span
                                className="text-[10px]"
                                style={{ color: colors.muted }}
                            >
                                Practice whenever you're ready
                            </span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}