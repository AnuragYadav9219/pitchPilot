import {
    ArrowUpRight,
    BarChart3,
    BrainCircuit,
    Check,
    MessageCircle,
    Target,
    Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
    label: string;
}

const features: Feature[] = [
    {
        icon: BrainCircuit,
        title: "Realistic AI Interviews",
        description:
            "Practice interviews tailored to your role, experience level, and interview type.",
        label: "LIVE INTERVIEW",
    },
    {
        icon: MessageCircle,
        title: "Adaptive Follow-Ups",
        description:
            "Your mentor understands your answer and naturally follows up instead of reading a fixed script.",
        label: "SMART CONVERSATION",
    },
    {
        icon: BarChart3,
        title: "Instant AI Feedback",
        description:
            "See where you performed well and exactly what you can improve after every session.",
        label: "PERFORMANCE",
    },
    {
        icon: Target,
        title: "Personalized Practice",
        description:
            "Build every session around your target role, experience, skills, and interview goals.",
        label: "YOUR PRACTICE",
    },
];

const featureStyles = [
    {
        iconBg: "color-mix(in srgb, var(--vm-primary) 9%, transparent)",
        iconBorder: "color-mix(in srgb, var(--vm-primary) 18%, transparent)",
        iconColor: "var(--vm-primary)",
        accent: "var(--vm-primary)",
        softBg: "color-mix(in srgb, var(--vm-primary) 3%, transparent)",
    },
    {
        iconBg: "color-mix(in srgb, var(--vm-secondary) 9%, transparent)",
        iconBorder: "color-mix(in srgb, var(--vm-secondary) 18%, transparent)",
        iconColor: "var(--vm-secondary)",
        accent: "var(--vm-secondary)",
        softBg: "color-mix(in srgb, var(--vm-secondary) 3%, transparent)",
    },
    {
        iconBg: "color-mix(in srgb, var(--vm-orange) 9%, transparent)",
        iconBorder: "color-mix(in srgb, var(--vm-orange) 18%, transparent)",
        iconColor: "var(--vm-orange)",
        accent: "var(--vm-orange)",
        softBg: "color-mix(in srgb, var(--vm-orange) 3%, transparent)",
    },
    {
        iconBg: "color-mix(in srgb, var(--vm-terracotta) 9%, transparent)",
        iconBorder: "color-mix(in srgb, var(--vm-terracotta) 18%, transparent)",
        iconColor: "var(--vm-terracotta)",
        accent: "var(--vm-terracotta)",
        softBg: "color-mix(in srgb, var(--vm-terracotta) 3%, transparent)",
    },
];

/* -------------------------------------------------------------------------- */
/* Preview 01 — Realistic Interview                                           */
/* -------------------------------------------------------------------------- */

function InterviewPreview() {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface-2) p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg border"
                        style={{
                            background:
                                "color-mix(in srgb, var(--vm-primary) 9%, transparent)",
                            borderColor:
                                "color-mix(in srgb, var(--vm-primary) 16%, transparent)",
                            color: "var(--vm-primary)",
                        }}
                    >
                        <BrainCircuit className="h-4 w-4" strokeWidth={1.8} />
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold text-(--vm-text)">
                            AI Interviewer
                        </p>

                        <p className="mt-0.5 text-[8px] text-(--vm-muted)">
                            Backend Engineer · Mid-level
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-(--vm-primary)/15 bg-(--vm-primary)/5 px-2 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-(--vm-primary)" />
                    <span className="text-[8px] font-medium text-(--vm-primary)">
                        Live
                    </span>
                </div>
            </div>

            <div className="mt-3 rounded-xl border border-(--vm-border) bg-(--vm-background) p-3">
                <div className="flex items-center gap-1.5">
                    <Sparkles
                        className="h-3 w-3 text-(--vm-primary)"
                        strokeWidth={1.8}
                    />

                    <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-(--vm-primary)">
                        Interview Question
                    </p>
                </div>

                <p className="mt-2 text-[10px] leading-4.5 text-(--vm-text-secondary)">
                    Tell me about a challenging backend problem you solved and
                    how you approached it.
                </p>
            </div>

            <div className="mt-3 flex items-center gap-2">
                <div className="flex flex-1 items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-(--vm-primary)" />
                    <span className="h-1.5 w-1.5 rounded-full bg-(--vm-primary)/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-(--vm-primary)/30" />

                    <div className="ml-1 h-1.5 flex-1 overflow-hidden rounded-full bg-(--vm-border)">
                        <div className="h-full w-[68%] rounded-full bg-(--vm-primary)/30" />
                    </div>
                </div>

                <span className="text-[8px] font-medium text-(--vm-muted)">
                    Listening
                </span>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Preview 02 — Adaptive Conversation                                         */
