# Pagez Design Tokens

Status: P01.4 implementation
Phase: P01 Design system and UI kit
Owner frontend path: `frontend/src/styles`
Owner TypeScript path: `frontend/src/design-system`
Source of truth: `PRD.md`

## Purpose

This document defines the Pagez design-token contract.

Design tokens are the shared visual language for:

- public influencer portfolio pages,
- link-in-bio pages,
- service catalog pages,
- booking pages,
- tenant dashboard,
- superadmin console,
- PWA shell,
- analytics charts,
- advertising placements,
- future native-like mobile presentation.

Tokens must be used instead of hardcoded colors, radii, shadows, fonts, and
z-index values.

## File map

```text
frontend/src/styles/design-tokens.css
  Raw CSS custom properties.
  Defines --pagez-* tokens and tenant fallbacks.

frontend/src/styles/theme-base.css
  Maps --pagez-* tokens into Tailwind v4 @theme variables.
  Defines dark variant selector strategy.
  Defines baseline element styles.

frontend/src/styles/theme-dark.css
  Overrides --pagez-* tokens for dark mode.

frontend/src/styles/tenant-theme.css
  Documents tenant override contract and optional tenant scope classes.

frontend/src/app/globals.css
  Global CSS entrypoint. Imports Tailwind and token layers.

frontend/src/app/layout.tsx
  Root layout. Loads fonts, metadata, viewport, and no-flash theme script.

frontend/src/design-system/tokens.ts
  TypeScript token metadata and theme mode types.

frontend/src/design-system/theme.ts
  Theme resolution helpers and no-flash initialization script.

frontend/src/design-system/tenant-theme.ts
  Tenant theme type contract, validation, and CSS-variable generation.
```

## Token naming

Raw Pagez tokens use:

```css
--pagez-*
```

Examples:

```css
--pagez-background
--pagez-foreground
--pagez-primary
--pagez-muted-foreground
--pagez-radius-md
--pagez-shadow-lg
--pagez-z-modal
```

Tenant override tokens use:

```css
--tenant-*
```

Examples:

```css
--tenant-primary
--tenant-background
--tenant-radius
--tenant-font-sans
--tenant-color-scheme
```

Tailwind theme variables are mapped in `theme-base.css` and should not be
edited directly by feature code.

## Semantic color tokens

Core surface tokens:

```text
background
foreground
card
card-foreground
popover
popover-foreground
```

Action tokens:

```text
primary
primary-foreground
secondary
secondary-foreground
```

Emphasis and subdued tokens:

```text
muted
muted-foreground
accent
accent-foreground
```

Status tokens:

```text
destructive
destructive-foreground
success
success-foreground
warning
warning-foreground
info
info-foreground
```

Line/form tokens:

```text
border
input
ring
```

Overlay tokens:

```text
overlay
scrim
```

Chart tokens:

```text
chart-1
chart-2
chart-3
chart-4
chart-5
```

## Tailwind utility usage

Because `theme-base.css` maps tokens into Tailwind v4 theme variables, components
should use semantic utilities such as:

```tsx
<div className="bg-background text-foreground" />
<div className="bg-card text-card-foreground" />
<button className="bg-primary text-primary-foreground" />
<span className="text-muted-foreground" />
<div className="border-border" />
<div className="ring-ring" />
<div className="bg-chart-1" />
```

Avoid hardcoded palette classes such as:

```tsx
// Do not use for product surfaces.
<div className="bg-zinc-50 text-zinc-900" />
```

Exception: third-party demo pages or temporary debug UI may use hardcoded
classes, but product components must not.

## Typography tokens

Tailwind font utilities:

```text
font-sans
font-mono
font-display
```

Default font sources:

- `--font-geist-sans` from `next/font/google` Geist.
- `--font-geist-mono` from `next/font/google` Geist Mono.
- tenant override through `--tenant-font-sans`, `--tenant-font-mono`,
  `--tenant-font-display`.

Tenant font values are validated by `tenant-theme.ts`.

## Radius tokens

Radius tokens:

```text
rounded-none
rounded-sm
rounded-md
rounded-lg
rounded-xl
rounded-2xl
rounded-3xl
rounded-full
```

Tenant radius is treated as the base medium radius:

```css
--tenant-radius: 0.75rem;
```

