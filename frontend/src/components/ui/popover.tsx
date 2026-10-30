'use client';

// FILE: frontend/src/components/ui/popover.tsx
//
// SYSTEMIC ROLE:
//   Popover primitive for Pagez.
//
//   Used by:
//   - Filter panels (P02, P15, P16)
//   - User menus (P02)
//   - Tenant switchers (P02)
//   - Booking date/time pickers (P09)
//   - Portfolio block settings (P06)
//   - Ad placement options (P12)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-popover.
//   - Trigger must be focusable.
//   - Content should contain meaningful interactive or informational content.
//   - Escape closes popover through Radix.
//
//   DESIGN TOKEN CONTRACT:
//   - Content uses --pagez-popover and --pagez-popover-foreground.
//   - Popover z-index token is used.
//   - Supports dark mode and tenant overrides automatically.

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';

function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger(props: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverAnchor(props: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-[var(--pagez-z-popover)] w-72 origin-(--radix-popover-content-transform-origin) rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-[var(--pagez-shadow-md)] outline-none',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
