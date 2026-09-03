export type SubscriptionPlan =
    | "FREE"
    | "PRO"
    | "PREMIUM";

export type PaidSubscriptionPlan =
    | "PRO"
    | "PREMIUM";

export type SubscriptionStatus =
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED"
    | "GRACE_PERIOD"
    | "BILLING_RETRY"
    | "INACTIVE";

export type Entitlement =
    | "TEXT_INTERVIEW"
    | "VOICE_INTERVIEW"
    | "ADVANCED_ANALYTICS"
    | "RESUME_ANALYSIS"
    | "PERSONALIZED_INTERVIEWS"
    | "RESUME_BASED_INTERVIEWS";

export interface SubscriptionLimitResponse {
    used: number;
    limit: number;
}

export type SubscriptionLimits = Record<
        "TEXT_INTERVIEWS"
        | "VOICE_INTERVIEWS"
        | "RESUME_ANALYSES",
        SubscriptionLimitResponse
    >;

export interface SubscriptionResponse {
    id: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    entitlements: Entitlement[];
    startedAt: string | null;
    expiresAt: string | null;
    autoRenew: boolean;
    limits: SubscriptionLimits;
}

export interface SubscriptionFeature {
    entitlement: Entitlement;
    name: string;
    description: string;
}

export interface SubscriptionPlanConfig {
    plan: SubscriptionPlan;
    name: string;
    description: string;
    features: Entitlement[];
    highlighted?: boolean;
    badge?: string;
}

export const SUBSCRIPTION_FEATURES: SubscriptionFeature[] = [
    {
        entitlement: "TEXT_INTERVIEW",
        name: "AI Text Interviews",
        description:
            "Practice realistic interview conversations with an AI interviewer.",
    },
    {
        entitlement: "VOICE_INTERVIEW",
        name: "AI Voice Interviews",
        description:
            "Practice through natural voice conversations that feel like a real interview.",
    },
    {
        entitlement: "ADVANCED_ANALYTICS",
        name: "Advanced Interview Analytics",
        description:
            "Get detailed insights into your answers, communication, and interview performance.",
    },
    {
        entitlement: "RESUME_ANALYSIS",
        name: "Resume Analysis",
        description:
            "Analyze your resume and identify areas to improve before your next interview.",
    },
    {
        entitlement: "PERSONALIZED_INTERVIEWS",
        name: "Personalized Interviews",
        description:
            "Get interview questions tailored to your role, experience, and preparation goals.",
    },
    {
        entitlement: "RESUME_BASED_INTERVIEWS",
        name: "Resume-Based Interviews",
        description:
            "Practice questions generated specifically from your resume and experience.",
    },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlanConfig[] = [
    {
        plan: "FREE",
        name: "Free",
        description:
            "Build your interview fundamentals with AI-powered practice.",
        features: [
            "TEXT_INTERVIEW",
        ],
    },

    {
        plan: "PRO",
        name: "Pro",
        description:
            "Practice like a real interview with voice and deeper feedback.",
        features: [
            "TEXT_INTERVIEW",
            "VOICE_INTERVIEW",
            "ADVANCED_ANALYTICS",
            "PERSONALIZED_INTERVIEWS",
        ],
        highlighted: true,
        badge: "Popular",
    },

    {
        plan: "PREMIUM",
        name: "Premium",
        description:
            "Get personalized preparation built around your experience.",
        features: [
            "TEXT_INTERVIEW",
            "VOICE_INTERVIEW",
            "ADVANCED_ANALYTICS",
            "PERSONALIZED_INTERVIEWS",
            "RESUME_ANALYSIS",
            "RESUME_BASED_INTERVIEWS",
        ],
    },
];

export const ENTITLEMENT_LABELS: Record<
    Entitlement,
    string
> = {
    TEXT_INTERVIEW: "AI Text Interviews",
    VOICE_INTERVIEW: "AI Voice Interviews",
    ADVANCED_ANALYTICS: "Advanced Analytics",
    RESUME_ANALYSIS: "Resume Analysis",
    PERSONALIZED_INTERVIEWS: "Personalized Interviews",
    RESUME_BASED_INTERVIEWS: "Resume-Based Interviews",
};

export const SUBSCRIPTION_STATUS_LABELS: Record<
    SubscriptionStatus,
    string
> = {
    ACTIVE: "Active",
    EXPIRED: "Expired",
    CANCELLED: "Cancelled",
    GRACE_PERIOD: "Grace Period",
    BILLING_RETRY: "Billing Issue",
    INACTIVE: "Inactive",
};

export function getSubscriptionFeature(
    entitlement: Entitlement,
): SubscriptionFeature {
    return SUBSCRIPTION_FEATURES.find(
        (feature) =>
            feature.entitlement === entitlement,
    )!;
}