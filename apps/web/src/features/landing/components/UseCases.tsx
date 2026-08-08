import {
    BriefcaseBusiness,
    Handshake,
    Mic2,
    Presentation,
    Users,
    type LucideIcon,
} from "lucide-react";

import { Card, Container } from "@/components/ui";

interface UseCase {
    icon: LucideIcon;
    title: string;
    description: string;
    tag: string;
}

const useCases: UseCase[] = [
    {
        icon: BriefcaseBusiness,
        title: "Job Interviews",
        description:
            "Practice common and challenging interview questions before the real conversation.",
        tag: "Career",
    },
    {
        icon: Presentation,
        title: "Presentations",
        description:
            "Prepare your delivery, structure your thoughts, and become more comfortable presenting.",
        tag: "Communication",
    },
    {
        icon: Handshake,
        title: "Negotiations",
        description:
            "Practice explaining your position, handling objections, and finding better outcomes.",
        tag: "Professional",
    },
    {
        icon: Users,
        title: "Difficult Conversations",
        description:
            "Prepare for conversations where clarity, empathy, and confidence matter.",
        tag: "Personal",
    },
    {
        icon: Mic2,
        title: "Public Speaking",
        description:
            "Build confidence by repeatedly practicing how you communicate your ideas.",
        tag: "Confidence",
    },
];

export function UseCases() {
    return (
        <section
            id="use-cases"
            className="relative overflow-hidden border-t border-(--vm-border) py-24 sm:py-32"
        >
            <Container>
                <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                    <div>
                        <div className="mb-5 inline-flex rounded-full border border-(--vm-border) bg-(--vm-surface) px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-(--vm-accent)">
                            Real-world practice
                        </div>

                        <h2 className="text-4xl font-bold tracking-tight text-(--vm-text) sm:text-5xl">
                            Practice the moments
                            <span className="block text-(--vm-primary)">
                                that actually matter.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-7 text-(--vm-muted) sm:text-lg">
                            VirtualMento isn't limited to interview preparation.
                            Use your AI mentor whenever you need to prepare
                            for an important conversation.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) p-4">
                                <p className="text-2xl font-bold text-(--vm-text)">
                                    24/7
                                </p>

                                <p className="mt-1 text-xs text-(--vm-muted)">
                                    Practice whenever you need
                                </p>
                            </div>

                            <div className="rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface) p-4">
                                <p className="text-2xl font-bold text-(--vm-text)">
                                    AI
                                </p>

                                <p className="mt-1 text-xs text-(--vm-muted)">
                                    Personalized mentoring
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {useCases.map((useCase, index) => {
                            const Icon = useCase.icon;

                            return (
                                <Card
                                    key={useCase.title}
                                    interactive
                                    className={[
                                        "group p-6",
                                        index === 4
                                            ? "sm:col-span-2"
                                            : "",
                                    ].join(" ")}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-(--vm-radius-md) bg-(--vm-primary)/10 text-(--vm-primary)">
                                            <Icon
                                                size={21}
                                                strokeWidth={1.8}
                                            />
                                        </div>

                                        <div>
                                            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-(--vm-muted)">
                                                {useCase.tag}
                                            </span>

                                            <h3 className="mt-1 text-lg font-semibold text-(--vm-text)">
                                                {useCase.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                                                {useCase.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}