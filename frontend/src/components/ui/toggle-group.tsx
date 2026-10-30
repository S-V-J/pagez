'use client';

// FILE: frontend/src/components/ui/toggle-group.tsx
//
// SYSTEMIC ROLE:
//   Grouped toggle control for Pagez toolbars and segmented options.
//
//   Used by:
//   - Analytics period segmented controls (P15)
//   - Portfolio editor view modes (P06)
//   - Dashboard density controls (P02)
//   - Filter mode switchers (P08, P16)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-toggle-group.
//   - Supports single and multiple selection modes.
//   - Each item must have a unique value.
//   - Group should have an accessible label from aria-label or surrounding heading.
//
//   DESIGN TOKEN CONTRACT:
//   - Uses semantic token utilities.
//   - Supports dark mode and tenant overrides automatically.

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { toggleVariants } from './toggle';

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant ?? 'default'}
      data-size={size ?? 'default'}
      className={cn(
        'group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-[var(--pagez-shadow-2xs)]',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={variant ?? 'default'}
      data-size={size ?? 'default'}
      className={cn(
        toggleVariants({ variant, size }),
        'min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
