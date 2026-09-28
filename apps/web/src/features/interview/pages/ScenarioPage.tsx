import { useMemo, useState } from "react";
import { AlertCircle, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    ScenarioCard,
    ScenarioFilters,
    ScenarioHeader,
    ScenarioSearch,
} from "../components/scenario";

import { useCreateInterviewMutation } from "../interviewApi";
import type { Scenario, ScenarioCategory } from "../types";
import { scenarios } from "../data/scenario";

export default function ScenarioPage() {
    const navigate = useNavigate();

    const [createInterview, { isLoading: isCreatingInterview, error: createInterviewError }] =
        useCreateInterviewMutation();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<ScenarioCategory | "ALL">("ALL");
    const [startingScenarioId, setStartingScenarioId] = useState<string | null>(null);

    const filteredScenarios = useMemo(() => {
        const query = search.trim().toLowerCase();

        return scenarios.filter((scenario) => {
            if (category !== "ALL" && scenario.category !== category) return false;
            if (!query) return true;

            const searchableText = [
                scenario.title,
                scenario.description,
                scenario.category,
                scenario.difficulty,
                scenario.focus,
                ...scenario.tags,
            ]
                .join(" ")
                .toLowerCase();

            return searchableText.includes(query);
        });
    }, [search, category]);

    const handleStartInterview = async (scenario: Scenario) => {
        if (isCreatingInterview) return;

        console.log("Starting scenario:", scenario);
        setStartingScenarioId(scenario.id);

        try {
            const response = await createInterview({
                role: scenario.title,
                type: scenario.interviewType,
                difficulty: scenario.interviewDifficulty,
                topics: scenario.tags.join(", "),
                durationMinutes: scenario.estimatedMinutes,
            }).unwrap();

            console.log("Create interview response:", response);
            const interviewId = response.data?.id;
            console.log("Interview ID:", interviewId);

            if (!interviewId) {
                throw new Error("Interview was created but no interview ID was returned.");
            }

            navigate(`/voice-interview/${interviewId}`);
        } catch (error) {
            console.error("Failed to create interview:", error);
        } finally {
            setStartingScenarioId(null);
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <ScenarioHeader scenarioCount={scenarios.length} />

            {/* Voice introduction */}
            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-(--vm-primary)/20 bg-(--vm-primary)/5 p-5 sm:flex-row sm:items-center">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                        <Mic size={19} strokeWidth={1.8} />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-(--vm-text)">
                            Voice-first interviews
                        </h2>
                        <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                            Speak naturally with your AI interviewer and practice realistic
                            interview conversations.
                        </p>
                    </div>
                </div>
            </div>

            {/* API error */}
            {createInterviewError && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                    <AlertCircle size={17} className="mt-0.5 shrink-0 text-red-500" />
                    <div>
                        <p className="text-sm font-medium text-red-500">
                            Unable to start interview
                        </p>
                        <p className="mt-1 text-xs text-red-500/80">
                            Please check the browser console and backend logs.
                        </p>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="space-y-4">
                <ScenarioSearch value={search} onChange={setSearch} />
                <ScenarioFilters value={category} onChange={setCategory} />
            </div>

            {/* Cards */}
            <div className="mt-8">
                {filteredScenarios.length === 0 ? (
                    <EmptyState
                        onClear={() => {
                            setSearch("");
                            setCategory("ALL");
                        }}
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {filteredScenarios.map((scenario) => (
                            <ScenarioCard
                                key={scenario.id}
                                scenario={scenario}
                                onStart={handleStartInterview}
                                isStarting={startingScenarioId === scenario.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function EmptyState({ onClear }: { onClear: () => void }) {
    return (
        <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-(--vm-border) px-6 text-center">
            <AlertCircle size={20} className="text-(--vm-muted)" />
            <h3 className="mt-4 text-sm font-semibold text-(--vm-text)">No scenarios found</h3>
            <p className="mt-1 text-xs text-(--vm-muted)">
                Try changing your search or filters.
            </p>
            <button
                type="button"
                onClick={onClear}
                className="mt-4 rounded-lg border border-(--vm-border) px-3 py-2 text-xs font-medium text-(--vm-text) hover:bg-(--vm-surface-2)"
            >
                Clear filters
            </button>
        </div>
    );
}