'use client';

// FILE: frontend/src/components/ui/scroll-area.tsx
//
// SYSTEMIC ROLE:
//   Custom scroll container for Pagez dense UI surfaces.
//
//   Used by:
//   - Dashboard sidebars (P02)
//   - Superadmin audit logs (P16)
//   - Analytics tables (P15)
//   - Portfolio builder layers panel (P06)
//   - Booking queue lists (P09)
//   - Link aggregator lists (P07)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-scroll-area.
//   - Native scrolling behavior is preserved.
//   - Scrollbars are visual enhancements, not the only scrolling mechanism.
//   - Keyboard scrolling remains available.
//
//   DESIGN TOKEN CONTRACT:
//   - Scrollbar thumb uses --pagez-border.
//   - Supports dark mode and tenant overrides automatically.

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] outline-none"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent p-[1px]',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
