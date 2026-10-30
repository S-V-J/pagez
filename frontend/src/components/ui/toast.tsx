'use client';

// FILE: frontend/src/components/ui/toast.tsx
//
// SYSTEMIC ROLE:
//   Toast notification system for Pagez.
//
//   Used by:
//   - Booking confirmation feedback (P09)
//   - Payment status feedback (P10)
//   - Billing tier feedback (P11)
//   - Ad campaign save feedback (P12)
//   - Analytics sync feedback (P13, P14, P15)
//   - Superadmin operation feedback (P16)
//   - Auth/MFA feedback (P04)
//
//   ACCESSIBILITY CONTRACT:
//   - Built on @radix-ui/react-toast.
//   - ToastProvider must wrap the application.
//   - ToastViewport is rendered by ToastProvider.
//   - Titles and descriptions are announced through Radix live-region behavior.
//   - Close button has accessible label.
//   - Action buttons require altText for screen-reader context.
//
//   DESIGN TOKEN CONTRACT:
//   - Variants use semantic status tokens.
//   - Toast z-index uses --pagez-z-toast.
//   - Shadows, durations, and easings use Pagez tokens.
//   - Supports dark mode through token overrides.
//   - Supports tenant overrides through --tenant-* CSS variables.
//
//   REPAIR NOTES (P01.5.B.R1):
//   1. Native HTML title conflict:
//      Radix Toast Root inherits HTML attributes, including title?: string.
//      Pagez toast titles may be ReactNode. Therefore the base Radix Root
//      props omit native title and this module declares title?: ReactNode.
//
//   2. Invalid Toast Action props:
//      Radix Toast Action does not accept side or align. Those props were
//      removed from ToastActionProps and are no longer forwarded.
//
//   3. React Hook cleanup warning:
//      Ref current values are copied into local variables inside the effect
//      before being used in cleanup, satisfying react-hooks/exhaustive-deps.

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const TOAST_LIMIT = 5;
const TOAST_DEFAULT_DURATION = 5000;
const TOAST_REMOVE_DELAY = 300;

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-md border border-border p-4 pr-8 shadow-[var(--pagez-shadow-lg)] transition-[color,background-color,border-color,box-shadow,opacity] duration-[var(--pagez-duration-normal)] ease-[var(--pagez-ease-out)]',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 bg-destructive text-destructive-foreground',
        success:
          'border-success/50 bg-success text-success-foreground',
        warning:
          'border-warning/50 bg-warning text-warning-foreground',
        info:
          'border-info/50 bg-info text-info-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface ToastActionProps {
  /**
   * Required screen-reader context for the action button.
   * Radix Toast Action requires this prop.
   */
  altText: string;

  /**
   * Visible action label.
   */
  label: React.ReactNode;

  /**
   * Optional additional class names merged through cn().
   */
  className?: string;

  /**
   * Optional click handler.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface ToastProps
  extends Omit<
    React.ComponentProps<typeof ToastPrimitive.Root>,
    'children' | 'onOpenChange' | 'open' | 'title'
  >,
    VariantProps<typeof toastVariants> {
  /**
   * Optional stable identifier.
   * If omitted, the provider generates one.
   */
  id?: string;

  /**
   * Toast title.
   * Intentionally ReactNode, not string, to allow formatted content.
   */
  title?: React.ReactNode;

  /**
   * Toast description.
   */
  description?: React.ReactNode;

  /**
   * Optional action button.
   */
  action?: ToastActionProps;

  /**
   * Optional extra children rendered below title/description.
   */
  children?: React.ReactNode;

  /**
   * Auto-dismiss duration in milliseconds.
   */
  duration?: number;

  /**
   * Controlled open state.
   */
  open?: boolean;

  /**
   * Controlled open-state change handler.
   */
  onOpenChange?: (open: boolean) => void;
}

interface ToastContextValue {
  toast: (props: ToastProps) => string;
  dismiss: (id?: string) => void;
  update: (id: string, props: ToastProps) => void;
}

type ManagedToast = ToastProps & {
  id: string;
  open: boolean;
};

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined,
);

