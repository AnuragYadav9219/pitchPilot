import { ArrowRight, Sparkles } from "lucide-react";

import { Brand } from "@virtualmento/shared";
import { Container } from "@/components/ui";

type CTAProps = {
    onEarlyAccess: () => void;
};

export function CTA({
    onEarlyAccess,
}: CTAProps) {

    return (
        <>
            <section
                className="relative overflow-hidden py-20 sm:py-24"
            >
                <Container>
                    <div className="relative overflow-hidden rounded-(--vm-radius-xl) border border-(--vm-border-strong) bg-(--vm-surface) px-6 py-16 text-center shadow-2xl backdrop-blur-xl sm:px-12 sm:py-20">
                        {/* Grid background */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 opacity-[0.035]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(var(--vm-text) 1px, transparent 1px), linear-gradient(90deg, var(--vm-text) 1px, transparent 1px)",
                                backgroundSize: "48px 48px",
                            }}
                        />

                        {/* Purple glow */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--vm-glow-purple) opacity-20 blur-[110px]"
                        />

                        <div className="relative">
                            {/* Icon */}
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-(--vm-primary)/12 text-(--vm-primary)">
                                <Sparkles
                                    size={25}
                                    aria-hidden="true"
                                />
                            </div>

                            {/* Eyebrow */}
                            <p className="mt-6 text-sm font-semibold text-(--vm-primary)">
                                {Brand.name} is coming soon
                            </p>

                            {/* Heading */}
                            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-(--vm-text) sm:text-5xl">
                                Your growth deserves{" "}
                                <span className="text-(--vm-primary)">
                                    a mentor.
                                </span>
                            </h2>

                            {/* Description */}
                            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-(--vm-muted) sm:text-lg">
                                {Brand.tagline}. Join the
                                early-access community and be
                                among the first to experience
                                AI-powered mentoring, realistic
                                practice, and personalized
                                feedback.
                            </p>

                            {/* CTA */}
                            <div className="mt-8 flex justify-center">
                                <button
                                    type="button"
                                    onClick={onEarlyAccess}
                                    className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-(--vm-radius-md) bg-(--vm-primary) px-7 text-sm font-semibold text-white transition-all hover:bg-(--vm-primary-pressed) hover:shadow-lg"
                                >
                                    Join Early Access

                                    <ArrowRight
                                        size={18}
                                        aria-hidden="true"
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </button>
                            </div>

                            <p className="mt-4 text-xs text-(--vm-muted)">
                                Be among the first to know when
                                VirtualMento launches.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}