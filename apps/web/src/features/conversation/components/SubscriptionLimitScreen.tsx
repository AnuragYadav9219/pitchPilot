import {
    ArrowRight,
    Check,
    Clock3,
    Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button, Card } from "@/components/ui";

export function SubscriptionLimitScreen() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-[65vh] items-center justify-center px-4 py-8">
            <Card className="relative w-full max-w-lg overflow-hidden border-(--vm-border) bg-(--vm-surface) shadow-2xl">
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-(--vm-primary)" />

                <div className="p-7 text-center sm:p-9">
                    {/* Icon */}
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-(--vm-primary)/20 bg-(--vm-primary)/10 text-(--vm-primary)">
                        <Sparkles
                            size={27}
                            strokeWidth={1.8}
                        />
                    </div>

                    {/* Heading */}
                    <h2 className="mt-6 text-xl font-semibold tracking-tight text-(--vm-text) sm:text-2xl">
                        You've reached your monthly limit
                    </h2>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-(--vm-muted) sm:text-[15px]">
                        You've used all the interviews included
                        in your current plan. Upgrade to continue
                        practicing without waiting for your
                        allowance to reset.
                    </p>

                    {/* Reset info */}
                    <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-(--vm-border) bg-(--vm-bg) px-3.5 py-2 text-xs text-(--vm-muted)">
                        <Clock3 size={14} />
                        <span>
                            Your allowance resets monthly
                        </span>
                    </div>

                    {/* Upgrade card */}
                    <div className="mt-7 rounded-2xl border border-(--vm-primary)/15 bg-(--vm-primary)/5 p-5 text-left">
                        <div className="flex items-center gap-2">
                            <Sparkles
                                size={16}
                                className="text-(--vm-primary)"
                            />

                            <span className="text-sm font-semibold text-(--vm-text)">
                                Upgrade your practice
                            </span>
                        </div>

                        <div className="mt-4 space-y-2.5">
                            <Benefit>
                                Practice more interviews every month
                            </Benefit>

                            <Benefit>
                                Access advanced interview experiences
                            </Benefit>

                            <Benefit>
                                Get deeper insights into your performance
                            </Benefit>
                        </div>
                    </div>

                    {/* CTA */}
                    <Button
                        className="mt-6 h-11 w-full gap-2"
                        onClick={() => navigate("/subscription")}
                    >
                        View upgrade options
                        <ArrowRight size={17} />
                    </Button>

                    {/* Secondary action */}
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="mt-4 text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                    >
                        Back to dashboard
                    </button>
                </div>
            </Card>
        </div>
    );
}

function Benefit({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)/15 text-(--vm-primary)">
                <Check size={11} strokeWidth={2.5} />
            </div>

            <span className="text-xs leading-5 text-(--vm-muted)">
                {children}
            </span>
        </div>
    );
}