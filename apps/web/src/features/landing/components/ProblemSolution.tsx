import { ArrowRight, Check, Sparkles, X } from "lucide-react";

import { Container } from "@/components/ui";

interface ComparisonCardProps {
    negative?: boolean;
    title: string;
    description: string;
    items: string[];
}

function ComparisonCard({
    negative = false,
    title,
    description,
    items,
}: ComparisonCardProps) {
    return (
        <article
            className={`vm-comparison-card group relative overflow-hidden rounded-[28px] border p-6 sm:p-8 lg:p-9 ${negative
                    ? "border-(--vm-border) bg-(--vm-surface)"
                    : "border-(--vm-primary)/20 bg-(--vm-surface)"
                }`}
        >
            {/* Top accent line */}
            <div
                className={`absolute inset-x-8 top-0 h-px ${negative
                        ? "bg-linear-to-r from-transparent via-red-500/30 to-transparent"
                        : "bg-linear-to-r from-transparent via-(--vm-primary) to-transparent"
                    }`}
            />

            {/* Background atmosphere */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl transition-all duration-700 group-hover:scale-125 ${negative ? "bg-red-500/2.5" : "bg-(--vm-primary)/6"
                    }`}
            />

            {/* Solution glow */}
            {!negative && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-32 w-1/2 rounded-full bg-(--vm-gradient-end)/[0.035] blur-3xl"
                />
            )}

            <div className="relative">
                {/* Header */}
                <div className="flex items-start gap-4">
                    <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${negative
                                ? "border-red-500/15 bg-red-500/6 text-red-500"
                                : "border-emerald-500/15 bg-emerald-500/[0.07] text-emerald-500"
                            }`}
                    >
                        {negative ? (
                            <X size={19} strokeWidth={2.1} />
                        ) : (
                            <Sparkles size={18} strokeWidth={1.9} />
                        )}
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold tracking-[-0.02em] text-(--vm-text) sm:text-xl">
                                {title}
                            </h3>

                            {!negative && (
                                <span className="hidden rounded-full border border-emerald-500/15 bg-emerald-500/6 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-500 sm:inline-flex">
                                    Recommended
                                </span>
                            )}
                        </div>

                        <p className="mt-1.5 max-w-lg text-sm leading-6 text-(--vm-muted)">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-7 h-px bg-(--vm-border)" />

                {/* Items */}
                <ul className="space-y-1">
                    {items.map((item, index) => (
                        <li
                            key={item}
                            className="vm-comparison-item group/item flex items-center gap-4 rounded-2xl px-2 py-3 transition-colors duration-200 hover:bg-(--vm-background)/60"
                            style={{
                                animationDelay: `${450 + index * 90}ms`,
                            }}
                        >
                            {/* Number */}
                            <span className="hidden w-5 shrink-0 text-[11px] font-medium tabular-nums text-(--vm-muted)/60 sm:block">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* Status icon */}
                            <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover/item:scale-105 ${negative
                                        ? "border-red-500/15 bg-red-500/[0.07] text-red-500"
                                        : "border-emerald-500/15 bg-emerald-500/[0.07] text-emerald-500"
                                    }`}
                            >
                                {negative ? (
                                    <X size={13} strokeWidth={2.4} />
                                ) : (
                                    <Check size={13} strokeWidth={2.6} />
                                )}
                            </span>

                            {/* Text */}
                            <span className="text-sm leading-6 text-(--vm-text-secondary) transition-colors duration-200 group-hover/item:text-(--vm-text)">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

export function ProblemSolution() {
    return (
        <section
            id="problem"
            className="relative isolate overflow-hidden border-y border-(--vm-border) bg-(--vm-background) py-24 sm:py-28 lg:py-32"
        >
            {/* Background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                {/* Soft top atmosphere */}
                <div
                    className="vm-problem-light absolute left-1/2 -top-55 h-130 w-225 -translate-x-1/2 rounded-full blur-[110px]"
                    style={{
                        background:
                            "radial-gradient(ellipse, color-mix(in srgb, var(--vm-primary) 5%, transparent), transparent 70%)",
                    }}
                />

                {/* Left subtle red atmosphere */}
                <div className="absolute -left-48 bottom-[10%] h-90 w-90 rounded-full bg-red-500/2.5 blur-[120px]" />

                {/* Right subtle green atmosphere */}
                <div className="absolute -right-48 bottom-[5%] h-100 w-100 rounded-full bg-emerald-500/2.5 blur-[120px]" />

                {/* Bottom fade */}
                <div
                    className="absolute inset-x-0 bottom-0 h-32"
                    style={{
                        background:
                            "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--vm-background) 40%, transparent))",
                    }}
                />
            </div>

            <Container>
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="vm-problem-reveal inline-flex items-center gap-2 rounded-full border border-(--vm-border) bg-(--vm-surface)/70 px-3.5 py-1.5 text-xs font-medium text-(--vm-muted) backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-(--vm-primary) shadow-[0_0_8px_var(--vm-primary)]" />
                        A better way to prepare
                    </div>

                    <h2
                        className="vm-problem-reveal mt-6 text-3xl font-semibold tracking-[-0.04em] text-(--vm-text) sm:text-4xl lg:text-[48px] lg:leading-[1.08]"
                        style={{
                            animationDelay: "80ms",
                        }}
                    >
                        Reading interview questions
                        <br className="hidden sm:block" />
                        <span className="text-(--vm-muted)">
                            {" "}
                            isn't the same as being interviewed.
                        </span>
                    </h2>

                    <p
                        className="vm-problem-reveal mx-auto mt-6 max-w-2xl text-base leading-7 text-(--vm-muted) sm:text-lg sm:leading-8"
                        style={{
                            animationDelay: "160ms",
                        }}
                    >
                        Most preparation helps you memorize what to say. VirtualMentor helps you learn how to think, respond, communicate, and handle the unexpected.
                    </p>
                </div>

                {/* Comparison */}
                <div className="relative mx-auto mt-14 max-w-6xl lg:mt-16">
                    <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
                        {/* Traditional */}
                        <div
                            className="vm-problem-card"
                            style={{
                                animationDelay: "240ms",
                            }}
                        >
                            <ComparisonCard
                                negative
                                title="Traditional Preparation"
                                description="Study answers in isolation and hope you're ready when the conversation takes an unexpected turn."
                                items={[
                                    "Read lists of common interview questions",
                                    "Memorize suggested answers",
                                    "Practice without realistic pressure",
                                    "Receive little or no meaningful feedback",
                                    "Hard to improve communication and thinking",
                                ]}
                            />
                        </div>

                        {/* VirtualMentor */}
                        <div
                            className="vm-problem-card"
                            style={{
                                animationDelay: "340ms",
                            }}
                        >
                            <ComparisonCard
                                title="The VirtualMentor Way"
                                description="Practice the conversation itself and build the skills you need to perform when it matters."
                                items={[
                                    "Practice realistic, dynamic interviews",
                                    "Respond naturally instead of memorizing scripts",
                                    "Handle adaptive follow-up questions",
                                    "Receive detailed AI-powered feedback",
                                    "Build confidence through repeated practice",
                                ]}
                            />
                        </div>
                    </div>

                    {/* Center transition */}
                    <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                    >
                        <div className="vm-problem-arrow flex h-12 w-12 items-center justify-center rounded-full border border-(--vm-border) bg-(--vm-background) text-(--vm-text) shadow-xl">
                            <ArrowRight size={17} strokeWidth={1.8} />
                        </div>
                    </div>
                </div>

                {/* Bottom message */}
                <div
                    className="vm-problem-reveal mx-auto mt-12 max-w-xl text-center"
                    style={{
                        animationDelay: "520ms",
                    }}
                >
                    <p className="text-sm leading-6 text-(--vm-muted)">
                        The goal isn't to give you perfect answers.
                        <span className="font-semibold text-(--vm-text)">
                            {" "}
                            It's to make you better at answering.
                        </span>
                    </p>
                </div>
            </Container>

            {/* Animations */}
            <style>{`
                @keyframes vmProblemReveal {
                    from {
                        opacity: 0;
                        transform: translateY(18px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes vmProblemCard {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(.985);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes vmProblemItem {
                    from {
                        opacity: 0;
                        transform: translateX(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes vmProblemLight {
                    0%, 100% {
                        transform: translateX(-50%) translateY(0) scale(1);
                    }
                    50% {
                        transform: translateX(-50%) translateY(25px) scale(1.06);
                    }
                }

                @keyframes vmProblemArrow {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    50% {
                        transform: translateX(5px);
                    }
                }

                .vm-problem-reveal {
                    opacity: 0;
                    animation: vmProblemReveal 750ms cubic-bezier(.22, 1, .36, 1) forwards;
                }

                .vm-problem-card {
                    opacity: 0;
                    animation: vmProblemCard 850ms cubic-bezier(.22, 1, .36, 1) forwards;
                }

                .vm-comparison-item {
                    opacity: 0;
                    animation: vmProblemItem 500ms cubic-bezier(.22, 1, .36, 1) forwards;
                }

                .vm-problem-light {
                    animation: vmProblemLight 18s ease-in-out infinite;
                }

                .vm-problem-arrow {
                    animation: vmProblemArrow 2.8s ease-in-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .vm-problem-reveal,
                    .vm-problem-card,
                    .vm-comparison-item {
                        opacity: 1;
                        animation: none;
                    }

                    .vm-problem-light,
                    .vm-problem-arrow {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    );
}