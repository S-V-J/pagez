'use client';

// FILE: frontend/src/components/ui/accordion.tsx
//
// SYSTEMIC ROLE:
//   Accordion disclosure component for Pagez.
//
//   Used by:
//   - FAQ sections (P06, P07)
//   - Settings groups (P04)
//   - Analytics drilldowns (P15)
//   - Superadmin policy details (P16)
//   - Booking policy sections (P09)
//   - Service catalog details (P08)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-accordion.
//   - Trigger buttons expose expanded state through aria-expanded.
//   - Content is hidden when closed.
//   - Keyboard Enter/Space toggles through Radix.
//
//   DESIGN TOKEN CONTRACT:
//   - Uses semantic token utilities.
//   - Supports dark mode and tenant overrides automatically.

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@/lib/utils';

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b border-border last:border-b-0', className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium transition-colors duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--pagez-duration-normal)] ease-[var(--pagez-ease-in-out)]"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        'overflow-hidden text-sm text-muted-foreground data-[state=closed]:pb-0 data-[state=open]:pb-4',
        className,
      )}
      {...props}
    >
      <div className={cn('pt-0')}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
