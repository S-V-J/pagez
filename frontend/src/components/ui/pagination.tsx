'use client';

// FILE: frontend/src/components/ui/pagination.tsx
//
// SYSTEMIC ROLE:
//   Pagination control for Pagez list/table surfaces.
//
//   Used by:
//   - Superadmin tenant lists (P16)
//   - Booking lists (P09)
//   - Service catalog lists (P08)
//   - Analytics tables (P15)
//   - Payment ledger views (P10)
//   - Ad campaign lists (P12)
//
//   ACCESSIBILITY CONTRACT:
//   - Renders as nav with aria-label="Pagination".
//   - Current page uses aria-current="page".
//   - Previous/Next buttons have explicit aria-labels.
//   - Ellipsis items are aria-hidden because they are decorative.
//   - Buttons are disabled when no onPageChange handler is supplied.
//
//   DESIGN TOKEN CONTRACT:
//   - Uses Button variants backed by semantic tokens.
//   - Supports dark mode and tenant overrides automatically.

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

type PaginationBreakpoint = "ellipsis-left" | "ellipsis-right";
type PaginationPage = number | PaginationBreakpoint;

interface PaginationProps extends React.ComponentProps<"nav"> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
}

function range(start: number, end: number): number[] {
  const length = Math.max(end - start + 1, 0);

  return Array.from({ length }, (_, index) => start + index);
}

function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PaginationPage[] {
  const totalNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalNumbers) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, "ellipsis-right", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);

    return [1, "ellipsis-left", ...rightRange];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);

    return [1, "ellipsis-left", ...middleRange, "ellipsis-right", totalPages];
  }

  return range(1, totalPages);
}

function Pagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  ...props
}: PaginationProps) {
  const safeTotalPages = Math.max(totalPages, 0);
  const safeCurrentPage = Math.min(
    Math.max(currentPage, 1),
    Math.max(safeTotalPages, 1),
  );
  const safeSiblingCount = Math.max(siblingCount, 0);

  const items = React.useMemo<PaginationPage[]>(() => {
    if (safeTotalPages <= 1) {
      return [];
    }

    return getPaginationRange(
      safeCurrentPage,
      safeTotalPages,
      safeSiblingCount,
    );
  }, [safeCurrentPage, safeTotalPages, safeSiblingCount]);

  if (safeTotalPages <= 1) {
    return null;
  }

  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      className={cn("flex w-full items-center justify-center", className)}
      {...props}
    >
      <ul className="flex flex-wrap items-center justify-center gap-1">
        <li>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Previous page"
            disabled={safeCurrentPage <= 1 || !onPageChange}
            onClick={() => onPageChange?.(safeCurrentPage - 1)}
          >
            Prev
          </Button>
        </li>

        {items.map((item) => {
          if (typeof item === "number") {
            const isActive = item === safeCurrentPage;

            return (
              <li key={item}>
                <Button
                  type="button"
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className="min-w-9"
                  aria-current={isActive ? "page" : undefined}
                  disabled={!onPageChange}
                  onClick={() => onPageChange?.(item)}
                >
                  {item}
                </Button>
              </li>
            );
          }

          return (
            <li
              key={item}
              aria-hidden="true"
              className="px-2 text-sm text-muted-foreground"
            >
              …
            </li>
          );
        })}

        <li>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Next page"
            disabled={safeCurrentPage >= safeTotalPages || !onPageChange}
            onClick={() => onPageChange?.(safeCurrentPage + 1)}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export { Pagination };
export type { PaginationProps };
