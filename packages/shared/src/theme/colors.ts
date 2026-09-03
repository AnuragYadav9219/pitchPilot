export const LightColors = {
    // ─── Backgrounds ──────────────────────────────────────────
    background: "#FFF9F2",
    backgroundAlt: "#FFF3E8",

    surface: "#FFFFFF",
    surface2: "#FFF7EF",
    surface3: "#FCEBDD",
    surfaceSolid: "#FFFFFF",

    // ─── Borders ──────────────────────────────────────────────
    border: "rgba(68, 38, 28, 0.09)",
    borderStrong: "rgba(68, 38, 28, 0.16)",

    // ─── Brand ────────────────────────────────────────────────
    primary: "#F06449",
    primaryPressed: "#D94D35",

    // Warm supporting colors
    coral: "#F06449",
    orange: "#F97316",
    peach: "#FB923C",
    terracotta: "#C2412D",

    // ─── Secondary / Accent ──────────────────────────────────
    secondary: "#C2412D",
    accent: "#F59E0B",

    // ─── Brand gradient ──────────────────────────────────────
    gradientStart: "#F97316",
    gradientMiddle: "#F06449",
    gradientEnd: "#C2412D",

    // ─── Glows ────────────────────────────────────────────────
    glowCoral: "rgba(240, 100, 73, 0.18)",
    glowOrange: "rgba(249, 115, 22, 0.16)",
    glowPeach: "rgba(251, 146, 60, 0.14)",
    glowAmber: "rgba(245, 158, 11, 0.13)",

    // ─── Typography ──────────────────────────────────────────
    text: "#241A17",
    textSecondary: "#4A332B",
    muted: "#806D64",
    placeholder: "#A8968C",

    // ─── Semantic ────────────────────────────────────────────
    success: "#15803D",
    warning: "#B45309",
    danger: "#C2412D",
    info: "#C2412D",

    white: "#FFFFFF",
    black: "#000000",

    // ─── Transparent ────────────────────────────────────────────
    transparent: "transparent",
} as const;


export const DarkColors = {
    // ─── Backgrounds ──────────────────────────────────────────
    background: "#17100D",
    backgroundAlt: "#211512",

    surface: "rgba(255, 249, 242, 0.055)",
    surface2: "rgba(255, 249, 242, 0.08)",
    surface3: "rgba(255, 249, 242, 0.12)",
    surfaceSolid: "#241815",

    // ─── Borders ──────────────────────────────────────────────
    border: "rgba(255, 226, 210, 0.10)",
    borderStrong: "rgba(255, 226, 210, 0.18)",

    // ─── Brand ────────────────────────────────────────────────
    primary: "#FF765C",
    primaryPressed: "#F45B43",

    coral: "#FF765C",
    orange: "#FB923C",
    peach: "#FDBA74",
    terracotta: "#E05A43",

    // ─── Secondary / Accent ──────────────────────────────────
    secondary: "#E05A43",
    accent: "#FBBF24",

    // ─── Brand gradient ──────────────────────────────────────
    gradientStart: "#FB923C",
    gradientMiddle: "#FF765C",
    gradientEnd: "#E05A43",

    // ─── Glows ────────────────────────────────────────────────
    glowCoral: "rgba(255, 118, 92, 0.28)",
    glowOrange: "rgba(251, 146, 60, 0.24)",
    glowPeach: "rgba(253, 186, 116, 0.18)",
    glowAmber: "rgba(251, 191, 36, 0.18)",

    // ─── Typography ──────────────────────────────────────────
    text: "#FFF9F2",
    textSecondary: "#F3DED3",
    muted: "#C4AAA0",
    placeholder: "#927970",

    // ─── Semantic ────────────────────────────────────────────
    success: "#4ADE80",
    warning: "#FBBF24",
    danger: "#FF765C",
    info: "#FDBA74",

    white: "#FFFFFF",
    black: "#000000",
    
    // ─── Transparent ────────────────────────────────────────────
    transparent: "transparent",
} as const;


export type ThemeMode = "light" | "dark";

export type ThemeColors =
    | typeof LightColors
    | typeof DarkColors;

export const Colors = {
    light: LightColors,
    dark: DarkColors,
} as const;