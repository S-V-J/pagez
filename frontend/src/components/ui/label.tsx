// FILE: frontend/src/components/ui/label.tsx
//
// SYSTEMIC ROLE:
//   Accessible form label component for Pagez.
//
//   Wraps @radix-ui/react-label to provide:
//   - Consistent styling across all form controls.
//   - Automatic click-to-focus behavior (Radix Label forwards click to
//     the associated control via htmlFor).
//   - Proper <label> semantics for screen readers.
//
//   ACCESSIBILITY CONTRACT:
//   - Must use htmlFor to associate with a form control id.
//   - When the associated control is disabled, the label should also
//     receive aria-disabled or be visually muted.
//   - Required-field indicators (asterisk) should be implemented by the
//     consuming form, not by this component, to avoid duplicating the
//     visual indicator across different form layouts.
//
//   DESIGN TOKEN CONTRACT:
//   - Text color uses --pagez-foreground.
//   - Disabled/muted state uses --pagez-muted-foreground.
//   - Font size and weight are consistent with Input/Textarea labels.

import * as LabelPrimitive from "@radix-ui/react-label";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
