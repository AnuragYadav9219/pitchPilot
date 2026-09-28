import {
    BriefcaseBusiness,
    Building2,
    MapPin,
    Sparkles,
} from "lucide-react";

import { CareerStatCard } from "./CareerStatsCard";

interface CareerOverviewProps {
    jobsAnalyzed: number;
    skillsCount: number;
    companiesCount: number;
    locationsCount: number;
}

export function CareerOverview({
    jobsAnalyzed,
    skillsCount,
    companiesCount,
    locationsCount,
}: CareerOverviewProps) {
    return (
        <section className=" grid grid-cols-2 gap-3 lg:grid-cols-4">
            <CareerStatCard
                icon={<BriefcaseBusiness size={18} />}
                label="Jobs analyzed"
                value={jobsAnalyzed}
            />

            <CareerStatCard
                icon={<Sparkles size={18} />}
                label="Skills detected"
                value={skillsCount}
            />

            <CareerStatCard
                icon={<Building2 size={18} />}
                label="Companies"
                value={companiesCount}
            />

            <CareerStatCard
                icon={<MapPin size={18} />}
                label="Locations"
                value={locationsCount}
            />
        </section>
    );
}