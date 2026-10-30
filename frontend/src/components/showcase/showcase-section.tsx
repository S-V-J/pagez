// FILE: frontend/src/components/showcase/showcase-section.tsx
//
// SYSTEMIC ROLE:
//   Layout helper for the Pagez design-system showcase route.
//
//   This component provides a consistent section shell for:
//   - section title,
//   - section description,
//   - bordered content surface.
//
//   It is intentionally presentational and does not own product behavior.

import type * as React from "react";

import { cn } from "@/lib/utils";

interface ShowcaseSectionProps extends React.ComponentProps<"section"> {
  title: string;
  description?: string;
}

export function ShowcaseSection({
  className,
  title,
  description,
  children,
  ...props
}: ShowcaseSectionProps) {
  return (
    <section
      data-slot="showcase-section"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>

        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>

      <div className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-[var(--pagez-shadow-xs)] sm:p-6">
        {children}
      </div>
    </section>
  );
}

export type { ShowcaseSectionProps };
