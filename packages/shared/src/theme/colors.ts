export const LightColors = {
  background: "#F7F7FA",

  surface: "#FFFFFF",
  surface2: "#F1F1F5",
  surface3: "#E8E8EF",

  border: "rgba(17, 24, 39, 0.08)",
  borderStrong: "rgba(17, 24, 39, 0.14)",

  primary: "#8B5CF6",
  primaryPressed: "#7C3AED",

  secondary: "#059669",
  accent: "#EA580C",

  glowPurple: "rgba(139, 92, 246, 0.18)",
  glowGreen: "rgba(5, 150, 105, 0.14)",
  glowOrange: "rgba(234, 88, 12, 0.12)",

  text: "#111118",
  textSecondary: "#3F3F46",
  muted: "#71717A",

  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",

  white: "#FFFFFF",
} as const;

export const DarkColors = {
  background: "#050505",

  surface: "rgba(255, 255, 255, 0.05)",
  surface2: "rgba(255, 255, 255, 0.08)",
  surface3: "rgba(255, 255, 255, 0.12)",

  border: "rgba(255, 255, 255, 0.10)",
  borderStrong: "rgba(255, 255, 255, 0.18)",

  primary: "#A855F7",
  primaryPressed: "#9333EA",

  secondary: "#10B981",
  accent: "#F97316",

  glowPurple: "rgba(168, 85, 247, 0.35)",
  glowGreen: "rgba(16, 185, 129, 0.30)",
  glowOrange: "rgba(249, 115, 22, 0.28)",

  text: "#FFFFFF",
  textSecondary: "#E4E4E7",
  muted: "#A1A1AA",

  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",

  white: "#FFFFFF",
} as const;

export type ThemeMode = "light" | "dark";

export type ThemeColors =
  | typeof LightColors
  | typeof DarkColors;

export const Colors = {
  light: LightColors,
  dark: DarkColors,
} as const;