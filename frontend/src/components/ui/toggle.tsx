'use client';

// FILE: frontend/src/components/ui/toggle.tsx
//
// SYSTEMIC ROLE:
//   Two-state toggle button for Pagez toolbars and option rows.
//
//   Used by:
//   - Rich text/editor toolbars (P06)
//   - Analytics chart controls (P15)
//   - Dashboard view switches (P02)
//   - Filter chips (P08, P16)
//   - Booking calendar controls (P09)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-toggle.
//   - Exposes pressed state through data-state and aria-pressed.
//   - Must have accessible text or aria-label.
//
//   DESIGN TOKEN CONTRACT:
//   - Uses semantic token utilities.
//   - Supports dark mode and tenant overrides automatically.

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-[color,background-color,border-color,box-shadow] duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-[var(--pagez-shadow-2xs)] hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 min-w-9 px-2.5',
        sm: 'h-8 min-w-8 px-2',
        lg: 'h-10 min-w-10 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      data-variant={variant ?? 'default'}
      data-size={size ?? 'default'}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
export type { VariantProps as ToggleVariantProps };
