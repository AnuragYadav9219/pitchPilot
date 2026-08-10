package com.virtualmento.common.web;

import org.springframework.stereotype.Component;

@Component
public class DeviceInfoResolver {

    public String resolveDeviceName(String userAgent) {

        if (userAgent == null || userAgent.isBlank()) {
            return "Unknow Device";
        }

        String value = userAgent.toLowerCase();

        if (value.contains("android")) {
            return "Android device";
        }

        if (value.contains("iphone")) {
            return "iPhone";
        }

        if (value.contains("ipad")) {
            return "iPad";
        }

        if (value.contains("windows")) {
            return "Windows";
        }

        if (value.contains("macintosh")) {
            return "Mac";
        }

        if (value.contains("linux")) {
            return "Linux";
        }

        return "Unknown device";
    }
}
