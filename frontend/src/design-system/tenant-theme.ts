// FILE: frontend/src/design-system/tenant-theme.ts
//
// SYSTEMIC ROLE:
//   Typed contract and sanitizer for tenant theme overrides.
//
//   Tenant themes are branding records owned by a tenant. They may eventually
//   come from:
//   - P06 portfolio builder theme settings
//   - P02 tenant shell resolution
//   - P16 superadmin tenant theme controls
//
//   This module converts a controlled TenantTheme object into CSS custom
//   properties that can be applied to an HTML element through the style
//   attribute.
//
//   SECURITY NOTE:
//   Tenant theme values may originate from database-backed user input.
//   Therefore this module validates and sanitizes values before producing CSS
//   variables. It deliberately rejects unsafe characters such as semicolons,
//   braces, angle brackets, and arbitrary URL values.
//
//   USAGE:
//     import { tenantThemeToCssVariables } from "@/design-system/tenant-theme";
//
//     const style = tenantThemeToCssVariables({
//       primary: "oklch(55% 0.2 264)",
//       radius: "lg",
//       fontSans: "Inter",
//     }) as React.CSSProperties;
//
//     <div style={style}>...</div>

import { isThemeMode, type ThemeMode } from "./tokens";

export interface TenantTheme {
  background?: string;
  foreground?: string;

  card?: string;
  cardForeground?: string;

  popover?: string;
  popoverForeground?: string;

  primary?: string;
  primaryForeground?: string;

  secondary?: string;
  secondaryForeground?: string;

  muted?: string;
  mutedForeground?: string;

  accent?: string;
  accentForeground?: string;

  destructive?: string;
  destructiveForeground?: string;

  success?: string;
  successForeground?: string;

  warning?: string;
  warningForeground?: string;

  info?: string;
  infoForeground?: string;

  border?: string;
  input?: string;
  ring?: string;

  overlay?: string;
  scrim?: string;

  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;

  radius?: string;
  fontSans?: string;
  fontMono?: string;
  fontDisplay?: string;
  spacing?: string;

  colorScheme?: ThemeMode;
}

export const tenantThemeCssVariableMap: Record<keyof TenantTheme, string> = {
  background: "--tenant-background",
  foreground: "--tenant-foreground",

  card: "--tenant-card",
  cardForeground: "--tenant-card-foreground",

  popover: "--tenant-popover",
  popoverForeground: "--tenant-popover-foreground",

  primary: "--tenant-primary",
  primaryForeground: "--tenant-primary-foreground",

  secondary: "--tenant-secondary",
  secondaryForeground: "--tenant-secondary-foreground",

  muted: "--tenant-muted",
  mutedForeground: "--tenant-muted-foreground",

  accent: "--tenant-accent",
  accentForeground: "--tenant-accent-foreground",

  destructive: "--tenant-destructive",
  destructiveForeground: "--tenant-destructive-foreground",

  success: "--tenant-success",
  successForeground: "--tenant-success-foreground",

  warning: "--tenant-warning",
  warningForeground: "--tenant-warning-foreground",

  info: "--tenant-info",
  infoForeground: "--tenant-info-foreground",

  border: "--tenant-border",
  input: "--tenant-input",
  ring: "--tenant-ring",

  overlay: "--tenant-overlay",
  scrim: "--tenant-scrim",

  chart1: "--tenant-chart-1",
  chart2: "--tenant-chart-2",
  chart3: "--tenant-chart-3",
  chart4: "--tenant-chart-4",
  chart5: "--tenant-chart-5",

  radius: "--tenant-radius",
  fontSans: "--tenant-font-sans",
  fontMono: "--tenant-font-mono",
  fontDisplay: "--tenant-font-display",
  spacing: "--tenant-spacing",

  colorScheme: "--tenant-color-scheme",
};

const SAFE_VALUE_MAX_LENGTH = 200;

const COLOR_KEYS = new Set<keyof TenantTheme>([
  "background",
  "foreground",
  "card",
  "cardForeground",
  "popover",
  "popoverForeground",
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "muted",
  "mutedForeground",
  "accent",
  "accentForeground",
  "destructive",
  "destructiveForeground",
  "success",
  "successForeground",
  "warning",
  "warningForeground",
  "info",
  "infoForeground",
  "border",
  "input",
  "ring",
  "overlay",
  "scrim",
  "chart1",
  "chart2",
  "chart3",
  "chart4",
  "chart5",
]);