function ToastProvider({
  children,
  duration = TOAST_DEFAULT_DURATION,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Provider> & {
  duration?: number;
}) {
  const [toasts, setToasts] = React.useState<ManagedToast[]>([]);

  const displayTimersRef = React.useRef<
    Map<string, ReturnType<typeof setTimeout>>
  >(new Map());

  const removeTimersRef = React.useRef<
    Map<string, ReturnType<typeof setTimeout>>
  >(new Map());

  const remove = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toastItem) => toastItem.id !== id));

    const displayTimer = displayTimersRef.current.get(id);
    if (displayTimer) {
      clearTimeout(displayTimer);
      displayTimersRef.current.delete(id);
    }

    const removeTimer = removeTimersRef.current.get(id);
    if (removeTimer) {
      clearTimeout(removeTimer);
      removeTimersRef.current.delete(id);
    }
  }, []);

  const scheduleRemove = React.useCallback(
    (id: string) => {
      const existingRemoveTimer = removeTimersRef.current.get(id);
      if (existingRemoveTimer) {
        clearTimeout(existingRemoveTimer);
      }

      const timer = setTimeout(() => {
        remove(id);
      }, TOAST_REMOVE_DELAY);

      removeTimersRef.current.set(id, timer);
    },
    [remove],
  );

  const dismiss = React.useCallback((id?: string) => {
    setToasts((prev) =>
      prev.map((toastItem) =>
        !id || toastItem.id === id ? { ...toastItem, open: false } : toastItem,
      ),
    );

    if (id) {
      const displayTimer = displayTimersRef.current.get(id);
      if (displayTimer) {
        clearTimeout(displayTimer);
        displayTimersRef.current.delete(id);
      }
    } else {
      displayTimersRef.current.forEach((timer) => clearTimeout(timer));
      displayTimersRef.current.clear();
    }
  }, []);

  const toast = React.useCallback(
    (props: ToastProps) => {
      const id = props.id ?? Math.random().toString(36).slice(2);
      const toastDuration = props.duration ?? duration;

      const existingDisplayTimer = displayTimersRef.current.get(id);
      if (existingDisplayTimer) {
        clearTimeout(existingDisplayTimer);
        displayTimersRef.current.delete(id);
      }

      const existingRemoveTimer = removeTimersRef.current.get(id);
      if (existingRemoveTimer) {
        clearTimeout(existingRemoveTimer);
        removeTimersRef.current.delete(id);
      }

      const nextToast: ManagedToast = {
        ...props,
        id,
        open: true,
      };

      setToasts((prev) =>
        [nextToast, ...prev.filter((toastItem) => toastItem.id !== id)].slice(
          0,
          TOAST_LIMIT,
        ),
      );

      const timer = setTimeout(() => {
        dismiss(id);
        scheduleRemove(id);
      }, toastDuration);

      displayTimersRef.current.set(id, timer);

      return id;
    },
    [duration, dismiss, scheduleRemove],
  );

  const update = React.useCallback(
    (id: string, props: ToastProps) => {
      const existingDisplayTimer = displayTimersRef.current.get(id);
      if (existingDisplayTimer) {
        clearTimeout(existingDisplayTimer);
        displayTimersRef.current.delete(id);
      }

      const existingRemoveTimer = removeTimersRef.current.get(id);
      if (existingRemoveTimer) {
        clearTimeout(existingRemoveTimer);
        removeTimersRef.current.delete(id);
      }

      setToasts((prev) =>
        prev.map((toastItem) =>
          toastItem.id === id
            ? { ...toastItem, ...props, id, open: true }
            : toastItem,
        ),
      );

      const toastDuration = props.duration ?? duration;

      const timer = setTimeout(() => {
        dismiss(id);
        scheduleRemove(id);
      }, toastDuration);

      displayTimersRef.current.set(id, timer);
    },
    [duration, dismiss, scheduleRemove],
  );

  React.useEffect(() => {
    const displayTimers = displayTimersRef.current;
    const removeTimers = removeTimersRef.current;

    return () => {
      displayTimers.forEach((timer) => clearTimeout(timer));
      removeTimers.forEach((timer) => clearTimeout(timer));
      displayTimers.clear();
      removeTimers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss, update }}>
      <ToastPrimitive.Provider {...props}>
        {children}
        {toasts.map((toastItem) => (
          <Toast
            key={toastItem.id}
            {...toastItem}
            onOpenChange={(open) => {
              if (!open) {
                dismiss(toastItem.id);
                scheduleRemove(toastItem.id);
              }
            }}
          />
        ))}
        <ToastViewport />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

function Toast({
  className,
  variant,
  title,
  description,
  action,
  children,
  id,
  duration,
  open,
  onOpenChange,
  ...props
}: ToastProps) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      data-id={id}
      data-duration={duration}
      data-variant={variant ?? 'default'}
      className={cn(toastVariants({ variant }), className)}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      <div className="grid gap-1">
        {title ? (
          <ToastPrimitive.Title className="text-sm font-semibold">
            {title}
          </ToastPrimitive.Title>
        ) : null}

        {description ? (
          <ToastPrimitive.Description className="text-sm opacity-90">
            {description}
          </ToastPrimitive.Description>
        ) : null}

        {children}
      </div>

      {action ? (
        <ToastPrimitive.Action
          altText={action.altText}
          className={cn(
            'inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium transition-[color,background-color,border-color] duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
            action.className,
          )}
          onClick={action.onClick}
        >
          {action.label}
        </ToastPrimitive.Action>
      ) : null}

      <ToastPrimitive.Close
        aria-label="Close"
        className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground opacity-70 transition-opacity hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <span aria-hidden="true">✕</span>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}

function ToastViewport({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        'fixed bottom-0 right-0 z-[var(--pagez-z-toast)] flex max-h-[100vh] w-full max-w-[420px] flex-col items-end gap-2 p-4 outline-none',
        className,
      )}
      {...props}
    />
  );
}

function ToastTitle({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Title>) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn('text-sm font-semibold', className)}
      {...props}
    />
  );
}

function ToastDescription({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Description>) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn('text-sm opacity-90', className)}
      {...props}
    />
  );
}

function ToastAction({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Action>) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium transition-[color,background-color,border-color] duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)] hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function ToastClose({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      className={cn(
        'absolute right-2 top-2 rounded-md p-1 text-muted-foreground opacity-70 transition-opacity hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring',
        className,
      )}
      {...props}
    />
  );
}

function useToast(): ToastContextValue {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider.');
  }

  return context;
}

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToast,
};

export type { ToastProps, ToastActionProps, ToastContextValue };
