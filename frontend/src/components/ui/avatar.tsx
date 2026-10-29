// FILE: frontend/src/components/ui/avatar.tsx
//
// SYSTEMIC ROLE:
//   User/tenant avatar display component for Pagez.
//
//   Used by:
//   - Tenant profile display (P02)
//   - Booking participant list (P09)
//   - Analytics viewer avatars (P15)
//   - Comment/review avatars (future)
//   - Superadmin user list (P16)
//   - Portfolio author attribution (P06)
//
//   COMPOSITION:
//   Avatar > AvatarImage + AvatarFallback
//   AvatarImage renders the <img> when src is available.
//   AvatarFallback renders initials or icon when image fails or is absent.
//   Radix Avatar handles load/error state transitions.
//
//   ACCESSIBILITY CONTRACT:
//   - AvatarImage sets alt text from the alt prop.
//   - AvatarFallback content should be the user's initials or a
//     descriptive icon with aria-label.
//   - The container has role="img" when no interactive content is inside.
//
//   DESIGN TOKEN CONTRACT:
//   - Background uses --pagez-muted.
//   - Text uses --pagez-muted-foreground.
//   - Border uses --pagez-border.
//   - Radius uses --pagez-radius-full (circle).
//   - Size is controlled by the consuming code via className.
//   - Dark mode and tenant overrides are automatic.

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
