import {
    ArrowRight,
    BrainCircuit,
    MessageCircle,
    Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";

import { Button, Card } from "@/components/ui";

export function DashboardPage() {
    const user = useAppSelector(
        (state) => state.auth.user,
    );

    const firstName =
        user?.fullName
            ?.trim()
            .split(/\s+/)[0] ||
        "there";

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-6 sm:p-8">
                {/* Glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-(--vm-glow-purple) blur-[90px]"
                />

                <div className="relative">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-(--vm-border) bg-(--vm-surface-2) px-3 py-1.5 text-xs font-medium text-(--vm-primary)">
                        <Sparkles size={14} />

                        AI-powered mentoring
                    </div>

                    <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-(--vm-text) sm:text-4xl">
                        Welcome back,{" "}
                        {firstName} 👋
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-(--vm-muted) sm:text-base">
                        Practice real-world conversations,
                        improve your communication, and
                        build confidence with your AI mentor.
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Link to="/practice">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto"
                            >
                                Start practicing
                                <ArrowRight
                                    size={17}
                                />
                            </Button>
                        </Link>

                        <Link to="/scenarios">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="w-full sm:w-auto"
                            >
                                Explore scenarios
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="mt-6 grid gap-4 sm:grid-cols-3">
                <Card className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                            <MessageCircle
                                size={19}
                            />
                        </div>

                        <div>
                            <p className="text-xs text-(--vm-muted)">
                                Practice sessions
                            </p>

                            <p className="mt-1 text-2xl font-bold text-(--vm-text)">
                                —
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--vm-secondary)/10 text-(--vm-secondary)">
                            <BrainCircuit
                                size={19}
                            />
                        </div>

                        <div>
                            <p className="text-xs text-(--vm-muted)">
                                Scenarios completed
                            </p>

                            <p className="mt-1 text-2xl font-bold text-(--vm-text)">
                                —
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--vm-accent)/10 text-(--vm-accent)">
                            <Sparkles
                                size={19}
                            />
                        </div>

                        <div>
                            <p className="text-xs text-(--vm-muted)">
                                Confidence score
                            </p>

                            <p className="mt-1 text-2xl font-bold text-(--vm-text)">
                                —
                            </p>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Continue */}
            <section className="mt-8">
                <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--vm-primary)">
                            Your progress
                        </p>

                        <h2 className="mt-1 text-xl font-semibold text-(--vm-text)">
                            Continue practicing
                        </h2>
                    </div>

                    <Link
                        to="/history"
                        className="hidden items-center gap-1 text-sm font-medium text-(--vm-primary) hover:underline sm:flex"
                    >
                        View history
                        <ArrowRight size={15} />
                    </Link>
                </div>

                <Card className="overflow-hidden">
                    <div className="flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                                <BrainCircuit
                                    size={22}
                                />
                            </div>

                            <div>
                                <h3 className="font-semibold text-(--vm-text)">
                                    Your first practice
                                    session
                                </h3>

                                <p className="mt-1 max-w-xl text-sm leading-5 text-(--vm-muted)">
                                    Choose a scenario and
                                    start your first
                                    conversation with
                                    VirtualMento.
                                </p>
                            </div>
                        </div>

                        <Link to="/scenarios">
                            <Button>
                                Choose a scenario
                                <ArrowRight
                                    size={16}
                                />
                            </Button>
                        </Link>
                    </div>
                </Card>
            </section>

            {/* Quick practice */}
            <section className="mt-8">
                <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--vm-primary)">
                        Quick start
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-(--vm-text)">
                        What do you want to improve?
                    </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <QuickPracticeCard
                        title="Interview"
                        description="Practice answering realistic interview questions."
                    />

                    <QuickPracticeCard
                        title="Communication"
                        description="Improve clarity, confidence, and conversation skills."
                    />

                    <QuickPracticeCard
                        title="Leadership"
                        description="Practice difficult workplace and leadership situations."
                    />
                </div>
            </section>
        </div>
    );
}

interface QuickPracticeCardProps {
    title: string;
    description: string;
}

function QuickPracticeCard({
    title,
    description,
}: QuickPracticeCardProps) {
    return (
        <Link
            to="/scenarios"
            className="group"
        >
            <Card className="h-full p-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:border-(--vm-primary)/30">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                    <Sparkles size={18} />
                </div>

                <h3 className="font-semibold text-(--vm-text)">
                    {title}
                </h3>

                <p className="mt-2 text-sm leading-5 text-(--vm-muted)">
                    {description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-(--vm-primary)">
                    Practice
                    <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </div>
            </Card>
        </Link>
    );
}

export default DashboardPage;