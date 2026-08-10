export type RootStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Scenario: undefined;
    Call: {
        scenarioId: string;
    };
    Feedback: {
        sessionId: string;
    };
};