import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { CreditPackageCard } from "./CreditPackageCard";
import { useCreditPurchase } from "../hooks/useCreditPurchase";
import { useGetCreditPackagesQuery } from "../creditPurchaseApi";

export function BuyCredits() {
    const { data: packagesResponse, isLoading: isLoadingPackages, isError: isPackagesError } = useGetCreditPackagesQuery();
    const { purchaseCredits, isPurchasing } = useCreditPurchase();

    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [showPackages, setShowPackages] = useState(false);

    const packages = packagesResponse?.data ?? [];

    const handlePurchase = async (packageCode: string) => {
        setSelectedPackage(packageCode);
        try {
            await purchaseCredits(packageCode);
        } catch (error) {
            console.error("Credit purchase failed:", error);
            setSelectedPackage(null);
        }
    };

    /* ================= LOADING ================= */
    if (isLoadingPackages) {
        return (
            <section className="space-y-5">
                <div className="space-y-2">
                    <div className="h-5 w-36 animate-pulse rounded-md bg-(--vm-surface-2)" />
                    <div className="h-4 w-72 animate-pulse rounded-md bg-(--vm-surface-2)" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="h-56 animate-pulse rounded-2xl border border-(--vm-border) bg-(--vm-surface)" />
                    ))}
                </div>
            </section>
        );
    }

    /* ================= ERROR ================= */
    if (isPackagesError) {
        return (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-danger)/10">
                        <Zap className="h-4 w-4 text-(--vm-danger)" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-(--vm-text)">Unable to load credit packages</p>
                        <p className="mt-1 text-xs text-(--vm-muted)">Please try again in a moment.</p>
                    </div>
                </div>
            </motion.section>
        );
    }

    /* ================= EMPTY ================= */
    if (!packages.length) {
        return (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--vm-primary)/10">
                        <Sparkles className="h-4.5 w-4.5 text-(--vm-primary)" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-(--vm-text)">No credit packages available</p>
                        <p className="mt-1 text-xs text-(--vm-muted)">New packages will appear here when available.</p>
                    </div>
                </div>
            </motion.section>
        );
    }

    /* ================= MAIN ================= */
    return (
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="space-y-4">
            {/* HEADER */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--vm-primary)/10">
                            <Sparkles className="h-4 w-4 text-(--vm-primary)" />
                        </div>
                        <h3 className="text-base font-semibold text-(--vm-text)">Buy AI Credits</h3>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-5 text-(--vm-muted)">
                        Add credits to your account and use them whenever you need AI-powered features.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-(--vm-muted)">
                    <ShieldCheck className="h-4 w-4 text-(--vm-success)" />
                    <span>Secure one-time purchase</span>
                </div>
            </div>

            {/* PACKAGE DROPDOWN */}
            <div className="overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface)">
                <button
                    type="button"
                    onClick={() => setShowPackages((prev) => !prev)}
                    aria-expanded={showPackages}
                    className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors duration-200 hover:bg-(--vm-surface-2)"
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-(--vm-text)">
                                {showPackages ? "Choose a credit package" : "View credit packages"}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-(--vm-muted)">
                                {showPackages ? "Select a package that works for you" : `${packages.length} packages available`}
                            </p>
                        </div>
                    </div>

                    <motion.div
                        animate={{ rotate: showPackages ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-(--vm-muted) transition-colors duration-200 group-hover:bg-(--vm-surface-2) group-hover:text-(--vm-text)"
                    >
                        <ChevronDown className="h-4 w-4" />
                    </motion.div>
                </button>

                {/* COLLAPSIBLE PACKAGES */}
                <AnimatePresence initial={false}>
                    {showPackages && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ height: { duration: 0.3, ease: "easeInOut" }, opacity: { duration: 0.2 } }}
                        >
                            <div className="border-t border-(--vm-border) p-4 sm:p-5">
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {packages.map((creditPackage, index) => (
                                        <motion.div
                                            key={creditPackage.code}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.07, ease: "easeOut" }}
                                        >
                                            <CreditPackageCard
                                                package={creditPackage}
                                                onPurchase={handlePurchase}
                                                loading={isPurchasing && selectedPackage === creditPackage.code}
                                                selected={selectedPackage === creditPackage.code}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* FOOTER INFO */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-4 flex flex-col gap-2 rounded-xl border border-(--vm-border) bg-(--vm-surface-2) px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-3.5 w-3.5 text-(--vm-primary)" />
                                        <span className="text-xs text-(--vm-muted)">Credits are added after successful payment verification.</span>
                                    </div>
                                    <span className="text-[11px] font-medium text-(--vm-muted)">One-time purchase</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
}