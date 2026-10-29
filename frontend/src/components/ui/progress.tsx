// FILE: frontend/src/components/ui/progress.tsx
//
// SYSTEMIC ROLE:
//   Determinate progress indicator for Pagez.
//
//   Used by:
//   - Upload progress (P06 media uploads, P01.5.C FileUploader)
//   - Booking confirmation flow steps (P09)
//   - Payment processing status (P10)
//   - Analytics data sync progress (P14, P15)
//   - Tier usage meters (P11)
//   - Superadmin bulk operation progress (P16)
//
//   ACCESSIBILITY CONTRACT:
//   - Renders with role="progressbar".
//   - aria-valuenow, aria-valuemin, aria-valuemax are set by Radix.
//   - aria-label should be provided by the consuming code.
//   - Animation respects prefers-reduced-motion.
//
//   DESIGN TOKEN CONTRACT:
//   - Track background uses --pagez-secondary.
//   - Indicator uses --pagez-primary.
//   - Radius uses --pagez-radius-full.
//   - Height is controlled by the consuming code.
//   - Dark mode and tenant overrides are automatic.

import * as ProgressPrimitive from "@radix-ui/react-progress";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-secondary relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
      value={value}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-transform duration-(--pagez-duration-normal) ease-(--pagez-ease-out)"
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
