<!--
FILE: PRD.md
SYSTEMIC ROLE:
  This file is the authoritative product, architecture, UI, security, operations, and AI-execution contract for Pagez.
  Every implementation phase must trace back to a requirement, acceptance criterion, prompt, or verification rule in this document.
  This document is intentionally verbose because it replaces fragmented prompts, scattered notes, and ambiguous assumptions.
-->

# Pagez — Product Requirements Document

Version: `1.0.0`  
Status: `Baseline Approved for Implementation`  
Date: `2026-10-27`  
Project root: `/home/ML/pagez`  
Repository: `git@github.com:S-V-J/pagez.git`  
Application name: `pagez`  
Primary maintainer: `Siddhant Kumar (@S-V-J)`  
Sponsor profile: `https://github.com/sponsors/S-V-J`  
Target license: `Apache-2.0`

---

## 0. Execution Contract

### 0.1 Source-of-truth hierarchy

1. `PRD.md`
2. `PROJECT_STATE.json`
3. `BLOCKERS.md`
4. Phase-specific implementation files
5. Ad hoc conversation context

If any artifact conflicts with `PRD.md`, `PRD.md` wins unless a human maintainer explicitly amends this file.

### 0.2 Phase cursor file

`PROJECT_STATE.json` is the machine-readable execution cursor.

Canonical shape:

```json
{
  "project": "pagez",
  "repository": "git@github.com:S-V-J/pagez.git",
  "sourceOfTruth": "PRD.md",
  "currentPhase": "P00",
  "phases": [
    { "id": "P00", "title": "Repository foundation", "status": "pending" },
    { "id": "P01", "title": "Design system and UI kit", "status": "pending" },
    { "id": "P02", "title": "Multi-tenant application shell", "status": "pending" },
    { "id": "P03", "title": "PostgreSQL baseline and RLS", "status": "pending" },
    { "id": "P04", "title": "Authentication, MFA, RBAC", "status": "pending" },
    { "id": "P05", "title": "PWA shell, manifest, service worker, updates", "status": "pending" },
    { "id": "P06", "title": "Dynamic portfolio site builder", "status": "pending" },
    { "id": "P07", "title": "Social link aggregator", "status": "pending" },
    { "id": "P08", "title": "Service catalog", "status": "pending" },
    { "id": "P09", "title": "Appointment booking engine", "status": "pending" },
    { "id": "P10", "title": "Payment orchestration", "status": "pending" },
    { "id": "P11", "title": "Subscription billing and tier enforcement", "status": "pending" },
    { "id": "P12", "title": "Open-source ad engine integration", "status": "pending" },
    { "id": "P13", "title": "Web analytics integration", "status": "pending" },
    { "id": "P14", "title": "Social media analytics connectors", "status": "pending" },
    { "id": "P15", "title": "Unified analytics dashboard", "status": "pending" },
    { "id": "P16", "title": "Superadmin control plane and forced releases", "status": "pending" },
    { "id": "P17", "title": "WSL pagez command system", "status": "pending" },
    { "id": "P18", "title": "Cloudflare Tunnel development harness", "status": "pending" },
    { "id": "P19", "title": "Observability and audit telemetry", "status": "pending" },
    { "id": "P20", "title": "Security hardening and threat validation", "status": "pending" },
    { "id": "P21", "title": "End-to-end QA and performance gates", "status": "pending" },
    { "id": "P22", "title": "Production deployment topology", "status": "pending" },
    { "id": "P23", "title": "Launch runbook, backup, restore, disaster recovery", "status": "pending" },
    { "id": "P24", "title": "Final release audit and documentation completion", "status": "pending" }
  ]
}
```

Allowed phase statuses:

- `pending`
- `in_progress`
- `blocked`
- `done`
- `failed`

### 0.3 Blocker registry

`BLOCKERS.md` records every external dependency that cannot be fully satisfied in the current environment.

Required format per blocker:

```markdown
## BLOCKER-ID
- Phase:
- Dependency:
- Reason:
- Production replacement:
- Local mock/adapter:
- Security impact:
- Unblock command/input:
```

A blocker is acceptable only when it is explicit, isolated, and does not weaken production readiness.

### 0.4 Global verification gates

Every phase must pass applicable gates before being marked `done`.

Universal gates:

- `git diff --check`
- No secrets committed.
- No unresolved merge conflicts.
- No silent schema drift.
- No requirement implemented without tests or documented verification.

