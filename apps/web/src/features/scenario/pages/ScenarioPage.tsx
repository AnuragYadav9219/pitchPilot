import {
    ArrowLeft,
    Search,
    Sparkles,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import {
    useMemo,
    useState,
} from "react";

import { scenarios } from "../data/scenarios";

import type { ScenarioCategory } from "../types";

import { ScenarioFilters, ScenarioGrid } from "../components";


export default function ScenariosPage() {
    const [
        category,
        setCategory,
    ] = useState<ScenarioCategory | "ALL">("ALL");

    const [
        search,
        setSearch,
    ] = useState("");

    const filteredScenarios = useMemo(() => {
        const query = search
            .trim()
            .toLowerCase();

        return scenarios.filter(
            (scenario) => {
                const matchesCategory = category === "ALL" ||
                    scenario.category === category;

                const matchesSearch = !query || scenario.title
                    .toLowerCase().includes(query) ||

                    scenario.description.toLowerCase().includes(query) ||

                    scenario.tags.some(
                        (tag) => tag
                            .toLowerCase()
                            .includes(query),
                    );

                return (
                    matchesCategory && matchesSearch
                );
            },
        );
    }, [category, search]);

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}

            <div className="mb-8">
                <Link
                    to="/dashboard"
                    className="mb-5 inline-flex items-center gap-1.5 text-sm text-(--vm-muted) hover:text-(--vm-text)
                    "
                >
                    <ArrowLeft size={15} />

                    Dashboard
                </Link>

                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-(--vm-primary)/10 px-3 py-1.5 text-xs font-medium text-(--vm-primary)">
                            <Sparkles
                                size={14}
                            />

                            AI practice
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-(--vm-text) sm:text-4xl">
                            Choose a scenario
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-(--vm-muted) sm:text-base">
                            Pick a real-world situation and practice it with your AI mentor.
                        </p>
                    </div>

                    <label
                        htmlFor="scenario-search"
                        className="relative z-50 block w-full cursor-text lg:w-72"
                    >
                        <Search
                            size={17}
                            aria-hidden="true"
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--vm-muted)"
                        />

                        <input
                            id="scenario-search"
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search scenarios..."
                            className="block h-11 w-full rounded-xl border border-(--vm-border) bg-(--vm-surface) pl-10 pr-4 text-sm text-(--vm-text) outline-none placeholder:text-(--vm-muted) transition-all focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20"
                        />
                    </label>
                </div>
            </div>

            {/* Filters */}

            <div className="mb-6">
                <ScenarioFilters
                    value={category}
                    onChange={
                        setCategory
                    }
                />
            </div>

            {/* Result count */}

            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-(--vm-muted)">
                    {filteredScenarios.length}{" "}
                    {filteredScenarios.length ===
                        1
                        ? "scenario"
                        : "scenarios"}
                </p>
            </div>

            {/* Grid */}

            <ScenarioGrid
                scenarios={
                    filteredScenarios
                }
            />
        </div>
    );
}