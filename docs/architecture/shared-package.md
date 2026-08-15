# Shared Package

## Purpose

The shared package provides common definitions used by multiple clients.

Potential shared resources include:

- Types
- Constants
- Scenario definitions
- Validation schemas
- Configuration contracts
- API models

## Principle

The shared package should contain reusable, platform-independent logic.

Platform-specific code should remain inside the web or mobile application.

## Benefit

             Shared
            /      \
           v        v
         Web      Mobile


This reduces duplication and helps keep client behavior consistent.
