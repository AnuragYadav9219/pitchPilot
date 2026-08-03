import {
    BadgeDollarSign,
    BriefcaseBusiness,
    Rocket,
    Users,
    LucideIcon,
} from "lucide-react-native";

export interface Scenario {
    id: string;
    title: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard";
    duration: string;
    Icon: LucideIcon;
    color: string;
}

export const scenarios: Scenario[] = [
    {
        id: "1",
        title: "Salary Negotiation",
        description: "Ask for a 20% salary increase.",
        difficulty: "Hard",
        duration: "12 min",
        Icon: BadgeDollarSign,
        color: "#6D5DFB",
    },
    {
        id: "2",
        title: "Technical Interview",
        description: "Practice coding interview communication.",
        difficulty: "Medium",
        duration: "18 min",
        Icon: BriefcaseBusiness,
        color: "#00D4FF",
    },
    {
        id: "3",
        title: "Investor Pitch",
        description: "Pitch your startup to investors.",
        difficulty: "Hard",
        duration: "15 min",
        Icon: Rocket,
        color: "#F97316",
    },
    {
        id: "4",
        title: "Toxic Coworker",
        description: "Handle difficult workplace conversations.",
        difficulty: "Medium",
        duration: "10 min",
        Icon: Users,
        color: "#22C55E",
    },
];