'use client';

// FILE: frontend/src/components/ui/switch.tsx
//
// SYSTEMIC ROLE:
//   Accessible on/off switch for Pagez settings and toggles.
//
//   Used by:
//   - Notification settings (P05, P16)
//   - Privacy settings (P20)
//   - Ad consent toggles (P12)
//   - Analytics sampling toggles (P13, P15)
//   - Feature flags in superadmin console (P16)
//   - Booking availability toggles (P09)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-switch.
//   - Must have an accessible label from Label or aria-label.
//   - Keyboard Space toggles state through Radix.
//   - State is exposed through data-state and aria-checked.
//
//   DESIGN TOKEN CONTRACT:
//   - Uses semantic token utilities.
//   - Supports dark mode and tenant overrides automatically.

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-[var(--pagez-shadow-2xs)] outline-none transition-[color,box-shadow] duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block size-4 rounded-full bg-background shadow-[var(--pagez-shadow-sm)] ring-0 transition-transform duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
