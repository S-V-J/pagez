'use client';

// FILE: frontend/src/components/showcase/showcase-theme-toggle.tsx
//
// SYSTEMIC ROLE:
//   Theme cycling control for the Pagez design-system showcase.
//
//   Responsibilities:
//   - Read the stored Pagez theme mode from the browser after hydration.
//   - Cycle light -> dark -> system -> light.
//   - Apply theme attributes to document.documentElement.
//   - Persist preference using the Pagez theme storage key.
//   - Keep SSR/hydration safe by never reading browser storage on the server.
//
//   HYDRATION SAFETY:
//   This component uses React.useSyncExternalStore instead of effect-based
//   state initialization. The server snapshot is always "system". The client
//   snapshot reads the stored theme from browser storage through the validated
//   Pagez theme helper. This avoids SSR/browser mismatch and avoids the
//   react-hooks/set-state-in-effect lint error.
//
//   REPAIR NOTES (P01.6.R2):
//   1. Removed effect-based state initialization.
//   2. Removed transient mounted state variable.
//   3. Removed synchronous state updates during effect execution.
//   4. Added external subscription through useSyncExternalStore.
//   5. Added cross-tab storage synchronization through the storage event.
//   6. Theme DOM application now happens only in the explicit user click
//      handler, not during render and not during effect execution.

import * as React from "react";

import { Button } from "@/components/ui";
import {
  THEME_STORAGE_KEY,
  readStoredThemeMode,
  writeStoredThemeMode,
} from "@/design-system/theme";
import type { ThemeMode } from "@/design-system/tokens";

type ThemeListener = () => void;

const themeListeners = new Set<ThemeListener>();

let cachedThemeMode: ThemeMode | null = null;

function applyThemeMode(mode: ThemeMode): void {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "system" ? (prefersDark ? "dark" : "light") : mode;
  const root = document.documentElement;

  root.classList.toggle("dark", resolved === "dark");
  root.setAttribute("data-theme", resolved);
  root.style.setProperty("color-scheme", resolved);
}

function getThemeSnapshot(): ThemeMode {
  if (cachedThemeMode === null) {
    cachedThemeMode = readStoredThemeMode();
  }

  return cachedThemeMode;
}

function getThemeServerSnapshot(): ThemeMode {
  return "system";
}

function emitThemeChange(): void {
  const listeners = Array.from(themeListeners);

  listeners.forEach((listener) => {
    listener();
  });
}

function subscribeThemeMode(listener: ThemeListener): () => void {
  themeListeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      themeListeners.delete(listener);
    };
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      cachedThemeMode = null;
      listener();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    themeListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function setThemeMode(mode: ThemeMode): void {
  cachedThemeMode = mode;
  applyThemeMode(mode);
  writeStoredThemeMode(mode);
  emitThemeChange();
}

export function ShowcaseThemeToggle() {
  const mode = React.useSyncExternalStore(
    subscribeThemeMode,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  const label = mode === "light" ? "Light" : mode === "dark" ? "Dark" : "System";

  const cycleMode = () => {
    const nextMode: ThemeMode =
      mode === "light" ? "dark" : mode === "dark" ? "system" : "light";

    setThemeMode(nextMode);
  };

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