Engineering gates once tooling exists:

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm e2e`
- `bash -n scripts/pagez`
- `pagez doctor`

Product gates:

- PWA installability criteria satisfied.
- Tenant isolation verified.
- Free/premium tier behavior verified.
- Offline behavior verified.
- Accessibility checks passed for touched UI.
- Security review passed for touched auth, payment, ad, or webhook surfaces.

---

## 1. Executive Summary

Pagez is a multi-tenant Progressive Web App platform that allows social media influencers to operate a branded web presence without submitting to app stores.

Each tenant receives:

- A portfolio microsite.
- A link-in-bio hub.
- A service catalog.
- An appointment booking system.
- Payment collection.
- Social analytics.
- Web analytics.
- A freemium monetization layer.

The platform owner retains centralized control over:

- Tenant provisioning.
- Plan enforcement.
- Ad policy.
- Release channels.
- Forced PWA updates.
- Security posture.
- Observability.

The platform must be buildable with open-source software and deployable without proprietary lock-in at the application layer.

---

## 2. Problem Statement

Influencers currently fragment their presence across:

- Link-in-bio tools.
- Scheduling tools.
- Payment links.
- Analytics dashboards.
- Portfolio builders.
- Ad networks.
- Native apps.
- Social platform dashboards.

This creates:

- Higher costs.
- Poor brand control.
- Data fragmentation.
- Vendor lock-in.
- Weak offline/mobile UX.
- No centralized update control for the platform operator.

Pagez solves this by providing one installable PWA per tenant, one admin control plane, and one open-source architecture.

---

## 3. Goals

### 3.1 Product goals

- Provide a production-grade influencer portal PWA.
- Support subdomain and custom-domain tenant routing.
- Support free and premium tiers.
- Support offline-first UX where platform capabilities allow it.
- Support centralized release control across installed PWA clients.
- Provide a unified analytics dashboard across web and social sources.
- Provide booking, services, payments, and link aggregation in one system.

### 3.2 Engineering goals

- 100% open-source application stack.
- Strong tenant isolation.
- Type-safe end-to-end codebase.
- Automated migrations.
- Automated tests.
- Automated accessibility checks.
- Automated PWA audits.
- Reproducible local development.
- Reproducible production deployment.

### 3.3 Operational goals

- One-command local control through `pagez`.
- Secure remote testing through Cloudflare Tunnels.
- No inbound router ports required for development.
- Production-ready logging, metrics, traces, and audit logs.
- Backup and restore drills.

---

## 4. Non-Goals

The following are explicitly out of scope for v1:

- Native iOS/Android store apps.
- Arbitrary scraping of social platforms outside documented APIs.
- Custom ad exchange bidding infrastructure beyond open-source ad server integration.
- Full ERP/accounting suite.
- Video editing.
- Direct message inbox aggregation across all networks.
- Real-time collaborative editing with conflict-free replicated data types.
- Multi-region active-active deployment in v1.

---

## 5. Personas

### 5.1 Influencer tenant owner

Needs:

- Fast setup.
- Brand control.
- Booking.
- Payments.
- Analytics.
- Mobile installable experience.

### 5.2 Visitor/client

Needs:

- Fast portfolio.
- Clear services.
- Easy booking.
- Trustworthy checkout.
- Offline resilience.

### 5.3 Platform superadmin

Needs:

- Tenant lifecycle control.
- Plan enforcement.
- Release control.
- Ad policy control.
- Audit visibility.
- Incident tooling.

### 5.4 Advertiser

Needs:

- Campaign placement.
- Impression/click reporting.
- Targeting controls.
- Billing transparency.

### 5.5 Developer/operator

Needs:

- Clear local commands.
- Deterministic builds.
- Logs.
- Health checks.
- Migration safety.

---

## 6. Core Product Modules

### M1 — Tenant portal engine

Purpose:

- Generate a branded influencer website.

Required capabilities:

- Subdomain support.
- Custom domain support.
- Theme tokens.
- Page builder.
- SEO metadata.
- Open Graph cards.
- Sitemap.
- Robots.
- Canonical URLs.
- Structured data.

### M2 — Link aggregator

Purpose:

- Provide a link-in-bio experience.

Required capabilities:

- Ordered links.
- Click tracking.
- UTM injection.
- QR code generation.
- Expiration dates.
- Toggle visibility.
- Icon/brand support.

### M3 — Service catalog

Purpose:

- Publish sellable influencer services.

Required capabilities:

- Title.
- Description.
- Price.
- Currency.
- Duration.
- Images.
- Terms.
- Active/inactive state.
- Deposit or full payment rules.

### M4 — Appointment booking

Purpose:

- Allow clients to book time with influencers.

Required capabilities:

- Availability rules.
- Timezone handling.
- Buffer times.
- Booking states.
- Reschedule.
- Cancel.
- Confirmation email.
- Calendar export/import.
- Reminder queue.

### M5 — Payments

Purpose:

- Collect payment for services and bookings.

Required capabilities:

- Checkout session.
- Webhook reconciliation.
- Refund support.
- Dispute awareness.
- Receipt generation.
- Idempotency.

### M6 — Subscription billing

Purpose:

- Enforce free/premium tenant plans.

Required capabilities:

- Plan assignment.
- Trial handling.
- Recurring billing.
- Dunning.
- Invoice history.
- Tier feature flags.

### M7 — Advertising

Purpose:

- Monetize free-tier tenants.

Required capabilities:

- Ad zones.
- Placement targeting.
- Impression tracking.
- Click tracking.
- Consent enforcement.
- Premium bypass.

### M8 — Analytics

Purpose:

- Unify tenant performance data.

Required capabilities:

- Web analytics.
- Social follower metrics.
- Engagement metrics.
- Post metrics.
- Date-range filtering.
- Export.
- Source health monitoring.

### M9 — Superadmin control plane

Purpose:

- Operate the platform.

Required capabilities:

- Tenant CRUD.
- Domain approval.
- Plan changes.
- Impersonation with audit.
- Release management.
- Feature flags.
- Incident banners.

### M10 — PWA update controller

Purpose:

- Centralize client application updates.

Required capabilities:

- Release channels.
- Version metadata.
- Forced update flag.
- Minimum supported version.
- Client heartbeat reporting.
- Rollout percentage.

---

## 7. 100% Open-Source Stack Decision

### 7.1 Default architecture decision

Pagez uses a TypeScript modular monolith with separated runtime concerns.

Primary default:

- Frontend/BFF: Next.js App Router.
- Language: TypeScript.
- Styling: Tailwind CSS + CSS variables.
- UI primitives: internally maintained component library.
- PWA layer: Serwist/Workbox-based service worker.
- API layer: Next.js route handlers plus dedicated worker processes.
- Database: PostgreSQL.
- ORM/query layer: Drizzle ORM.
- Cache/queue: Redis + BullMQ.
- Object storage: MinIO.
- Reverse proxy/TLS: Caddy or Traefik.
- Container runtime: Docker Compose for single-node, K3s for multi-node.
- Observability: OpenTelemetry, Prometheus, Grafana, Loki or VictoriaLogs, GlitchTip.

Alternative retained for future pivot:

- Vite + React SPA frontend.
- NestJS backend.
- Same PostgreSQL/Redis/MinIO core.

The alternative is allowed only if changed before `P03` is marked done.

### 7.2 Layer matrix

| Layer | Default | License posture | Reason |
|---|---|---|---|
| Web framework | Next.js | MIT-compatible ecosystem | SSR/ISR for portfolio SEO, middleware for tenant routing, unified DX |
| PWA | Serwist/Workbox | Open-source | Mature service worker tooling, update control, caching strategies |
| API | Next.js route handlers + workers | Open-source | Reduces early complexity while preserving separation |
| Database | PostgreSQL | PostgreSQL License | Strong relational integrity, RLS, JSONB, partitioning |
| ORM | Drizzle ORM | MIT | SQL-first, TypeScript-safe, migration friendly |
| Auth | Auth.js + WebAuthn/TOTP | Open-source | Practical production identity baseline |
| Payments | Hyperswitch | Apache-2.0 | Open-source payment orchestration [[76]] |
| Billing | Kill Bill | Open-source | Subscription billing and invoicing [[77]] |
| Scheduling | Native booking engine | Open-source | Avoids hard dependency on external scheduler |
| Optional scheduling bridge | Cal.diy / Cal.com | Open-source community edition | Optional interoperability [[93]] [[98]] |
| Ads | Revive Adserver | Open-source | Self-hosted ad serving for free tier [[85]] |
| Web analytics | Matomo | Open-source | Privacy-focused self-hosted analytics [[60]] |
| Alternative web analytics | Plausible | Open-source | Lightweight analytics option [[61]] |
| Social connector reference | Postiz | Open-source self-hosted edition | Multi-platform posting/account patterns [[133]] [[137]] |
| Social management alternative | Mixpost | Open-source self-hosted | Alternative social operations stack [[140]] |
| Object storage | MinIO | Open-source | S3-compatible media storage |
| Edge proxy | Caddy/Traefik | Open-source | Automatic TLS, dynamic routing |
| Orchestration | Docker Compose / K3s | Open-source | Local reproducibility and production scaling |
| CI/CD | GitHub Actions initially, Forgejo + Woodpecker for full self-host | Open-source where self-hosted | Pragmatic start, exit path to full autonomy |

### 7.3 Copyleft isolation rule

Some excellent open-source components use GPL/AGPL-family licenses.

Rule:

- Pagez core code remains Apache-2.0.
- GPL/AGPL services run as separate network services.
- No linking or in-process embedding of copyleft code into Apache-licensed core modules.
- Integration occurs through HTTP APIs, webhooks, sidecars, or containers.

This preserves openness while reducing license contamination risk.

### 7.4 External API reality

“Open-source” applies to Pagez code and self-hosted infrastructure.

Social platforms themselves expose proprietary APIs and policies.

Required stance:

- Use documented official APIs first.
- Never bypass platform authentication or terms.
- Maintain adapter layers so commercial or restricted APIs can be replaced or disabled.
- Record all external API costs and limits in `docs/external-dependencies.md`.

---

## 8. Multi-Tenant Architecture

### 8.1 Tenant identity model

A tenant is an influencer workspace.

Tenant identifiers:

- Internal UUID.
- Primary subdomain slug.
- Optional custom domain.
- Plan tier.
- Brand configuration.
- Feature flags.

### 8.2 Routing flow

Public request flow:

1. DNS resolves tenant hostname to edge layer.
2. Edge layer terminates TLS and forwards `Host`.
3. Application middleware reads `Host`.
4. Tenant resolver checks cache, then database.
5. Resolver matches:
   - `subdomain.pagez.example`
   - or verified `custom-domain.com`
6. Tenant context is injected into request scope.
7. Application renders tenant-specific shell, manifest, and content.
8. RLS enforces tenant data isolation at database layer.

### 8.3 Domain types

#### Platform subdomain

Format:

- `{slug}.pagez.example`

Purpose:

- Default onboarding domain.
- Guaranteed TLS.
- Controlled PWA scope.

#### Custom domain

Format:

- `influencername.com`

Requirements:

- DNS verification.
- CNAME or A/AAAA to edge layer.
- ACME certificate issuance.
- Failure diagnostics.
- Revocation/disabled state handling.

### 8.4 Local multi-tenant development

Supported local patterns:

- `/etc/hosts` entries for named test tenants.
- `dnsmasq` for wildcard local domains.
- Cloudflare Tunnel wildcard hostname for remote testing.

Examples:

- `alex.pagez.localhost`
- `sam.pagez.localhost`
- `*.pagez.test`

Cloudflared supports wildcard hostnames at the left label, but not wildcards embedded in the middle of a hostname [[186]].

### 8.5 Tenant isolation requirements

Mandatory:

- Every tenant-owned row carries `tenant_id`.
- PostgreSQL RLS enabled on tenant-owned tables.
- Application sets `app.tenant_id` per request.
- Platform admin operations set `app.platform_admin=true` only through audited paths.
- Cross-tenant access tests must fail closed.
- Cache keys must include tenant scope.
- Signed URLs must include tenant scope.
- Background jobs must carry tenant context explicitly.

---

## 9. PostgreSQL Data Model

### 9.1 Design principles

- UUID primary keys.
- Timestamps with time zone.
- Enums for finite state machines.
- JSONB for flexible tenant settings.
- Partitioning for high-volume metrics.
- RLS for tenant isolation.
- Auditability for privileged actions.

### 9.2 Canonical baseline schema

```sql
-- Extension for UUID generation and hashing utilities.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Enumerations used across the platform.
CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'enterprise');
CREATE TYPE domain_status AS ENUM ('pending_dns', 'pending_verification', 'active', 'disabled', 'failed');
CREATE TYPE tls_status AS ENUM ('none', 'pending', 'active', 'failed');
CREATE TYPE booking_status AS ENUM ('draft', 'pending', 'confirmed', 'cancelled', 'completed', 'no_show', 'rescheduled');
CREATE TYPE payment_status AS ENUM ('created', 'pending', 'authorized', 'captured', 'failed', 'refunded', 'partially_refunded', 'disputed');
CREATE TYPE release_channel_name AS ENUM ('local', 'development', 'staging', 'production');
CREATE TYPE social_platform AS ENUM ('instagram', 'youtube', 'tiktok', 'x', 'facebook', 'linkedin', 'mastodon', 'bluesky', 'threads', 'pinterest');

