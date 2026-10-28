// FILE: frontend/src/design-system/tokens.ts
//
// SYSTEMIC ROLE:
//   TypeScript contract for Pagez design tokens.
//
//   This file is the typed mirror of frontend/src/styles/design-tokens.css.
//   It gives components, showcase routes, tests, and future admin theme editors
//   a stable list of token names and categories.
//
//   It does not generate CSS.
//   It does not replace the CSS source of truth.
//   It exists so TypeScript code can refer to tokens without hardcoding strings
//   inconsistently.

export const THEME_STORAGE_KEY = "pagez.theme";

export const THEME_MODES = ["light", "dark", "system"] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

export function isThemeMode(value: unknown): value is ThemeMode {
  return (
    typeof value === "string" &&
    (THEME_MODES as readonly string[]).includes(value)
  );
}

export const SEMANTIC_COLOR_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "success",
  "success-foreground",
  "warning",
  "warning-foreground",
  "info",
  "info-foreground",
  "border",
  "input",
  "ring",
  "overlay",
  "scrim",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
] as const;

export type SemanticColorToken = (typeof SEMANTIC_COLOR_TOKENS)[number];

export const RADIUS_TOKENS = [
  "none",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "full",
] as const;

export type RadiusToken = (typeof RADIUS_TOKENS)[number];

export const SHADOW_TOKENS = [
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
] as const;

export type ShadowToken = (typeof SHADOW_TOKENS)[number];

export const BREAKPOINT_TOKENS = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
} as const;

export type BreakpointToken = keyof typeof BREAKPOINT_TOKENS;

export const Z_INDEX_TOKENS = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  overlay: 1030,
  modal: 1040,
  popover: 1050,
  toast: 1060,
  max: 2147483647,
} as const;

export type ZIndexToken = keyof typeof Z_INDEX_TOKENS;

export const MOTION_DURATION_TOKENS = {
  instant: "50ms",
  fast: "150ms",
  normal: "250ms",
  slow: "400ms",
  slower: "700ms",
} as const;

export type MotionDurationToken = keyof typeof MOTION_DURATION_TOKENS;

export const MOTION_EASING_TOKENS = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export type MotionEasingToken = keyof typeof MOTION_EASING_TOKENS;

export const FONT_TOKENS = ["sans", "mono", "display"] as const;

export type FontToken = (typeof FONT_TOKENS)[number];

export function pagezCssVar(name: string): string {
  return `--pagez-${name}`;
}

export function tenantCssVar(name: string): string {
  return `--tenant-${name}`;
}

export function tailwindColorClass(token: SemanticColorToken): string {
  return token;
}
