// FILE: frontend/src/components/ui/card.tsx
//
// SYSTEMIC ROLE:
//   Surface container component for Pagez.
//
//   Used by:
//   - Portfolio project cards (P06)
//   - Service catalog items (P08)
//   - Booking summary cards (P09)
//   - Analytics metric cards (P15)
//   - Dashboard widget containers (P02)
//   - Auth form containers (P04)
//   - Pricing/tier cards (P11)
//   - Ad placement containers (P12)
//   - Link aggregator group cards (P07)
//
//   COMPOSITION:
//   Card is a compound component:
//     Card > CardHeader > CardTitle + CardDescription
//     Card > CardContent
//     Card > CardFooter
//
//   Each sub-component is a simple div with semantic class names.
//   CardHeader uses flex-col for vertical stacking.
//   CardFooter uses flex for horizontal action layout.
//
//   ACCESSIBILITY CONTRACT:
//   - CardTitle renders as <h3> by default for document outline.
//   - CardDescription renders as <p>.
//   - If Card is used as a clickable container, the consuming code must
//     add role="link" or wrap content in <a>/<Link> with asChild.
//
//   DESIGN TOKEN CONTRACT:
//   - Background uses --pagez-card.
//   - Text uses --pagez-card-foreground.
//   - Border uses --pagez-border.
//   - Shadow uses --pagez-shadow-sm.
//   - Radius uses --pagez-radius-lg.
//   - Dark mode and tenant overrides are automatic.

import type * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-lg border py-6 shadow-(--pagez-shadow-sm)",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
