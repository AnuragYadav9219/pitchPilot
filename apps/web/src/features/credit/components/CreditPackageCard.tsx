import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Sparkles, Zap } from "lucide-react";
import type { CreditPackage } from "../types";

interface CreditPackageCardProps {
    package: CreditPackage;
    onPurchase: (packageCode: string) => void;
    loading?: boolean;
    selected?: boolean;
}

export function CreditPackageCard({
    package: creditPackage,
    onPurchase,
    loading = false,
    selected = false,
}: CreditPackageCardProps) {
    const price = creditPackage.priceInPaise / 100;

    return (
        <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={[
                "group relative overflow-hidden rounded-2xl border bg-(--vm-surface)",
                "transition-[border-color,box-shadow] duration-300",
                selected
                    ? "border-(--vm-primary) shadow-[0_14px_40px_rgba(240,100,73,0.14)]"
                    : "border-(--vm-border) hover:border-(--vm-primary)/35 hover:shadow-[0_12px_35px_rgba(36,24,21,0.08)]",
            ].join(" ")}
        >
            {/* DECORATIVE BACKGROUND */}
            <motion.div
                initial={false}
                animate={{ opacity: selected ? 0.16 : 0.07, scale: selected ? 1.15 : 1 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-(--vm-primary) blur-3xl"
            />
            <motion.div
                animate={{ rotate: [0, 6, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -bottom-20 -left-20 h-36 w-36 rounded-full bg-(--vm-orange) opacity-[0.035] blur-3xl"
            />

            {/* SELECTED CHECK */}
            <motion.div
                initial={false}
                animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute right-4 top-4 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-(--vm-primary) text-white shadow-[0_4px_12px_rgba(240,100,73,0.25)]"
            >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </motion.div>

            <div className="relative flex h-full flex-col p-5">
                {/* TOP */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ rotate: 8, scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 350, damping: 15 }}
                            className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)"
                        >
                            <Sparkles className="h-5 w-5" />
                            <motion.span
                                animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.15, 0.9] }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-xl border border-(--vm-primary)/20"
                            />
                        </motion.div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-(--vm-muted)">
                                AI Credits
                            </p>
                            <div className="mt-0.5 flex items-baseline gap-1">
                                <span className="text-2xl font-bold tracking-[-0.04em] text-(--vm-text)">
                                    {creditPackage.credits.toLocaleString()}
                                </span>
                                <span className="text-[11px] text-(--vm-muted)">credits</span>
                            </div>
                        </div>
                    </div>

                    {!selected && (
                        <span className="rounded-full border border-(--vm-border) bg-(--vm-surface-2) px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-(--vm-muted)">
                            One-time
                        </span>
                    )}
                </div>

                {/* VALUE */}
                <div className="mt-7">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[11px] font-medium text-(--vm-muted)">Package price</p>
                            <div className="mt-1 flex items-baseline">
                                <span className="mr-0.5 text-base font-medium text-(--vm-muted)">₹</span>
                                <span className="text-3xl font-bold tracking-[-0.04em] text-(--vm-text)">
                                    {price.toLocaleString("en-IN", {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </div>

                        <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-(--vm-primary)/8 text-(--vm-primary)"
                        >
                            <Zap className="h-4 w-4" />
                        </motion.div>
                    </div>
                </div>

                {/* VALUE PROPOSITION */}
                <div className="mt-5 rounded-xl border border-(--vm-border) bg-(--vm-surface-2) px-3 py-2.5">
                    <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)/10 text-(--vm-primary)">
                            <Check className="h-3 w-3" strokeWidth={3} />
                        </div>
                        <p className="text-[11px] leading-4 text-(--vm-muted)">
                            Use across VirtualMentor's AI-powered features
                        </p>
                    </div>
                </div>

                <div className="flex-1" />

                {/* CTA */}
                <motion.button
                    type="button"
                    disabled={loading}
                    onClick={() => onPurchase(creditPackage.code)}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                    className="relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-(--vm-primary) px-4 py-3 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(240,100,73,0.16)] transition-all duration-200 hover:bg-(--vm-primary-pressed) hover:shadow-[0_7px_20px_rgba(240,100,73,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {!loading && (
                        <motion.span
                            animate={{ x: ["-120%", "120%"] }}
                            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                            className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-white/10"
                        />
                    )}

                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <span className="relative">
                                Get {creditPackage.credits.toLocaleString()} Credits
                            </span>
                            <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                    )}
                </motion.button>

                {/* FOOTER */}
                <p className="mt-2.5 text-center text-[10px] text-(--vm-muted)">
                    Secure one-time payment
                </p>
            </div>

            {/* SELECTED BOTTOM ACCENT */}
            <motion.div
                initial={false}
                animate={{ scaleX: selected ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-(--vm-primary)"
            />
        </motion.article>
    );
}