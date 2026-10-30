'use client';

// FILE: frontend/src/components/ui/drawer.tsx
//
// SYSTEMIC ROLE:
//   Side-anchored drawer primitive for Pagez.
//
//   Used by:
//   - Mobile dashboard navigation (P02)
//   - Portfolio builder side panels (P06)
//   - Booking detail drawers (P09)
//   - Analytics drilldown drawers (P15)
//   - Superadmin tenant detail drawers (P16)
//   - Filter sheets (P08, P15)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-dialog.
//   - DrawerTitle is required for accessible naming.
//   - DrawerDescription should be provided unless aria-describedby is manually handled.
//   - Focus trap and Escape handling are provided by Radix Dialog.
//   - Close button has accessible label.
//
//   DESIGN TOKEN CONTRACT:
//   - Overlay uses --pagez-overlay.
//   - Content uses --pagez-background, --pagez-border, --pagez-shadow-lg.
//   - Drawer z-index uses --pagez-z-modal.
//   - Supports dark mode and tenant overrides automatically.

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type DrawerSide = "bottom" | "top" | "left" | "right";

const drawerContentVariants = cva(
  "fixed z-[var(--pagez-z-modal)] flex flex-col gap-4 border-border bg-background p-6 text-foreground shadow-[var(--pagez-shadow-lg)] transition-[color,background-color,border-color,box-shadow] duration-[var(--pagez-duration-normal)] ease-[var(--pagez-ease-out)]",
  {
    variants: {
      side: {
        bottom:
          "inset-x-0 bottom-0 max-h-[90vh] rounded-t-lg border-t",
        top:
          "inset-x-0 top-0 max-h-[90vh] rounded-b-lg border-b",
        left:
          "inset-y-0 left-0 h-full w-full max-w-sm border-r",
        right:
          "inset-y-0 right-0 h-full w-full max-w-sm border-l",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
);

interface DrawerContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  side?: DrawerSide;
  showCloseButton?: boolean;
}

function Drawer(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger(
  props: React.ComponentProps<typeof DialogPrimitive.Trigger>,
) {
  return <DialogPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerClose(
  props: React.ComponentProps<typeof DialogPrimitive.Close>,
) {
  return <DialogPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-[var(--pagez-z-overlay)] bg-overlay",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  side = "bottom",
  showCloseButton = true,
  ...props
}: DrawerContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        data-slot="drawer-content"
        data-side={side}
        className={cn(
          drawerContentVariants({ side }),
          "overflow-y-auto",
          className,
        )}
        {...props}
      >
        {children}

        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="drawer-close-button"
            aria-label="Close"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <span aria-hidden="true">✕</span>
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
};
export type { DrawerContentProps };
export type { VariantProps as DrawerVariantProps };
