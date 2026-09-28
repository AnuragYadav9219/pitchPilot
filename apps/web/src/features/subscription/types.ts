import type { SubscriptionPlan } from "@virtualmentor/shared";

export interface CreditBalanceResponse {
    userId: string;
    balance: number;
    reserved: number;
    available: number;
}

export type CreditTransactionType =
    | "SUBSCRIPTION_GRANT"
    | "USAGE"
    | "REFUND"
    | "RESERVATION"
    | "RESERVATION_RELEASE";

export interface CreditTransaction {
    id: string;
    amount: number;
    type: CreditTransactionType;
    action: string;
    description: string | null;
    createdAt: string;
}

export interface CreditTransactionPage {
    content: CreditTransaction[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface RazorpayCreateSubscriptionResponse {
    subscriptionId: string;
    keyId: string;
    plan: SubscriptionPlan;
}