const CSS_COLOR_PATTERN =
  /^(?:#[0-9a-fA-F]{3,8}|(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([^;{}<>]*\)|[a-zA-Z]+)$/;

const CSS_LENGTH_PATTERN =
  /^(?:0|(?:[+-]?(?:\d+|\d*\.\d+)(?:px|rem|em|%|ch|ex|lh|rlh|vw|vh|svw|svh|dvw|dvh|lvw|lvh|vmin|vmax)))$/i;

const CSS_CALC_PATTERN = /^calc\([0-9a-z\s+\-*/().,%]+\)$/i;

const FONT_STACK_PATTERN = /^[A-Za-z0-9 ,._-]+$/;

export const TENANT_RADIUS_PRESETS = {
  none: "0",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  "3xl": "2rem",
  full: "9999px",
} as const;

export type TenantRadiusPreset = keyof typeof TENANT_RADIUS_PRESETS;

export function isTenantRadiusPreset(
  value: unknown,
): value is TenantRadiusPreset {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(TENANT_RADIUS_PRESETS, value)
  );
}

function isNonEmptyString(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= SAFE_VALUE_MAX_LENGTH
  );
}

function hasUnsafeCharacters(value: string): boolean {
  return /[;{}<>]/.test(value);
}

export function isValidCssColor(value: unknown): value is string {
  if (!isNonEmptyString(value)) {
    return false;
  }

  const normalized = value.trim();

  return (
    !hasUnsafeCharacters(normalized) && CSS_COLOR_PATTERN.test(normalized)
  );
}

export function isValidCssLength(value: unknown): value is string {
  if (!isNonEmptyString(value)) {
    return false;
  }

  const normalized = value.trim();

  return (
    !hasUnsafeCharacters(normalized) &&
    (CSS_LENGTH_PATTERN.test(normalized) || CSS_CALC_PATTERN.test(normalized))
  );
}

export function isValidFontStack(value: unknown): value is string {
  if (!isNonEmptyString(value)) {
    return false;
  }

  const normalized = value.trim();

  return (
    !hasUnsafeCharacters(normalized) && FONT_STACK_PATTERN.test(normalized)
  );
}

export function resolveTenantRadius(value: unknown): string | undefined {
  if (!isNonEmptyString(value)) {
    return undefined;
  }

  const normalized = value.trim();

  if (isTenantRadiusPreset(normalized)) {
    return TENANT_RADIUS_PRESETS[normalized];
  }

  if (isValidCssLength(normalized)) {
    return normalized;
  }

  return undefined;
}

export function sanitizeFontStack(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function tenantThemeToCssVariables(
  theme: TenantTheme,
): Record<string, string> {
  const variables: Record<string, string> = {};

  const entries = Object.entries(theme) as [keyof TenantTheme, unknown][];

  for (const [key, value] of entries) {
    const cssVariable = tenantThemeCssVariableMap[key];

    if (COLOR_KEYS.has(key)) {
      if (isValidCssColor(value)) {
        variables[cssVariable] = value.trim();
      }
      continue;
    }

    if (key === "radius") {
      const resolvedRadius = resolveTenantRadius(value);

      if (resolvedRadius) {
        variables[cssVariable] = resolvedRadius;
      }

      continue;
    }

    if (key === "fontSans" || key === "fontMono" || key === "fontDisplay") {
      if (isValidFontStack(value)) {
        variables[cssVariable] = sanitizeFontStack(value);
      }

      continue;
    }

    if (key === "spacing") {
      if (isValidCssLength(value)) {
        variables[cssVariable] = value.trim();
      }

      continue;
    }

    if (key === "colorScheme") {
      if (isThemeMode(value)) {
        variables[cssVariable] = value;
      }

      continue;
    }
  }

  return variables;
}

export function tenantThemeToStyle(theme: TenantTheme): Record<string, string> {
  return tenantThemeToCssVariables(theme);
}
