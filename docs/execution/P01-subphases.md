# P01 Subphase Execution Plan

Phase: P01
Title: Design system and UI kit
Repository: /home/ML/pagez
Source of truth: PRD.md
Architecture amendment: docs/architecture/amendment-001-monorepo-layout.md

## Objective

P01 creates the production-grade visual and interaction foundation for Pagez.

P01 must establish:

- A frontend application capable of rendering the Pagez UI.
- A backend application skeleton for future API work.
- A root pnpm workspace coordinating frontend and backend.
- Design tokens.
- Tailwind configuration.
- CSS custom properties.
- Dark mode support.
- Tenant theme override mechanism.
- Accessible base UI components.
- A component showcase route.
- Tests and verification gates.

## Subphase P01.0 — Monorepo workspace bootstrap

Status target: completed by this document and root workspace files.

Deliverables:

- pnpm-workspace.yaml
- package.json
- .npmrc
- .editorconfig
- docs/architecture/amendment-001-monorepo-layout.md
- docs/execution/P01-subphases.md

Acceptance:

- Files exist.
- package.json is valid JSON.
- Git diff check passes.
- P01.0 is committed and pushed.

## Subphase P01.1 — Frontend scaffold

Deliverables:

- frontend/ directory.
- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- ESLint.
- src directory.
- Import alias.
- Baseline page and layout.

Acceptance:

- frontend/package.json exists.
- Frontend can install from root workspace.
- Frontend lint passes.
- Frontend typecheck passes.
- Frontend build passes.

Out of scope:

- PWA service worker.
- Multi-tenant routing.
- Authentication.
- Booking.
- Payments.
- Ads.
- Analytics.

## Subphase P01.2 — Backend scaffold

Deliverables:

- backend/ directory.
- NestJS TypeScript application.
- ESLint.
- Prettier.
- Jest.
- Health endpoint.

Acceptance:

- backend/package.json exists.
- Backend can install from root workspace.
- Backend lint passes.
- Backend typecheck passes.
- Backend test passes.
- Backend build passes.

Out of scope:

- PostgreSQL.
- Drizzle.
- RLS.
- Auth.
- Payments.
- Billing.
- Ads.
- Analytics connectors.

## Subphase P01.3 — Workspace install and baseline verification

Deliverables:

- pnpm-lock.yaml.
- Verified root workspace scripts.

Acceptance:

- pnpm install succeeds.
- pnpm lint succeeds.
- pnpm typecheck succeeds.
- pnpm test succeeds.
- pnpm build succeeds.
- git diff --check succeeds.

## Subphase P01.4 — Design tokens

Deliverables:

- Semantic color tokens.
- Typography tokens.
- Spacing tokens.
- Radius tokens.
- Shadow tokens.
- Z-index tokens.
- Motion tokens.
- Breakpoint tokens.
- Light and dark theme variables.
- Tenant theme override contract.

Acceptance:

- Tokens are defined once.
- Tailwind consumes tokens.
- CSS variables consume tokens.
- Dark mode works.
- Tenant override mechanism is documented.

## Subphase P01.5 — UI component kit

Deliverables:

- Button.
- IconButton.
- Input.
- Textarea.
- Select.
- Checkbox.
- Radio.
- Switch.
- Card.
- Badge.
- Avatar.
- Tabs.
- Accordion.
- Modal.
- Drawer.
- Toast.
- Tooltip.
- Table.
- Pagination.
- EmptyState.
- Skeleton.
- FileUploader baseline.
- ChartContainer baseline.
- CalendarGrid baseline.

Acceptance:

- Components are accessible.
- Components support keyboard interaction.
- Components support focus visibility.
- Components support dark mode.
- Components support tenant theme overrides.
- Components have deterministic props and variants.

## Subphase P01.6 — Component showcase route

Deliverables:

- A frontend route that displays all P01 components.

Acceptance:

- Route renders without runtime errors.
- Route demonstrates light and dark mode.
- Route demonstrates tenant theme override.
- Route is usable for visual QA.

## Subphase P01.7 — P01 tests and completion gate

Deliverables:

- Unit tests for token resolution.
- Unit tests for critical accessible components.
- Build verification.
- Lint verification.
- Typecheck verification.
- Project state update.

Acceptance:

- All P01 subphases pass.
- PROJECT_STATE.json marks P01 as done.
- P01 commit is pushed.

## P01 completion command pattern

P01 is complete only when this command sequence passes from repository root:

pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
git diff --check

Then PROJECT_STATE.json must show:

P01 status done
currentPhase P02
