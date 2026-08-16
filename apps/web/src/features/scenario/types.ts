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

export interface Scenario {
    id: string;
    title: string;
    description: string;

    category: ScenarioCategory;
    difficulty: ScenarioDifficulty;

    estimatedMinutes: number;

    tags: string[];

    conversationType: ConversationType;
}