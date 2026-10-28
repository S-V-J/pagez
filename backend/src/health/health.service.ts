// FILE: backend/src/health/health.service.ts
//
// SYSTEMIC ROLE:
//   Service layer for baseline Pagez backend health data.
//
//   This service must remain dependency-free in P01.2. It reports only process
//   level facts. Database, queue, object storage, payment, advertising,
//   analytics, and social connector checks belong to later phases and must be
//   added through explicit module boundaries.

import { Injectable } from '@nestjs/common';

export interface HealthStatus {
  status: 'ok';
  service: string;
  timestamp: string;
  uptimeSeconds: number;
}

export interface HealthReadiness {
  status: 'ok';
  checks: {
    app: 'ok';
  };
}

@Injectable()
export class HealthService {
  private readonly serviceName = 'backend';

  getHealth(): HealthStatus {
    return {
      status: 'ok',
      service: this.serviceName,
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    };
  }

  getLiveness(): { status: 'ok' } {
    return { status: 'ok' };
  }

  getReadiness(): HealthReadiness {
    return {
      status: 'ok',
      checks: {
        app: 'ok',
      },
    };
  }
}
