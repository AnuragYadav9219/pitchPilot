import {
    ArrowRight,
    Brain,
    Check,
    Sparkles,
    Users,
} from "lucide-react";
import { motion } from "framer-motion";

import { Brand } from "@virtualmento/shared";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type LaunchAdProps = {
    onEarlyAccess: () => void;
};

export default function VirtualMentoLaunchAd({
    onEarlyAccess,
}: LaunchAdProps) {
    return (
        <section className="relative isolate overflow-hidden py-20 sm:py-24">
            {/* SaaS grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-20 opacity-30"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                    maskImage:
                        "linear-gradient(to bottom, black, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, black, transparent)",
                }}
            />

            {/* Background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
            >
                <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-(--vm-glow-purple) opacity-25 blur-[120px]" />
                <div className="absolute -right-40 top-1/3 h-100 w-100 rounded-full bg-(--vm-glow-purple) opacity-10 blur-[110px]" />
                <div className="absolute -left-40 bottom-0 h-75 w-75 rounded-full bg-(--vm-glow-green) opacity-10 blur-[100px]" />
            </div>

            <Container>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="relative overflow-hidden rounded-(--vm-radius-xl) border border-(--vm-border-strong) bg-(--vm-surface) shadow-2xl backdrop-blur-xl"
                >
                    {/* Top purple glow */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--vm-primary) to-transparent"
                    />

                    <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
                        {/* Left */}
                        <div>
                            {/* Eyebrow */}
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-(--vm-border) bg-(--vm-surface-2) px-3 py-1.5 text-xs font-semibold text-(--vm-text-secondary)">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--vm-primary) opacity-50" />

                                    <span className="relative h-2 w-2 rounded-full bg-(--vm-primary)" />
                                </span>

                                {Brand.name} is coming soon
                            </div>

                            {/* Heading */}
                            <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-(--vm-text) sm:text-5xl lg:text-6xl">
                                Your growth deserves{" "}
                                <span className="text-(--vm-primary)">
                                    a mentor.
                                </span>
                            </h2>

                            {/* Description */}
                            <p className="mt-6 max-w-xl text-base leading-7 text-(--vm-text-secondary) sm:text-lg">
                                {Brand.description} Get ready to practice
                                real conversations, build confidence, and
                                prepare for the moments that matter.
                            </p>

                            {/* Value points */}
                            <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                <ValuePoint>
                                    AI-powered mentoring
                                </ValuePoint>

                                <ValuePoint>
                                    Personalized practice
                                </ValuePoint>

                                <ValuePoint>
                                    Real-world scenarios
                                </ValuePoint>

                                <ValuePoint>
                                    Instant feedback
                                </ValuePoint>
                            </div>

                            {/* CTA */}
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Button
                                    size="lg"
                                    onClick={onEarlyAccess}
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
                                    onClick={() =>
                                    (window.location.href =
                                        "/")
                                    }
                                >
                                    Explore the App
                                </Button>
                            </div>

                            <p className="mt-4 text-xs text-(--vm-muted)">
                                Free early access · No payment required
                            </p>
                        </div>

                        {/* Right - Product preview */}
                        <div className="relative">
                            {/* Glow behind card */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-8 rounded-(--vm-radius-xl) bg-(--vm-glow-purple) opacity-30 blur-[70px]"
                            />

                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative rounded-(--vm-radius-xl) border border-(--vm-border-strong) bg-(--vm-background) p-4 shadow-2xl"
                            >
                                {/* Window header */}
                                <div className="flex items-center justify-between border-b border-(--vm-border) pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            <span className="h-2.5 w-2.5 rounded-full bg-(--vm-danger)/60" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-(--vm-warning)/60" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-(--vm-success)/60" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-(--vm-text)">
                                                {Brand.name}
                                            </p>

                                            <p className="text-[10px] text-(--vm-muted)">
                                                AI Mentorship
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-(--vm-border) bg-(--vm-primary)/10">
                                        <Sparkles
                                            size={15}
                                            className="text-(--vm-primary)"
                                        />
                                    </div>
                                </div>

                                {/* Mentor */}
                                <div className="mt-5 rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-surface) p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--vm-primary)/15 text-(--vm-primary)">
                                            <Brain size={19} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-(--vm-text)">
                                                AI Mentor
                                            </p>

                                            <div className="mt-1 flex items-center gap-1.5">
                                                <span className="h-1.5 w-1.5 rounded-full bg-(--vm-success)" />

                                                <span className="text-[10px] text-(--vm-muted)">
                                                    Ready to practice
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Conversation */}
                                <div className="mt-4 space-y-3">
                                    <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-(--vm-primary) p-3 text-xs leading-5 text-white">
                                        Help me prepare for my next
                                        interview.
                                    </div>

                                    <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-(--vm-border) bg-(--vm-surface-2) p-3 text-xs leading-5 text-(--vm-text-secondary)">
                                        Absolutely. Let's simulate a
                                        realistic interview and improve your
                                        answers together.
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                    <MiniStat
                                        label="Confidence"
                                        value="84%"
                                    />

                                    <MiniStat
                                        label="Practice"
                                        value="+24%"
                                    />

                                    <MiniStat
                                        label="Feedback"
                                        value="92%"
                                    />
                                </div>

                                {/* Bottom */}
                                <div className="mt-4 flex items-center justify-between border-t border-(--vm-border) pt-4">
                                    <div className="flex items-center gap-2">
                                        <Users
                                            size={14}
                                            className="text-(--vm-secondary)"
                                        />

                                        <span className="text-[10px] text-(--vm-muted)">
                                            Personalized experience
                                        </span>
                                    </div>

                                    <span className="rounded-full bg-(--vm-success)/10 px-2 py-1 text-[10px] font-semibold text-(--vm-success)">
                                        AI Ready
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom announcement */}
                    <div className="border-t border-(--vm-border) bg-(--vm-surface-2)/50 px-6 py-4 sm:px-10">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-(--vm-muted) sm:text-sm">
                                Be among the first to experience the future
                                of AI-powered mentorship.
                            </p>

                            <div className="flex items-center gap-2 text-xs font-medium text-(--vm-text-secondary)">
                                <span className="h-1.5 w-1.5 rounded-full bg-(--vm-secondary)" />

                                Early access opening soon
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

function ValuePoint({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center gap-2 text-sm text-(--vm-text-secondary)">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--vm-secondary)/10">
                <Check
                    size={12}
                    className="text-(--vm-secondary)"
                />
            </span>

            {children}
        </div>
    );
}

function MiniStat({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) p-3">
            <p className="text-[9px] text-(--vm-muted)">
                {label}
            </p>

            <p className="mt-1 text-sm font-bold text-(--vm-text)">
                {value}
            </p>
        </div>
    );
}