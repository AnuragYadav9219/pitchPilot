import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Brand } from "@virtualmento/shared";
import { Container } from "@/components/ui";

export function CTA() {
    return (
        <section className="relative overflow-hidden py-24 sm:py-32">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--vm-glow-purple) opacity-30 blur-[140px]"
            />

            <Container>
                <div className="relative overflow-hidden rounded-(--vm-radius-xl) border border-(--vm-border-strong) bg-(--vm-surface) px-6 py-16 text-center shadow-2xl backdrop-blur-xl sm:px-12 sm:py-20">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.035]"
                        style={{
                            backgroundImage:
                                "linear-gradient(var(--vm-text) 1px, transparent 1px), linear-gradient(90deg, var(--vm-text) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />

                    <div className="relative">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-(--vm-primary)/12 text-(--vm-primary)">
                            <Sparkles size={25} />
                        </div>

                        <p className="mt-6 text-sm font-medium text-(--vm-primary)">
                            Start your growth journey
                        </p>

                        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-(--vm-text) sm:text-5xl">
                            Become more confident in the conversations that
                            matter.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-(--vm-muted) sm:text-lg">
                            {Brand.tagline} Practice today and turn preparation
                            into progress.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                to="/login"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-(--vm-radius-md) bg-(--vm-primary) px-6 text-sm font-medium text-white transition-colors hover:bg-(--vm-primary-pressed)"
                            >
                                Start Learning
                                <ArrowRight size={18} />
                            </Link>

                            <a
                                href="#features"
                                className="inline-flex h-12 items-center justify-center rounded-(--vm-radius-md) border border-(--vm-border-strong) bg-(--vm-surface) px-6 text-sm font-medium text-(--vm-text) transition-colors hover:bg-(--vm-surface-2)"
                            >
                                Explore Features
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}