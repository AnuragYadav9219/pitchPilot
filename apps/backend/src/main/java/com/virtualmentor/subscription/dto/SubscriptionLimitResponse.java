package com.virtualmentor.subscription.dto;

public record SubscriptionLimitResponse(int used, int limit) {

        public int remaining() {
                if (limit < 0) {
                        return -1;
                }

                return Math.max(0, limit - used);
        }

        public boolean unlimited() {
                return limit < 0;
        }
}