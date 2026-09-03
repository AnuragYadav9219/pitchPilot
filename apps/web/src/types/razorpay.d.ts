export { };

declare global {
    interface Window {
        Razorpay: new (options: RazorpaOptions) => RazorpayInstance;
    }

    interface RazorpaOptions {
        key: string;
        subscription_id: string;
        name: string;
        description: string;
        image?: string;
        handler?: (response: RazorpayPaymentResponse) => void;
        modal?: { ondismiss?: () => void };
        theme?: {color?: string};
    }

    interface RazorpayPaymentResponse {
        razorpay_payment_id: string;
        razorpay_subscription_id: string;
        razorpay_signature: string;
    }

    interface RazorpayInstance {
        open(): void;
        close(): void;
    }
}