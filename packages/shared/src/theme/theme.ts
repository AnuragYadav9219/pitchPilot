import { Colors, type ThemeMode } from "./colors";

export type ThemeColors = (typeof Colors)[ThemeMode];

export function getThemeColors(
    mode: ThemeMode,
): ThemeColors {
    return Colors[mode];
}