-- Tenants are the influencer workspaces.
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(63) UNIQUE NOT NULL,
    display_name VARCHAR(160) NOT NULL,
    tier subscription_tier NOT NULL DEFAULT 'free',
    timezone VARCHAR(64) NOT NULL DEFAULT 'UTC',
    locale VARCHAR(16) NOT NULL DEFAULT 'en',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    onboarded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Global user identities.
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email CITEXT UNIQUE NOT NULL,
    password_hash TEXT,
    display_name VARCHAR(160),
    avatar_url TEXT,
    mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    is_platform_admin BOOLEAN NOT NULL DEFAULT FALSE,
    email_verified_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Roles are global permission bundles.
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Permissions are atomic capabilities.
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(128) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Role to permission mapping.
CREATE TABLE role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Tenant membership links users to tenants with a role.
CREATE TABLE tenant_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    status VARCHAR(32) NOT NULL DEFAULT 'active',
    invited_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tenant_id, user_id)
);

-- Domains owned by tenants.
CREATE TABLE domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    hostname VARCHAR(255) UNIQUE NOT NULL,
    domain_type VARCHAR(32) NOT NULL DEFAULT 'custom',
    status domain_status NOT NULL DEFAULT 'pending_dns',
    verification_token VARCHAR(128),
    tls tls_status NOT NULL DEFAULT 'none',
    last_checked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tenant site configuration.
CREATE TABLE site_settings (
    tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    tagline TEXT,
    bio TEXT,
    logo_asset_id UUID,
    favicon_asset_id UUID,
    og_image_asset_id UUID,
    theme JSONB NOT NULL DEFAULT '{}'::jsonb,
    seo JSONB NOT NULL DEFAULT '{}'::jsonb,
    social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
    contact JSONB NOT NULL DEFAULT '{}'::jsonb,
    analytics JSONB NOT NULL DEFAULT '{}'::jsonb,
    ads JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pages belong to tenants.
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    slug VARCHAR(160) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    seo JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tenant_id, slug)
);

-- Blocks are ordered page content units.
CREATE TABLE blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    block_type VARCHAR(64) NOT NULL,
    position INT NOT NULL,
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (page_id, position)
);

-- Link aggregator entries.
CREATE TABLE links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    title VARCHAR(160) NOT NULL,
    url TEXT NOT NULL,
    icon VARCHAR(64),
    position INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    starts_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    utm JSONB NOT NULL DEFAULT '{}'::jsonb,
    click_count BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sellable services.
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    slug VARCHAR(160) NOT NULL,
    title VARCHAR(200) NOT NULL,
    summary TEXT,
    description TEXT,
    price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
    deposit_percent NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (deposit_percent BETWEEN 0 AND 100),
    cancellation_policy TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    media JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tenant_id, slug)
);

-- Recurring availability windows.
CREATE TABLE service_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    weekday SMALLINT NOT NULL CHECK (weekday BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    buffer_before_minutes INT NOT NULL DEFAULT 0,
    buffer_after_minutes INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Appointments/bookings.
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    booked_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    client_name VARCHAR(160) NOT NULL,
    client_email CITEXT NOT NULL,
    client_phone VARCHAR(40),
    timezone VARCHAR(64) NOT NULL DEFAULT 'UTC',
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status booking_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    cancellation_reason TEXT,
    reschedule_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Appointment state transition audit trail.
CREATE TABLE appointment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    actor_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    from_status booking_status,
    to_status booking_status NOT NULL,
    reason TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Payments captured through orchestration layer.
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    provider VARCHAR(64) NOT NULL,
    provider_payment_id VARCHAR(255),
    amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
    currency CHAR(3) NOT NULL,
    status payment_status NOT NULL DEFAULT 'created',
    idempotency_key VARCHAR(255) UNIQUE NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tenant subscriptions for SaaS monetization.
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    plan_key VARCHAR(64) NOT NULL,
    tier subscription_tier NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'active',
    provider_customer_id VARCHAR(255),
    provider_subscription_id VARCHAR(255),
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Invoices issued by billing system.
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    invoice_number VARCHAR(64) UNIQUE,
    amount NUMERIC(12,2) NOT NULL,
    currency CHAR(3) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    issued_at TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    pdf_asset_id UUID,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ad zones mapped to tenant placements.
CREATE TABLE ad_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    code VARCHAR(64) NOT NULL,
    name VARCHAR(160) NOT NULL,
    format VARCHAR(32) NOT NULL DEFAULT 'banner',
    provider_zone_id VARCHAR(128),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tenant_id, code)
);

-- Ad placements define where zones render.
CREATE TABLE ad_placements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    ad_zone_id UUID NOT NULL REFERENCES ad_zones(id) ON DELETE CASCADE,
    surface VARCHAR(64) NOT NULL,
    position INT NOT NULL DEFAULT 0,
    targeting JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ad impression and click event stream.
