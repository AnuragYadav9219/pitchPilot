import {
    ArrowUpRight,
    BrainCircuit,
    Globe2,
    MessageCircle,
    Mic2,
    Target,
    TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, Container } from "@/components/ui";
import { Brand } from "@virtualmento/shared";

type FeatureAccent = "purple" | "green" | "orange";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
    accent: FeatureAccent;
}

const features: Feature[] = [
    {
        icon: Mic2,
        title: "Interview Practice",
        description:
            "Practice realistic interview conversations and learn how to communicate your experience with confidence.",
        accent: "purple",
    },
    {
        icon: MessageCircle,
        title: "Real Conversations",
        description:
            "Prepare for presentations, negotiations, difficult conversations, and other situations that matter.",
        accent: "green",
    },
    {
        icon: BrainCircuit,
        title: "AI-Powered Feedback",
        description:
            "Get practical feedback after every session so you understand what went well and what to improve.",
        accent: "orange",
    },
    {
        icon: Target,
        title: "Personalized Coaching",
        description:
            "Practice according to your goals and focus on the communication skills you need most.",
        accent: "purple",
    },
    {
        icon: TrendingUp,
        title: "Track Your Growth",
        description:
            "Turn repeated practice into measurable progress and build confidence over time.",
        accent: "green",
    },
    {
        icon: Globe2,
        title: "Web + Mobile",
        description:
            `Keep your mentoring journey connected across ${Brand.name}'s web and mobile experiences.`,
        accent: "orange",
    },
];

const accentStyles: Record<
    FeatureAccent,
    {
        icon: string;
        glow: string;
    }
> = {
    purple: {
        icon: "bg-(--vm-primary)/12 text-(--vm-primary)",
        glow: "bg-(--vm-glow-purple)",
    },
    green: {
        icon: "bg-(--vm-secondary)/12 text-(--vm-secondary)",
        glow: "bg-(--vm-glow-green)",
    },
    orange: {
        icon: "bg-(--vm-accent)/12 text-(--vm-accent)",
        glow: "bg-(--vm-glow-orange)",
    },
};

interface FeatureCardProps {
    feature: Feature;
}

function FeatureCard({ feature }: FeatureCardProps) {
    const Icon = feature.icon;
    const styles = accentStyles[feature.accent];

    return (
        <Card
            interactive
            className="group relative overflow-hidden shadow-2xl p-6"
        >
            {/* Decorative glow */}
            <div
                aria-hidden="true"
                className={[
                    "pointer-events-none absolute -right-20 -top-20",
                    "h-40 w-40 rounded-full blur-3xl",
                    "opacity-0 transition-opacity",
                    "duration-(--vm-animation-normal)",
                    "group-hover:opacity-100",
                    styles.glow,
                ].join(" ")}
            />

            <div className="relative">
                <div className="flex items-start justify-between">
                    <div
                        className={[
                            "flex h-12 w-12 items-center justify-center",
                            "rounded-(--vm-radius-md)",
                            styles.icon,
                        ].join(" ")}
                    >
                        <Icon
                            size={23}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    </div>

                    <ArrowUpRight
                        size={20}
                        aria-hidden="true"
                        className={[
                            "text-(--vm-muted)",
                            "opacity-0",
                            "transition-all duration-(--vm-animation-fast)",
                            "group-hover:-translate-y-0.5",
                            "group-hover:translate-x-0.5",
                            "group-hover:opacity-100",
                        ].join(" ")}
                    />
                </div>

                <h3 className="mt-7 text-xl font-semibold tracking-tight text-(--vm-text)">
                    {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-(--vm-muted)">
                    {feature.description}
                </p>
            </div>
        </Card>
    );
}

export function Features() {
    return (
        <section
            id="features"
            className="relative overflow-hidden border-t border-(--vm-border) py-24 sm:py-32"
        >
            {/* Background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-100 w-100 -translate-x-1/2 rounded-full bg-(--vm-glow-purple) opacity-25 blur-[140px]"
            />

            {/* Subtle grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--vm-text) 1px, transparent 1px), linear-gradient(90deg, var(--vm-text) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />

            <Container>
                <div className="relative">
                    {/* Section heading */}
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-5 inline-flex items-center rounded-full border border-(--vm-border) bg-(--vm-surface) px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-(--vm-primary)">
                            Built for real growth
                        </div>

                        <h2 className="text-4xl font-bold tracking-tight text-(--vm-text) sm:text-5xl">
                            More than a chatbot.
                            <span className="mt-2 block text-(--vm-primary)">
                                A mentor that grows with you.
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-(--vm-muted) sm:text-lg">
                            {Brand.name} helps you practice the conversations
                            that matter, understand your weaknesses, and build
                            confidence through deliberate practice.
                        </p>
                    </div>

                    {/* Feature grid */}
                    <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <FeatureCard
                                key={feature.title}
                                feature={feature}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}