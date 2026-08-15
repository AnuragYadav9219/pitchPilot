import {
    ArrowRight,
    CheckCircle2,
    MessageSquareText,
    Sparkles,
    Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui";
import { Brand } from "@virtualmento/shared";

interface Step {
    number: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

const steps: Step[] = [
    {
        number: "01",
        title: "Choose your goal",
        description:
            `Tell ${Brand.name} what you want to practice, whether it is an interview, presentation, negotiation, or difficult conversation.`,
        icon: Target,
    },
    {
        number: "02",
        title: "Practice with your mentor",
        description:
            "Have a realistic conversation with your AI mentor and respond naturally instead of memorizing scripted answers.",
        icon: MessageSquareText,
    },
    {
        number: "03",
        title: "Get feedback and improve",
        description:
            "Receive practical feedback, identify weak areas, and practice again until you become more confident.",
        icon: CheckCircle2,
    },
];

export function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="relative overflow-hidden border-t border-(--vm-border) py-24 sm:py-32"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/3 h-100 w-100 rounded-full bg-(--vm-glow-green) opacity-20 blur-[140px]"
            />

            <Container>
                <div className="relative">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-(--vm-border) bg-(--vm-surface) px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-(--vm-secondary)">
                            Simple by design
                        </div>

                        <h2 className="text-4xl font-bold tracking-tight text-(--vm-text) sm:text-5xl">
                            Practice.
                            <span className="text-(--vm-primary)">
                                {" "}Improve.
                            </span>
                            <span className="text-(--vm-secondary)">
                                {" "}Grow.
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-(--vm-muted) sm:text-lg">
                            {Brand.name} turns preparation into a repeatable
                            practice loop designed to help you become better
                            through every conversation.
                        </p>
                    </div>

                    <div className="relative mt-16">
                        {/* Connecting line */}
                        <div
                            aria-hidden="true"
                            className="absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-linear-to-r from-(--vm-primary) via-(--vm-secondary) to-(--vm-accent) opacity-30 lg:block"
                        />

                        <div className="grid gap-8 lg:grid-cols-3">
                            {steps.map((step) => {
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={step.number}
                                        className="relative text-center"
                                    >
                                        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-(--vm-border-strong) bg-(--vm-background) shadow-2xl">
                                            <div className="absolute inset-2 rounded-full bg-(--vm-surface)" />

                                            <Icon
                                                size={28}
                                                className="relative z-10 text-(--vm-primary)"
                                                strokeWidth={1.7}
                                            />

                                            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-(--vm-primary) text-[10px] font-bold text-white">
                                                {step.number}
                                            </span>
                                        </div>

                                        <h3 className="mt-7 text-xl font-semibold text-(--vm-text)">
                                            {step.title}
                                        </h3>

                                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-(--vm-muted)">
                                            {step.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mx-auto mt-16 max-w-3xl shadow-2xl hover:-translate-y-1 rounded-(--vm-radius-xl) border border-(--vm-border) bg-(--vm-surface) p-6 backdrop-blur-xl sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-(--vm-radius-md) bg-(--vm-primary)/12 text-(--vm-primary)">
                                <Sparkles size={23} />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-semibold text-(--vm-text)">
                                    Your next conversation can be better.
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-(--vm-muted)">
                                    Start with one scenario and let consistent
                                    practice compound over time.
                                </p>
                            </div>

                            <ArrowRight
                                size={20}
                                className="hidden text-(--vm-primary) sm:block"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}