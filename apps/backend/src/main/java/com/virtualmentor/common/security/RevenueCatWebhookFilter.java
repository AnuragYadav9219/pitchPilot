package com.virtualmentor.common.security;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.virtualmentor.config.properties.RevenueCatProperties;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RevenueCatWebhookFilter extends OncePerRequestFilter {

    private static final String WEBHOOK_PATH = "/api/webhooks/revenuecat";

    private final RevenueCatProperties properties;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
                
                if (!WEBHOOK_PATH.equals(request.getRequestURI())) {
                    filterChain.doFilter(request, response);

                    return;
                }

                String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

                String expected = "Bearer " + properties.webhookSecret();

                if (!expected.equals(authorization)) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }

                filterChain.doFilter(request, response);
    }

}