CREATE TABLE ad_events (
    id BIGSERIAL PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    ad_zone_id UUID NOT NULL REFERENCES ad_zones(id) ON DELETE CASCADE,
    event_type VARCHAR(16) NOT NULL CHECK (event_type IN ('impression', 'click')),
    viewer_hash VARCHAR(128),
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revenue_micros BIGINT NOT NULL DEFAULT 0,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Connected social accounts.
CREATE TABLE social_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    platform social_platform NOT NULL,
    external_account_id VARCHAR(255) NOT NULL,
    display_name VARCHAR(200),
    profile_url TEXT,
    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMPTZ,
    status VARCHAR(32) NOT NULL DEFAULT 'connected',
    scopes TEXT[],
    last_synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tenant_id, platform, external_account_id)
);

-- Normalized daily social metrics.
CREATE TABLE social_metrics_daily (
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
    metric_date DATE NOT NULL,
    metric_key VARCHAR(128) NOT NULL,
    metric_value NUMERIC(18,4) NOT NULL,
    source VARCHAR(64) NOT NULL,
    collected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (account_id, metric_date, metric_key)
) PARTITION BY RANGE (metric_date);

-- Example initial partition.
CREATE TABLE social_metrics_daily_2026 PARTITION OF social_metrics_daily
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

-- Web analytics property mapping.
CREATE TABLE web_analytics_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    provider VARCHAR(64) NOT NULL,
    external_site_id VARCHAR(128) NOT NULL,
    api_endpoint TEXT,
    auth_token_encrypted TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tenant_id, provider, external_site_id)
);

-- Media assets stored in object storage.
CREATE TABLE media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    storage_key TEXT NOT NULL,
    original_filename VARCHAR(255),
    mime_type VARCHAR(120) NOT NULL,
    byte_size BIGINT NOT NULL,
    width INT,
    height INT,
    sha256 VARCHAR(64) NOT NULL,
    alt_text TEXT,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tenant_id, storage_key)
);

-- Immutable-ish audit log for privileged and security-relevant actions.
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    actor_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    actor_role VARCHAR(64),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id VARCHAR(128),
    ip inet,
    user_agent TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Release channels for PWA rollout control.
CREATE TABLE release_channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name release_channel_name NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Deployments represent publishable app versions.
CREATE TABLE release_deployments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id UUID NOT NULL REFERENCES release_channels(id) ON DELETE CASCADE,
    version VARCHAR(64) NOT NULL,
    build_hash VARCHAR(128) NOT NULL,
    manifest_hash VARCHAR(128) NOT NULL,
    service_worker_hash VARCHAR(128) NOT NULL,
    force_update BOOLEAN NOT NULL DEFAULT FALSE,
    min_supported_version VARCHAR(64),
    rollout_percent SMALLINT NOT NULL DEFAULT 100 CHECK (rollout_percent BETWEEN 0 AND 100),
    notes TEXT,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (channel_id, version)
);

-- PWA client heartbeat/reporting table.
CREATE TABLE pwa_client_reports (
    id BIGSERIAL PRIMARY KEY,
    installation_id UUID NOT NULL,
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    deployment_id UUID REFERENCES release_deployments(id) ON DELETE SET NULL,
    platform VARCHAR(64),
    browser VARCHAR(64),
    app_version VARCHAR(64),
    reported_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Outbound webhook endpoints.
CREATE TABLE webhook_endpoints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    secret_hash TEXT NOT NULL,
    events TEXT[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Scoped API tokens.
CREATE TABLE api_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    prefix VARCHAR(12) NOT NULL,
    hash TEXT NOT NULL,
    scopes TEXT[] NOT NULL DEFAULT '{}',
    last_used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tenant_id, prefix)
);

-- Consent records for ads/analytics compliance.
CREATE TABLE consent_records (
    id BIGSERIAL PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    subject_hash VARCHAR(128) NOT NULL,
    purpose VARCHAR(64) NOT NULL,
    granted BOOLEAN NOT NULL,
    source VARCHAR(64) NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Helper to read tenant context safely.
CREATE OR REPLACE FUNCTION current_tenant_id()
RETURNS UUID
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(current_setting('app.tenant_id', true), '')::UUID;
$$;

-- Apply RLS to all tenant-owned tables.
DO $$
DECLARE
  tenant_tables TEXT[] := ARRAY[
    'domains',
    'site_settings',
    'pages',
    'blocks',
    'links',
    'services',
    'service_availability',
    'appointments',
    'appointment_events',
    'payments',
    'subscriptions',
    'invoices',
    'ad_zones',
    'ad_placements',
    'ad_events',
    'social_accounts',
    'social_metrics_daily',
    'web_analytics_properties',
    'media_assets',
    'audit_logs',
    'pwa_client_reports',
    'webhook_endpoints',
    'api_tokens',
    'consent_records'
  ];
  t TEXT;
BEGIN
  FOREACH t IN ARRAY tenant_tables LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('ALTER TABLE %I FORCE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON %I', t);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON %I USING (tenant_id = current_tenant_id() OR coalesce(current_setting(''app.platform_admin'', true), ''false'') = ''true'')',
      t
    );
  END LOOP;
END $$;

