import {
    ArrowUpRight,
    BriefcaseBusiness,
    ExternalLink,
    MapPin,
    X,
} from "lucide-react";
import type { JobResult } from "../types";

interface JobDetailsProps {
    job: JobResult | null;
    onClose: () => void;
}

export default function JobDetails({ job, onClose }: JobDetailsProps) {
    if (!job) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <aside className="flex h-full w-full max-w-xl flex-col border-l border-(--vm-border) bg-(--vm-surface) shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-(--vm-border) px-5 py-5 sm:px-6">
                    <div className="min-w-0">
                        <div className="flex h-11 w-11 items-center justify-center rounded-(--vm-radius-md) bg-(--vm-primary) text-white">
                            <BriefcaseBusiness size={19} />
                        </div>

                        <h2 className="mt-4 text-lg font-bold tracking-tight text-(--vm-text)">
                            {job.title}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-(--vm-text-secondary)">
                            {job.companyName}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-(--vm-muted)">
                            <span className="inline-flex items-center gap-1.5">
                                <MapPin size={13} />
                                {job.location}
                            </span>

                            {job.via && <span>via {job.via}</span>}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close job details"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--vm-surface-2) text-(--vm-muted) transition-colors hover:bg-(--vm-surface-3) hover:text-(--vm-text)"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
                    {/* Skills */}
                    {job.skills?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-(--vm-muted)">
                                Skills
                            </h3>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {job.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full border border-(--vm-primary) bg-(--vm-surface-2) px-3 py-1.5 text-xs font-medium text-(--vm-primary)"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Description */}
                    {job.description && (
                        <section className="mt-7">
                            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-(--vm-muted)">
                                About this role
                            </h3>

                            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-(--vm-text-secondary)">
                                {job.description}
                            </p>
                        </section>
                    )}

                    {/* Highlights */}
                    {job.highlights?.length > 0 && (
                        <section className="mt-7">
                            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-(--vm-muted)">
                                Job highlights
                            </h3>

                            <div className="mt-4 space-y-6">
                                {job.highlights.map((section, index) => (
                                    <div key={`${section.title}-${index}`}>
                                        {section.title && (
                                            <h4 className="text-sm font-semibold text-(--vm-text)">
                                                {section.title}
                                            </h4>
                                        )}

                                        {section.items?.length > 0 && (
                                            <ul className="mt-2 space-y-2">
                                                {section.items.map(
                                                    (item, itemIndex) => (
                                                        <li
                                                            key={`${item}-${itemIndex}`}
                                                            className="flex gap-2.5 text-sm leading-6 text-(--vm-text-secondary)"
                                                        >
                                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--vm-primary)" />
                                                            <span>{item}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Original listing */}
                    {job.shareLink && (
                        <section className="mt-7">
                            <a
                                href={job.shareLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-semibold text-(--vm-primary) hover:text-(--vm-primary-pressed)"
                            >
                                View original listing
                                <ExternalLink size={13} />
                            </a>
                        </section>
                    )}
                </div>

                {/* Apply */}
                {job.applyOptions?.length > 0 && (
                    <div className="border-t border-(--vm-border) bg-(--vm-surface) px-5 py-4 sm:px-6">
                        <p className="mb-3 text-xs font-semibold text-(--vm-text)">
                            Apply through
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {job.applyOptions.map((option) => (
                                <a
                                    key={`${option.title}-${option.link}`}
                                    href={option.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-(--vm-radius-md) bg-(--vm-primary) px-4 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-(--vm-primary-pressed) hover:shadow-[0_6px_18px_var(--vm-glow-coral)]"
                                >
                                    {option.title || "Apply"}
                                    <ArrowUpRight size={14} />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </aside>
        </div>
    );
}