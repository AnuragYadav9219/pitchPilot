import { ApiErrorState, Container } from "@/components/ui";
import { DashboardHeader, DashboardLoading, QuickPractice, RecentSessions, SkillOverview, StatsGrid } from "../components";
import { useGetDashboardQuery } from "../dashboardApi";
import { RecommendedScenarioCard } from "@/features/scenario/components";
import { getApiErrorMessage } from "@/services/apiError";

export default function DashboardPage() {
    const {
        data,
        error,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetDashboardQuery();

    const dashboard = data?.data;

    if (isLoading) {
        return <DashboardLoading />;
    }

    if (isError) {
        return (
            <ApiErrorState
                title="Unable to load your dashboard"
                message={getApiErrorMessage(error)}
                onRetry={() => void refetch()}
                showHome
            />
        );
    }

    if (!dashboard) {
        return (
            <ApiErrorState
                title="Dashboard data unavailable"
                message="We couldn't find the information needed to display your dashboard."
                onRetry={() => void refetch()}
                showHome
            />
        );
    }

    return (
        <main className="min-h-full bg-(--vm-background)">
            <Container className="py-6 sm:py-8 lg:py-10">
                {/* Header */}
                <DashboardHeader
                    isFetching={isFetching}
                />

                <section className="mt-6">
                    <RecommendedScenarioCard />
                </section>

                {/* Stats */}
                <StatsGrid
                    totalSessions={
                        dashboard.totalSessions
                    }
                    completedSessions={
                        dashboard.completedSessions
                    }
                    averageScore={
                        dashboard.averageScore
                    }
                    bestScore={
                        dashboard.bestScore
                    }
                />

                {/* Main content */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <SkillOverview
                        communication={
                            dashboard.averageCommunicationScore
                        }
                        clarity={
                            dashboard.averageClarityScore
                        }
                        confidence={
                            dashboard.averageConfidenceScore
                        }
                        relevance={
                            dashboard.averageRelevanceScore
                        }
                    />

                    <RecentSessions
                        sessions={
                            dashboard.recentSessions
                        }
                    />
                </div>

                {/* Quick Practice */}
                <QuickPractice />
            </Container>
        </main>
    );
}