-- Useful indexes.
CREATE INDEX idx_tenant_members_user ON tenant_members(user_id);
CREATE INDEX idx_pages_tenant_status ON pages(tenant_id, status);
CREATE INDEX idx_blocks_page_position ON blocks(page_id, position);
CREATE INDEX idx_links_tenant_active_position ON links(tenant_id, is_active, position);
CREATE INDEX idx_services_tenant_active ON services(tenant_id, is_active);
CREATE INDEX idx_appointments_tenant_start ON appointments(tenant_id, start_time);
CREATE INDEX idx_payments_provider_payment ON payments(provider, provider_payment_id);
CREATE INDEX idx_social_metrics_date ON social_metrics_daily(metric_date);
CREATE INDEX idx_ad_events_tenant_occurred ON ad_events(tenant_id, occurred_at);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
```

### 9.3 State machine rules

Appointment states:

- `draft` → `pending`
- `pending` → `confirmed`
- `pending` → `cancelled`
- `confirmed` → `completed`
- `confirmed` → `cancelled`
- `confirmed` → `no_show`
- `confirmed` → `rescheduled`
- `rescheduled` → `confirmed`

Rules:

- Every transition writes to `appointment_events`.
- Cancellation policy is evaluated before state change.
- Payment reconciliation must not mutate appointment state directly without event logging.

---

## 10. Functional Requirements

### FR-PORTFOLIO-001 — Dynamic portfolio generation

Requirement:

- Tenant owner can create, edit, preview, and publish portfolio pages.

Acceptance:

- Drag-and-drop block editor.
- Block types: hero, about, gallery, testimonials, contact, embed, CTA.
- Draft and published states.
- SEO title/description per page.
- OG image support.
- Tenant theme applied consistently.

### FR-LINKS-001 — Link aggregator

Requirement:

- Tenant owner can manage ordered outbound links.

Acceptance:

- Reorder via UI.
- Activate/deactivate.
- Schedule start/end.
- Click counter.
- UTM injection.
- QR code export.

### FR-SERVICES-001 — Service catalog

Requirement:

- Tenant owner can publish bookable services.

Acceptance:

- Price, currency, duration.
- Deposit percentage.
- Active/inactive.
- Media gallery.
- Terms and cancellation policy.

### FR-BOOKING-001 — Appointment booking

Requirement:

- Visitors can book available time slots.

Acceptance:

- Timezone-correct slot calculation.
- Buffer rules.
- Double-booking prevention.
- Confirmation email.
- Calendar file export.
- Reschedule and cancel flows.

### FR-PAYMENT-001 — Payment collection

Requirement:

- Bookings and services can require payment.

Acceptance:

- Hosted checkout or secure fields.
- Webhook reconciliation.
- Idempotent processing.
- Refund initiation.
- Receipt generation.

### FR-BILLING-001 — Freemium tier enforcement

Requirement:

- Platform charges tenants for premium features.

Acceptance:

- Free tier limits.
- Premium unlocks.
- Trial handling.
- Dunning states.
- Invoice history.

### FR-ADS-001 — Free-tier advertising

Requirement:

- Free tenants render ads; premium tenants do not.

Acceptance:

- Zone mapping.
- Consent gate.
- Impression/click tracking.
- Fallback house ads.
- Premium bypass verified.

### FR-ANALYTICS-001 — Unified dashboard

Requirement:

- Tenant sees web and social metrics in one place.

Acceptance:

- Date range selection.
- Platform filters.
- Metric normalization.
- Export CSV.
- Source health indicators.

### FR-PWA-001 — Installable cross-platform app

Requirement:

- PWA installable on supported Chromium, Android, iOS, macOS, Windows surfaces.

Acceptance:

- Valid manifest.
- HTTPS or localhost.
- Service worker registered.
- Standalone display.
- Icons and splash assets.
- Install prompt UX where supported.

### FR-PWA-002 — Centralized update control

Requirement:

- Platform owner can control client updates.

Acceptance:

- Release metadata endpoint.
- Force update flag.
- Minimum supported version.
- Rollout percentage.
- Client heartbeat reporting.
- Graceful degradation where background wake is unavailable.

### FR-ADMIN-001 — Superadmin control plane

Requirement:

- Operator can manage tenants and releases.

Acceptance:

- Tenant search.
- Plan change.
- Domain approval.
- Impersonation with audit.
- Release promotion.
- Feature flags.

### FR-OPS-001 — WSL command system

Requirement:

- Local operator controls the stack through `pagez`.

Acceptance:

- `start`, `stop`, `restart`, `status`, `logs`, `enable`, `disable`, `doctor`.
- Background execution.
- Persistent logs.
- Clean shutdown.
- Clear error messages.

---

## 11. PWA Requirements

### 11.1 Manifest contract

Each installable origin must serve a manifest containing at least:

- `id`
- `name`
- `short_name`
- `description`
- `start_url`
- `scope`
- `display`
- `theme_color`
- `background_color`
- `icons`
- `screenshots`
- `shortcuts`

Recommended values:

- `display`: `standalone`
- `orientation`: `any`
- Icons:
  - `192x192`
  - `512x512`
  - maskable variant
- Apple touch icon:
  - `180x180`

### 11.2 Installability rules

Mandatory:

- HTTPS in production.
- Localhost allowed for development.
- Manifest linked from every installable page.
- Service worker registered with appropriate scope.
- No `prefer_related_applications: true`.

### 11.3 Service worker strategy

Caching:

- Precache app shell.
- Runtime cache:
  - Static assets: `CacheFirst`.
  - API GET responses: `NetworkFirst` with expiration.
  - Images: `CacheFirst`.
  - Fonts: `CacheFirst`.
  - HTML navigation: `NetworkFirst` with offline fallback.

Offline:

- Offline fallback page.
- Queued mutations where supported.
- IndexedDB draft persistence for booking/forms.
- Explicit online/offline banner.

Update control:

- Check release endpoint on activation and foreground intervals.
- If `forceUpdate` is true:
  - skip waiting.
  - claim clients.
  - reload controlled clients.
- If rollout percent excludes client:
  - retain current version.
- Report installed version to `pwa_client_reports`.

Platform notes:

- `autoUpdate` behavior can force `clientsClaim` and `skipWaiting` [[164]].
- iOS has reduced background sync and background processing capability [[168]].
- Therefore forced updates on iOS are best-effort on next foreground launch.

### 11.4 Install UX

- Custom install button where `beforeinstallprompt` is supported.
- iOS manual “Share → Add to Home Screen” guidance.
- Post-install confirmation.
- Dismissal persistence.

---

## 12. UI/UX Production Requirements

### 12.1 Design system

Required tokens:

- Color scales.
- Semantic colors.
- Typography scale.
- Spacing scale.
- Radius.
- Shadows.
- Z-index map.
- Motion durations.
- Breakpoints.

Tenant branding overrides:

- Primary color.
- Accent color.
- Logo.
- Font pairing.
- Corner radius preset.
- Dark/light preference.

### 12.2 Component library

Required primitives:

- Button.
- IconButton.
- Input.
- Textarea.
- Select.
- Combobox.
- Checkbox.
- Radio.
- Switch.
- Slider.
- DatePicker.
- TimePicker.
- Card.
- Badge.
- Avatar.
- Tabs.
- Accordion.
- Modal.
- Drawer.
- Toast.
- Tooltip.
- Popover.
- Menu.
- Table.
- Pagination.
- EmptyState.
- Skeleton.
- FileUploader.
- ChartContainer.
- CalendarGrid.

### 12.3 Required screens

#### Public tenant

- Home/portfolio.
- Links.
- Services.
- Booking.
- Checkout.
- Confirmation.
- Contact.
- Offline fallback.

#### Tenant dashboard

- Overview.
- Site builder.
- Links.
- Services.
- Calendar.
- Bookings.
- Payments.
- Analytics.
- Audience.
- Ads.
- Domain settings.
- Team.
- Integrations.
- PWA/install.
- Account/security.

#### Superadmin

- Tenants.
- Domains.
- Plans.
- Releases.
- Ad operations.
- Feature flags.
- Audit explorer.
- System health.
- Incident banners.

### 12.4 Accessibility

- WCAG 2.2 AA target.
- Keyboard operability.
- Visible focus.
- Screen-reader labels.
- Color contrast enforcement.
- Reduced motion support.
- Form error association.

### 12.5 Performance budgets

Initial targets:

- LCP ≤ 2.5s on 4G.
- INP ≤ 200ms.
- CLS ≤ 0.1.
- Initial JS ≤ 200KB gzipped.
- Lighthouse PWA audit pass.
- Service worker update latency ≤ 1 foreground refresh after forced release.

---

## 13. Security and Compliance Requirements

### 13.1 Authentication

- Password hashing with Argon2id.
- MFA support:
  - TOTP.
  - WebAuthn/passkeys.
- Session rotation.
- Device listing.
- Breach password check.
- Rate-limited login and OTP endpoints.

### 13.2 Authorization

- RBAC with explicit permissions.
- Tenant scoping enforced in API and database.
- Platform admin actions audited.
- Impersonation requires:
  - reason.
  - expiry.
  - banner.
  - audit log.

### 13.3 Data protection

- TLS 1.2+ everywhere.
- Encryption at rest for database and object storage.
- Encrypted tokens/secrets in DB.
- No plaintext PII in logs.
- Retention policies for analytics and audit logs.
- Export/delete workflows for tenant data.

### 13.4 Web security

- Strict CSP.
- CSRF protection.
- SameSite cookies.
- Signed session cookies.
- Subresource Integrity where applicable.
- Security headers:
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - `Strict-Transport-Security`

### 13.5 Webhooks and APIs

- HMAC-signed webhooks.
- Timestamp tolerance.
- Replay protection.
- Idempotency keys.
- Scoped API tokens.
- Rate limits per tenant and per token.

### 13.6 Payments

- Never store raw card data.
- Use hosted fields or redirect flows.
- Maintain PCI SAQ-A posture where possible.
- Reconcile provider webhooks with local payment records.

### 13.7 Advertising and analytics consent

- Consent mode before ad/personalization tracking.
- Record consent in `consent_records`.
- Respect global privacy control where detectable.
- Provide tenant-level disclosure text.

---

## 14. Operations Requirements

### 14.1 `pagez` CLI contract

Command:

```bash
pagez <subcommand>
```

Subcommands:

- `start`
- `stop`
- `restart`
- `status`
- `logs`
- `enable`
- `disable`
- `doctor`
- `tunnel`

Behavior:

- `start`:
  - Starts required services in background.
  - Waits for health checks.
  - Prints access URLs.
- `stop`:
  - Gracefully stops services.
  - Preserves logs.
- `restart`:
  - Stop then start.
- `status`:
  - Shows service state, ports, health, version, tunnel state.
- `logs`:
  - Streams logs.
  - Supports optional service filter and `--since`.
- `enable`:
  - Enables autostart in background.
  - Uses systemd user services when available.
  - Falls back to PM2 when systemd is unavailable.
- `disable`:
  - Disables autostart.
- `doctor`:
  - Validates WSL, Node, pnpm, Docker, ports, Git remote, TLS, service health.
- `tunnel`:
  - Starts or inspects Cloudflare Tunnel dev harness.

State locations:

- Config: `~/.config/pagez/`
- Logs: `~/.local/state/pagez/logs/`
- Runtime: `~/.local/state/pagez/run/`
- Units: `~/.config/systemd/user/`

### 14.2 Cloudflare Tunnel development harness

Requirements:

- No inbound router ports.
- Wildcard hostname support for tenant subdomains.
- Public HTTPS URL for PWA testing.
- Cache bypass for:
  - `/sw.js`
  - `/manifest.webmanifest`
  - `/api/pwa/release`
- Origin can be local HTTP service.
- Tunnel config stored outside repository.

Expected topology:

```text
[ Mobile/Test Browser ]
        |
        | HTTPS
        v
