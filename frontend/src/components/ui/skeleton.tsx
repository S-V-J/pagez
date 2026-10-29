// FILE: frontend/src/components/ui/skeleton.tsx
//
// SYSTEMIC ROLE:
//   Loading placeholder component for Pagez.
//
//   Used by:
//   - Dashboard data loading states (P02)
//   - Portfolio content loading (P06)
//   - Booking availability loading (P09)
//   - Analytics chart loading (P15)
//   - List/table row loading (P08, P16)
//   - Avatar/image loading (P02, P06)
//
//   ACCESSIBILITY CONTRACT:
//   - Renders as a div with aria-hidden="true" by default because it is
//     a visual placeholder, not content.
//   - The consuming code should provide a visually-hidden "Loading..."
//     text or use aria-busy on the parent container.
//   - Animation respects prefers-reduced-motion via the global rule in
//     theme-base.css.
//
//   DESIGN TOKEN CONTRACT:
//   - Background uses --pagez-muted.
//   - Pulse animation uses opacity transition.
//   - Radius is inherited from the consuming code.
//   - Dark mode and tenant overrides are automatic.

import type * as React from "react";

import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "bg-muted animate-pulse rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
