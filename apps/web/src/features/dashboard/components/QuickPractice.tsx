import { ArrowRight, MessageCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function QuickPractice() {
    const practices = [
        {
            title: "Job Interview",
            description:
                "Practice answering realistic interview questions.",
            icon: MessageCircle,
        },
        {
            title: "Difficult Conversation",
            description:
                "Build confidence handling challenging situations.",
            icon: MessageCircle,
        },
        {
            title: "Presentation",
            description:
                "Improve clarity and confidence when presenting.",
            icon: TrendingUp,
        },
    ];

    return (
        <section className="mt-6">
            <div className="mb-3">
                <p className="text-sm font-semibold text-(--vm-text)">
                    Quick practice
                </p>

                <p className="mt-1 text-xs text-(--vm-muted)">
                    Choose a scenario and start improving.
                </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
                {practices.map((practice) => {
                    const Icon = practice.icon;

                    return (
                        <Link
                            key={practice.title}
                            to="/scenarios"
                            className="
                                group rounded-(--vm-radius-lg)
                                border border-(--vm-border)
                                bg-(--vm-surface)
                                p-5 transition-all
                                hover:-translate-y-0.5
                                hover:border-(--vm-primary)/30
                                hover:shadow-lg
                            "
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                                <Icon size={17} />
                            </div>

                            <p className="mt-4 text-sm font-semibold text-(--vm-text)">
                                {practice.title}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                                {practice.description}
                            </p>

                            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-(--vm-primary)">
                                Practice
                                <ArrowRight
                                    size={13}
                                    className="transition-transform group-hover:translate-x-0.5"
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}