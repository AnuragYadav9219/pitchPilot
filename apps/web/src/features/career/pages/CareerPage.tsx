import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/app/store/store";
import { setAnalysis, setJobs, setLocation, setRole } from "../careerSlice";
import { useAnalyzeCareerMutation, useSearchJobsMutation } from "../careerApi";
import {
    AiCareerInsights,
    CareerError,
    CareerHero,
    CareerLoading,
    CareerOverview,
    MarketSkills,
    PreparationRoadmap,
    TopCompanies,
    TopLocations
} from "../components";

export default function CareerPage() {
    const dispatch = useDispatch<AppDispatch>();

    // Redux state
    const role = useSelector((state: RootState) => state.career.role);
    const location = useSelector((state: RootState) => state.career.location);
    const analysis = useSelector((state: RootState) => state.career.analysis);
    const jobs = useSelector((state: RootState) => state.career.jobs);

    // API mutation
    const [analyzeCareer, { isLoading, isError }] = useAnalyzeCareerMutation();
    const [searchJobs] = useSearchJobsMutation();

    // Input handlers
    const handleRoleChange = useCallback((value: string) => {
        dispatch(setRole(value));
    }, [dispatch]);

    const handleLocationChange = useCallback((value: string) => {
        dispatch(setLocation(value));
    }, [dispatch]);

    // Search handler
    const handleSearch = useCallback(async (searchRole: string, searchLocation: string) => {
        const trimmedRole = searchRole.trim();
        const trimmedLocation = searchLocation.trim();

        if (!trimmedRole || !trimmedLocation) return;

        dispatch(setRole(trimmedRole));
        dispatch(setLocation(trimmedLocation));

        try {
            const [analysisResult, jobsResult] = await Promise.all([
                analyzeCareer({
                    query: trimmedRole,
                    location: trimmedLocation,
                }).unwrap(),

                searchJobs({
                    query: trimmedRole,
                    location: trimmedLocation,
                }).unwrap(),]);

            dispatch(setAnalysis(analysisResult));
            dispatch(setJobs(jobsResult.jobs));
        } catch (error) {
            console.error("Career search failed:", error);
        }
    }, [analyzeCareer, searchJobs, dispatch]);

    // Retry handler
    const handleRetry = useCallback(() => {
        if (!role.trim() || !location.trim()) return;
        void handleSearch(role, location);
    }, [role, location, handleSearch]);

    // Derived values
    const skillsCount = analysis?.marketSkills?.length ?? 0;
    const companiesCount = analysis?.topCompanies?.length ?? 0;
    const locationsCount = analysis?.topLocations?.length ?? 0;

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            {/* HERO */}
            <CareerHero
                role={role}
                location={location}
                onRoleChange={handleRoleChange}
                onLocationChange={handleLocationChange}
                onSearch={handleSearch}
                isLoading={isLoading}
            />

            {/* LOADING */}
            {isLoading && (
                <div className="mt-6">
                    <CareerLoading />
                </div>
            )}

            {/* ERROR */}
            {isError && !isLoading && (
                <div className="mt-6">
                    <CareerError onRetry={handleRetry} />
                </div>
            )}

            {/* RESULTS */}
            {analysis && !isLoading && (
                <section className="mt-6 space-y-6">
                    {/* ROW 1 — CAREER OVERVIEW */}
                    <CareerOverview
                        jobsAnalyzed={analysis.jobsAnalyzed}
                        skillsCount={skillsCount}
                        companiesCount={companiesCount}
                        locationsCount={locationsCount}
                    />

                    {/* ROW 2 — MARKET SKILLS + TOP COMPANIES */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <MarketSkills skills={analysis.marketSkills} />
                        <TopCompanies
                            companies={analysis.topCompanies}
                            jobs={jobs}
                        />
                    </div>

                    {/* ROW 3 — TOP LOCATIONS */}
                    <TopLocations locations={analysis.topLocations} />

                    {/* ROW 4 — AI INSIGHTS */}
                    {analysis.aiAnalysis && (
                        <AiCareerInsights analysis={analysis.aiAnalysis} />
                    )}

                    {/* ROW 5 — PREPARATION ROADMAP */}
                    {analysis.aiAnalysis?.preparationPlan?.length > 0 && (
                        <PreparationRoadmap steps={analysis.aiAnalysis.preparationPlan} />
                    )}
                </section>
            )}

            {/* EMPTY STATE */}
            {!analysis && !isLoading && !isError && (
                <section className="mt-6 py-12 text-center">
                    <p className="text-sm text-(--vm-muted)">
                        Search for a role and location to explore the current career market.
                    </p>
                </section>
            )}
        </main>
    );
}