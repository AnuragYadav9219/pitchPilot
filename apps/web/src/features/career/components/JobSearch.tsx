// src/features/career/components/JobSearch.tsx

import { BriefcaseBusiness, Loader2, Search } from "lucide-react";
import { useState } from "react";

import { useSearchJobsMutation } from "../careerApi";
import type { JobResult } from "../types";

import JobCard from "./JobCard";
import JobDetails from "./JobDetails";

interface JobSearchProps {
    role: string;
    location: string;
}

export function JobSearch({ role, location }: JobSearchProps) {
    const [searchJobs, { isLoading, isError }] = useSearchJobsMutation();

    const [jobs, setJobs] = useState<JobResult[]>([]);
    const [searched, setSearched] = useState(false);
    const [selectedJob, setSelectedJob] = useState<JobResult | null>(null);

    const handleSearch = async () => {
        const query = role.trim();
        const targetLocation = location.trim();

        if (!query || !targetLocation) {
            return;
        }

        try {
            const result = await searchJobs({
                query,
                location: targetLocation,
            }).unwrap();

            setJobs(result.jobs);
            setSearched(true);
        } catch (error) {
            console.error("Job search failed:", error);
            setJobs([]);
            setSearched(true);
        }
    };

    return (
        <>
            <section className="mt-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-(--vm-primary)">
                            Job opportunities
                        </p>

                        <h2 className="mt-1 text-xl font-bold tracking-tight text-(--vm-text)">
                            Jobs matching your target
                        </h2>

                        <p className="mt-1 text-sm text-(--vm-muted)">
                            Find relevant openings and apply directly through the original source.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={isLoading || !role.trim() || !location.trim()}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-(--vm-radius-md) bg-(--vm-primary) px-4 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-(--vm-primary-pressed) disabled:pointer-events-none disabled:opacity-40"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={14} className="animate-spin" />
                                Searching
                            </>
                        ) : (
                            <>
                                <Search size={14} />
                                Find jobs
                            </>
                        )}
                    </button>
                </div>

                {/* Error */}
                {isError && (
                    <p className="mt-4 text-xs text-(--vm-danger)">
                        Unable to load jobs right now. Please try again.
                    </p>
                )}

                {/* Results */}
                {jobs.length > 0 && (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {jobs.map((job) => (
                            <JobCard
                                key={
                                    job.jobId ||
                                    `${job.title}-${job.companyName}`
                                }
                                job={job}
                                onViewDetails={setSelectedJob}
                            />
                        ))}
                    </div>
                )}

                {/* Empty */}
                {searched && !isLoading && jobs.length === 0 && (
                    <div className="mt-5 py-10 text-center">
                        <BriefcaseBusiness
                            size={24}
                            className="mx-auto text-(--vm-placeholder)"
                        />

                        <p className="mt-3 text-sm font-medium text-(--vm-text)">
                            No jobs found
                        </p>

                        <p className="mt-1 text-xs text-(--vm-muted)">
                            Try another role or location.
                        </p>
                    </div>
                )}
            </section>

            <JobDetails
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
            />
        </>
    );
}