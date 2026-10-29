// FILE: frontend/src/components/ui/textarea.tsx
//
// SYSTEMIC ROLE:
//   Multi-line text input component for Pagez forms.
//
//   Used by:
//   - Portfolio bio and description fields (P06)
//   - Booking notes and special requests (P09)
//   - Service catalog descriptions (P08)
//   - Link aggregator descriptions (P07)
//   - Superadmin notes and audit comments (P16)
//   - Analytics report annotations (P15)
//
//   ACCESSIBILITY CONTRACT:
//   - Renders as native <textarea>.
//   - Must be paired with <Label htmlFor="...">.
//   - Focus-visible ring uses --pagez-ring.
//   - Resize is vertical by default to prevent layout breakage.
//   - Disabled and aria-disabled states are visually distinct.
//
//   DESIGN TOKEN CONTRACT:
//   - Same token contract as Input.
//   - Minimum height ensures usability on touch devices.

import type * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  size?: "default" | "sm" | "lg";
}

function Textarea({ className, size = "default", ...props }: TextareaProps) {
  const sizeClasses: Record<string, string> = {
    default: "min-h-16 text-sm",
    sm: "min-h-12 text-xs",
    lg: "min-h-24 text-base",
  };

  return (
    <textarea
      data-slot="textarea"
      data-size={size}
      className={cn(
        "flex w-full min-w-0 field-sizing-content rounded-md border border-input bg-background px-3 py-2 text-sm shadow-(--pagez-shadow-2xs) transition-[color,background-color,border-color,box-shadow] duration-(--pagez-duration-fast) ease-(--pagez-ease-out) outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 resize-y selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
export type { TextareaProps };
