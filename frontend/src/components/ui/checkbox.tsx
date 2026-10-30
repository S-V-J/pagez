'use client';

// FILE: frontend/src/components/ui/checkbox.tsx
//
// SYSTEMIC ROLE:
//   Accessible checkbox control for Pagez forms.
//
//   Used by:
//   - Consent records (P20)
//   - Notification preferences (P05, P16)
//   - Booking terms acceptance (P09)
//   - Service catalog options (P08)
//   - Superadmin bulk actions (P16)
//   - Analytics filter toggles (P15)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-checkbox.
//   - Must be paired with Label or aria-label.
//   - Supports keyboard Space toggling through Radix.
//   - Checked state is communicated through data-state and aria-checked.
//
//   DESIGN TOKEN CONTRACT:
//   - Uses semantic token utilities.
//   - Supports dark mode and tenant overrides automatically.

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer size-4 shrink-0 rounded-sm border border-input shadow-[var(--pagez-shadow-2xs)] outline-none transition-[color,box-shadow] duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
