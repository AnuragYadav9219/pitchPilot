import {
    ArrowLeft,
    BarChart3,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Container } from "@/components/ui";

import {
    EvaluationItem,
    EvaluationPageError,
    EvaluationPageLoading,
    EvaluationsEmpty,
} from "../components";

import { useGetEvaluationsQuery } from "../evaluationApi";
import { EvaluationPagination } from "../components/EvaluationPagination";
import { useState } from "react";
import { getApiErrorMessage } from "@/services/apiError";

export default function EvaluationsPage() {
    const [page, setPage] = useState(0);

    const {
        data,
        error,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetEvaluationsQuery({
        page,
        size: 10,
    });

    const evaluationPage = data?.data;

    if (isLoading) {
        return (
            <EvaluationPageLoading />
        );
    }

    if (isError || !evaluationPage) {
        return (
            <EvaluationPageError
                message={getApiErrorMessage(error)}
                onRetry={() => void refetch()}
            />
        );
    }

    return (
        <main className="min-h-full bg-(--vm-background)">
            <Container className="py-6 sm:py-8 lg:py-10">
                <Link
                    to="/dashboard"
                    className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-(--vm-muted) hover:text-(--vm-text)"
                >
                    <ArrowLeft size={14} />
                    Dashboard
                </Link>

                {/* Header */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-(--vm-primary)/10 px-3 py-1.5 text-xs font-medium text-(--vm-primary)">
                            <BarChart3 size={14} />
                            Performance
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-(--vm-text) sm:text-3xl">
                            Your evaluations
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-(--vm-muted)">
                            Review your previous practice sessions and track how your communication skills are improving.
                        </p>
                    </div>

                    {isFetching && (
                        <span className="text-[11px] text-(--vm-muted)">
                            Updating...
                        </span>
                    )}
                </div>

                {/* Content */}

                {evaluationPage.content.length === 0 ? (
                    <div className="mt-8">
                        <EvaluationsEmpty />
                    </div>
                ) : (
                    <>
                        <div className="mt-8 space-y-3">
                            {evaluationPage.content.map(
                                (evaluation) => (
                                    <EvaluationItem
                                        key={
                                            evaluation.conversationId
                                        }
                                        evaluation={
                                            evaluation
                                        }
                                    />
                                ),
                            )}
                        </div>

                        <EvaluationPagination
                            page={evaluationPage.page}
                            totalPages={evaluationPage.totalPages}
                            first={evaluationPage.first}
                            last={evaluationPage.last}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </Container>
        </main>
    );
}