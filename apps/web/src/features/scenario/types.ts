import type { ConversationType } from "@/features/conversation/types";

export type ScenarioCategory =
    | "INTERVIEW"
    | "COMMUNICATION"
    | "LEADERSHIP"
    | "WORKPLACE";

export type ScenarioDifficulty =
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED";

export type ScenarioFocus =
    | "CONFIDENCE"
    | "CLARITY"
    | "COMMUNICATION"
    | "RELEVANCE"
    | "LEADERSHIP"
    | "CONFLICT_HANDLING";

export interface Scenario {
    id: string;
    title: string;
    description: string;

    category: ScenarioCategory;
    difficulty: ScenarioDifficulty;

    focus: ScenarioFocus;

    estimatedMinutes: number;

    tags: string[];

    conversationType: ConversationType;
}