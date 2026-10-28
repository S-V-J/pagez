// FILE: frontend/src/design-system/theme.ts
//
// SYSTEMIC ROLE:
//   Theme mode contracts and no-flash dark mode initialization.
//
//   This file provides:
//   - TypeScript helpers for resolving light/dark/system theme mode.
//   - A synchronous initialization script embedded in the root layout.
//   - Storage helpers for future theme toggle components.
//
//   The initialization script runs before React hydration to prevent a flash
//   of incorrect theme. It sets:
//     document.documentElement.classList "dark"
//     document.documentElement.dataset.theme "light" | "dark"
//     document.documentElement.style.colorScheme "light" | "dark"
//
//   CSS dark tokens are defined in:
//     frontend/src/styles/theme-dark.css
//
//   Tailwind dark variant mapping is defined in:
//     frontend/src/styles/theme-base.css

import { THEME_STORAGE_KEY, isThemeMode, type ThemeMode } from "./tokens";

export type ResolvedThemeMode = Exclude<ThemeMode, "system">;

export interface ThemeDocumentAttributes {
  className?: string;
  dataset: {
    theme: ResolvedThemeMode;
  };
  style: {
    colorScheme: ResolvedThemeMode;
  };
}

export function resolveThemeMode(
  mode: ThemeMode,
  prefersDark: boolean,
): ResolvedThemeMode {
  if (mode === "system") {
    return prefersDark ? "dark" : "light";
  }

  return mode;
}

export function getThemeDocumentAttributes(
  mode: ThemeMode,
  prefersDark: boolean,
): ThemeDocumentAttributes {
  const resolved = resolveThemeMode(mode, prefersDark);

  return {
    className: resolved === "dark" ? "dark" : undefined,
    dataset: {
      theme: resolved,
    },
    style: {
      colorScheme: resolved,
    },
  };
}

export function readStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(value) ? value : "system";
  } catch {
    return "system";
  }
}

export function writeStoredThemeMode(mode: ThemeMode): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    return;
  }
}

export const THEME_INIT_SCRIPT = `(function () {
  try {
    var storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
    var stored = window.localStorage.getItem(storageKey);
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var resolved;

    if (stored === "dark") {
      resolved = "dark";
    } else if (stored === "light") {
      resolved = "light";
    } else {
      resolved = prefersDark ? "dark" : "light";
    }

    var root = document.documentElement;
    root.classList.toggle("dark", resolved === "dark");
    root.setAttribute("data-theme", resolved);
    root.style.colorScheme = resolved;
  } catch (error) {
    var fallbackRoot = document.documentElement;
    fallbackRoot.setAttribute("data-theme", "light");
  }
})();`;
