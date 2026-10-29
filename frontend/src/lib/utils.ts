// FILE: frontend/src/lib/utils.ts
//
// SYSTEMIC ROLE:
//   Shared className merging utility for all Pagez UI components.
//
//   Every component in frontend/src/components/ui/ imports { cn } from this
//   file. It combines clsx (conditional class name assembly) with
//   tailwind-merge (deduplication of conflicting Tailwind utilities).
//
//   WHY tailwind-merge IS NECESSARY:
//   Without it, passing className="bg-red-500" to a component that already
//   has "bg-blue-500" in its base classes would produce both classes in the
//   DOM, and CSS specificity order would determine the winner unpredictably.
//   tailwind-merge ensures the last conflicting utility wins, matching
//   developer expectation.
//
//   WHY clsx IS NECESSARY:
//   Components need conditional classes (e.g., disabled state, variant
//   selection). clsx handles falsy values, arrays, and objects cleanly.
//
//   THIS FILE MUST NOT:
//   - Import from @/design-system/* (that would create a circular dependency
//   if design-system helpers ever need cn).
//   - Contain component-specific logic.
//   - Contain token definitions (those live in frontend/src/styles/).

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx for conditional assembly and tailwind-merge
 * for Tailwind-specific deduplication.
 *
 * @param inputs - Any number of clsx-compatible class values (strings,
 * objects, arrays, falsy values).
 * @returns A single merged className string safe for use in JSX.
 *
 * @example
 * cn("px-2 py-1", isActive && "bg-primary text-primary-foreground", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
