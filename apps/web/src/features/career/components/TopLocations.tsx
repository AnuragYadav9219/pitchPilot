import { MapPin } from "lucide-react";

interface TopLocationsProps {
    locations: string[];
}

export function TopLocations({ locations }: TopLocationsProps) {
    return (
        <section className="vm-card overflow-hidden">
            {/* Header */}
            <div className="border-b border-(--vm-border) p-5 sm:p-6">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-(--vm-radius-md) border border-(--vm-orange) bg-(--vm-surface-2) text-(--vm-orange)">
                        <MapPin size={18} />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-base font-bold text-(--vm-text)">
                            Where opportunities are
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                            Locations appearing across current job-market data.
                        </p>
                    </div>
                </div>
            </div>

            {/* Locations */}
            <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
                {locations.slice(0, 8).map((location, index) => (
                    <div
                        key={`${location}-${index}`}
                        className="group flex min-w-0 items-center gap-3 rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface-2) p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--vm-orange) hover:bg-(--vm-surface-3)"
                    >
                        {/* Rank */}
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--vm-orange) text-[10px] font-bold text-white">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Location */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-(--vm-text)">
                                {location}
                            </p>

                            <p className="mt-0.5 text-[10px] text-(--vm-muted)">
                                Job market location
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}