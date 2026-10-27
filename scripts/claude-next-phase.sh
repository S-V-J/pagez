#!/usr/bin/env bash
# FILE: scripts/claude-next-phase.sh
#
# SYSTEMIC ROLE:
#   This script is the controlled bridge between PROJECT_STATE.json and Claude Code.
#   It determines the next unfinished PRD phase, generates a strict /goal prompt,
#   and optionally executes Claude in headless mode.
#
# DESIGN RULES:
#   - It does not modify PROJECT_STATE.json directly.
#   - It does not modify application code directly.
#   - It only reads state and emits or executes a Claude goal prompt.
#   - Claude is responsible for phase implementation and state mutation.
#   - The script enforces one-phase-at-a-time execution.
#
# USAGE:
#   bash scripts/claude-next-phase.sh --plan
#   bash scripts/claude-next-phase.sh --execute
#   bash scripts/claude-next-phase.sh --phase P01 --plan
#   bash scripts/claude-next-phase.sh --phase P01 --execute

set -Eeuo pipefail

REPO_ROOT="${REPO_ROOT:-/home/ML/pagez}"
STATE_FILE="${STATE_FILE:-${REPO_ROOT}/PROJECT_STATE.json}"
PRD_FILE="${PRD_FILE:-${REPO_ROOT}/PRD.md}"
MODE="plan"
PHASE_OVERRIDE=""

usage() {
  cat >&2 <<'USAGE'
Usage:
  bash scripts/claude-next-phase.sh [--plan] [--execute] [--phase PHASE_ID]

Modes:
  --plan
      Print the next unfinished phase and the exact /goal prompt.
      This is the default mode.

  --execute
      Run `claude -p` with the generated /goal prompt.
      Use this only if headless Claude works reliably in your environment.

Options:
  --phase PHASE_ID
      Force a specific phase ID instead of auto-detecting the next unfinished phase.
      Example: --phase P01

Environment overrides:
  REPO_ROOT
  STATE_FILE
  PRD_FILE
USAGE
}

log() {
  printf '[claude-next-phase] %s\n' "$*" >&2
}

die() {
  printf '[claude-next-phase][ERROR] %s\n' "$*" >&2
  exit 1
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --plan)
      MODE="plan"
      ;;
    --execute)
      MODE="execute"
      ;;
    --phase)
      if [ "$#" -lt 2 ]; then
        usage
        die "--phase requires an argument"
      fi
      PHASE_OVERRIDE="$2"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      usage
      die "Unknown argument: $1"
      ;;
  esac
  shift
done

[ -d "$REPO_ROOT" ] || die "Repository root not found: ${REPO_ROOT}"
[ -f "$STATE_FILE" ] || die "State file not found: ${STATE_FILE}"
[ -f "$PRD_FILE" ] || die "PRD file not found: ${PRD_FILE}"
command -v node >/dev/null 2>&1 || die "node is required to parse PROJECT_STATE.json"

next_phase_descriptor() {
  STATE_FILE="$STATE_FILE" PHASE_OVERRIDE="$PHASE_OVERRIDE" node - <<'NODE'
const fs = require("node:fs");

const statePath = process.env.STATE_FILE;
const override = process.env.PHASE_OVERRIDE || "";

let state;
try {
  state = JSON.parse(fs.readFileSync(statePath, "utf8"));
} catch (error) {
  console.error(`Invalid JSON in ${statePath}: ${error.message}`);
  process.exit(3);
}

if (!Array.isArray(state.phases)) {
  console.error("PROJECT_STATE.json must contain a phases array.");
  process.exit(4);
}

let phase;

if (override) {
  phase = state.phases.find((item) => item.id === override);
  if (!phase) {
    console.error(`Phase not found: ${override}`);
    process.exit(2);
  }
} else {
  phase = state.phases.find((item) => item.status !== "done");
}

if (!phase) {
  process.stdout.write("NONE\tAll phases complete\tcomplete\n");
  process.exit(0);
}

process.stdout.write(`${phase.id}\t${phase.title}\t${phase.status}\n`);
NODE
}

