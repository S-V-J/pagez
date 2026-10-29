// FILE: frontend/src/components/ui/empty-state.tsx
//
// SYSTEMIC ROLE:
//   Empty/zero-state display component for Pagez.
//
//   Used by:
//   - No bookings yet (P09)
//   - No portfolio items (P06)
//   - No links added (P07)
//   - No services listed (P08)
//   - No analytics data (P15)
//   - No ad campaigns (P12)
//   - No search results (P02, P16)
//   - No notifications (future)
//
//   COMPOSITION:
//   EmptyState > EmptyStateIcon + EmptyStateTitle + EmptyStateDescription + EmptyStateAction
//
//   ACCESSIBILITY CONTRACT:
//   - Title renders as <h3> for document outline.
//   - Description renders as <p>.
//   - Action area accepts children (typically a Button).
//   - Icon is decorative (aria-hidden) unless it conveys meaning.
//
//   DESIGN TOKEN CONTRACT:
//   - Title uses --pagez-foreground.
//   - Description uses --pagez-muted-foreground.
//   - Icon container uses --pagez-muted background.
//   - Centered layout with consistent spacing.
//   - Dark mode and tenant overrides are automatic.

import type * as React from "react";

import { cn } from "@/lib/utils";

function EmptyState({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-8 text-center animate-in fade-in-50",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-icon"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full bg-muted [&_svg]:size-5 [&_svg]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="empty-state-title"
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  );
}

function EmptyStateDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn("text-sm text-muted-foreground max-w-xs", className)}
      {...props}
    />
  );
}

function EmptyStateAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-action"
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
      {...props}
    />
  );
}

export {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
};
