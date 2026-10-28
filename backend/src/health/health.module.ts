// FILE: backend/src/health/health.module.ts
//
// SYSTEMIC ROLE:
//   NestJS module exposing baseline process health endpoints.
//
//   This module is intentionally narrow. It proves that the backend can boot,
//   route requests, and return machine-readable health data. Later phases will
//   extend readiness checks with PostgreSQL, Redis, MinIO, queue workers,
//   payment orchestrator connectivity, ad server connectivity, analytics
//   connector health, and social API credential status.

import { Module } from '@nestjs/common';

import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
