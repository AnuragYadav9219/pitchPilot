import {
    ArrowUpRight,
    Building2,
    ChevronRight,
    MapPin,
    X,
} from "lucide-react";
import { useState } from "react";
import type { JobResult } from "../types";

interface TopCompaniesProps {
    companies: string[];
    jobs: JobResult[];
}

export function TopCompanies({ companies, jobs }: TopCompaniesProps) {
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

    const companyJobs = selectedCompany
        ? jobs.filter(
            (job) =>
                job.companyName?.toLowerCase() ===
                selectedCompany.toLowerCase()
        )
        : [];

    return (
        <>
            {/* Top Companies Section */}
            <section className="vm-card overflow-hidden">
                {/* Header */}
                <div className="border-b border-(--vm-border) p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-(--vm-radius-md) border border-(--vm-primary) bg-(--vm-primary) text-white">
                            <Building2 size={18} />
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-base font-bold text-(--vm-text)">
                                Companies hiring
                            </h2>
                            <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                                Companies appearing in the analyzed market.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Companies List */}
                <div className="space-y-2 p-5 sm:p-6">
                    {companies.slice(0, 8).map((company, index) => {
                        const numberOfJobs = jobs.filter(
                            (job) =>
                                job.companyName?.toLowerCase() ===
                                company.toLowerCase()
                        ).length;

                        return (
                            <button
                                key={`${company}-${index}`}
                                type="button"
                                onClick={() => setSelectedCompany(company)}
                                className="group cursor-pointer flex w-full items-center gap-3 rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface-2) p-3 text-left transition-all duration-200 hover:border-(--vm-primary) hover:bg-(--vm-surface-3)"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-(--vm-radius-sm) bg-(--vm-surface) text-[10px] font-bold text-(--vm-primary)">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="truncate text-sm font-semibold text-(--vm-text)">
                                        {company}
                                    </div>

                                    {numberOfJobs > 0 && (
                                        <div className="mt-0.5 text-[11px] text-(--vm-muted)">
                                            {numberOfJobs}{" "}
                                            {numberOfJobs === 1 ? "job" : "jobs"}
                                        </div>
                                    )}
                                </div>

                                <ChevronRight
                                    size={15}
                                    className="shrink-0 text-(--vm-muted) transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-(--vm-primary)"
                                />
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Company Details Modal */}
            {selectedCompany && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-xs sm:p-5 lg:p-8"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedCompany(null);
                        }
                    }}
                >
                    <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-(--vm-radius-xl) border border-(--vm-border) bg-(--vm-surface-solid) shadow-2xl max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-2.5rem)] lg:max-h-[calc(100vh-4rem)]">
                        {/* Modal Header */}
                        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-(--vm-border) bg-(--vm-surface-solid) px-4 py-4 sm:px-5 sm:py-5">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-(--vm-radius-md) bg-(--vm-primary) text-white">
                                    <Building2 size={18} />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-bold text-(--vm-text) sm:text-base">
                                        {selectedCompany}
                                    </h3>
                                    <p className="mt-0.5 text-[11px] text-(--vm-muted) sm:text-xs">
                                        {companyJobs.length} matching{" "}
                                        {companyJobs.length === 1
                                            ? "job"
                                            : "jobs"}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedCompany(null)}
                                aria-label="Close company details"
                                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(--vm-surface-2) text-(--vm-muted) transition-colors hover:bg-(--vm-surface-3) hover:text-(--vm-text)"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Jobs */}
                        <div className="min-h-0 flex-1 overflow-y-auto bg-(--vm-surface-solid) p-4 sm:p-5 lg:p-6">
                            {companyJobs.length === 0 ? (
                                <div className="py-10 text-center">
                                    <p className="text-sm text-(--vm-muted)">
                                        No individual jobs were returned for this
                                        company.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {companyJobs.map((job, index) => (
                                        <article
                                            key={
                                                job.jobId ||
                                                `${job.title}-${index}`
                                            }
                                            className="rounded-(--vm-radius-lg) border border-(--vm-border) bg-(--vm-surface-2) p-4 sm:p-5"
                                        >
                                            <h4 className="text-sm font-bold leading-6 text-(--vm-text) sm:text-base">
                                                {job.title}
                                            </h4>

                                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-(--vm-muted)">
                                                {job.location && (
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <MapPin size={13} />
                                                        {job.location}
                                                    </span>
                                                )}

                                                {job.via && (
                                                    <span>via {job.via}</span>
                                                )}
                                            </div>

                                            {job.skills?.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-1.5">
                                                    {job.skills
                                                        .slice(0, 5)
                                                        .map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className="rounded-full border border-(--vm-primary) bg-(--vm-surface-solid) px-2.5 py-1 text-[10px] font-medium text-(--vm-primary)"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                </div>
                                            )}

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {job.applyOptions?.length > 0 &&
                                                    job.applyOptions.map(
                                                        (option) => (
                                                            <a
                                                                key={`${option.title}-${option.link}`}
                                                                href={option.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 rounded-(--vm-radius-md) bg-(--vm-primary) px-3 py-2 text-[11px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-(--vm-primary-pressed)"
                                                            >
                                                                {option.title ||
                                                                    "Apply"}
                                                                <ArrowUpRight
                                                                    size={13}
                                                                />
                                                            </a>
                                                        )
                                                    )}

                                                {job.shareLink && (
                                                    <a
                                                        href={job.shareLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface-solid) px-3 py-2 text-[11px] font-semibold text-(--vm-text-secondary) transition-colors hover:border-(--vm-primary) hover:text-(--vm-primary)"
                                                    >
                                                        View listing
                                                    </a>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}