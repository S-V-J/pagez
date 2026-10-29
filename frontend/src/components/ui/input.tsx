// FILE: frontend/src/components/ui/input.tsx
//
// SYSTEMIC ROLE:
//   Single-line text input component for Pagez forms.
//
//   Used by:
//   - Auth flows: email, password, OTP (P04)
//   - Booking forms: name, email, phone, notes (P09)
//   - Portfolio builder: title, slug, URL fields (P06)
//   - Service catalog: name, description, price (P08)
//   - Link aggregator: URL, label (P07)
//   - Dashboard search and filter inputs (P02)
//   - Superadmin tenant search (P16)
//   - Analytics date/period filters (P15)
//
//   ACCESSIBILITY CONTRACT:
//   - Renders as native <input>.
//   - Must be paired with <Label htmlFor="..."> for screen reader association.
//   - Focus-visible ring uses --pagez-ring token.
//   - Disabled and aria-disabled states reduce opacity and block pointer events.
//   - Placeholder text must not be the only label.
//   - type="file" is supported but FileUploader component (P01.5.C) is
//     preferred for drag-and-drop UX.
//
//   DESIGN TOKEN CONTRACT:
//   - Border uses --pagez-border / --pagez-input.
//   - Background uses --pagez-background.
//   - Text uses --pagez-foreground.
//   - Placeholder uses --pagez-muted-foreground.
//   - Focus ring uses --pagez-ring.
//   - Radius uses --pagez-radius-md.
//   - Dark mode and tenant overrides are automatic.
//
//   TYPE CONFLICT RESOLUTION (P01.5.A.R1):
//   The native HTML <input> element has a "size" attribute typed as
//   "number | undefined" (visible character width). This component defines
//   a custom "size" prop typed as "default" | "sm" | "lg" for visual sizing.
//
//   To avoid TypeScript error TS2430 ("Interface incorrectly extends"),
//   we use Omit<React.ComponentProps<"input">, "size"> to exclude the
//   native size attribute from the base type, then declare our custom
//   size prop cleanly. This is the standard React pattern for overriding
//   a native attribute with an incompatible type.
//
//   If a consumer genuinely needs the native HTML size attribute, they
//   can pass it through the "htmlSize" prop, which is forwarded to the
//   DOM as "size". This preserves both capabilities without type conflict.

import type * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  /**
   * Visual size preset.
   * - "default": h-9, text-sm (standard form input)
   * - "sm": h-8, text-xs (compact toolbar/filter inputs)
   * - "lg": h-10, text-base (hero search, prominent CTAs)
   */
  size?: "default" | "sm" | "lg";

  /**
   * Native HTML input "size" attribute (visible character width).
   * Forwarded to the DOM as "size". Omitted from the base type to
   * avoid conflict with the visual "size" prop above.
   */
  htmlSize?: number;
}

function Input({
  className,
  type,
  size = "default",
  htmlSize,
  ...props
}: InputProps) {
  const sizeClasses: Record<string, string> = {
    default: "h-9 px-3 py-1 text-sm",
    sm: "h-8 px-2.5 py-0.5 text-xs",
    lg: "h-10 px-4 py-2 text-base",
  };

  return (
    <input
      type={type}
      size={htmlSize}
      data-slot="input"
      data-size={size}
      className={cn(
        "flex w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-(--pagez-shadow-2xs) transition-[color,background-color,border-color,box-shadow] duration-(--pagez-duration-fast) ease-(--pagez-ease-out) outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

export { Input };
export type { InputProps };
