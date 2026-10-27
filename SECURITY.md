# Security Policy

## Supported versions

Pagez is in pre-release development (v1.0.0 baseline, PRD §1). No releases are
currently supported. Security fixes land on `main` as phases are completed.

## Reporting a vulnerability

Please do not open public issues for security vulnerabilities. Report them
through GitHub Security Advisories for the repository
`git@github.com:S-V-J/pagez.git`, or contact the primary maintainer via the
sponsor profile: https://github.com/sponsors/S-V-J

Include:

- A description of the vulnerability and affected component
- Steps to reproduce
- The potential impact and affected tenants/users
- Suggested remediation, if you have one

## Disclosure timeline

The maintainer will acknowledge receipt within 5 business days, provide an
initial assessment within 10 business days, and coordinate a fix and public
disclosure date before any advisory is published.

## Security in this repository

- `LICENSE` is Apache-2.0; Pagez core remains Apache-2.0 (PRD §7.3).
- Copyleft services run as isolated network services, never linked into core.
- Tenant isolation is enforced at the PostgreSQL RLS layer (PRD §8.5).
- Secrets never committed to this repository; see `.gitignore` for `.env*`.