Other radii are derived proportionally in `design-tokens.css`.

Allowed tenant radius inputs:

- preset strings:
  ```text
  none
  sm
  md
  lg
  xl
  2xl
  3xl
  full
  ```
- safe CSS length values:
  ```text
  0
  0.5rem
  12px
  100%
  ```
- safe `calc()` expressions with limited characters.

## Shadow tokens

Shadow tokens:

```text
shadow-2xs
shadow-xs
shadow-sm
shadow-md
shadow-lg
shadow-xl
shadow-2xl
```

Dark mode strengthens shadows in `theme-dark.css`.

## Z-index tokens

Z-index tokens are raw CSS variables:

```text
--pagez-z-hide
--pagez-z-base
--pagez-z-dropdown
--pagez-z-sticky
--pagez-z-overlay
--pagez-z-modal
--pagez-z-popover
--pagez-z-toast
--pagez-z-max
```

Use them through arbitrary Tailwind values until component utilities exist:

```tsx
<div className="z-[var(--pagez-z-modal)]" />
```

## Motion tokens

Duration tokens:

```text
--pagez-duration-instant
--pagez-duration-fast
--pagez-duration-normal
--pagez-duration-slow
--pagez-duration-slower
```

Easing tokens:

```text
ease-linear
ease-in
ease-out
ease-in-out
```

Reduced motion is enforced globally in `theme-base.css`.

## Dark mode

Dark mode is controlled by:

```text
.dark
[data-theme="dark"]
```

The no-flash script is defined in:

```text
frontend/src/design-system/theme.ts
```

and injected in:

```text
frontend/src/app/layout.tsx
```

The script:

1. Reads `localStorage.getItem("pagez.theme")`.
2. Falls back to system preference.
3. Sets `document.documentElement.classList`.
4. Sets `document.documentElement.dataset.theme`.
5. Sets `document.documentElement.style.colorScheme`.

This prevents a flash of incorrect theme before React hydrates.

## Theme mode storage key

Storage key:

```text
pagez.theme
```

Allowed values:

```text
light
dark
system
```

TypeScript helper:

```ts
import {
  readStoredThemeMode,
  writeStoredThemeMode,
  resolveThemeMode,
} from "@/design-system/theme";
```

## Tenant theme override contract

Tenant themes are applied by setting `--tenant-*` CSS variables on an ancestor
element.

Example inline:

```html
<body style="--tenant-primary: oklch(55% 0.2 264); --tenant-radius: lg;">
  ...
</body>
```

Example TypeScript:

```tsx
import { tenantThemeToCssVariables } from "@/design-system/tenant-theme";

const tenantTheme = {
  primary: "oklch(55% 0.2 264)",
  accent: "oklch(65% 0.18 320)",
  radius: "lg",
  fontSans: "Inter",
};

const style = tenantThemeToCssVariables(tenantTheme) as React.CSSProperties;

export function TenantShell({ children }: { children: React.ReactNode }) {
  return <div className="tenant-theme-scope" style={style}>{children}</div>;
}
```

## Tenant theme validation

`tenant-theme.ts` validates:

- colors,
- radius,
- spacing,
- font stacks,
- color scheme.

It rejects unsafe characters including:

```text
;
{
}
<
>
```

This is important because tenant theme values may eventually come from
database-backed user input.

## Dark-specific tenant overrides

The default tenant variables apply to both light and dark modes.

For dark-specific overrides, set tenant variables on a dark scope:

```html
<html class="dark" style="--tenant-background: oklch(12% 0.02 260);">
```

Or in React:

```tsx
<div className="dark" style={{ "--tenant-background": "oklch(12% 0.02 260)" } as React.CSSProperties}>
  ...
</div>
```

## Component rules for P01.5

P01.5 components must:

- use semantic tokens,
- support keyboard interaction,
- support focus-visible,
- support dark mode,
- support tenant theme overrides,
- avoid hardcoded palette colors,
- avoid arbitrary z-index values except through token variables,
- avoid animation values except through motion tokens.

## Verification commands

From repository root:

```bash
pnpm --filter frontend lint
pnpm --filter frontend typecheck
NEXT_TELEMETRY_DISABLED=1 pnpm --filter frontend build
git diff --check
```

All must exit with code `0`.
