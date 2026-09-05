import {
    ArrowRight,
    CheckCircle2,
    MessageSquareText,
    Sparkles,
    Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui";
import { PremiumBackground } from "@/assets/backgrounds/AnimatedAIBackground";

interface Step {
    number: string;
    icon: LucideIcon;
    title: string;
    description: string;
    detail: string;
    accent: string;
    badge: string;
}

const steps: Step[] = [
    {
        number: "01",
        icon: Target,
        title: "Choose your interview",
        description:
            "Start by telling VirtualMentor what you're preparing for. Choose your target role, experience level, and interview type.",
        detail: "Personalized setup",
        accent: "var(--vm-orange)",
        badge: "Set direction",
    },
    {
        number: "02",
        icon: MessageSquareText,
        title: "Practice with your mentor",
        description:
            "Enter a realistic interview conversation. Your mentor asks questions, listens to your answers, and adapts dynamically.",
        detail: "Adaptive conversation",
        accent: "var(--vm-primary)",
        badge: "Build confidence",
    },
    {
        number: "03",
        icon: CheckCircle2,
        title: "Get feedback and improve",
        description:
            "Finish with clear insights into your performance, including what went well, what needs work, and where to focus next.",
        detail: "Actionable feedback",
        accent: "var(--vm-secondary)",
        badge: "Actionable growth",
    },
];

export function HowItWorksSection() {
    return (
        <section
            id="how-it-works"
            className="relative isolate overflow-hidden border-y border-(--vm-border) bg-(--vm-background-alt) py-16 sm:py-24 lg:py-32"
        >
            <PremiumBackground />

            <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-(--vm-primary)/15 bg-(--vm-primary)/4 px-3 py-1 sm:mb-4 sm:px-3.5 sm:py-1.5 backdrop-blur-sm">
                        <Sparkles className="h-3 w-3 text-(--vm-primary) sm:h-3.5 sm:w-3.5" />
                        <span className="text-[11px] font-medium text-(--vm-primary) sm:text-xs">
                            Simple by design
                        </span>
                    </div>

                    <h2 className="text-2xl font-semibold tracking-[-0.04em] text-(--vm-text) sm:text-4xl lg:text-5xl">
                        Practice.{" "}
                        <span className="text-(--vm-primary)">Improve.</span>{" "}
                        <span className="text-(--vm-secondary)">Grow.</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-(--vm-text-secondary) sm:mt-4 sm:text-base sm:leading-7">
                        A continuous feedback loop designed to transform
                        interview anxiety into quiet confidence.
                    </p>
                </div>

                {/* Steps Container */}
                <div className="relative mx-auto mt-10 max-w-6xl sm:mt-16 lg:mt-24">
                    {/* Horizontal Connector Line (Desktop Only - lg) */}
                    <div
                        aria-hidden="true"
                        className="absolute left-[16%] right-[16%] top-7 hidden lg:block"
                    >
                        <div className="h-px w-full bg-linear-to-r from-(--vm-orange)/30 via-(--vm-primary)/30 to-(--vm-secondary)/30" />
                    </div>

                    {/* Vertical Connector Line (Mobile & Tablet - up to lg) */}
                    <div
                        aria-hidden="true"
                        className="absolute bottom-6 left-5 top-6 w-px bg-linear-to-b from-(--vm-orange)/30 via-(--vm-primary)/30 to-(--vm-secondary)/30 sm:left-6 lg:hidden"
                    />

                    <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <article
                                    key={step.number}
                                    className="group relative flex flex-col pl-12 sm:pl-16 lg:pl-0"
                                >
                                    {/* Icon Marker Header */}
                                    <div className="flex items-center gap-3 lg:flex-col lg:items-center">
                                        {/* Icon Container with relative positioning for tight badge anchoring */}
                                        <div className="absolute left-0 top-0 lg:static">
                                            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--vm-border) bg-(--vm-surface) shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-transparent sm:h-12 sm:w-12 sm:rounded-2xl lg:h-14 lg:w-14">
                                                {/* Hover Glow */}
                                                <div
                                                    aria-hidden="true"
                                                    className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                    style={{
                                                        background: `color-mix(in srgb, ${step.accent} 12%, transparent)`,
                                                        boxShadow: `0 0 20px color-mix(in srgb, ${step.accent} 20%, transparent)`,
                                                    }}
                                                />

                                                <Icon
                                                    className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                                                    style={{
                                                        color: step.accent,
                                                    }}
                                                    strokeWidth={1.8}
                                                />

                                                {/* Pinned Number Badge */}
                                                <span
                                                    className="absolute -right-1.5 -top-1.5 z-20 flex h-4 min-w-4 items-center justify-center rounded-full border bg-(--vm-surface) px-1 text-[8px] font-bold shadow-xs sm:-right-2 sm:-top-2 sm:h-5 sm:min-w-5 sm:text-[9px]"
                                                    style={{
                                                        color: step.accent,
                                                        borderColor: `color-mix(in srgb, ${step.accent} 35%, var(--vm-border))`,
                                                    }}
                                                >
                                                    {step.number}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Header visible on mobile/tablet alongside icon */}
                                        <div className="lg:hidden">
                                            <span
                                                className="text-[9px] font-semibold uppercase tracking-widest sm:text-[10px]"
                                                style={{ color: step.accent }}
                                            >
                                                {step.detail}
                                            </span>
                                            <h3 className="text-base font-semibold tracking-tight text-(--vm-text) sm:text-lg">
                                                {step.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Card Content Container */}
                                    <div className="mt-2 flex flex-1 flex-col rounded-xl border border-(--vm-border) bg-(--vm-surface)/50 p-4 backdrop-blur-xs transition-all duration-300 group-hover:border-(--vm-border)/80 group-hover:bg-(--vm-surface) sm:mt-3 sm:rounded-2xl sm:p-6 lg:mt-6 lg:text-center">
                                        <span
                                            className="hidden text-[10px] font-semibold uppercase tracking-widest lg:block"
                                            style={{ color: step.accent }}
                                        >
                                            {step.detail}
                                        </span>

                                        <h3 className="hidden text-lg font-semibold tracking-tight text-(--vm-text) lg:mt-1.5 lg:block lg:text-xl">
                                            {step.title}
                                        </h3>

                                        <p className="text-xs leading-5 text-(--vm-text-secondary) sm:text-sm sm:leading-6 lg:mt-2.5">
                                            {step.description}
                                        </p>

                                        {/* Bottom Action Badge */}
                                        <div className="mt-4 flex items-center gap-1.5 border-t border-(--vm-border)/60 pt-3 sm:mt-5 sm:pt-4 lg:justify-center">
                                            <span
                                                className="h-1.5 w-1.5 rounded-full"
                                                style={{
                                                    background: step.accent,
                                                }}
                                            />
                                            <span className="text-[10px] font-medium text-(--vm-muted) sm:text-[11px]">
                                                {step.badge}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Directional Arrow (Desktop Only - lg) */}
                                    {index < steps.length - 1 && (
                                        <div
                                            aria-hidden="true"
                                            className="absolute -right-4 top-5 z-20 hidden text-(--vm-muted)/30 lg:block"
                                        >
                                            <ArrowRight
                                                className="h-5 w-5"
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* Closing Statement Footer */}
                <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-(--vm-border) bg-(--vm-surface)/40 p-3.5 text-center backdrop-blur-xs sm:mt-16 sm:rounded-2xl sm:p-5 lg:mt-20">
                    <p className="text-xs leading-5 text-(--vm-text-secondary) sm:text-sm sm:leading-6">
                        The goal isn't to memorize canned answers.{" "}
                        <span className="font-semibold text-(--vm-text)">
                            It's to build genuine adaptability, clarity, and
                            poise under pressure.
                        </span>
                    </p>
                </div>
            </Container>
        </section>
    );
}