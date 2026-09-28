import {
    ArrowUpRight,
    BriefcaseBusiness,
    MapPin,
} from "lucide-react";
import type { JobResult } from "../types";

interface JobCardProps {
    job: JobResult;
    onViewDetails: (job: JobResult) => void;
}

export default function JobCard({
    job,
    onViewDetails,
}: JobCardProps) {
    const primaryApply = job.applyOptions?.[0];

    return (
        <article className="group rounded-(--vm-radius-xl) border border-(--vm-border) bg-(--vm-surface) p-5 transition-all duration-200 hover:border-(--vm-primary) hover:shadow-[0_8px_30px_var(--vm-glow-coral)]">
            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-(--vm-radius-md) bg-(--vm-primary) text-white">
                    <BriefcaseBusiness size={19} />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-(--vm-text) sm:text-base">
                        {job.title}
                    </h3>

                    <p className="mt-1 truncate text-sm font-medium text-(--vm-text-secondary)">
                        {job.companyName}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-(--vm-muted)">
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin size={13} />
                            {job.location}
                        </span>

                        {job.via && <span>via {job.via}</span>}
                    </div>
                </div>
            </div>

            {/* Skills */}
            {job.skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.slice(0, 6).map((skill) => (
                        <span
                            key={skill}
                            className="rounded-full border border-(--vm-border) bg-(--vm-surface-2) px-2.5 py-1 text-[11px] font-medium text-(--vm-text-secondary)"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-(--vm-border) pt-4">
                <button
                    type="button"
                    onClick={() => onViewDetails(job)}
                    className="text-xs font-semibold text-(--vm-primary) transition-colors hover:text-(--vm-primary-pressed)"
                >
                    View details
                </button>

                {primaryApply?.link && (
                    <a
                        href={primaryApply.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-(--vm-radius-md) bg-(--vm-primary) px-3.5 py-2 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--vm-primary-pressed) hover:shadow-[0_6px_18px_var(--vm-glow-coral)]"
                    >
                        Apply
                        <ArrowUpRight size={14} />
                    </a>
                )}
            </div>
        </article>
    );
}