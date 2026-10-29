// FILE: frontend/src/components/ui/separator.tsx
//
// SYSTEMIC ROLE:
//   Visual and semantic divider for Pagez layouts.
//
//   Used by:
//   - Card section separators (P01.5 Card)
//   - Dashboard panel dividers (P02)
//   - Settings form group separators (P04)
//   - Portfolio section dividers (P06)
//   - Booking summary line items (P09)
//   - Analytics table row separators (P15)
//   - Superadmin audit log entries (P16)
//
//   ACCESSIBILITY CONTRACT:
//   - Renders as <hr> for horizontal, or a div with role="separator"
//     for vertical (Radix handles this).
//   - decorative=true (default) sets aria-hidden="true" so screen
//     readers skip it.
//   - decorative=false sets aria-orientation for meaningful separators.
//
//   DESIGN TOKEN CONTRACT:
//   - Border color uses --pagez-border.
//   - Dark mode and tenant overrides are automatic.

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
