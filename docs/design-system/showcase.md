# Pagez Design System Showcase

Status: P01.6 implementation
Phase: P01 Design system and UI kit
Route: `/showcase`
Source of truth: `PRD.md`

## Purpose

The showcase route is the human-inspection surface for the Pagez design system.

It verifies:

- semantic design tokens,
- Tailwind v4 token mapping,
- light mode,
- dark mode,
- tenant theme overrides,
- component accessibility basics,
- component visual consistency,
- P01.5 UI kit completeness before P01.7 automation gates.

## Route

```text
/showcase
```

The route is marked no-index during P01 because it is a development and
verification surface, not a public product page.

## File map

```text
frontend/src/app/showcase/page.tsx
  Route entrypoint.
  Exports metadata and renders ShowcasePage.

frontend/src/components/showcase/showcase-page.tsx
  Main client component.
  Renders all P01.5 component families.
  Wraps content in ToastProvider and TooltipProvider.

frontend/src/components/showcase/showcase-section.tsx
  Presentational section shell.
  Provides consistent title, description, and bordered content surface.

frontend/src/components/showcase/showcase-theme-toggle.tsx
  Theme cycling control.
  Applies light/dark/system mode without page reload.

frontend/src/components/showcase/showcase-tenant-preview.tsx
  Tenant theme override preview.
  Uses tenantThemeToCssVariables to apply --tenant-* variables.

docs/design-system/showcase.md
  This document.
```

## Component coverage

The showcase includes at least one visible usage of each P01.5 component family:

```text
Accordion
Avatar
Badge
Button
CalendarGrid
Card
ChartContainer
Checkbox
Dialog
Drawer
EmptyState
FileUploader
Input
Label
Pagination
Popover
Progress
RadioGroup
ScrollArea
Select
Separator
Skeleton
Slider
Switch
Table
Tabs
Textarea
Toast
Toggle
ToggleGroup
Tooltip
```

## Token coverage

The showcase renders semantic color tokens including:

```text
background
foreground
card
popover
primary
secondary
muted
accent
destructive
success
warning
info
border
input
ring
chart-1
chart-2
chart-3
chart-4
chart-5
```

## Dark mode verification

Use the theme toggle in the showcase header.

The toggle cycles:

```text
Light -> Dark -> System -> Light
```

It persists the preference using:

```text
localStorage["pagez.theme"]
```

It applies:

```text
html.dark
html[data-theme="light"|"dark"]
html style color-scheme
```

## Tenant theme verification

The tenant preview section uses:

```ts
tenantThemeToCssVariables(theme)
```

to emit CSS variables such as:

```text
--tenant-primary
--tenant-accent
--tenant-radius
--tenant-font-sans
```

Those variables are applied to a bounded scope:

```html
<div class="tenant-theme-scope" style="--tenant-primary: ...;">
```

Components inside that scope inherit tenant branding without component-level
prop drilling.

## Hydration safety

The showcase avoids browser-only APIs during initial render.

The theme toggle renders a disabled placeholder until mounted.

The calendar uses deterministic module-level Date constants:

```text
SHOWCASE_CALENDAR_MONTH
SHOWCASE_CALENDAR_VALUE
SHOWCASE_CALENDAR_TODAY
```

This prevents server/client date drift hydration mismatches.

## Manual QA checklist

Open:

```text
http://localhost:3000/showcase
```

Verify:

1. Page loads without console errors.
2. Semantic color swatches render.
3. Typography classes render.
4. Buttons show all variants and sizes.
5. Inputs, textarea, select, checkbox, radio, switch, slider, and file uploader render.
6. Badges, progress, skeleton, empty state, and toast buttons render.
7. Toast success/info/destructive appear.
8. Dialog opens and closes.
9. Drawer opens from selected side.
10. Popover opens and closes.
11. Tooltip appears on hover/focus.
12. Tabs switch content.
13. Accordion expands/collapses.
14. Pagination changes current page.
15. Toggle and toggle group update state.
16. Card, table, chart, calendar, avatar, separator, and scroll area render.
17. Tenant preview updates when primary/accent/radius/font change.
18. Theme toggle switches light/dark/system.
19. Dark mode updates surfaces, text, borders, shadows, and charts.
20. No hardcoded palette classes are used in product showcase structure.

## Verification commands

From repository root:

```bash
pnpm --filter frontend lint
pnpm --filter frontend typecheck
NEXT_TELEMETRY_DISABLED=1 pnpm --filter frontend build
git diff --check
```

All must exit with code `0`.

The build output must include:

```text
/showcase
```
