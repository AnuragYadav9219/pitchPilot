export function isSubscriptionLimitError(
    error: unknown,
): boolean {
    if (!error || typeof error !== "object") {
        return false;
    }

    const value = error as {
        status?: number;
        data?: {
            code?: string;
        };
    };

    return (
        value.status === 429 &&
        value.data?.code === "SUBSCRIPTION_LIMIT_REACHED"
    );
}