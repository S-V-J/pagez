'use client';

// FILE: frontend/src/components/showcase/showcase-theme-toggle.tsx
//
// SYSTEMIC ROLE:
//   Theme cycling control for the Pagez design-system showcase.
//
//   Responsibilities:
//   - Read stored Pagez theme mode after mount.
//   - Cycle light -> dark -> system -> light.
//   - Apply theme attributes to document.documentElement.
//   - Persist preference using the Pagez theme storage key.
//
//   HYDRATION SAFETY:
//   The component renders a disabled placeholder until mounted. This avoids
//   server/client mismatch because localStorage and matchMedia are browser-only
//   APIs.

import * as React from "react";

import { Button } from "@/components/ui";
import { readStoredThemeMode, writeStoredThemeMode } from "@/design-system/theme";
import type { ThemeMode } from "@/design-system/tokens";

function applyThemeMode(mode: ThemeMode): void {
  if (typeof window === "undefined") {
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "system" ? (prefersDark ? "dark" : "light") : mode;
  const root = document.documentElement;

  root.classList.toggle("dark", resolved === "dark");
  root.setAttribute("data-theme", resolved);
  root.style.setProperty("color-scheme", resolved);

  writeStoredThemeMode(mode);
}

export function ShowcaseThemeToggle() {
  const [mode, setMode] = React.useState<ThemeMode>("system");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMode(readStoredThemeMode());
    setMounted(true);
  }, []);

  const cycleMode = React.useCallback(() => {
    const nextMode: ThemeMode =
      mode === "light" ? "dark" : mode === "dark" ? "system" : "light";

    setMode(nextMode);
    applyThemeMode(nextMode);
  }, [mode]);

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled
        aria-label="Loading theme preference"
      >
        Theme
      </Button>
    );
  }

  const label = mode === "light" ? "Light" : mode === "dark" ? "Dark" : "System";

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={cycleMode}
      aria-label={`Theme mode: ${label}. Activate to cycle theme.`}
    >
      {label}
    </Button>
  );
}
