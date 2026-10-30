'use client';

// FILE: frontend/src/components/ui/tooltip.tsx
//
// SYSTEMIC ROLE:
//   Tooltip primitive for Pagez.
//
//   Used by:
//   - Icon-only buttons (P01.5+)
//   - Analytics metric explanations (P15)
//   - Superadmin policy hints (P16)
//   - Booking conflict explanations (P09)
//   - Ad targeting hints (P12)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-tooltip.
//   - TooltipProvider must wrap tooltips.
//   - Tooltips are supplementary and must not be required for operation.
//   - Trigger should remain focusable.
//
//   DESIGN TOKEN CONTRACT:
//   - Content uses --pagez-foreground / --pagez-background inverse pairing.
//   - Popover z-index token is used.
//   - Supports dark mode and tenant overrides automatically.

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

function TooltipProvider({
  delayDuration = 300,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger(props: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'z-[var(--pagez-z-popover)] max-w-xs rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-[var(--pagez-shadow-md)]',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
