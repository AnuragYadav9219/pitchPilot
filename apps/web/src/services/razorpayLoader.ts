let razorpayLoadPromise: Promise<void> | null = null;

const RAZORPAY_SCRIPT_ID = "razorpay-checkout-script";
const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

export function loadRazorpay(): Promise<void> {
    if (window.Razorpay) {
        return Promise.resolve();
    }

    if (razorpayLoadPromise) {
        return razorpayLoadPromise;
    }

    razorpayLoadPromise = new Promise<void>((resolve, reject) => {
        const existingScript = document.getElementById(RAZORPAY_SCRIPT_ID);

        existingScript?.remove();

        const script = document.createElement("script");

        script.id = RAZORPAY_SCRIPT_ID;
        script.src = RAZORPAY_SCRIPT_URL;
        script.async = true;

        const timeoutId = window.setTimeout(() => {
            script.remove();

            razorpayLoadPromise = null;

            reject(
                new Error("Razorpay Checkout timed out. Please check your internet connection and try again.")
            );
        }, 15_000);

        script.onload = () => {
            window.clearTimeout(timeoutId);

            if (!window.Razorpay) {
                razorpayLoadPromise = null;

                reject(
                    new Error("Razorpay Checkout loaded, but Razorpay was not initialized.")
                );

                return;
            }

            resolve();
        };

        script.onerror = () => {
            window.clearTimeout(timeoutId);

            script.remove();

            razorpayLoadPromise = null;

            reject(
                new Error("Unable to load Razorpay Checkout. Please try again.")
            );
        };

        document.body.appendChild(script);
    });

    return razorpayLoadPromise;
}