[ Cloudflare Edge ]
        |
        | Tunnel
        v
[ WSL Local App :3000 ]
```

### 14.3 Production topology

Single-node MVP:

- Docker Compose.
- Caddy/Traefik edge.
- PostgreSQL.
- Redis.
- MinIO.
- App container.
- Worker container.
- Revive container.
- Matomo container.

Scaled production:

- K3s or VM cluster.
- PostgreSQL primary/replica.
- PgBouncer.
- Redis Sentinel or cluster.
- MinIO distributed mode.
- Multiple app pods.
- Dedicated worker pool.
- Object storage CDN integration.
- Central observability stack.

### 14.4 Backup and recovery

Required:

- Daily encrypted PostgreSQL backups.
- WAL archiving.
- MinIO bucket replication or versioning.
- Restore drill documented and tested.
- RPO target: ≤ 15 minutes.
- RTO target: ≤ 1 hour for single-node.

---

## 15. Analytics Requirements

### 15.1 Web analytics

Default provider:

- Matomo self-hosted.

Reason:

- Open-source.
- Privacy-oriented.
- Self-hostable.
- Suitable for tenant property isolation [[60]].

Optional provider:

- Plausible for lightweight deployments [[61]].

Required metrics:

- Visitors.
- Pageviews.
- Referrers.
- Devices.
- Countries.
- Conversion events:
  - link click.
  - booking started.
  - booking confirmed.
  - payment completed.

### 15.2 Social analytics connectors

Required v1 platforms:

- Instagram.
- YouTube.
- TikTok.
- X.
- Facebook Pages.
- LinkedIn.
- Mastodon.
- Bluesky.

Platform notes:

- Instagram insights are available through official Instagram Platform APIs for authorized professional accounts [[102]].
- YouTube Analytics API provides channel and video metrics [[117]].
- TikTok Display API can provide profile and video data [[109]].
- X API pricing no longer provides a practical free read tier, so cost controls and fallback imports are mandatory [[126]].

### 15.3 Normalization model

All connectors map into:

- `social_accounts`
- `social_metrics_daily`

Metric keys:

- `followers_total`
- `reach_daily`
- `impressions_daily`
- `engagements_daily`
- `profile_visits_daily`
- `video_views_daily`
- `watch_time_minutes_daily`
- `likes_total`
- `comments_total`
- `shares_total`

### 15.4 Connector reliability rules

- Per-platform rate limiter.
- Exponential backoff.
- Token refresh lock.
- Sync cursor.
- Dead-letter queue.
- Source health page.
- Manual CSV import fallback.

---

## 16. Advertising Requirements

### 16.1 Provider

Default:

- Revive Adserver self-hosted.

Reason:

- Open-source ad serving [[85]].

### 16.2 Rendering rules

- Only free-tier tenants render ads.
- Premium tenants bypass all ad slots.
- Ad slots reserve layout space to prevent CLS.
- Consent required before personalized ads.
- Non-personalized fallback allowed without consent where legally required.

### 16.3 Event tracking

- Impression pixel.
- Click-through URL wrapper.
- Duplicate suppression window.
- Tenant revenue attribution.
- Daily rollup job.

### 16.4 Operational controls

- House campaigns.
- Category blockers.
- Creative review queue.
- Fill-rate monitoring.
- Ad-blocker fallback message.

---

## 17. Prompt Backlog to Complete Pagez 100%

Execution rule:

- Run prompts in order.
- Do not skip phases.
- Each prompt must update `PROJECT_STATE.json` only after verification passes.

### P00 — Repository foundation

```text
You are the Pagez repository bootstrap engineer. Work only in /home/ML/pagez. Read PRD.md sections 0, 7, 14, 17, and 20. Create the initial repository foundation: README.md, .gitignore, LICENSE with full Apache-2.0 text, .github/FUNDING.yml containing only the active GitHub Sponsors entry for S-V-J, SECURITY.md, CONTRIBUTING.md, docs/architecture/decision-log.md, docs/external-dependencies.md, PROJECT_STATE.json initialized to P00, BLOCKERS.md, and scripts/pagez as an executable Bash entrypoint with help, doctor, start, stop, restart, status, logs, enable, disable, and tunnel subcommands. The script must fail with explicit phase-dependency messages where later phases own the implementation. Do not leave placeholder markers. Verify with bash -n scripts/pagez, git diff --check, and a file existence check. Return a file inventory and verification transcript.
```

### P01 — Design system and UI kit

```text
You are the Pagez design-system engineer. Work in /home/ML/pagez. Read PRD.md sections 12 and 17. Create the foundational UI system: Tailwind configuration, CSS custom properties, semantic tokens, dark mode, tenant theme override mechanism, base component library, accessible form controls, toast system, modal/drawer primitives, table primitives, chart container, calendar grid, empty states, skeletons, and a component showcase route. Add unit tests for token resolution and accessibility-critical components. Verify with lint, typecheck, unit tests, and a screenshot smoke test if a visual runner is available. Update PROJECT_STATE.json only on success.
```

### P02 — Multi-tenant application shell

```text
You are the Pagez frontend platform engineer. Work in /home/ML/pagez. Read PRD.md sections 8, 11, 12, and 17. Implement the Next.js App Router shell with middleware-based host resolution, tenant context provider, public tenant layout, dashboard layout, superadmin layout, error boundaries, not-found pages, robots, sitemap, canonical URL handling, Open Graph generation, and cached tenant lookup with invalidation. Add unit tests for hostname parsing, subdomain extraction, custom-domain matching, and cache key scoping. Verify with lint, typecheck, tests, and build. Update PROJECT_STATE.json only on success.
```

### P03 — PostgreSQL baseline and RLS

```text
You are the Pagez database engineer. Work in /home/ML/pagez. Read PRD.md section 9 and the baseline SQL. Create Drizzle schema definitions, migration files, RLS policies, partition management for social_metrics_daily, seed data for roles/permissions/release channels, and rollback-safe migration scripts. Add integration tests proving cross-tenant reads fail closed, platform-admin bypass works only with explicit context, and appointment state transitions emit audit events. Verify with database migration up/down, integration tests, and lint/typecheck. Update PROJECT_STATE.json only on success.
```

### P04 — Authentication, MFA, RBAC

```text
You are the Pagez identity engineer. Work in /home/ML/pagez. Read PRD.md sections 13 and 17. Implement authentication flows: signup, login, logout, password reset, email verification, TOTP MFA, WebAuthn/passkey support, session management, device listing, tenant invitation, role assignment, permission checks, and audit logging. Add rate limiting and brute-force protection. Verify with unit tests, integration tests, and a security test matrix covering privilege escalation attempts and cross-tenant access attempts. Update PROJECT_STATE.json only on success.
```

### P05 — PWA shell, manifest, service worker, updates

```text
You are the Pagez PWA engineer. Work in /home/ML/pagez. Read PRD.md sections 11 and 17. Implement the installable PWA layer: manifest generation per origin, icon pipeline, apple-touch icons, service worker registration, Workbox/Serwist caching strategies, offline fallback, online/offline detection, background sync queue where supported, IndexedDB draft persistence, beforeinstallprompt handling, iOS install guidance, release metadata endpoint, forced update controller, rollout percentage logic, and client heartbeat reporting. Verify with build output inspection, service worker unit tests, Lighthouse PWA audit, and an offline simulation test. Update PROJECT_STATE.json only on success.
```

### P06 — Dynamic portfolio site builder

```text
You are the Pagez site-builder engineer. Work in /home/ML/pagez. Read PRD.md sections 6, 10, 12, and 17. Implement the tenant portfolio builder: page CRUD, block editor, drag-and-drop ordering, block schemas, live preview, publish/unpublish, SEO fields, OG image selection, theme application, structured data, and public rendering routes. Add tests for block validation, draft/publish transitions, and tenant-scoped access. Verify with unit tests, integration tests, and build. Update PROJECT_STATE.json only on success.
```

### P07 — Social link aggregator

```text
You are the Pagez links engineer. Work in /home/ML/pagez. Read PRD.md sections 6, 10, and 17. Implement link CRUD, reordering, scheduling, UTM injection, click tracking, QR generation, active/inactive state, and public link hub rendering. Add tests for URL validation, redirect safety, click counting idempotency, and tenant isolation. Verify with lint, typecheck, tests, and build. Update PROJECT_STATE.json only on success.
```

### P08 — Service catalog

```text
You are the Pagez commerce catalog engineer. Work in /home/ML/pagez. Read PRD.md sections 6, 10, and 17. Implement service CRUD, pricing, currency, duration, deposit rules, media attachments, active/inactive state, public service listing, and service detail pages. Add validation tests for price boundaries, duration constraints, and tenant ownership. Verify with unit tests, integration tests, and build. Update PROJECT_STATE.json only on success.
```

### P09 — Appointment booking engine

```text
You are the Pagez scheduling engineer. Work in /home/ML/pagez. Read PRD.md sections 6, 9, 10, and 17. Implement availability rules, slot generation, timezone conversion, buffer handling, double-booking prevention, booking state machine, reschedule/cancel flows, confirmation emails, calendar export/import, reminder job scaffolding, and public booking UI. Add tests for DST boundaries, concurrency conflicts, state transitions, and tenant isolation. Verify with integration tests and build. Update PROJECT_STATE.json only on success.
```

### P10 — Payment orchestration

```text
You are the Pagez payments engineer. Work in /home/ML/pagez. Read PRD.md sections 7, 10, 13, and 17. Integrate Hyperswitch as the open-source payment orchestrator. Implement checkout session creation, webhook ingestion, signature verification, idempotent event processing, payment state mapping, refund initiation, receipt generation, and provider abstraction tests using a local simulator or mock connector. Verify with contract tests, webhook replay tests, and failure-mode tests. Update PROJECT_STATE.json only on success.
```

### P11 — Subscription billing and tier enforcement

```text
You are the Pagez billing engineer. Work in /home/ML/pagez. Read PRD.md sections 6, 7, 10, and 17. Integrate Kill Bill for tenant subscription billing. Implement plan catalog, trial handling, recurring invoices, dunning states, entitlement sync into tenant tier, premium feature gating, and billing portal links. Add tests for downgrade, cancellation, failed payment, and entitlement propagation. Verify with integration tests and build. Update PROJECT_STATE.json only on success.
```

### P12 — Open-source ad engine integration

```text
You are the Pagez advertising engineer. Work in /home/ML/pagez. Read PRD.md sections 6, 10, 13, 16, and 17. Integrate Revive Adserver as a isolated self-hosted service. Implement ad zone mapping, placement rendering, consent gating, impression/click tracking, house ad fallback, premium bypass, and daily revenue rollups. Add tests for consent enforcement, CLS-stable slot rendering, and tenant tier gating. Verify with integration tests and build. Update PROJECT_STATE.json only on success.
```

### P13 — Web analytics integration

```text
You are the Pagez web-analytics engineer. Work in /home/ML/pagez. Read PRD.md sections 15 and 17. Integrate Matomo as the default self-hosted web analytics provider. Implement tenant property provisioning, tracking snippet injection, event taxonomy, dashboard widgets, date-range queries, export CSV, and source health monitoring. Add tests for property isolation and API retry behavior. Verify with integration tests and build. Update PROJECT_STATE.json only on success.
```

### P14 — Social media analytics connectors

```text
You are the Pagez social-analytics engineer. Work in /home/ML/pagez. Read PRD.md sections 15 and 17. Implement connector adapters for Instagram, YouTube, TikTok, X, Facebook Pages, LinkedIn, Mastodon, and Bluesky. Normalize metrics into social_metrics_daily. Implement OAuth token storage encryption, refresh locking, rate limiting, backoff, dead-letter queue, sync cursors, and CSV import fallback. Add adapter contract tests and cost-aware feature flags for X API usage. Verify with unit tests, integration tests, and build. Update PROJECT_STATE.json only on success.
```

### P15 — Unified analytics dashboard

```text
You are the Pagez dashboard engineer. Work in /home/ML/pagez. Read PRD.md sections 12, 15, and 17. Build the tenant analytics dashboard: overview cards, time-series charts, platform breakdown, link click analytics, booking conversion funnel, revenue summary, ad performance summary, export controls, and source health panel. Add tests for empty states, date range math, and tenant scoping. Verify with unit tests, integration tests, and build. Update PROJECT_STATE.json only on success.
```

### P16 — Superadmin control plane and forced releases

```text
You are the Pagez control-plane engineer. Work in /home/ML/pagez. Read PRD.md sections 6, 10, 11, 13, and 17. Implement the superadmin console: tenant search, domain approval, plan changes, impersonation with audit, feature flags, incident banners, release channel management, deployment promotion, rollout percentage control, force-update toggle, and PWA client fleet visibility. Add tests for authorization boundaries and audit completeness. Verify with integration tests and build. Update PROJECT_STATE.json only on success.
```

### P17 — WSL pagez command system

```text
You are the Pagez local-operations engineer. Work in /home/ML/pagez. Read PRD.md section 14. Complete scripts/pagez as a production-quality Bash CLI with start, stop, restart, status, logs, enable, disable, doctor, and tunnel. Use systemd user services when available and PM2 as fallback. Implement persistent state directories, graceful shutdown, health checks, log rotation hooks, and clear human-readable output. Add bats or shunit2-style tests for command dispatch and doctor checks. Verify with bash -n, shellcheck, and command smoke tests. Update PROJECT_STATE.json only on success.
```

### P18 — Cloudflare Tunnel development harness

```text
You are the Pagez developer-experience engineer. Work in /home/ML/pagez. Read PRD.md sections 8 and 14. Create docs/development/cloudflare-tunnel.md and scripts/tunnel-dev.sh. Document and automate cloudflared installation checks, tunnel creation, wildcard ingress configuration, DNS route publication, cache bypass rules for service worker and manifest endpoints, and troubleshooting for multi-tenant local testing. Verify with dry-run config validation and a documented manual test checklist. Update PROJECT_STATE.json only on success.
```

### P19 — Observability and audit telemetry

```text
You are the Pagez observability engineer. Work in /home/ML/pagez. Read PRD.md sections 13 and 14. Implement structured logging, correlation IDs, OpenTelemetry traces, metrics endpoints, error tracking, audit log explorer, health checks, readiness probes, and alerting rules for failed syncs, payment webhook lag, ad fill drop, and service worker update failures. Verify with local observability stack startup and trace propagation tests. Update PROJECT_STATE.json only on success.
```

### P20 — Security hardening and threat validation

```text
You are the Pagez security engineer. Work in /home/ML/pagez. Read PRD.md section 13. Produce a threat model, CSP policy, header audit, dependency scan configuration, secret scanning configuration, rate-limit matrix, webhook replay tests, tenant isolation attack tests, MFA recovery tests, and a penetration-test checklist. Remediate all findings rated high or critical before phase completion. Verify with scanner reports and test suites. Update PROJECT_STATE.json only on success.
```

### P21 — End-to-end QA and performance gates

```text
You are the Pagez QA engineer. Work in /home/ML/pagez. Read PRD.md sections 12 and 17. Implement Playwright end-to-end suites for onboarding, booking, payment sandbox flow, premium ad bypass, offline shell load, PWA install prompt behavior where supported, and superadmin release force-update flow. Add Lighthouse CI and performance budget enforcement. Verify with full test suite execution and report artifacts. Update PROJECT_STATE.json only on success.
```

### P22 — Production deployment topology

```text
You are the Pagez infrastructure engineer. Work in /home/ML/pagez. Read PRD.md sections 7 and 14. Create production deployment assets: Dockerfiles, docker-compose.prod.yml, Caddy or Traefik configuration, environment schema, migration job, worker deployment, backup job, restore job, health probes, and rollout documentation. Include a K3s manifest set for scaled deployment. Verify with local production-mode build, container smoke tests, and config lint. Update PROJECT_STATE.json only on success.
```

### P23 — Launch runbook, backup, restore, disaster recovery

```text
You are the Pagez release engineer. Work in /home/ML/pagez. Read PRD.md sections 14 and 17. Create docs/operations/runbook.md, docs/operations/backup-restore.md, docs/operations/incident-response.md, and docs/operations/release-checklist.md. Include restore drill procedure, certificate rotation, domain failure handling, payment provider outage handling, ad server outage handling, and PWA rollback procedure. Verify by executing a documented restore drill in a disposable environment. Update PROJECT_STATE.json only on success.
```

### P24 — Final release audit and documentation completion

```text
You are the Pagez chief engineer. Work in /home/ML/pagez. Read the entire PRD.md. Perform a final requirements traceability audit from PRD sections to implemented code, tests, docs, and operational assets. Close any gaps. Generate release notes, architecture diagram export, sponsor/community documentation, and a production readiness sign-off checklist. Verify that all universal and engineering gates pass. Mark P24 done only when every prior phase is done or explicitly blocked with a production-safe adapter recorded in BLOCKERS.md.
```

---

## 18. Definition of Done

Pagez is complete only when all of the following are true:

- Repository exists and is connected to `git@github.com:S-V-J/pagez.git`.
- `README.md`, `.gitignore`, `LICENSE`, `.github/FUNDING.yml`, and `PRD.md` exist.
- All phases `P00` through `P24` are `done`.
- No high or critical security findings remain open.
- Tenant isolation is proven by automated tests.
- PWA is installable on supported Chromium and Android surfaces.
- iOS installation guidance is present and functional.
- Offline shell loads successfully.
- Forced update mechanism works where platform capabilities allow.
- Free tier renders ads.
- Premium tier bypasses ads.
- Booking flow works end to end.
- Payment sandbox flow works end to end.
- Subscription tier enforcement works end to end.
- Unified analytics dashboard displays web and social metrics.
- `pagez` CLI works in WSL.
- Cloudflare Tunnel development harness is documented and validated.
- Production deployment assets are reproducible.
- Backup and restore drill passes.
- All public UI meets accessibility targets.
- All operational runbooks exist.

---

## 19. Risks and Mitigations

### Risk: X API cost or access instability

Mitigation:

- Feature-flag X connector.
- Provide CSV import fallback.
- Track spend per tenant.

### Risk: iOS background sync limitations

Mitigation:

- Treat forced updates as foreground best-effort on iOS.
- Use local draft persistence.
- Avoid promising background delivery.

### Risk: AGPL/GPL license contamination

Mitigation:

- Run copyleft systems as isolated services.
- Keep core Apache-2.0.
- Document boundary contracts.

### Risk: Custom domain TLS failures

Mitigation:

- Domain verification workflow.
- Clear DNS diagnostics.
- Retry/backoff for ACME.
- Fallback to platform subdomain.

### Risk: Ad filler low on launch

Mitigation:

- House ads.
- Contextual fallback.
- Premium upgrade prompts.

### Risk: Payment webhook duplication or loss

Mitigation:

- Idempotency keys.
- Replay protection.
- Reconciliation job.
- Dead-letter queue.

---

## 20. Claude Execution Goal

The canonical Claude Code goal command for this repository is:

```bash
claude -p "$(cat <<'PAGEZ_GOAL'
/goal Work in /home/ML/pagez. Treat PRD.md as authoritative and PROJECT_STATE.json as the phase cursor. Execute only the next unfinished phase. Print the phase ID, acceptance checklist, and planned file changes before editing. After editing, run the phase verification commands defined in PRD.md. Mark the phase DONE in PROJECT_STATE.json only when verification exits 0, git diff --check exits 0, and any unavailable external dependency is replaced by a documented adapter in BLOCKERS.md.
PAGEZ_GOAL
)"
```

Execution expectations:

- One phase per goal run is preferred.
- If Claude attempts to skip ahead, stop and re-run with the same goal.
- If a phase fails verification, it must remain `failed` or `in_progress`, never `done`.

---

## 21. Research References

35. Claude Code documentation: `/goal` works in interactive, `-p`, and Remote Control modes.  
51. Claude Code documentation: `/goal` sets a completion condition and keeps Claude working until it is met.  
52. Claude Code community/docs commentary: `/goal` condition length is constrained, favoring compact measurable goals.  
60. Matomo documentation/site: open-source privacy-focused analytics.  
61. Plausible website: open-source lightweight analytics alternative.  
76. Hyperswitch blog/repository: open-source payment orchestrator under Apache 2.0.  
77. Kill Bill website: open-source billing and payments platform.  
85. Revive Adserver website: open-source ad serving system.  
93. Cal.diy repository: open-source community edition of Cal.com.  
98. Hosting/blog references: Cal.com as open-source self-hosted scheduling software.  
102. Meta for Developers: Instagram Platform insights documentation.  
109. TikTok for Developers: Display API overview.  
117. Google Developers: YouTube Analytics API metrics documentation.  
126. X developer community/pricing references: X API pay-per-use and deprecation of practical free read access.  
133. Postiz repository: open-source self-hosted social media management edition.  
137. Postiz documentation: public API overview for multi-platform scheduling.  
140. Mixpost website: open-source self-hosted social media management.  
159. Vite PWA documentation: `registerType: 'autoUpdate'`.  
164. Vite PWA historical documentation: auto-update forces `clientsClaim` and `skipWaiting`.  
168. PWA iOS limitation analyses: background sync and background processing constraints on iOS.  
186. Cloudflare documentation: cloudflared wildcard hostname support and limitations.
