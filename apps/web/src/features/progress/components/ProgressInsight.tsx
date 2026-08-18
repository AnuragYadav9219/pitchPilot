import {
    Sparkles,
    Target,
} from "lucide-react";

interface ProgressInsightProps {
    type: "strongest" | "attention";
    name: string;
    score: number | null;
}

export function ProgressInsight({
    type,
    name,
    score,
}: ProgressInsightProps) {
    const strongest = type === "strongest";

    return (
        <div
            className={[
                "rounded-(--vm-radius-lg) border p-5",
                strongest
                    ? "border-(--vm-success)/20 bg-(--vm-success)/5"
                    : "border-(--vm-warning)/20 bg-(--vm-warning)/5",
            ].join(" ")}
        >
            <div className="flex items-center gap-2">
                <div
                    className={[
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        strongest
                            ? "bg-(--vm-success)/10 text-(--vm-success)"
                            : "bg-(--vm-warning)/10 text-(--vm-warning)",
                    ].join(" ")}
                >
                    {strongest ? (
                        <Sparkles size={16} />
                    ) : (
                        <Target size={16} />
                    )}
                </div>

                <span className="text-xs font-medium text-(--vm-muted)">
                    {strongest
                        ? "Your strongest skill"
                        : "Needs attention"}
                </span>
            </div>

            <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                    <p className="text-lg font-semibold text-(--vm-text)">
                        {name}
                    </p>

                    <p className="mt-1 text-xs text-(--vm-muted)">
                        {strongest
                            ? "Keep using this strength."
                            : "Focus on this in your next session."}
                    </p>
                </div>

                <span
                    className={[
                        "text-2xl font-semibold",
                        strongest
                            ? "text-(--vm-success)"
                            : "text-(--vm-warning)",
                    ].join(" ")}
                >
                    {score ?? "—"}
                </span>
            </div>
        </div>
    );
}