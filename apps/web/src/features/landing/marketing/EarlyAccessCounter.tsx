import { useEffect, useState } from "react";
import {
    Sparkles,
    Users,
} from "lucide-react";

import {
    Radius,
    Typography,
} from "@virtualmento/shared";

import { getEarlyAccessCount } from "@/services/earlyAccessService";

type EarlyAccessCounterProps = {
    refreshKey?: number;
};

export default function EarlyAccessCounter({
    refreshKey = 0,
}: EarlyAccessCounterProps) {
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

    /*
     * Don't show an empty/incorrect counter while
     * the first request is loading.
     */
    if (count === null) {
        return null;
    }

    return (
        <div
            className="mx-auto mt-6 flex w-fit items-center gap-2 px-4 py-2"
            style={{
                borderRadius: Radius.full,
                border:
                    "1px solid var(--vm-border-strong)",
                background:
                    "var(--vm-surface-2)",
            }}
        >
            <div
                className="flex h-6 w-6 items-center justify-center"
                style={{
                    borderRadius: Radius.full,
                    background:
                        "var(--vm-glow-purple)",
                }}
            >
                <Users
                    size={13}
                    className="text-(--vm-primary)"
                    aria-hidden="true"
                />
            </div>

            <p
                className="text-(--vm-text-secondary)"
                style={{
                    fontSize: Typography.small,
                }}
            >
                <span className="font-bold text-(--vm-text)">
                    {count.toLocaleString()}
                </span>{" "}
                {count === 1
                    ? "student has"
                    : "students have"}{" "}
                joined early access
            </p>

            <Sparkles
                size={13}
                className="text-(--vm-primary)"
                aria-hidden="true"
            />
        </div>
    );
}