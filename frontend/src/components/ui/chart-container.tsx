// FILE: frontend/src/components/ui/chart-container.tsx
//
// SYSTEMIC ROLE:
//   Baseline chart surface container for Pagez analytics UI.
//
//   Used by:
//   - Web analytics dashboard (P13, P15)
//   - Social analytics dashboard (P14, P15)
//   - Booking conversion charts (P09, P15)
//   - Revenue charts (P10, P11, P15)
//   - Ad performance charts (P12, P15)
//
//   ACCESSIBILITY CONTRACT:
//   - ChartContainer uses role="figure" and aria-label.
//   - ChartLegendItem pairs a color swatch with a text label.
//   - Future chart libraries must still provide text alternatives or data tables.
//
//   DESIGN TOKEN CONTRACT:
//   - Container uses --pagez-card and --pagez-card-foreground.
//   - Legend swatches default to --pagez-chart-1 and can be overridden.
//   - Supports dark mode and tenant overrides automatically.

import type * as React from "react";

import { cn } from "@/lib/utils";

interface ChartContainerProps extends React.ComponentProps<"div"> {
  ariaLabel?: string;
}

interface ChartLegendItemProps extends React.ComponentProps<"div"> {
  label: string;
  colorVar?: string;
}

function ChartContainer({
  className,
  ariaLabel = "Chart",
  children,
  ...props
}: ChartContainerProps) {
  return (
    <div
      data-slot="chart-container"
      role="figure"
      aria-label={ariaLabel}
      className={cn(
        "relative flex w-full flex-col gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-[var(--pagez-shadow-xs)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ChartLegend({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chart-legend"
      className={cn(
        "flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ChartLegendItem({
  className,
  label,
  colorVar,
  ...props
}: ChartLegendItemProps) {
  return (
    <div
      data-slot="chart-legend-item"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="size-2 shrink-0 rounded-full"
        style={{ backgroundColor: colorVar ?? "var(--pagez-chart-1)" }}
      />
      <span>{label}</span>
    </div>
  );
}

export { ChartContainer, ChartLegend, ChartLegendItem };
export type { ChartContainerProps, ChartLegendItemProps };
