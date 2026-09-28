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

/**
 * Features that a subscription can unlock.
 *
 * NOTE:
 * - JOB_SEARCHES is a monthly usage limit, not an entitlement.
 * - JOB_ANALYSIS is credit-based, not an entitlement.
 */
export type Entitlement =
    | "VOICE_INTERVIEW"
    | "ADVANCED_ANALYTICS"
    | "RESUME_ANALYSIS"
    | "PERSONALIZED_INTERVIEWS"
    | "RESUME_BASED_INTERVIEWS";

/**
 * Monthly subscription limits.
 */
export interface SubscriptionLimitResponse {
    used: number;
    limit: number;
}

export type SubscriptionLimits = Record<
    | "VOICE_INTERVIEWS"
    | "RESUME_ANALYSES"
    | "JOB_SEARCHES",
    SubscriptionLimitResponse
>;

/**
 * Current user's subscription.
 */
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

/**
 * Describes an entitlement shown in the UI.
 */
export interface SubscriptionFeature {
    entitlement: Entitlement;
    name: string;
    description: string;
}

/**
 * Features displayed in the plan comparison.
 *
 * Only actual subscription entitlements belong here.
 */
export const SUBSCRIPTION_FEATURES: SubscriptionFeature[] = [
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

/**
 * Subscription plans.
 *
 * No TEXT_INTERVIEW anywhere.
 */

export interface SubscriptionPlanConfig {
    plan: SubscriptionPlan;
    name: string;
    description: string;
    price: number;
    features: Entitlement[];
    highlighted?: boolean;
    badge?: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlanConfig[] = [
    {
        plan: "FREE",
        name: "Free",
        description:
            "Build your interview fundamentals with AI-powered practice.",
        price: 0,
        features: [],
    },

    {
        plan: "PRO",
        name: "Pro",
        description:
            "Practice like a real interview with voice and deeper feedback.",
        price: 499,
        features: [
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
        price: 999,
        features: [
            "VOICE_INTERVIEW",
            "ADVANCED_ANALYTICS",
            "PERSONALIZED_INTERVIEWS",
            "RESUME_ANALYSIS",
            "RESUME_BASED_INTERVIEWS",
        ],
    },
];

/**
 * Human-readable entitlement labels.
 */
export const ENTITLEMENT_LABELS: Record<
    Entitlement,
    string
> = {
    VOICE_INTERVIEW: "AI Voice Interviews",

    ADVANCED_ANALYTICS:
        "Advanced Analytics",

    RESUME_ANALYSIS:
        "Resume Analysis",

    PERSONALIZED_INTERVIEWS:
        "Personalized Interviews",

    RESUME_BASED_INTERVIEWS:
        "Resume-Based Interviews",
};

/**
 * Human-readable subscription status labels.
 */
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

/**
 * Find metadata for a subscription entitlement.
 */
export function getSubscriptionFeature(
    entitlement: Entitlement,
): SubscriptionFeature {
    const feature = SUBSCRIPTION_FEATURES.find(
        (item) => item.entitlement === entitlement,
    );

    if (!feature) {
        throw new Error(
            `Unknown subscription entitlement: ${entitlement}`,
        );
    }

    return feature;
}