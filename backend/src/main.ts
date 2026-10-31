// FILE: backend/src/main.ts
//
// SYSTEMIC ROLE:
//   Backend process bootstrap entrypoint for the Pagez API service.
//
//   Responsibilities:
//   - Create the NestJS application from AppModule.
//   - Enable shutdown hooks so the pagez supervisor and systemd can drain the
//     process gracefully on stop/restart.
//   - Bind to a port supplied through the PORT environment variable.
//   - Bind to a host supplied through the HOST environment variable, defaulting
//     to 0.0.0.0 so the API is reachable from the Windows host through WSL2
//     localhost forwarding and from the Docker host through published ports.
//   - Validate both values before listening, failing closed on malformed input.
//   - Emit structured startup and failure logs through the Nest Logger.
//
//   WHY HOST DEFAULTS TO 0.0.0.0:
//   Express/Nest bind to localhost when no host is given. A loopback-only
//   listener is unreachable from outside the network namespace, which breaks
//   two required deployments:
//     1. WSL2 -> Windows browser access via localhost forwarding.
//     2. Docker container -> host access via -p port publishing.
//   Binding to the wildcard address makes both work without configuration.
//   Exposure is a development-time concern; production deployments place the
//   API behind a reverse proxy or tunnel, and network policy is owned by the
//   deployment phase, not by bootstrap.
//
//   WHY THE PORT FALLBACK EXISTS AND WHY IT WARNS:
//   Pagez never assigns fixed ports in managed operation. The pagez supervisor
//   always allocates a free kernel port and injects PORT. The fallback exists
//   only so that a developer can run "pnpm --filter backend start:dev" directly
//   without a wrapper. Because a fixed fallback can collide with other
//   applications on the same machine, bootstrap emits an explicit warning
//   whenever PORT is absent. Managed runs never see this warning.
//
//   LATER PHASES:
//   Global pipes, exception filters, security headers, CORS policy, trusted
//   proxy handling, OpenTelemetry instrumentation, and readiness probes are
//   intentionally absent here to preserve phase isolation.

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

const logger = new Logger('Bootstrap');

const DEFAULT_PORT_FALLBACK = '3001';
const DEFAULT_HOST = '0.0.0.0';

function resolvePort(): number {
  const rawPort = process.env.PORT;

  if (rawPort === undefined || rawPort.trim() === '') {
    logger.warn(
      `PORT is not set. Falling back to ${DEFAULT_PORT_FALLBACK}. ` +
        'A fixed fallback can collide with other applications. ' +
        'Use "pagez start" for dynamic free-port allocation.',
    );

    return Number.parseInt(DEFAULT_PORT_FALLBACK, 10);
  }

  const port = Number.parseInt(rawPort, 10);

  if (!Number.isFinite(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid PORT value: ${rawPort}`);
  }

  return port;
}

function resolveHost(): string {
  const rawHost = process.env.HOST;

  if (rawHost === undefined || rawHost.trim() === '') {
    return DEFAULT_HOST;
  }

  const host = rawHost.trim();

  if (/[\s/]/.test(host)) {
    throw new Error(`Invalid HOST value: ${rawHost}`);
  }

  return host;
}

function formatBoundUrl(host: string, port: number): string {
  // 0.0.0.0 and :: are wildcard bind addresses, not reachable URLs.
  // Reporting them as the host portion of a URL would produce a link that
  // cannot be opened, so they are normalized to loopback for display only.
  if (host === '0.0.0.0' || host === '::') {
    return `http://127.0.0.1:${port}`;
  }

  if (host.includes(':')) {
    return `http://[${host}]:${port}`;
  }

  return `http://${host}:${port}`;
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  const port = resolvePort();
  const host = resolveHost();

  await app.listen(port, host);

  logger.log(
    `Pagez backend listening on ${formatBoundUrl(host, port)} ` +
      `(bind ${host}:${port})`,
  );
}

try {
  await bootstrap();
} catch (error) {
  logger.error(
    'Failed to start Pagez backend',
    error instanceof Error ? error.stack : String(error),
  );

  process.exitCode = 1;
}
