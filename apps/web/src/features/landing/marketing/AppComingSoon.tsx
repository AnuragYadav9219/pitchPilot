import {
    ArrowRight,
    Brain,
    Check,
    MessageSquare,
    Mic,
    Sparkles,
    Target,
} from "lucide-react";
import { motion } from "framer-motion";

import { Brand } from "@virtualmento/shared";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const capabilities = [
    {
        icon: Brain,
        title: "AI Mentors",
        description:
            "Get guidance that adapts to your goals, experience, and progress.",
    },
    {
        icon: MessageSquare,
        title: "Real Conversations",
        description:
            "Practice realistic scenarios instead of passively consuming content.",
    },
    {
        icon: Mic,
        title: "Speak & Practice",
        description:
            "Build confidence by actually communicating, not just reading.",
    },
    {
        icon: Target,
        title: "Track Your Growth",
        description:
            "Understand your strengths and where you should improve next.",
    },
];

const promises = [
    "Personalized AI mentoring",
    "Real-world practice scenarios",
    "Actionable feedback",
    "Progress tracking",
];

export default function AppComingSoon() {
    return (
        <section
            id="app"
            className="relative isolate overflow-hidden border-y border-(--vm-border)"
        >
            {/* SaaS grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-20"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage:
                        "linear-gradient(to bottom, black 0%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
            />

            {/* Background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
            >
                <div className="absolute left-1/2 -top-40 h-125 w-125 -translate-x-1/2 rounded-full bg-(--vm-glow-purple) opacity-25 blur-[120px]" />

                <div className="absolute -right-50 top-1/2 h-100 w-100 rounded-full bg-(--vm-glow-purple) opacity-10 blur-[120px]" />

                <div className="absolute -left-50 bottom-0 h-75 w-75 rounded-full bg-(--vm-glow-green) opacity-10 blur-[100px]" />
            </div>

            <Container>
                {/* Header */}
                <div className="mx-auto max-w-3xl py-20 text-center sm:py-24">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-(--vm-border) bg-(--vm-surface) px-3 py-1.5 text-xs font-semibold text-(--vm-text-secondary) shadow-sm backdrop-blur-md"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--vm-primary) opacity-50" />

                            <span className="relative h-2 w-2 rounded-full bg-(--vm-primary)" />
                        </span>

                        {Brand.name} app · Coming soon
                    </motion.div>

                    <motion.h2
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.08,
                        }}
                        className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-(--vm-text) sm:text-5xl lg:text-6xl"
                    >
                        A mentor that helps you{" "}
                        <span className="text-(--vm-primary)">
                            practice what matters.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.16,
                        }}
                        className="mx-auto mt-6 max-w-2xl text-base leading-7 text-(--vm-text-secondary) sm:text-lg"
                    >
                        We're building {Brand.name} to bridge the gap
                        between knowing something and being ready to do
                        it in the real world.
                    </motion.p>
                </div>

                {/* Product showcase */}
                <div className="pb-20 sm:pb-24">
                    <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                        {/* Left: capabilities */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--vm-primary)">
                                What we're building
                            </p>

                            <h3 className="mt-3 text-2xl font-bold tracking-tight text-(--vm-text) sm:text-3xl">
                                Learn.
                                <br />
                                Practice.
                                <br />
                                Improve.
                            </h3>

                            <p className="mt-5 max-w-md text-sm leading-6 text-(--vm-muted)">
                                VirtualMento combines AI mentorship with
                                realistic practice so you can develop skills
                                through experience, not just information.
                            </p>

                            <div className="mt-7 space-y-3">
                                {promises.map((promise) => (
                                    <div
                                        key={promise}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--vm-secondary)/10"
                                        >
                                            <Check
                                                size={13}
                                                className="text-(--vm-secondary)"
                                            />
                                        </span>

                                        <span className="text-sm text-(--vm-text-secondary)">
                                            {promise}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <Button
                                    size="lg"
                                    onClick={() =>
                                        document
                                            .getElementById(
                                                "early-access",
                                            )
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            })
                                    }
                                >
                                    Get Early Access

                                    <ArrowRight size={18} />
                                </Button>
                            </div>
                        </div>

                        {/* Right: App preview */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 30,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                                margin: "-100px",
                            }}
                            transition={{
                                duration: 0.7,
                            }}
                            className="relative"
                        >
                            <div
                                aria-hidden="true"
                                className="absolute inset-10 rounded-(--vm-radius-xl) bg-(--vm-glow-purple) opacity-30 blur-[80px]"
                            />

                            <div className="relative overflow-hidden rounded-(--vm-radius-xl) border border-(--vm-border-strong) bg-(--vm-surface) p-3 shadow-2xl backdrop-blur-xl">
                                {/* Browser chrome */}
                                <div className="flex items-center justify-between border-b border-(--vm-border) px-3 pb-3">
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-(--vm-danger)/60" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-(--vm-warning)/60" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-(--vm-success)/60" />
                                    </div>

                                    <div className="rounded-full border border-(--vm-border) bg-(--vm-background) px-3 py-1 text-[9px] text-(--vm-muted)">
                                        app.virtualmento
                                    </div>

                                    <Sparkles
                                        size={14}
                                        className="text-(--vm-primary)"
                                    />
                                </div>

                                {/* App */}
                                <div className="grid min-h-100 gap-4 p-3 sm:grid-cols-[150px_1fr]">
                                    {/* Sidebar */}
                                    <div className="hidden rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-background) p-3 sm:block">
                                        <div className="mb-7 flex items-center gap-2">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--vm-primary)/10">
                                                <Sparkles
                                                    size={13}
                                                    className="text-(--vm-primary)"
                                                />
                                            </div>

                                            <span className="text-xs font-bold text-(--vm-text)">
                                                {Brand.name}
                                            </span>
                                        </div>

                                        <div className="space-y-1.5">
                                            <SidebarItem>
                                                Dashboard
                                            </SidebarItem>

                                            <SidebarItem active>
                                                Practice
                                            </SidebarItem>

                                            <SidebarItem>
                                                Mentors
                                            </SidebarItem>

                                            <SidebarItem>
                                                Progress
                                            </SidebarItem>
                                        </div>
                                    </div>

                                    {/* Main app */}
                                    <div className="rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-background) p-4 sm:p-5">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-[10px] text-(--vm-muted)">
                                                    TODAY'S SESSION
                                                </p>

                                                <h4 className="mt-1 text-lg font-bold text-(--vm-text)">
                                                    Interview Practice
                                                </h4>
                                            </div>

                                            <span className="rounded-full bg-(--vm-success)/10 px-2 py-1 text-[9px] font-semibold text-(--vm-success)">
                                                AI Mentor
                                            </span>
                                        </div>

                                        {/* Mentor card */}
                                        <div className="mt-5 rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-surface) p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--vm-primary)/10">
                                                    <Brain
                                                        size={17}
                                                        className="text-(--vm-primary)"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-xs font-semibold text-(--vm-text)">
                                                        AI Mentor
                                                    </p>

                                                    <p className="text-[9px] text-(--vm-muted)">
                                                        Interview Coach
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="mt-4 text-xs leading-5 text-(--vm-text-secondary)">
                                                "Tell me about a challenge
                                                you faced and how you solved
                                                it."
                                            </p>
                                        </div>

                                        {/* User response */}
                                        <div className="mt-3 ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-(--vm-primary) p-3 text-xs leading-5 text-white">
                                            I had to lead a project with a
                                            tight deadline...
                                        </div>

                                        {/* Feedback */}
                                        <div className="mt-4 rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-surface) p-4">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-semibold text-(--vm-text)">
                                                    AI Feedback
                                                </p>

                                                <span className="text-[10px] font-semibold text-(--vm-success)">
                                                    86%
                                                </span>
                                            </div>

                                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-(--vm-surface-3)">
                                                <div className="h-full w-[86%] rounded-full bg-linear-to-r from-(--vm-secondary) to-(--vm-success)" />
                                            </div>

                                            <p className="mt-3 text-[10px] leading-4 text-(--vm-muted)">
                                                Strong structure. Add one
                                                measurable result to make the
                                                answer more impactful.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Capabilities */}
                <div className="border-t border-(--vm-border) py-16">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {capabilities.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.06,
                                    }}
                                    className="rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-surface) p-5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-(--vm-radius-md) bg-(--vm-primary)/10">
                                        <Icon
                                            size={18}
                                            className="text-(--vm-primary)"
                                        />
                                    </div>

                                    <h4 className="mt-4 text-sm font-semibold text-(--vm-text)">
                                        {item.title}
                                    </h4>

                                    <p className="mt-2 text-xs leading-5 text-(--vm-muted)">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}

function SidebarItem({
    children,
    active = false,
}: {
    children: React.ReactNode;
    active?: boolean;
}) {
    return (
        <div
            className={`rounded-lg px-2.5 py-2 text-[10px] ${active
                    ? "bg-(--vm-primary)/10 text-(--vm-primary)"
                    : "text-(--vm-muted)"
                }`}
        >
            {children}
        </div>
    );
}