phase_hint() {
  case "$1" in
    P00)
      printf '%s' 'Create or repair only repository foundation files listed in PRD P00. Do not scaffold application frameworks.'
      ;;
    P01)
      printf '%s' 'If a Next.js App Router TypeScript scaffold is absent, create the minimum scaffold required for the design system at repository root without overwriting PRD.md, README.md, LICENSE, .gitignore, .github, docs, scripts, PROJECT_STATE.json, or BLOCKERS.md. Implement design tokens, Tailwind configuration, CSS variables, dark mode, tenant theme overrides, accessible base components, showcase route, and tests.'
      ;;
    P02)
      printf '%s' 'Implement host-based multi-tenant routing, public tenant layout, dashboard layout, superadmin layout, error boundaries, not-found pages, robots, sitemap, canonical URL handling, Open Graph generation, and cached tenant lookup with invalidation. Do not implement portfolio builder features beyond shell resolution.'
      ;;
    P03)
      printf '%s' 'Create Drizzle schema definitions, migrations, RLS policies, partition management, seeds, and rollback-safe migration scripts from PRD section 9. Use Docker Compose or local PostgreSQL if available. If unavailable, record a production-safe adapter in BLOCKERS.md and do not mark done unless isolation tests pass.'
      ;;
    P04)
      printf '%s' 'Implement authentication, Argon2id password hashing, TOTP MFA, WebAuthn/passkeys, session management, tenant invitations, RBAC, permission checks, audit logging, rate limiting, and brute-force protection. Do not implement payment, ad, or analytics business logic.'
      ;;
    P05)
      printf '%s' 'Implement PWA manifest generation, icons, service worker registration, Workbox or Serwist caching, offline fallback, online/offline detection, background sync where supported, IndexedDB draft persistence, install prompt handling, iOS guidance, release metadata endpoint, forced update controller, rollout percentage logic, and client heartbeat reporting.'
      ;;
    P06)
      printf '%s' 'Implement tenant portfolio page CRUD, block editor, drag-and-drop ordering, block schemas, live preview, publish/unpublish, SEO fields, Open Graph image selection, theme application, structured data, and public rendering routes. Do not alter booking or payment state machines.'
      ;;
    P07)
      printf '%s' 'Implement link aggregator CRUD, reordering, scheduling, UTM injection, click tracking, QR generation, active/inactive state, and public link hub rendering. Enforce redirect safety and tenant isolation.'
      ;;
    P08)
      printf '%s' 'Implement service catalog CRUD, pricing, currency, duration, deposit rules, media attachments, active/inactive state, public service listing, and service detail pages. Do not implement full booking slot algorithm yet.'
      ;;
    P09)
      printf '%s' 'Implement availability rules, slot generation, timezone conversion, buffer handling, double-booking prevention, booking state machine, reschedule/cancel flows, confirmation emails, calendar export/import, reminder job scaffolding, and public booking UI. Use transactional integrity for slot conflicts.'
      ;;
    P10)
      printf '%s' 'Integrate Hyperswitch or a documented open-source payment orchestrator adapter. Implement checkout session creation, webhook ingestion, signature verification, idempotent event processing, payment state mapping, refund initiation, receipt generation, and provider abstraction tests using a local simulator or mock connector when credentials are unavailable.'
      ;;
    P11)
      printf '%s' 'Integrate Kill Bill or a documented open-source billing adapter. Implement plan catalog, trial handling, recurring invoices, dunning states, entitlement sync into tenant tier, premium feature gating, and billing portal links. Record external credential blockers explicitly.'
      ;;
    P12)
      printf '%s' 'Integrate Revive Adserver as an isolated self-hosted service. Implement ad zone mapping, placement rendering, consent gating, impression/click tracking, house ad fallback, premium bypass, and daily revenue rollups. Do not embed copyleft code into Apache-licensed core modules.'
      ;;
    P13)
      printf '%s' 'Integrate Matomo as default self-hosted web analytics, or Plausible as documented alternative. Implement tenant property provisioning, tracking snippet injection, event taxonomy, dashboard widgets, date-range queries, CSV export, and source health monitoring.'
      ;;
    P14)
      printf '%s' 'Implement social connector adapters for Instagram, YouTube, TikTok, X, Facebook Pages, LinkedIn, Mastodon, and Bluesky. Normalize metrics into social_metrics_daily. Implement encrypted OAuth token storage, refresh locking, rate limiting, backoff, dead-letter queue, sync cursors, CSV import fallback, and cost-aware feature flags for X API usage.'
      ;;
    P15)
      printf '%s' 'Build the tenant analytics dashboard with overview cards, time-series charts, platform breakdown, link click analytics, booking conversion funnel, revenue summary, ad performance summary, export controls, and source health panel. Do not add new connector business logic unless strictly required.'
      ;;
    P16)
      printf '%s' 'Implement superadmin console for tenant search, domain approval, plan changes, impersonation with audit, feature flags, incident banners, release channel management, deployment promotion, rollout percentage control, force-update toggle, and PWA client fleet visibility. Audit all privileged actions.'
      ;;
    P17)
      printf '%s' 'Complete scripts/pagez as a production-quality Bash CLI with start, stop, restart, status, logs, enable, disable, doctor, and tunnel. Use systemd user services when available and PM2 as fallback. Implement persistent state directories, graceful shutdown, health checks, log rotation hooks, and clear human-readable output. Add shell tests.'
      ;;
    P18)
      printf '%s' 'Create Cloudflare Tunnel development harness documentation and script for wildcard hostnames, HTTPS PWA testing, cache bypass for service worker, manifest, and release endpoints, and multi-tenant local testing troubleshooting. Do not commit tunnel credentials or private key material.'
      ;;
    P19)
      printf '%s' 'Implement structured logging, correlation IDs, OpenTelemetry traces, metrics endpoints, error tracking, audit log explorer, health checks, readiness probes, and alerting rules for failed syncs, payment webhook lag, ad fill drop, and service worker update failures. Do not log plaintext PII.'
      ;;
    P20)
      printf '%s' 'Produce threat model, CSP policy, header audit, dependency scan configuration, secret scanning configuration, rate-limit matrix, webhook replay tests, tenant isolation attack tests, MFA recovery tests, and penetration-test checklist. Remediate all high and critical findings before completion.'
      ;;
    P21)
      printf '%s' 'Implement Playwright end-to-end suites for onboarding, booking, payment sandbox flow, premium ad bypass, offline shell load, PWA install prompt behavior where supported, and superadmin release force-update flow. Add Lighthouse CI and performance budget enforcement. Fix flaky tests.'
      ;;
    P22)
      printf '%s' 'Create production deployment assets: Dockerfiles, docker-compose.prod.yml, Caddy or Traefik configuration, environment schema, migration job, worker deployment, backup job, restore job, health probes, rollout documentation, and K3s manifests for scaled deployment. Verify with production-mode build, container smoke tests, and config lint.'
      ;;
    P23)
      printf '%s' 'Create docs/operations/runbook.md, docs/operations/backup-restore.md, docs/operations/incident-response.md, and docs/operations/release-checklist.md. Include restore drill procedure, certificate rotation, domain failure handling, payment provider outage handling, ad server outage handling, and PWA rollback procedure. Execute a documented restore drill in a disposable environment.'
      ;;
    P24)
      printf '%s' 'Perform final requirements traceability audit from PRD sections to implemented code, tests, docs, and operational assets. Close gaps. Generate release notes, architecture diagram export, sponsor/community documentation, and production readiness sign-off checklist. Mark done only when every prior phase is done or explicitly blocked with a production-safe adapter recorded in BLOCKERS.md.'
      ;;
    *)
      printf '%s' 'Follow PRD section 17 for this phase exactly. Do not skip dependencies.'
      ;;
  esac
}

