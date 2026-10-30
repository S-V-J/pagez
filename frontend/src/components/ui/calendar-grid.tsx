'use client';

// FILE: frontend/src/components/ui/calendar-grid.tsx
//
// SYSTEMIC ROLE:
//   Baseline calendar grid for Pagez booking and scheduling surfaces.
//
//   Used by:
//   - Appointment booking date picker (P09)
//   - Availability settings (P09)
//   - Analytics date range picker (P15)
//   - Superadmin release scheduling (P16)
//   - Subscription renewal views (P11)
//
//   ACCESSIBILITY CONTRACT:
//   - Each day is a native button with a full date aria-label.
//   - Selected day uses aria-current="date".
//   - Disabled days use native disabled state.
//   - Weekday headers are aria-hidden because they are structural labels.
//   - The root uses role="group" with an accessible month label.
//
//   DESIGN TOKEN CONTRACT:
//   - Container uses --pagez-card and --pagez-card-foreground.
//   - Selected day uses --pagez-primary and --pagez-primary-foreground.
//   - Today uses --pagez-ring border.
//   - Outside days use muted foreground at reduced opacity.
//   - Supports dark mode and tenant overrides automatically.
//
//   HYDRATION SAFETY:
//   This component does not call bare new Date() during render.
//   Consumers must pass month and optionally today/value as Date objects.
//   This prevents server/client timezone/date drift hydration mismatches.

import * as React from "react";

import { cn } from "@/lib/utils";

export type CalendarWeekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CalendarDay {
  date: Date;
  isOutside: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

export interface CalendarGridProps
  extends Omit<React.ComponentProps<"div">, "onSelect"> {
  month: Date;
  value?: Date | null;
  today?: Date;
  onSelect?: (date: Date) => void;
  disabledDate?: (date: Date) => boolean;
  weekStartsOn?: CalendarWeekday;
  locale?: string;
  showOutsideDays?: boolean;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function createDateTimeFormat(
  locale: string,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
  try {
    return new Intl.DateTimeFormat(locale, options);
  } catch {
    return new Intl.DateTimeFormat("en-US", options);
  }
}

export function getCalendarDays(options: {
  month: Date;
  value?: Date | null;
  today?: Date;
  disabledDate?: (date: Date) => boolean;
  weekStartsOn?: CalendarWeekday;
}): CalendarDay[] {
  const {
    month,
    value,
    today,
    disabledDate,
    weekStartsOn = 0,
  } = options;

  const monthStart = startOfMonth(month);
  const offset = (monthStart.getDay() - weekStartsOn + 7) % 7;

  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - offset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);

    return {
      date,
      isOutside: date.getMonth() !== monthStart.getMonth(),
      isToday: today ? isSameDay(date, today) : false,
      isSelected: value ? isSameDay(date, value) : false,
      isDisabled: disabledDate ? disabledDate(date) : false,
    };
  });
}

function CalendarGrid({
  className,
  month,
  value,
  today,
  onSelect,
  disabledDate,
  weekStartsOn = 0,
  locale = "en-US",
  showOutsideDays = true,
  ...props
}: CalendarGridProps) {
  const days = React.useMemo(
    () =>
      getCalendarDays({
        month,
        value,
        today,
        disabledDate,
        weekStartsOn,
      }),
    [month, value, today, disabledDate, weekStartsOn],
  );

  const weekdayFormatter = React.useMemo(
    () => createDateTimeFormat(locale, { weekday: "short" }),
    [locale],
  );

  const monthFormatter = React.useMemo(
    () => createDateTimeFormat(locale, { month: "long", year: "numeric" }),
    [locale],
  );

  const dayFormatter = React.useMemo(
    () => createDateTimeFormat(locale, { day: "numeric" }),
    [locale],
  );

  const fullDateFormatter = React.useMemo(
    () =>
      createDateTimeFormat(locale, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    [locale],
  );

  const weekdayLabels = React.useMemo(() => {
    const base = new Date(2024, 0, 1); // Monday

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(base);
      const dayOffset = (index + weekStartsOn - 1 + 7) % 7;
      date.setDate(base.getDate() + dayOffset);

      return weekdayFormatter.format(date);
    });
  }, [weekdayFormatter, weekStartsOn]);

  const monthLabel = monthFormatter.format(month);

  return (
    <div
      data-slot="calendar-grid"
      role="group"
      aria-label={`${monthLabel} calendar`}
      className={cn(
        "w-full rounded-lg border border-border bg-card p-3 text-card-foreground shadow-[var(--pagez-shadow-xs)]",
        className,
      )}
      {...props}
    >
      <div className="mb-2 text-sm font-semibold leading-none">
        {monthLabel}
      </div>

      <div
        className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground"
        aria-hidden="true"
      >
        {weekdayLabels.map((label, index) => (
          <div key={`${label}-${index}`} className="py-1">
            {label}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = `${day.date.getFullYear()}-${day.date.getMonth()}-${day.date.getDate()}`;

          if (day.isOutside && !showOutsideDays) {
            return (
              <div
                key={key}
                className="aspect-square"
                aria-hidden="true"
              />
            );
          }

          return (
            <button
              key={key}
              type="button"
              disabled={day.isDisabled || !onSelect}
              aria-label={fullDateFormatter.format(day.date)}
              aria-current={day.isSelected ? "date" : undefined}
              data-slot="calendar-day"
              data-selected={day.isSelected}
              data-outside={day.isOutside}
              data-today={day.isToday}
              className={cn(
                "flex aspect-square items-center justify-center rounded-md text-sm transition-[color,background-color,border-color,box-shadow] duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
                day.isOutside && "text-muted-foreground/50",
                day.isSelected &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                day.isToday && !day.isSelected && "border border-ring",
              )}
              onClick={() => onSelect?.(day.date)}
            >
              {dayFormatter.format(day.date)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { CalendarGrid };
