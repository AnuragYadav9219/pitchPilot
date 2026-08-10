import { useEffect, useState } from "react";
import {
    ArrowUpRight,
    BrainCircuit,
    Sparkles,
    Users,
} from "lucide-react";

import { Container } from "@/components/ui";
import {
    Radius,
    Typography,
} from "@virtualmento/shared";

import { getEarlyAccessCount } from "@/services/earlyAccessService";

type SocialProofStatsProps = {
    refreshKey?: number;
};

export default function SocialProofStats({
    refreshKey = 0,
}: SocialProofStatsProps) {
    const [count, setCount] =
        useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadCount = async () => {
            try {
                const total =
                    await getEarlyAccessCount();

                if (!cancelled) {
                    setCount(total);
                }
            } catch (error) {
                console.error(
                    "Failed to load early access count:",
                    error,
                );
            }
        };

        loadCount();

        return () => {
            cancelled = true;
        };
    }, [refreshKey]);

    const formattedCount =
        count === null
            ? "—"
            : count.toLocaleString();

    return (
        <section className="relative py-10 sm:py-12">
            <Container>
                <div
                    className="relative overflow-hidden border border-(--vm-border-strong) bg-(--vm-surface)"
                    style={{
                        borderRadius: Radius.xl,
                    }}
                >
                    {/* Subtle glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-(--vm-glow-purple) opacity-20 blur-[80px]"
                    />

                    <div className="relative px-5 py-7 sm:px-8 sm:py-8">
                        {/* Header */}
                        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p
                                    className="flex items-center gap-2 font-semibold text-(--vm-primary)"
                                    style={{
                                        fontSize:
                                            Typography.small,
                                    }}
                                >
                                    <Sparkles
                                        size={15}
                                        aria-hidden="true"
                                    />

                                    Early community
                                </p>

                                <h2
                                    className="mt-1 font-bold text-(--vm-text)"
                                    style={{
                                        fontSize:
                                            Typography.h3,
                                    }}
                                >
                                    Students are getting ready
                                </h2>
                            </div>

                            <p
                                className="max-w-md text-(--vm-muted) sm:text-right"
                                style={{
                                    fontSize:
                                        Typography.tiny,
                                    lineHeight: 1.6,
                                }}
                            >
                                Join the growing community preparing
                                for the VirtualMento launch.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 divide-y divide-(--vm-border) sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                            {/* Live registrations */}
                            <div className="flex items-center gap-4 py-4 sm:px-6 sm:py-2 sm:first:pl-0">
                                <div
                                    className="flex h-11 w-11 shrink-0 items-center justify-center"
                                    style={{
                                        borderRadius:
                                            Radius.md,
                                        background:
                                            "var(--vm-glow-purple)",
                                    }}
                                >
                                    <Users
                                        size={20}
                                        className="text-(--vm-primary)"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-2xl font-bold tracking-tight text-(--vm-text)">
                                            {formattedCount}
                                        </p>

                                        {count !== null &&
                                            count > 0 && (
                                                <span className="flex items-center gap-0.5 text-[10px] font-semibold text-(--vm-success)">
                                                    <ArrowUpRight
                                                        size={
                                                            11
                                                        }
                                                        aria-hidden="true"
                                                    />
                                                    Live
                                                </span>
                                            )}
                                    </div>

                                    <p
                                        className="text-(--vm-muted)"
                                        style={{
                                            fontSize:
                                                Typography.tiny,
                                        }}
                                    >
                                        students joined the waitlist
                                    </p>
                                </div>
                            </div>

                            {/* AI practice */}
                            <div className="flex items-center gap-4 py-4 sm:px-6 sm:py-2">
                                <div
                                    className="flex h-11 w-11 shrink-0 items-center justify-center"
                                    style={{
                                        borderRadius:
                                            Radius.md,
                                        background:
                                            "var(--vm-glow-green)",
                                    }}
                                >
                                    <BrainCircuit
                                        size={20}
                                        className="text-(--vm-secondary)"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <p className="text-lg font-bold text-(--vm-text)">
                                        AI-powered
                                    </p>

                                    <p
                                        className="text-(--vm-muted)"
                                        style={{
                                            fontSize:
                                                Typography.tiny,
                                        }}
                                    >
                                        practice & feedback
                                    </p>
                                </div>
                            </div>

                            {/* Launch */}
                            <div className="flex items-center gap-4 py-4 sm:px-6 sm:py-2 sm:last:pr-0">
                                <div
                                    className="flex h-11 w-11 shrink-0 items-center justify-center"
                                    style={{
                                        borderRadius:
                                            Radius.md,
                                        background:
                                            "var(--vm-glow-orange)",
                                    }}
                                >
                                    <Sparkles
                                        size={20}
                                        className="text-(--vm-accent)"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <p className="text-lg font-bold text-(--vm-text)">
                                        Coming soon
                                    </p>

                                    <p
                                        className="text-(--vm-muted)"
                                        style={{
                                            fontSize:
                                                Typography.tiny,
                                        }}
                                    >
                                        VirtualMento app
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}