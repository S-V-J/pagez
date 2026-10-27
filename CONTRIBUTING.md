# Contributing to Pagez

Pagez is developed phase by phase under the authority of `PRD.md`, with
`PROJECT_STATE.json` as the machine-readable phase cursor (PRD §0.2) and
`BLOCKERS.md` for external dependencies that cannot be satisfied locally.

## Source-of-truth hierarchy

1. `PRD.md`
2. `PROJECT_STATE.json`
3. `BLOCKERS.md`
4. Phase-specific implementation files
5. Ad hoc conversation context

If anything conflicts with `PRD.md`, `PRD.md` wins unless a maintainer
explicitly amends it.

## How work flows

1. Identify the next unfinished phase from `PROJECT_STATE.json`.
2. Read that phase's prompt in PRD §17 and the PRD sections it cites.
3. Print the phase ID, acceptance checklist, and planned file changes before
   editing.
4. Implement, then run the phase's verification commands.
5. Update `PROJECT_STATE.json` only after verification passes.

## Code standards

- TypeScript, strict mode; end-to-end type safety where the stack allows.
- PostgreSQL RLS on every tenant-owned table; `app.tenant_id` per request.
- Structured JSON logging with correlation IDs at service boundaries.
- All mutating operations idempotent; retries with exponential backoff + jitter.
- WCAG 2.2 AA for touched UI; performance budgets per PRD §12.5.

## License

Contributions are licensed under Apache-2.0 (PRD §7). By contributing, you
agree your submissions are under the terms of the Apache License 2.0.

## Sponsor

Primary maintainer: Siddhant Kumar (@S-V-J) —
https://github.com/sponsors/S-V-J
