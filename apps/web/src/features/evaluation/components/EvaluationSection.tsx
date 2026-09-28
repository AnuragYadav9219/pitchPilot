import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface EvaluationSectionProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}

export function EvaluationSection({ title, icon, children }: EvaluationSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-5 transition-all duration-300 hover:border-(--vm-primary)/20 sm:p-6"
        >
            {/* Subtle hover glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-(--vm-primary)/5 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Header */}
            <div className="relative mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-(--vm-primary)/10 bg-(--vm-primary)/10 text-(--vm-primary) transition-transform duration-300 group-hover:scale-105">
                    {icon}
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-(--vm-text)">{title}</h2>
                    <div className="mt-1 h-px w-8 bg-(--vm-primary)/30" />
                </div>
            </div>

            {/* Content */}
            <div className="relative">{children}</div>
        </motion.section>
    );
}

interface EvaluationBulletListProps {
    items: string[];
}

export function EvaluationBulletList({ items }: EvaluationBulletListProps) {
    if (!items.length) {
        return (
            <div className="rounded-xl border border-dashed border-(--vm-border) bg-(--vm-background)/40 px-4 py-5 text-center">
                <p className="text-sm text-(--vm-muted)">No information available.</p>
            </div>
        );
    }

    return (
        <ul className="space-y-2.5">
            {items.map((item, index) => (
                <motion.li
                    key={`${item}-${index}`}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                    className="group/item flex gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-200 hover:border-(--vm-border) hover:bg-(--vm-background)/40"
                >
                    {/* Bullet */}
                    <span className="mt-2 flex h-1.5 w-1.5 shrink-0 rounded-full bg-(--vm-primary) transition-transform duration-200 group-hover/item:scale-125" />

                    {/* Text */}
                    <span className="text-sm leading-6 text-(--vm-muted) transition-colors duration-200 group-hover/item:text-(--vm-text)">
                        {item}
                    </span>
                </motion.li>
            ))}
        </ul>
    );
}