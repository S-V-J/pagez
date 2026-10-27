# External dependencies

Records external API costs, limits, and adapter boundaries (PRD §7.4). This
file is maintained as phases integrate external systems. Open-source
self-hosted services (Hyperswitch, Kill Bill, Revive Adserver, Matomo) are
infrastructure dependencies, not external API dependencies, and are listed here
only for context.

## Stance

- Use documented official APIs first.
- Never bypass platform authentication or terms.
- Maintain adapter layers so commercial or restricted APIs can be replaced or
  disabled (adapter work scheduled at P14).

## Known external API realities (v1)

### X (formerly Twitter)

- **Risk:** X API pricing no longer provides a practical free read tier (PRD
  §15.2, ref [126]).
- **Mitigation:** Cost-aware feature flag for the X connector; CSV import
  fallback; per-tenant spend tracking (PRD §19).
- **Adapter status:** Pending (P14).

### Instagram, YouTube, TikTok, Facebook Pages, LinkedIn, Mastodon, Bluesky

- Access via official platform APIs for authorized accounts; OAuth token
  storage encrypted at rest (PRD §15.2, §9).
- Per-platform rate limiting, exponential backoff, refresh locking, sync
  cursors, dead-letter queue (PRD §15.4).
- **Adapter status:** Pending (P14).

## Self-hosted open-source services (context)

| Service | Role | License | Deployment |
|---|---|---|---|
| Hyperswitch | Payment orchestration | Apache-2.0 | Isolated network service (P10) |
| Kill Bill | Subscription billing | Open-source | Isolated network service (P11) |
| Revive Adserver | Ad serving | Open-source | Isolated network service (P12) |
| Matomo | Web analytics | Open-source | Isolated network service (P13) |

None of these link into Pagez core code (ADR-003).
