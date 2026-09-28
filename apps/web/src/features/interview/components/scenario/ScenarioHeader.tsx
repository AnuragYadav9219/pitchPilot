interface ScenarioHeaderProps {
    scenarioCount: number;
}

export function ScenarioHeader({
    scenarioCount,
}: ScenarioHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold tracking-tight text-(--vm-text)">
                    Practice
                </h1>

                <p className="max-w-2xl text-sm leading-6 text-(--vm-muted)">
                    Choose an interview scenario and practice with your AI 
                    interviewer through a realistic voice conversation.
                </p>
            </div>

            <div className="mt-4">
                <span className="text-xs font-medium text-(--vm-muted)">
                    {scenarioCount} scenarios available
                </span>
            </div>
        </div>
    );
}