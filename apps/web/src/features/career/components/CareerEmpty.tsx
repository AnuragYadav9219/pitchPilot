import { BarChart3, Search, Sparkles } from "lucide-react";

export function CareerEmpty() {
    return (
        <section className="vm-card relative overflow-hidden px-6 py-14 text-center">
            {/* Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--vm-primary)/5 blur-3xl" />

            <div className="relative z-10">
                <div className="vm-brand-gradient mx-auto flex h-14 w-14 items-center justify-center rounded-(--vm-radius-lg) text-white shadow-[0_10px_30px_var(--vm-glow-coral)]">
                    <Search size={23} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-(--vm-text)">
                    Explore your career market
                </h2>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-(--vm-muted)">
                    Enter a target role and location above to discover hiring
                    signals, in-demand skills, companies, locations, and
                    AI-powered preparation insights.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-(--vm-muted)">
                    <span className="inline-flex items-center gap-1.5">
                        <BarChart3
                            size={14}
                            className="text-(--vm-primary)"
                        />
                        Market intelligence
                    </span>

                    <span className="text-(--vm-border-strong)">•</span>

                    <span className="inline-flex items-center gap-1.5">
                        <Sparkles
                            size={14}
                            className="text-(--vm-primary)"
                        />
                        AI insights
                    </span>
                </div>
            </div>
        </section>
    );
}