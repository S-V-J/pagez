'use client';

// FILE: frontend/src/components/ui/slider.tsx
//
// SYSTEMIC ROLE:
//   Accessible range slider for Pagez numeric selection.
//
//   Used by:
//   - Price range filters (P08, P15)
//   - Analytics date range zoom (P15)
//   - Booking duration selectors (P09)
//   - Media crop/quality controls (P06)
//   - Ad bid/frequency controls where appropriate (P12)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-slider.
//   - Must have an accessible label from Label or aria-label.
//   - Keyboard arrow adjustment is handled by Radix.
//   - Value array supports single and multi-thumb use.
//
//   DESIGN TOKEN CONTRACT:
//   - Uses semantic token utilities.
//   - Supports dark mode and tenant overrides automatically.

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min],
    [value, defaultValue, min],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full bg-primary"
        />
      </SliderPrimitive.Track>
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className="block size-4 shrink-0 rounded-full border-2 border-primary bg-background shadow-[var(--pagez-shadow-sm)] transition-[color,box-shadow] duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
