export { };

declare global {
    interface Window {
        Razorpay: new (
            options: RazorpayOptions
        ) => RazorpayInstance;
    }

    interface RazorpayOptions {
        key: string;

        // Subscription checkout
        subscription_id?: string;

        // Normal order checkout
        order_id?: string;

        name: string;
        description: string;

        image?: string;

        handler?: (
            response: RazorpayPaymentResponse
        ) => void;

        modal?: {
            ondismiss?: () => void;
        };

        theme?: {
            color?: string;
        };

        prefill?: {
            name?: string;
            email?: string;
            contact?: string;
        };

        notes?: Record<string, string>;
    }

    interface RazorpayPaymentResponse {
        razorpay_payment_id: string;

        // Subscription payment
        razorpay_subscription_id?: string;

        // Normal order payment
        razorpay_order_id?: string;

        razorpay_signature: string;
    }

    interface RazorpayInstance {
        open(): void;
        close(): void;
    }
}