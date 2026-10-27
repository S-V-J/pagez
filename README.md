# Pagez

Pagez is a multi-tenant Progressive Web App platform that lets social media
influencers run a branded web presence without submitting to app stores.

Each tenant receives:

- A portfolio microsite
- A link-in-bio hub
- A service catalog
- An appointment booking system
- Payment collection
- Social and web analytics
- A freemium monetization layer

The platform owner retains centralized control over tenant provisioning, plan
enforcement, ad policy, release channels, forced PWA updates, security posture,
and observability.

## Stack (PRD §7)

TypeScript modular monolith: Next.js App Router, Tailwind CSS, Drizzle ORM,
PostgreSQL, Redis + BullMQ, MinIO, Serwist/Workbox PWA layer. Open-source
services (Hyperswitch, Kill Bill, Revive Adserver, Matomo) run as isolated
network services behind HTTP APIs — no copyleft code linked into the Apache-2.0
core. Docker Compose for single-node, K3s for multi-node.

## Repository phases

Work is tracked in `PROJECT_STATE.json`, the machine-readable phase cursor
(PRD §0.2). Phases P00–P24 are defined in PRD §17 and must be executed in
order; never skip ahead.

## Local commands

```
bash -n scripts/pagez        # syntax-check the entrypoint stub
./scripts/pagez help         # show available subcommands
```

Operational subcommands (`start`, `stop`, `restart`, `status`, `logs`,
`enable`, `disable`, `doctor`, `tunnel`) are stubbed at P00 and owned by
phase P17 (WSL pagez command system, PRD §14.1).

## License

Apache-2.0. See `LICENSE`.

## Sponsor

Primary maintainer: Siddhant Kumar (@S-V-J) —
https://github.com/sponsors/S-V-J
