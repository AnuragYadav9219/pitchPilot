export interface OnboardingItem {
    id: string;
    title: string;
    description: string;
    image: any;
}

export const onboardingData: OnboardingItem[] = [
    {
        id: "1",
        title: "Master Difficult Conversations",
        description:
            "Practice interviews, negotiations and public speaking with an AI coach that adapts to you.",
        // image: require("@/assets/images/onboarding/onboarding1.png"),
        image: null,
    },

    {
        id: "2",
        title: "Speak Naturally",
        description:
            "Experience realistic conversations with AI using your own voice in real time.",
        // image: require("@/assets/images/onboarding/onboarding2.png"),
        image: null,
    },

    {
        id: "3",
        title: "Instant AI Feedback",
        description:
            "Improve confidence, clarity, pace and communication after every session.",
        // image: require("@/assets/images/onboarding/onboarding3.png"),
        image: null,
    },
];