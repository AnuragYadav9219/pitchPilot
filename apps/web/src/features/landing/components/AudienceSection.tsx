import { BriefcaseBusiness, GraduationCap, RefreshCcw, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useTheme } from "@/app/theme/ThemeProvider";
import { PremiumBackground } from "@/assets/backgrounds/AnimatedAIBackground";

type ThemeColors = ReturnType<typeof useTheme>["colors"];

interface Audience {
    title: string;
    eyebrow: string;
    description: string;
    icon: LucideIcon;
    accent: "primary" | "secondary" | "success" | "gradient";
}

const audiences: Audience[] = [
    {
        title: "Students & Graduates",
        eyebrow: "START STRONG",
        description: "Build interview confidence before your first big opportunity.",
        icon: GraduationCap,
        accent: "primary",
    },
    {
        title: "Working Professionals",
        eyebrow: "MOVE FORWARD",
        description: "Sharpen your answers and prepare for your next career move.",
        icon: BriefcaseBusiness,
        accent: "secondary",
    },
    {
        title: "Career Switchers",
        eyebrow: "CHANGE DIRECTION",
        description: "Practice communicating your experience for a completely new role.",
        icon: RefreshCcw,
        accent: "success",
    },
    {
        title: "Lifelong Learners",
        eyebrow: "KEEP GROWING",
        description: "Turn every conversation into another opportunity to improve.",
        icon: Sparkles,
        accent: "gradient",
    },
];

/* ================================================================
   THEME-SAFE ALPHA
================================================================ */

function alpha(color: string, percentage: number) {
    return `color-mix(in srgb, ${color} ${percentage}%, transparent)`;
}

/* ================================================================
   SECTION
================================================================ */

