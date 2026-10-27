# Architecture decision log

Records the standing architecture decisions for Pagez. Source of truth: PRD §7
(stack), §8 (multi-tenancy), §9 (data model), §14 (operations). Each entry
below is final unless a maintainer amends `PRD.md`.

## ADR-001 — TypeScript modular monolith

**Decision:** Frontend/BFF is Next.js App Router with TypeScript, Tailwind CSS
and CSS variables, an internally maintained UI primitive library, and
Serwist/Workbox-based service workers. API layer is Next.js route handlers plus
dedicated worker processes.

**Rationale:** SSR/ISR for portfolio SEO, middleware for tenant routing, unified
DX, and open-source licensing (PRD §7.1). The Vite + NestJS alternative is
retained but may only be adopted before P03 is done (PRD §7.1).

**Status:** Adopted at P00.

## ADR-002 — Data and cache layer

**Decision:** PostgreSQL (Drizzle ORM), Redis + BullMQ for cache/queue,
MinIO for S3-compatible object storage.

**Rationale:** Strong relational integrity, RLS for tenant isolation, JSONB,
partitioning; mature open-source queue and storage (PRD §7.2).

**Status:** Adopted at P00.

## ADR-003 — Copyleft isolation

**Decision:** Pagez core remains Apache-2.0. GPL/AGPL-family services (Revive
Adserver, Kill Bill, Matomo where applicable) run as separate network services;
integration via HTTP APIs, webhooks, sidecars, or containers only.

**Rationale:** Preserve openness and reduce license contamination risk
(PRD §7.3).

**Status:** Adopted at P00.

## ADR-004 — Multi-tenancy and routing

**Decision:** Tenant identity = UUID + primary subdomain slug + optional custom
domain. Middleware reads `Host`, resolves tenant via cache then database,
injects tenant context into request scope; RLS enforces isolation at the
database layer.

**Rationale:** Guaranteed cross-tenant isolation and cache keys scoped per
tenant (PRD §8).

**Status:** Adopted at P00.

## ADR-005 — Deployment and operations

**Decision:** Docker Compose for single-node, K3s for multi-node. Caddy or
Traefik as reverse proxy/TLS. Observability via OpenTelemetry, Prometheus,
Grafana, Loki or VictoriaLogs, GlitchTip. `pagez` Bash CLI for local control.

**Rationale:** Reproducible local development and production deployment without
inbound router ports in development (PRD §14).

**Status:** Adopted at P00.
