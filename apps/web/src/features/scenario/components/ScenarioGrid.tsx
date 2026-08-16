import { ScenarioCard } from "./ScenarioCard";

import type { Scenario } from "../types";

interface ScenarioGridProps {
    scenarios: Scenario[];
}

export function ScenarioGrid({
    scenarios,
}: ScenarioGridProps) {
    if (!scenarios.length) {
        return (
            <div className="rounded-2xl border border-(--vm-border) bg-(--vm-surface) p-10 text-center">
                <p className="font-medium text-(--vm-text)">
                    No scenarios found
                </p>

                <p className="mt-1 text-sm text-(--vm-muted)">
                    Try selecting another category.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {scenarios.map(
                (scenario) => (
                    <ScenarioCard
                        key={scenario.id}
                        scenario={
                            scenario
                        }
                    />
                ),
            )}
        </div>
    );
}