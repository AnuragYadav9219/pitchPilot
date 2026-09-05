import { ArrowRight, Sparkles } from "lucide-react";
import { Button, Container } from "@/components/ui";
import type { useTheme } from "@/app/theme/ThemeProvider";

type ThemeColors = ReturnType<typeof useTheme>["colors"];

export function EarlyAccessSection({
    colors,
    onStart,
}: {
    colors: ThemeColors;
    onStart: () => void;
}) {
    return (
        <section
            className="relative isolate overflow-hidden py-8 sm:py-12 lg:py-14"
            style={{
                backgroundColor: colors.background,
            }}
        >
            {/* =====================================================
                SUBTLE BACKGROUND
            ====================================================== */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div
                    className="early-access-glow absolute left-1/2 top-1/2 h-70 w-175 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
                    style={{
                        background:
                            `radial-gradient(ellipse, color-mix(in srgb, ${colors.primary} 5%, transparent), transparent 70%)`,
                    }}
                />
            </div>

            <Container className="relative z-10">
                <div
                    className="relative overflow-hidden rounded-[22px] border px-5 py-5 sm:px-7 sm:py-6"
                    style={{
                        borderColor: colors.borderStrong,
                        backgroundColor: colors.surface,
                    }}
                >
                    {/* Subtle top accent */}
                    <div
                        aria-hidden="true"
                        className="absolute left-0 right-0 top-0 h-px"
                        style={{
                            background: `linear-gradient(
                                90deg,
                                transparent,
                                ${colors.primary},
                                transparent
                            )`,
                        }}
                    />

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
                        {/* =================================================
                            CONTENT
                        ================================================== */}
                        <div className="flex min-w-0 items-start gap-3.5">
                            {/* Icon */}
                            <div
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                                style={{
                                    backgroundColor: `color-mix(in srgb, ${colors.primary} 8%, transparent)`,
                                    borderColor: `color-mix(in srgb, ${colors.primary} 14%, transparent)`,
                                    color: colors.primary,
                                }}
                            >
                                <Sparkles className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <p
                                        className="text-[10px] font-semibold uppercase tracking-[0.15em]"
                                        style={{
                                            color: colors.secondary,
                                        }}
                                    >
                                        Early access
                                    </p>

                                    <span
                                        className="h-1 w-1 rounded-full"
                                        style={{
                                            backgroundColor: colors.borderStrong,
                                        }}
                                    />

                                    <span
                                        className="text-[10px]"
                                        style={{
                                            color: colors.muted,
                                        }}
                                    >
                                        Limited availability
                                    </span>
                                </div>

                                <h3
                                    className="mt-1.5 text-base font-semibold tracking-[-0.02em] sm:text-lg"
                                    style={{
                                        color: colors.text,
                                    }}
                                >
                                    Help shape the future of interview preparation.
                                </h3>

                                <p
                                    className="mt-1.5 max-w-2xl text-xs leading-5 sm:text-sm"
                                    style={{
                                        color: colors.muted,
                                    }}
                                >
                                    Be one of the first to experience VirtualMentor and help us build what comes next.
                                </p>
                            </div>
                        </div>

                        {/* =================================================
                            CTA
                        ================================================== */}
                        <Button
                            onClick={onStart}
                            className="group shrink-0"
                        >
                            Join Early Access

                            <ArrowRight
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-x-0.5"
                            />
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}