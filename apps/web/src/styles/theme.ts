import {
    Animation,
    Colors,
    Radius,
    Spacing,
    Typography,
    type ThemeMode,
} from "@virtualmentor/shared";

export function applyTheme(mode: ThemeMode) {
    const root = document.documentElement;
    const colors = Colors[mode];

    root.dataset.theme = mode;

    /* ─────────────────────────────────────────────
       Backgrounds
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-background",
        colors.background,
    );

    root.style.setProperty(
        "--vm-background-alt",
        colors.backgroundAlt,
    );

    root.style.setProperty(
        "--vm-surface",
        colors.surface,
    );

    root.style.setProperty(
        "--vm-surface-2",
        colors.surface2,
    );

    root.style.setProperty(
        "--vm-surface-3",
        colors.surface3,
    );

    root.style.setProperty(
        "--vm-surface-solid",
        colors.surfaceSolid,
    );

    /* ─────────────────────────────────────────────
       Borders
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-border",
        colors.border,
    );

    root.style.setProperty(
        "--vm-border-strong",
        colors.borderStrong,
    );

    /* ─────────────────────────────────────────────
       Brand colors
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-primary",
        colors.primary,
    );

    root.style.setProperty(
        "--vm-primary-pressed",
        colors.primaryPressed,
    );

    root.style.setProperty(
        "--vm-coral",
        colors.coral,
    );

    root.style.setProperty(
        "--vm-orange",
        colors.orange,
    );

    root.style.setProperty(
        "--vm-peach",
        colors.peach,
    );

    root.style.setProperty(
        "--vm-terracotta",
        colors.terracotta,
    );

    /* ─────────────────────────────────────────────
       Supporting colors
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-secondary",
        colors.secondary,
    );

    root.style.setProperty(
        "--vm-accent",
        colors.accent,
    );

    /* ─────────────────────────────────────────────
       Brand gradients
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-gradient-start",
        colors.gradientStart,
    );

    root.style.setProperty(
        "--vm-gradient-middle",
        colors.gradientMiddle,
    );

    root.style.setProperty(
        "--vm-gradient-end",
        colors.gradientEnd,
    );

    /* ─────────────────────────────────────────────
       Brand glows
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-glow-coral",
        colors.glowCoral,
    );

    root.style.setProperty(
        "--vm-glow-orange",
        colors.glowOrange,
    );

    root.style.setProperty(
        "--vm-glow-peach",
        colors.glowPeach,
    );

    root.style.setProperty(
        "--vm-glow-amber",
        colors.glowAmber,
    );

    /* ─────────────────────────────────────────────
       Typography colors
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-text",
        colors.text,
    );

    root.style.setProperty(
        "--vm-text-secondary",
        colors.textSecondary,
    );

    root.style.setProperty(
        "--vm-muted",
        colors.muted,
    );

    root.style.setProperty(
        "--vm-placeholder",
        colors.placeholder,
    );

    /* ─────────────────────────────────────────────
       Semantic colors
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-success",
        colors.success,
    );

    root.style.setProperty(
        "--vm-warning",
        colors.warning,
    );

    root.style.setProperty(
        "--vm-danger",
        colors.danger,
    );

    root.style.setProperty(
        "--vm-info",
        colors.info,
    );

    root.style.setProperty(
        "--vm-white",
        colors.white,
    );

    root.style.setProperty(
        "--vm-black",
        colors.black,
    );

    /* ─────────────────────────────────────────────
       Transparent
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-transparent",
        colors.transparent,
    );

    /* ─────────────────────────────────────────────
       Spacing
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-space-xs",
        `${Spacing.xs}px`,
    );

    root.style.setProperty(
        "--vm-space-sm",
        `${Spacing.sm}px`,
    );

    root.style.setProperty(
        "--vm-space-md",
        `${Spacing.md}px`,
    );

    root.style.setProperty(
        "--vm-space-lg",
        `${Spacing.lg}px`,
    );

    root.style.setProperty(
        "--vm-space-xl",
        `${Spacing.xl}px`,
    );

    root.style.setProperty(
        "--vm-space-xxl",
        `${Spacing.xxl}px`,
    );

    /* ─────────────────────────────────────────────
       Radius
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-radius-sm",
        `${Radius.sm}px`,
    );

    root.style.setProperty(
        "--vm-radius-md",
        `${Radius.md}px`,
    );

    root.style.setProperty(
        "--vm-radius-lg",
        `${Radius.lg}px`,
    );

    root.style.setProperty(
        "--vm-radius-xl",
        `${Radius.xl}px`,
    );

    root.style.setProperty(
        "--vm-radius-full",
        `${Radius.full}px`,
    );

    /* ─────────────────────────────────────────────
       Typography
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-font-hero",
        `${Typography.hero}px`,
    );

    root.style.setProperty(
        "--vm-font-h1",
        `${Typography.h1}px`,
    );

    root.style.setProperty(
        "--vm-font-h2",
        `${Typography.h2}px`,
    );

    root.style.setProperty(
        "--vm-font-h3",
        `${Typography.h3}px`,
    );

    root.style.setProperty(
        "--vm-font-body",
        `${Typography.body}px`,
    );

    root.style.setProperty(
        "--vm-font-small",
        `${Typography.small}px`,
    );

    root.style.setProperty(
        "--vm-font-tiny",
        `${Typography.tiny}px`,
    );

    /* ─────────────────────────────────────────────
       Animation
    ───────────────────────────────────────────── */

    root.style.setProperty(
        "--vm-animation-fast",
        `${Animation.fast}ms`,
    );

    root.style.setProperty(
        "--vm-animation-normal",
        `${Animation.normal}ms`,
    );

    root.style.setProperty(
        "--vm-animation-slow",
        `${Animation.slow}ms`,
    );

    /* ─────────────────────────────────────────────
       Browser native theme
    ───────────────────────────────────────────── */

    root.style.colorScheme = mode;
}