descriptor="$(next_phase_descriptor)"

IFS=$'\t' read -r phase_id phase_title phase_status <<< "$descriptor"

if [ "$phase_id" = "NONE" ]; then
  printf 'All phases complete. Nothing to execute.\n'
  exit 0
fi

hint="$(phase_hint "$phase_id")"
safe_title="${phase_title//\"/\\\"}"
lower_phase="${phase_id,,}"

goal="/goal Execute PRD phase ${phase_id} only in ${REPO_ROOT}. Treat PRD.md as authoritative and PROJECT_STATE.json as the phase cursor. Read PRD.md section 17 entry ${phase_id} and every PRD section referenced by that entry. Phase title: ${safe_title}. Current status: ${phase_status}. Phase-specific constraint: ${hint} Before editing, print the phase ID, acceptance checklist, and planned file changes. Do not skip dependencies and do not proceed beyond ${phase_id}. After editing, run all applicable verification commands: pnpm install --frozen-lockfile when package.json exists, pnpm lint, pnpm typecheck, pnpm test, pnpm build, bash -n scripts/pagez when scripts/pagez exists, and git diff --check. Mark ${phase_id} done in PROJECT_STATE.json only when every applicable verification command exits 0. If an external dependency is unavailable, record a production-safe adapter in BLOCKERS.md and leave the phase blocked unless the adapter satisfies the PRD definition of done. Commit completed work with message feat(${lower_phase}): ${safe_title}. Do not push unless the commit succeeds."

case "$MODE" in
  plan)
    printf 'Next phase: %s - %s (%s)\n\n' "$phase_id" "$phase_title" "$phase_status"
    printf '%s\n' "$goal"
    ;;
  execute)
    command -v claude >/dev/null 2>&1 || die "claude command not found. Install Claude Code or use --plan and paste the goal into interactive Claude."
    log "Executing headless Claude for phase ${phase_id}"
    claude -p "$goal"
    ;;
  *)
    die "Invalid mode: ${MODE}"
    ;;
esac
