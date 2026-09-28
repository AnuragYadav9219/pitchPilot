import { Sparkles } from "lucide-react";
import { CareerSearch } from "./CareerSearch";

interface CareerHeroProps {
    role: string;
    location: string;
    onRoleChange: (value: string) => void;
    onLocationChange: (value: string) => void;
    onSearch: (role: string, location: string) => void;
    isLoading: boolean;
}

export function CareerHero({ onSearch, isLoading }: CareerHeroProps) {
    return (
        <section className="relative overflow-hidden rounded-(--vm-radius-xl) border border-(--vm-border) bg-(--vm-surface)">
            {/* Very subtle accent */}
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-(--vm-primary)/5 blur-3xl" />

            <div className="relative px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
                {/* Heading */}
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--vm-primary)">
                        <Sparkles size={14} />
                        Career Intelligence
                    </div>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-(--vm-text) sm:text-4xl">
                        Know what the market
                        <span className="vm-brand-text ml-2">wants.</span>
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-(--vm-muted) sm:text-base">
                        Turn real hiring data into a clearer career direction, the skills to learn, and a preparation plan built around your target role.
                    </p>
                </div>

                {/* Search */}
                <div className="mt-7">
                    <CareerSearch onSearch={onSearch} isLoading={isLoading} />
                </div>
            </div>
        </section>
    );
}