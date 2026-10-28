// FILE: backend/src/app.module.ts
//
// SYSTEMIC ROLE:
//   Root NestJS module for the Pagez backend.
//
//   This module is the composition root for server-side capability modules.
//   At P01.2 it intentionally contains only the baseline health module and the
//   scaffolded root controller/service. Later phases will add PostgreSQL,
//   authentication, tenant resolution, booking, payments, billing, advertising,
//   analytics connectors, workers, observability, and security modules through
//   explicit phase-controlled changes.
//
//   This file must not import vendor SaaS observability SDKs. Pagez observability
//   is planned as self-hosted open-source telemetry using OpenTelemetry,
//   Prometheus, Grafana, logs storage, and self-hosted error tracking.

import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