/* -------------------------------------------------------------------------- */

function FollowUpPreview() {
    return (
        <div className="rounded-2xl border border-(--vm-border) bg-(--vm-surface-2) p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg border"
                        style={{
                            background:
                                "color-mix(in srgb, var(--vm-secondary) 9%, transparent)",
                            borderColor:
                                "color-mix(in srgb, var(--vm-secondary) 16%, transparent)",
                            color: "var(--vm-secondary)",
                        }}
                    >
                        <MessageCircle
                            className="h-4 w-4"
                            strokeWidth={1.8}
                        />
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold text-(--vm-text)">
                            Conversation
                        </p>

                        <p className="mt-0.5 text-[8px] text-(--vm-muted)">
                            Based on your answer
                        </p>
                    </div>
                </div>

                <span className="text-[8px] font-medium text-(--vm-secondary)">
                    Adaptive
                </span>
            </div>

            <div className="mt-3 space-y-2">
                <div className="ml-auto max-w-[72%] rounded-xl rounded-br-sm bg-(--vm-background) px-2.5 py-2">
                    <div className="h-1.5 w-full rounded-full bg-(--vm-border)" />
                    <div className="mt-1.5 h-1.5 w-[72%] rounded-full bg-(--vm-border)" />
                </div>

                <div className="max-w-[78%] rounded-xl rounded-bl-sm border border-(--vm-border) bg-(--vm-background) px-2.5 py-2">
                    <p className="text-[9px] leading-4 text-(--vm-text-secondary)">
                        What trade-offs did you consider?
                    </p>
                </div>
            </div>

            <div
                className="mt-3 flex items-center gap-2 rounded-xl px-2.5 py-2"
                style={{
                    background:
                        "color-mix(in srgb, var(--vm-secondary) 4%, transparent)",
                }}
            >
                <div className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-(--vm-secondary)" />
                    <span className="h-1 w-1 rounded-full bg-(--vm-secondary)/60" />
                    <span className="h-1 w-1 rounded-full bg-(--vm-secondary)/30" />
                </div>

                <span className="text-[8px] font-medium text-(--vm-secondary)">
                    Follow-up generated from your response
                </span>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Preview 03 — AI Feedback                                                    */
/* -------------------------------------------------------------------------- */

function FeedbackPreview() {
    return (
        <div className="rounded-2xl border border-(--vm-border) bg-(--vm-surface-2) p-3">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-(--vm-orange)">
                        Session Score
                    </p>

                    <div className="mt-0.5 flex items-end gap-1.5">
                        <span className="text-[24px] font-semibold leading-none tracking-tight text-(--vm-text)">
                            82
                        </span>

                        <span className="mb-0.5 text-[8px] text-(--vm-muted)">
                            / 100
                        </span>
                    </div>
                </div>

                <div className="rounded-full bg-(--vm-orange)/[0.07] px-2.5 py-1 text-[8px] font-semibold text-(--vm-orange)">
                    Strong
                </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-1.5">
                {[
                    ["Clarity", "88"],
                    ["Confidence", "81"],
                    ["Depth", "77"],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="rounded-xl border border-(--vm-border) bg-(--vm-background) p-2"
                    >
                        <p className="text-[7px] text-(--vm-muted)">
                            {label}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-(--vm-primary)">
                            {value}
                        </p>

                        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-(--vm-border)">
                            <div
                                className="h-full rounded-full bg-(--vm-primary)/30"
                                style={{
                                    width: `${Number(value) - 5}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-3 flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-(--vm-primary)/[0.07]">
                    <Check
                        className="h-3 w-3 text-(--vm-primary)"
                        strokeWidth={2.2}
                    />
                </div>

                <span className="text-[8px] font-medium text-(--vm-text-secondary)">
                    Clear and structured answers
                </span>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Preview 04 — Personalization                                                */
/* -------------------------------------------------------------------------- */

function PersonalizationPreview() {
    return (
        <div className="rounded-2xl border border-(--vm-border) bg-(--vm-surface-2) p-3">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-(--vm-terracotta)">
                        Practice Profile
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-(--vm-text)">
                        Built around your goals
                    </p>
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--vm-terracotta)/[0.07] text-(--vm-terracotta)">
                    <Target className="h-3.5 w-3.5" strokeWidth={1.8} />
                </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-1.5">
                {[
                    ["Role", "Software Engineer"],
                    ["Level", "Mid-level"],
                    ["Focus", "Technical"],
                    ["Goal", "Interview Ready"],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="rounded-xl border border-(--vm-border) bg-(--vm-background) p-2"
                    >
                        <p className="text-[7px] text-(--vm-muted)">
                            {label}
                        </p>

                        <p className="mt-1 truncate text-[9px] font-medium text-(--vm-text)">
                            {value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FeaturePreview({ index }: { index: number }) {
    switch (index) {
        case 0:
            return <InterviewPreview />;
        case 1:
            return <FollowUpPreview />;
        case 2:
            return <FeedbackPreview />;
        case 3:
            return <PersonalizationPreview />;
        default:
            return null;
    }
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                              */
/* -------------------------------------------------------------------------- */

export function Features() {
    return (
        <section
            id="features"
            className="relative isolate overflow-hidden border-t border-(--vm-border) bg-(--vm-background) py-20 sm:py-24"
        >
            {/* ---------------------------------------------------------------- */}
            {/* Premium background                                               */}
            {/* ---------------------------------------------------------------- */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-x-0 top-0 h-105"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--vm-primary) 7%, transparent), transparent 68%)",
                    }}
                />

                <div
                    className="absolute -left-40 top-[18%] h-90 w-90 rounded-full blur-3xl"
                    style={{
                        background:
                            "color-mix(in srgb, var(--vm-orange) 3%, transparent)",
                    }}
                />

                <div
                    className="absolute -right-40 bottom-[8%] h-100 w-100 rounded-full blur-3xl"
                    style={{
                        background:
                            "color-mix(in srgb, var(--vm-peach) 4%, transparent)",
                    }}
                />

                {/* Subtle center light */}
                <div
                    className="absolute left-1/2 top-[52%] h-65 w-175 -translate-x-1/2 rounded-full blur-3xl"
                    style={{
                        background:
                            "color-mix(in srgb, var(--vm-primary) 2%, transparent)",
                    }}
                />
            </div>

            <Container className="relative z-10">
                {/* ------------------------------------------------------------ */}
                {/* Section heading                                                */}
                {/* ------------------------------------------------------------ */}

                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-(--vm-primary)/15 bg-(--vm-primary)/[0.035] px-3.5 py-1.5">
                        <Sparkles
                            className="h-3.5 w-3.5 text-(--vm-primary)"
                            strokeWidth={1.8}
                        />

                        <span className="text-xs font-medium text-(--vm-primary)">
                            Everything you need to practice better
                        </span>
                    </div>

                    <h2 className="text-4xl font-semibold tracking-[-0.04em] text-(--vm-text) sm:text-5xl lg:whitespace-nowrap">
                        Practice{" "}
                        <span className="bg-linear-to-r from-(--vm-orange) via-(--vm-primary) to-(--vm-secondary) bg-clip-text text-transparent">
                            smarter.
                        </span>{" "}
                        Improve{" "}
                        <span className="text-(--vm-primary)">
                            faster.
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-(--vm-text-secondary) sm:text-base">
                        A realistic practice environment that helps you prepare, perform, and understand exactly where you can improve.
                    </p>
                </div>

                {/* ------------------------------------------------------------ */}
                {/* Adaptive feature grid                                          */}
                {/* ------------------------------------------------------------ */}

                <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const style = featureStyles[index];

                        return (
                            <article
                                key={feature.title}
                                className="group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-(--vm-border) bg-(--vm-surface) p-4 transition-[border-color,background-color] duration-300 sm:p-5"
                                style={{
                                    ["--feature-accent" as string]:
                                        style.accent,
                                }}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.borderColor =
                                        `color-mix(in srgb, ${style.accent} 32%, var(--vm-border))`;
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.borderColor =
                                        "";
                                }}
                            >
                                {/* Top accent line */}
                                <div
                                    className="absolute left-6 right-6 top-0 h-px"
                                    style={{
                                        background: `color-mix(in srgb, ${style.accent} 42%, transparent)`,
                                    }}
                                />

                                {/* Very subtle ambient light */}
                                <div
                                    className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl"
                                    style={{
                                        background: style.softBg,
                                    }}
                                />

                                <div className="relative z-10 flex flex-1 flex-col">
                                    {/* Card header */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border"
                                            style={{
                                                background: style.iconBg,
                                                borderColor:
                                                    style.iconBorder,
                                                color: style.iconColor,
                                            }}
                                        >
                                            <Icon
                                                className="h-4 w-4"
                                                strokeWidth={1.8}
                                            />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="hidden text-[8px] font-medium tracking-[0.14em] text-(--vm-muted) sm:inline">
                                                {feature.label}
                                            </span>

                                            <span className="text-[10px] font-medium text-(--vm-muted)">
                                                0{index + 1}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="mt-4">
                                        <h3
                                            className="text-lg font-semibold tracking-[-0.02em]"
                                            style={{
                                                color: style.accent,
                                            }}
                                        >
                                            {feature.title}
                                        </h3>

                                        <p className="mt-1.5 max-w-xl text-[13px] leading-5.5 text-(--vm-text-secondary)">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Adaptive product preview */}
                                    <div className="mt-4">
                                        <FeaturePreview index={index} />
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-4 flex items-center justify-between border-t border-(--vm-border) pt-3.5">
                                        <div className="flex items-center gap-1.5">
                                            <span
                                                className="h-1.5 w-1.5 rounded-full"
                                                style={{
                                                    background:
                                                        style.accent,
                                                }}
                                            />

                                            <span className="text-[9px] font-medium text-(--vm-muted)">
                                                Built into every session
                                            </span>
                                        </div>

                                        <ArrowUpRight
                                            className="h-3.5 w-3.5 text-(--vm-muted) transition-colors duration-300 group-hover:text-(--vm-primary)"
                                            strokeWidth={1.8}
                                        />
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* ------------------------------------------------------------ */}
                {/* Bottom statement                                               */}
                {/* ------------------------------------------------------------ */}

                <div className="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-3 text-center">
                    <div className="hidden h-px flex-1 bg-(--vm-border) sm:block" />

                    <p className="text-xs leading-5 text-(--vm-muted)">
                        Every practice session is designed to make the next
                        interview feel a little easier.
                    </p>

                    <div className="hidden h-px flex-1 bg-(--vm-border) sm:block" />
                </div>
            </Container>
        </section>
    );
}