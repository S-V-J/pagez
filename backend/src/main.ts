// FILE: backend/src/main.ts
//
// SYSTEMIC ROLE:
//   Backend process bootstrap entrypoint for the Pagez API service.
//
//   Responsibilities at P01.2:
//   - Create the NestJS application from AppModule.
//   - Enable shutdown hooks so future pagez stop/restart operations can drain
//     gracefully.
//   - Bind to PORT with a safe default of 3001, because frontend development
//     conventionally uses port 3000.
//   - Validate PORT before listening.
//   - Emit structured startup/failure logs through Nest Logger.
//
//   Later phases will add global pipes, exception filters, security headers,
//   CORS policy, trusted proxy handling, OpenTelemetry instrumentation, and
//   readiness checks. Those are intentionally not added in P01.2 to preserve
//   phase isolation.

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

const logger = new Logger('Bootstrap');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  const rawPort = process.env.PORT ?? '3001';
  const port = Number.parseInt(rawPort, 10);

  if (!Number.isFinite(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid PORT value: ${rawPort}`);
  }

  await app.listen(port);

  logger.log(`Pagez backend listening on port ${port}`);
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
