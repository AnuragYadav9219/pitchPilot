import { useCallback } from "react";
import { useCreateCreditPurchaseMutation, useVerifyCreditPurchaseMutation } from "../creditPurchaseApi";
import { loadRazorpay } from "@/services/razorpayLoader";
import { Brand } from "@virtualmentor/shared";

export function useCreditPurchase() {
    const [createPurchase, { isLoading: isCreatingPurchase }] = useCreateCreditPurchaseMutation();
    const [verifyPurchase, { isLoading: isVerifyingPurchase }] = useVerifyCreditPurchaseMutation();

    const purchaseCredits = useCallback(
        async (packageCode: string) => {
            await loadRazorpay();

            const createResponse = await createPurchase({ packageCode }).unwrap();
            const purchase = createResponse.data;

            if (!purchase) {
                throw new Error("Unable to create credit purchase.");
            }

            await new Promise<void>((resolve, reject) => {
                const razorpay = new window.Razorpay({
                    key: purchase.razorpayKeyId,
                    order_id: purchase.razorpayOrderId,
                    name: Brand.name,
                    description: `${purchase.credits} AI Credits`,
                    handler: async (response) => {
                        try {
                            await verifyPurchase({
                                razorpayOrderId: purchase.razorpayOrderId,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                            }).unwrap();

                            resolve();
                        } catch (error) {
                            reject(error);
                        }
                    },
                    modal: {
                        ondismiss: () => {
                            reject(new Error("Payment was cancelled."));
                        },
                    },
                    theme: {
                        color: "#6366f1",
                    },
                });

                razorpay.open();
            });
        },
        [createPurchase, verifyPurchase]
    );

    return {
        purchaseCredits,
        isPurchasing: isCreatingPurchase || isVerifyingPurchase,
    };
}