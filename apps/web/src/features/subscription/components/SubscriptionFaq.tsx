import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQS = [
    {
        question: "What are AI credits?",
        answer:
            "AI credits are used for credit-based AI operations in VirtualMentor. Your available balance shows credits that can currently be used.",
    },
    {
        question: "Why are some credits reserved?",
        answer:
            "Some AI operations temporarily reserve credits while they are processing. Once the operation finishes, those credits are either consumed or released.",
    },
    {
        question: "What happens when I reach a monthly limit?",
        answer:
            "Once a monthly feature limit is reached, that feature cannot be used again until the limit resets or you move to a plan with a higher allowance.",
    },
    {
        question: "When does my subscription renew?",
        answer:
            "If auto renewal is enabled, your subscription renews according to your billing cycle. The next renewal date is shown in the billing section above.",
    },
];

export function SubscriptionFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="space-y-4">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-(--vm-text)">
                    Frequently asked questions
                </h2>

                <p className="mt-1 text-xs sm:text-sm text-(--vm-muted)">
                    Everything you need to know about plans, limits, and AI credits.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) shadow-sm">
                {FAQS.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={faq.question}
                            className="border-b border-(--vm-border) last:border-b-0"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenIndex(isOpen ? null : index)
                                }
                                className={`
                                    flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors sm:px-6
                                    ${isOpen
                                        ? "bg-(--vm-surface-2)/40"
                                        : "hover:bg-(--vm-surface-2)/30"
                                    }
                                `}
                            >
                                <span
                                    className={`text-xs sm:text-sm font-semibold transition-colors ${isOpen
                                            ? "text-(--vm-primary)"
                                            : "text-(--vm-text)"
                                        }`}
                                >
                                    {faq.question}
                                </span>

                                <div
                                    className={`
                                        flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors
                                        ${isOpen
                                            ? "bg-(--vm-primary)/10 text-(--vm-primary)"
                                            : "text-(--vm-muted)"
                                        }
                                    `}
                                >
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>
                            </button>

                            {/* Smooth CSS Grid Expansion Wrapper */}
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-5 pb-5 pt-1 sm:px-6">
                                        <p className="max-w-3xl text-xs sm:text-sm leading-relaxed text-(--vm-muted)">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}