export interface CreditPackage {
    code: string;
    credits: number;
    priceInPaise: number;
}

export interface CreateCreditPurchaseRequest {
    packageCode: string;
}

export interface CreditPurchaseResponse {
    purchaseId: string;
    packageCode: string;
    credits: number;
    amountInPaise: number;
    razorpayOrderId: string;
    razorpayKeyId: string;
}

export interface VerifyCreditPurchaseRequest {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}