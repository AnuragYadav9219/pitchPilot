import { ArrowRight, BriefcaseBusiness, Check, Loader2, MapPin, Search } from "lucide-react";
import { useState } from "react";

interface CareerSearchProps {
    onSearch: (role: string, location: string) => void;
    isLoading: boolean;
}

const suggestedRoles = ["Java Developer", "Frontend Developer", "Backend Developer", "AI Engineer"];

export function CareerSearch({ onSearch, isLoading }: CareerSearchProps) {
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");

    const canSearch = role.trim().length > 0 && location.trim().length > 0 && !isLoading;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!canSearch) return;
        onSearch(role.trim(), location.trim());
    };

    return (
        <section className="overflow-hidden rounded-(--vm-radius-xl) border border-(--vm-border) bg-(--vm-surface)">
            {/* Section heading */}
            <div className="flex items-start gap-3 border-b border-(--vm-border) px-5 py-5 sm:px-6">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-(--vm-radius-sm) bg-(--vm-primary)/10 text-(--vm-primary)">
                    <Search size={17} />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-(--vm-text) sm:text-base">
                        Search the job market
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                        Choose a target role and location to discover current hiring demand.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="p-5 sm:p-6">
                    {/* Inputs */}
                    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_auto] lg:items-end">
                        {/* Role */}
                        <div>
                            <label htmlFor="career-role" className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-(--vm-text-secondary)">
                                <BriefcaseBusiness size={14} className="text-(--vm-primary)" />
                                Target role
                            </label>
                            <input
                                id="career-role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="e.g. Java Developer"
                                autoComplete="off"
                                className="h-12 w-full rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface-2) px-4 text-sm font-medium text-(--vm-text) outline-none transition-all duration-200 placeholder:text-(--vm-placeholder) hover:border-(--vm-border-strong) focus:border-(--vm-primary)/40 focus:bg-(--vm-surface) focus:shadow-[0_0_0_3px_var(--vm-glow-coral)]"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="career-location" className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-(--vm-text-secondary)">
                                <MapPin size={14} className="text-(--vm-primary)" />
                                Location
                            </label>
                            <input
                                id="career-location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g. Bangalore"
                                autoComplete="off"
                                className="h-12 w-full rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface-2) px-4 text-sm font-medium text-(--vm-text) outline-none transition-all duration-200 placeholder:text-(--vm-placeholder) hover:border-(--vm-border-strong) focus:border-(--vm-primary)/40 focus:bg-(--vm-surface) focus:shadow-[0_0_0_3px_var(--vm-glow-coral)]"
                            />
                        </div>

                        {/* Analyze Button */}
                        <button
                            type="submit"
                            disabled={!canSearch}
                            className="flex h-12 items-center cursor-pointer justify-center gap-2 rounded-(--vm-radius-md) bg-(--vm-primary) px-6 text-sm font-semibold text-white shadow-[0_6px_18px_var(--vm-glow-coral)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--vm-primary-pressed) hover:shadow-[0_9px_24px_var(--vm-glow-coral)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-40 lg:min-w-32"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Analyzing
                                </>
                            ) : (
                                <>
                                    Analyze
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Suggestions */}
                    <div className="mt-6">
                        <p className="mb-2.5 text-[11px] font-medium text-(--vm-muted)">
                            Try a role
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {suggestedRoles.map((suggestedRole) => {
                                const active = role === suggestedRole;
                                return (
                                    <button
                                        key={suggestedRole}
                                        type="button"
                                        onClick={() => setRole(suggestedRole)}
                                        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${active
                                            ? "border-(--vm-primary)/30 bg-(--vm-primary)/10 text-(--vm-primary)"
                                            : "border-(--vm-border) bg-(--vm-surface-2) text-(--vm-text-secondary) hover:border-(--vm-primary)/30 hover:text-(--vm-primary)"
                                            }`}
                                    >
                                        {active && <Check size={12} />}
                                        {suggestedRole}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom information */}
                <div className="border-t border-(--vm-border) px-5 py-3.5 sm:px-6">
                    <p className="text-[11px] leading-5 text-(--vm-placeholder)">
                        VirtualMentor analyzes current job-market signals to surface in-demand skills, companies, locations, and preparation insights.
                    </p>
                </div>
            </form>
        </section>
    );
}