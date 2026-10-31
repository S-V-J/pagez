// FILE: frontend/src/components/ui/badge.tsx
//
// SYSTEMIC ROLE:
//   Compact status/label indicator for Pagez.
//
//   Used by:
//   - Tier badges (free, pro, enterprise) (P11)
//   - Booking status (confirmed, pending, cancelled) (P09)
//   - Payment status (paid, refunded, failed) (P10)
//   - Ad campaign status (active, paused, expired) (P12)
//   - Analytics metric labels (P15)
//   - Tenant verification badges (P02)
//   - Service catalog tags (P08)
//   - Portfolio skill/interest tags (P06)
//
//   ACCESSIBILITY CONTRACT:
//   - Renders as <span> by default.
//   - When used as a link (asChild), inherits anchor semantics.
//   - Color contrast must meet WCAG AA. The token system ensures this
//     through foreground/background pairings.
//   - Screen readers should announce the badge text. No additional
//     ARIA role is needed for <span> content.
//
//   DESIGN TOKEN CONTRACT:
//   - variant: default | secondary | destructive | outline | accent | success | warning | info
//   - All colors reference semantic tokens.
//   - Radius uses --pagez-radius-full through rounded-full.
//   - Dark mode and tenant overrides are automatic.
//
//   RECOVERY NOTE (P01-R3):
//   Adds the accent variant so the design-system showcase can demonstrate
//   tenant accent branding through semantic tokens instead of hardcoded
//   palette utilities. The accent token already exists in the Pagez token
//   contract and is already mapped by Tailwind v4 through theme-base.css.

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none gap-1 transition-[color,background-color,border-color] duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        accent:
          "border-transparent bg-accent text-accent-foreground [a&]:hover:bg-accent/90",
        success:
          "border-transparent bg-success text-success-foreground [a&]:hover:bg-success/90",
        warning:
          "border-transparent bg-warning text-warning-foreground [a&]:hover:bg-warning/90",
        info:
          "border-transparent bg-info text-info-foreground [a&]:hover:bg-info/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant ?? "default"}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
