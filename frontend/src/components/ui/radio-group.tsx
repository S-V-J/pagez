'use client';

// FILE: frontend/src/components/ui/radio-group.tsx
//
// SYSTEMIC ROLE:
//   Accessible radio group control for mutually exclusive Pagez selections.
//
//   Used by:
//   - Booking slot selection (P09)
//   - Payment method selection (P10)
//   - Tier selection (P11)
//   - Theme mode selection (P01.6+)
//   - Portfolio layout selection (P06)
//   - Analytics comparison mode (P15)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-radio-group.
//   - Group must have an accessible label from Legend, Label, or aria-label.
//   - Arrow-key navigation is handled by Radix.
//   - Each item requires a unique value.
//
//   DESIGN TOKEN CONTRACT:
//   - Uses semantic token utilities.
//   - Supports dark mode and tenant overrides automatically.

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-2', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'aspect-square size-4 shrink-0 rounded-full border border-input shadow-[var(--pagez-shadow-2xs)] outline-none transition-[color,box-shadow] duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="size-2 rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