export function AudienceSection() {
    const { colors } = useTheme();

    return (
        <section
            className="vm-audience relative isolate overflow-hidden py-24 sm:py-28 lg:py-32"
            style={{ backgroundColor: colors.background }}
        >
            {/* Background */}
            <PremiumBackground />

            {/* Content */}
            <Container>
                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <div
                        className="vm-audience-reveal inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{
                            borderColor: alpha(colors.primary, 22),
                            backgroundColor: alpha(colors.primary, 6),
                            color: colors.primary,
                        }}
                    >
                        <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                                backgroundColor: colors.primary,
                                boxShadow: `0 0 10px ${alpha(colors.primary, 65)}`,
                            }}
                        />
                        Built for your journey
                    </div>

                    <h2
                        className="vm-audience-reveal mt-5 text-3xl font-bold tracking-[-0.045em] sm:text-4xl lg:text-[3.35rem] lg:leading-[1.04]"
                        style={{
                            color: colors.text,
                            animationDelay: "100ms",
                        }}
                    >
                        Wherever you are in your career,
                        <span
                            className="mt-1 block bg-clip-text text-transparent"
                            style={{
                                backgroundImage: `linear-gradient(
                                    100deg,
                                    ${colors.gradientStart},
                                    ${colors.gradientMiddle},
                                    ${colors.gradientEnd}
                                )`,
                            }}
                        >
                            practice for what's next.
                        </span>
                    </h2>

                    <p
                        className="vm-audience-reveal mx-auto mt-5 max-w-162.5 text-sm leading-7 sm:text-base"
                        style={{
                            color: colors.textSecondary,
                            animationDelay: "180ms",
                        }}
                    >
                        VirtualMentor adapts to where you are today and helps you become more confident for where you want to go next.
                    </p>
                </div>

                {/* Audience Cards */}
                <div className="relative mt-14 sm:mt-16">
                    {/* Central glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
                        style={{
                            background: `linear-gradient(
                                90deg,
                                ${alpha(colors.primary, 8)},
                                ${alpha(colors.gradientEnd, 7)}
                            )`,
                        }}
                    />

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {audiences.map((audience, index) => (
                            <AudienceCard
                                key={audience.title}
                                audience={audience}
                                colors={colors}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Message */}
                <div
                    className="vm-audience-reveal relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border px-6 py-6 text-center sm:px-10 sm:py-7"
                    style={{
                        borderColor: alpha(colors.borderStrong, 50),
                        backgroundColor: alpha(colors.surface, 72),
                        boxShadow: `0 25px 70px -45px ${alpha(colors.primary, 30)}`,
                        animationDelay: "500ms",
                    }}
                >
                    {/* Top light */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-[15%] top-0 h-px"
                        style={{
                            background: `linear-gradient(
                                90deg,
                                transparent,
                                ${alpha(colors.primary, 60)},
                                ${alpha(colors.gradientEnd, 60)},
                                transparent
                            )`,
                        }}
                    />

                    <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                            style={{
                                backgroundColor: alpha(colors.primary, 9),
                                color: colors.primary,
                                border: `1px solid ${alpha(colors.primary, 14)}`,
                            }}
                        >
                            <Sparkles size={16} />
                        </div>

                        <p
                            className="text-sm leading-6"
                            style={{ color: colors.textSecondary }}
                        >
                            No matter your experience level, the goal is the same:
                            <span
                                className="font-semibold"
                                style={{ color: colors.text }}
                            >
                                {" "}
                                walk into your next conversation with more confidence than the last.
                            </span>
                        </p>
                    </div>
                </div>
            </Container>

            {/* Animations */}
            <style>{`
                @keyframes vmAudienceReveal {
                    from {
                        opacity: 0;
                        transform: translateY(18px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes vmAudienceGlow {
                    0%, 100% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    50% {
                        transform: translate3d(20px, 12px, 0) scale(1.05);
                    }
                }

                @keyframes vmAudienceGlowTwo {
                    0%, 100% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    50% {
                        transform: translate3d(-18px, -10px, 0) scale(1.04);
                    }
                }

                .vm-audience-reveal {
                    opacity: 0;
                    animation: vmAudienceReveal 700ms cubic-bezier(.22, 1, .36, 1) forwards;
                }

                .vm-audience-glow {
                    animation: vmAudienceGlow 12s ease-in-out infinite;
                }

                .vm-audience-glow-2 {
                    animation: vmAudienceGlowTwo 14s ease-in-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .vm-audience-reveal,
                    .vm-audience-glow,
                    .vm-audience-glow-2 {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </section>
    );
}

/* ================================================================
   AUDIENCE CARD
================================================================ */

function AudienceCard({
    audience,
    colors,
    index,
}: {
    audience: Audience;
    colors: ThemeColors;
    index: number;
}) {
    const Icon = audience.icon;
    const accentColor = getAccentColor(audience.accent, colors);

    return (
        <article
            className="group vm-audience-reveal relative min-h-71.25 overflow-hidden rounded-[26px] border p-6 transition-all duration-500 hover:-translate-y-2"
            style={{
                borderColor: alpha(colors.borderStrong, 45),
                backgroundColor: alpha(colors.surface, 82),
                boxShadow: `0 20px 50px -35px ${alpha(colors.text, 24)}`,
                animationDelay: `${220 + index * 90}ms`,
            }}
        >
            {/* Card Hover Glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[65px] opacity-60 transition-all duration-700 group-hover:scale-125 group-hover:opacity-100"
                style={{
                    backgroundColor: accentColor,
                    opacity: 0.07,
                }}
            />

            {/* Card Top Line */}
            <div
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-px opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `linear-gradient(
                        90deg,
                        transparent,
                        ${alpha(accentColor, 65)},
                        transparent
                    )`,
                }}
            />

            {/* Decorative Number */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-1 -top-3 select-none text-[76px] font-black leading-none tracking-[-0.08em] transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{
                    color: colors.text,
                    opacity: 0.025,
                }}
            >
                0{index + 1}
            </span>

            {/* Icon */}
            <div
                className="relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:-rotate-3 group-hover:scale-105"
                style={{
                    background: `linear-gradient(
                        135deg,
                        ${alpha(accentColor, 16)},
                        ${alpha(accentColor, 6)}
                    )`,
                    color: accentColor,
                    border: `1px solid ${alpha(accentColor, 20)}`,
                    boxShadow: `
                        inset 0 1px 0 ${alpha(colors.text, 8)},
                        0 8px 22px ${alpha(accentColor, 10)}
                    `,
                }}
            >
                <Icon size={21} strokeWidth={1.9} />

                {/* Tiny accent dot */}
                <span
                    aria-hidden="true"
                    className="absolute -right-1 -top-1 h-2 w-2 rounded-full"
                    style={{
                        backgroundColor: accentColor,
                        boxShadow: `0 0 10px ${alpha(accentColor, 65)}`,
                    }}
                />
            </div>

            {/* Text Content */}
            <div className="relative mt-7">
                <p
                    className="text-[9px] font-bold tracking-[0.18em]"
                    style={{ color: accentColor }}
                >
                    {audience.eyebrow}
                </p>

                <h3
                    className="mt-2.5 text-[17px] font-bold tracking-[-0.02em]"
                    style={{ color: colors.text }}
                >
                    {audience.title}
                </h3>

                <p
                    className="mt-3 text-[13px] leading-6"
                    style={{ color: colors.textSecondary }}
                >
                    {audience.description}
                </p>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-6 left-6 right-6">
                <div
                    className="h-px w-0 transition-all duration-700 group-hover:w-full"
                    style={{
                        background: `linear-gradient(
                            90deg,
                            ${accentColor},
                            transparent
                        )`,
                        opacity: 0.45,
                    }}
                />
            </div>
        </article>
    );
}

/* ================================================================
   ACCENT COLOR
================================================================ */

function getAccentColor(accent: Audience["accent"], colors: ThemeColors) {
    switch (accent) {
        case "secondary":
            return colors.secondary;
        case "success":
            return colors.success;
        case "gradient":
            return colors.gradientEnd;
        case "primary":
        default:
            return colors.primary;
    }
}