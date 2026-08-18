import type { Scenario } from "../types";

export const scenarios: Scenario[] = [
    // =========================================================
    // INTERVIEW
    // =========================================================

    {
        id: "job-interview",
        title: "Job Interview",
        description:
            "Practice answering realistic interview questions with an AI interviewer.",
        category: "INTERVIEW",
        difficulty: "BEGINNER",
        focus: "CONFIDENCE",
        estimatedMinutes: 10,
        tags: [
            "Interview",
            "Confidence",
            "Career",
        ],
        conversationType: "INTERVIEW",
    },

    {
        id: "behavioral-interview",
        title: "Behavioral Interview",
        description:
            "Handle challenging behavioral questions and explain your experiences clearly.",
        category: "INTERVIEW",
        difficulty: "INTERMEDIATE",
        focus: "CLARITY",
        estimatedMinutes: 15,
        tags: [
            "STAR Method",
            "Interview",
            "Career",
        ],
        conversationType: "INTERVIEW",
    },

    // =========================================================
    // WORKPLACE
    // =========================================================

    {
        id: "team-conflict",
        title: "Team Conflict",
        description:
            "Practice resolving a disagreement with a teammate professionally.",
        category: "WORKPLACE",
        difficulty: "INTERMEDIATE",
        focus: "CONFLICT_HANDLING",
        estimatedMinutes: 10,
        tags: [
            "Conflict",
            "Workplace",
            "Communication",
        ],
        conversationType: "ROLEPLAY",
    },

    {
        id: "difficult-manager",
        title: "Difficult Manager",
        description:
            "Practice navigating a difficult workplace conversation with your manager.",
        category: "WORKPLACE",
        difficulty: "ADVANCED",
        focus: "CONFIDENCE",
        estimatedMinutes: 12,
        tags: [
            "Workplace",
            "Conflict",
            "Confidence",
        ],
        conversationType: "ROLEPLAY",
    },

    // =========================================================
    // LEADERSHIP
    // =========================================================

    {
        id: "leadership-challenge",
        title: "Leadership Challenge",
        description:
            "Practice making decisions and communicating with your team under pressure.",
        category: "LEADERSHIP",
        difficulty: "ADVANCED",
        focus: "LEADERSHIP",
        estimatedMinutes: 15,
        tags: [
            "Leadership",
            "Decision Making",
        ],
        conversationType: "ROLEPLAY",
    },

    // =========================================================
    // COMMUNICATION
    // =========================================================

    {
        id: "presentation",
        title: "Present Your Idea",
        description:
            "Practice explaining an idea clearly to a team or stakeholder.",
        category: "COMMUNICATION",
        difficulty: "BEGINNER",
        focus: "COMMUNICATION",
        estimatedMinutes: 10,
        tags: [
            "Presentation",
            "Communication",
            "Public Speaking",
        ],
        conversationType: "ROLEPLAY",
    },
];