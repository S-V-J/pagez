// FILE: frontend/src/components/ui/button.tsx
//
// SYSTEMIC ROLE:
//   Primary interactive action component for Pagez.
//
//   Used by:
//   - Public portfolio CTAs (P06)
//   - Booking confirm buttons (P09)
//   - Dashboard forms (P02)
//   - Superadmin controls (P16)
//   - Auth flows (P04)
//   - Payment/billing actions (P10, P11)
//
//   ACCESSIBILITY CONTRACT:
//   - Renders as <button> by default.
//   - Supports asChild via @radix-ui/react-slot to render as <a>, <Link>,
//     or any focusable element while preserving button styling.
//   - Focus-visible ring uses --pagez-ring token.
//   - Disabled state sets aria-disabled and pointer-events-none.
//   - Icon-only buttons require aria-label or visually-hidden text.
//
//   DESIGN TOKEN CONTRACT:
//   - All colors reference semantic tokens (bg-primary, text-primary-foreground,
//     bg-destructive, border-input, bg-accent, etc.).
//   - All radii reference --pagez-radius-* tokens via rounded-md/lg.
//   - All shadows reference --pagez-shadow-* tokens.
//   - Dark mode is automatic through token overrides in theme-dark.css.
//   - Tenant overrides are automatic through --tenant-* CSS variables
//     consumed by design-tokens.css.
//
//   VARIANT SYSTEM:
//   - variant: default | secondary | destructive | outline | ghost | link
//   - size: default | sm | lg | icon
//   - Managed by class-variance-authority (cva) for type safety.

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,border-color,box-shadow,opacity] duration-(--pagez-duration-fast) ease-(--pagez-ease-out) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-(--pagez-shadow-sm) hover:bg-primary/90 active:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground shadow-(--pagez-shadow-xs) hover:bg-secondary/80 active:bg-secondary/70",
        destructive:
          "bg-destructive text-destructive-foreground shadow-(--pagez-shadow-sm) hover:bg-destructive/90 active:bg-destructive/80",
        outline:
          "border border-input bg-background shadow-(--pagez-shadow-2xs) hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link:
          "text-primary underline-offset-4 hover:underline active:text-primary/80",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "default"}
      data-size={size ?? "default"}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
