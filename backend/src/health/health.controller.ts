// FILE: backend/src/health/health.controller.ts
//
// SYSTEMIC ROLE:
//   HTTP controller for Pagez backend health endpoints.
//
//   Exposed endpoints:
//   - GET /health
//     General service health payload.
//   - GET /health/live
//     Liveness probe. It indicates the process is alive.
//   - GET /health/ready
//     Readiness probe. At P01.2 it is intentionally static. Later phases will
//     add dependency checks without changing the public contract shape.

import { Controller, Get } from '@nestjs/common';

import { HealthService } from './health.service.js';
import type { HealthReadiness, HealthStatus } from './health.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): HealthStatus {
    return this.healthService.getHealth();
  }

  @Get('live')
  getLiveness(): { status: 'ok' } {
    return this.healthService.getLiveness();
  }

  @Get('ready')
  getReadiness(): HealthReadiness {
    return this.healthService.getReadiness();
  }
}
