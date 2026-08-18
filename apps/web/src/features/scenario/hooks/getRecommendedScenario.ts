import type {
    Scenario,
    ScenarioFocus,
} from "../types";

export interface SkillScores {
    confidence: number;
    clarity: number;
    communication: number;
    relevance: number;
}

const focusMap: Record<
    keyof SkillScores,
    ScenarioFocus
> = {
    confidence: "CONFIDENCE",
    clarity: "CLARITY",
    communication: "COMMUNICATION",
    relevance: "RELEVANCE",
};

export function getRecommendedScenario(
    scenarios: Scenario[],
    scores: SkillScores,
): Scenario | null {
    const weakestSkill = (
        Object.entries(scores) as [
            keyof SkillScores,
            number,
        ][]
    ).sort(
        ([, first], [, second]) =>
            first - second,
    )[0];

    if (!weakestSkill) {
        return null;
    }

    const focus = focusMap[weakestSkill[0]];

    return (
        scenarios.find(
            (scenario) =>
                scenario.focus === focus,
        ) ??
        scenarios.find(
            (scenario) =>
                scenario.focus === "CONFIDENCE",
        ) ??
        scenarios[0] ??
        null
    );
}