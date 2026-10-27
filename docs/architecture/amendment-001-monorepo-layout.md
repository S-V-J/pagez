# Architecture Amendment 001: Monorepo Layout

Status: Approved by maintainer instruction
Date: 2026-10-28
Applies to: PRD.md version 1.0.0
Project root: /home/ML/pagez
Repository: git@github.com:S-V-J/pagez.git

## Purpose

This amendment records an explicit maintainer instruction:

The Pagez repository must be organized with separate frontend and backend directories.

The required physical layout is:

- frontend/ for the installable PWA and influencer-facing UI.
- backend/ for the API, workers, integrations, and server-side domain logic.
- root-level workspace configuration for coordinated development.
- root-level docs and scripts for governance and operations.

This amendment does not replace PRD.md.
PRD.md remains authoritative for product behavior, security, tenant isolation, PWA requirements, monetization, analytics, booking, payments, advertising, and phase completion gates.

## Compatibility with PRD

PRD section 7 allows a TypeScript modular architecture with separated runtime concerns.

This amendment clarifies the physical repository expression of that architecture:

- The frontend runtime lives in frontend/.
- The backend runtime lives in backend/.
- Shared operational scripts live in scripts/.
- Architecture decisions live in docs/architecture/.
- Execution plans live in docs/execution/.

## Target directory layout

The target layout is:

/home/ML/pagez
  PRD.md
  PROJECT_STATE.json
  BLOCKERS.md
  README.md
  LICENSE
  SECURITY.md
  CONTRIBUTING.md
  .gitignore
  .npmrc
  .editorconfig
  package.json
  pnpm-workspace.yaml
  docs/
    architecture/
    execution/
    external-dependencies.md
  scripts/
    pagez
  frontend/
    Next.js App Router TypeScript PWA application.
  backend/
    NestJS TypeScript API and worker application.

## Frontend responsibility

The frontend application is responsible for:

- Installable PWA shell.
- Public influencer portfolio rendering.
- Link-in-bio public pages.
- Service catalog public pages.
- Booking public pages.
- Tenant dashboard UI.
- Superadmin UI.
- Design system and UI kit.
- Client-side offline behavior where supported.
- Service worker registration and update UX.
- SEO metadata, Open Graph metadata, sitemap, and robots output where appropriate.

The frontend must not become the only enforcement boundary for tenant isolation.
Tenant isolation must still be enforced by backend authorization and PostgreSQL row-level security.

## Backend responsibility

The backend application is responsible for:

- Multi-tenant domain and tenant resolution APIs.
- Authentication and session APIs.
- RBAC and permission enforcement.
- Portfolio page and block APIs.
- Link aggregator APIs.
- Service catalog APIs.
- Appointment booking APIs.
- Payment orchestration adapters.
- Subscription billing adapters.
- Advertising integration adapters.
- Web analytics adapters.
- Social media analytics connectors.
- Background workers.
- Webhook ingestion.
- Audit logging.
- Health and readiness endpoints.

The backend must be the authoritative business-logic layer.
The frontend may call backend APIs and may render server-side data, but it must not bypass backend authorization.

## Workspace tooling responsibility

Root-level workspace files coordinate development across frontend and backend.

The root package.json provides aggregate scripts:

- pnpm dev
- pnpm build
- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm verify

These scripts delegate to workspace packages using pnpm recursive execution.

The pnpm-workspace.yaml file declares the workspace packages:

- frontend
- backend

## Security rules preserved

This amendment preserves all PRD security rules:

- Tenant isolation is mandatory.
- PostgreSQL RLS is mandatory for tenant-owned tables.
- Platform admin access must be audited.
- Secrets must never be committed.
- Payment card data must not be stored directly by Pagez.
- Social tokens must be encrypted at rest.
- Ad tracking must respect consent records.
- Webhooks must be signature-verified and replay-protected.
- Logs must not contain plaintext PII.

## Open-source rules preserved

This amendment preserves the open-source posture:

- Pagez core code remains Apache-2.0.
- Copyleft services such as Revive, Matomo, Kill Bill, Hyperswitch, Postiz, Mixpost, Cal.diy, Caddy, Traefik, MinIO, PostgreSQL, Redis, and related components run as isolated services where license boundaries require it.
- No copyleft code is linked into Apache-licensed core modules.
- External proprietary social APIs are accessed only through documented official APIs and adapter layers.

## Phase mapping

P01 is now executed as a sequence of subphases:

- P01.0 Monorepo workspace bootstrap.
- P01.1 Frontend scaffold.
- P01.2 Backend scaffold.
- P01.3 Workspace install and baseline verification.
- P01.4 Design tokens.
- P01.5 UI component kit.
- P01.6 Component showcase route.
- P01.7 P01 tests and completion gate.

P01 is not complete until all P01 subphases pass their verification gates and PROJECT_STATE.json marks P01 as done.

## Operational rule for this chat-guided build

Because Claude Code is not used for implementation, every phase must be executed through explicit chat-guided commands.

The script scripts/claude-next-phase.sh may be used only as a read-only phase inspector with:

bash scripts/claude-next-phase.sh --plan

The execute mode of that script is retired for this project workflow.
