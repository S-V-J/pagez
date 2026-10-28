// FILE: backend/src/health/health.controller.spec.ts
//
// SYSTEMIC ROLE:
//   Unit test for the baseline health controller.
//
//   This test proves that the health controller can be instantiated through
//   NestJS testing utilities and returns the expected P01.2 health contract.
//   It does not test external dependencies because none are introduced yet.

import { Test } from '@nestjs/testing';
import { describe, expect, it } from 'vitest';

import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

describe('HealthController', () => {
  it('returns ok health payload', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    const controller = moduleRef.get(HealthController);
    const health = controller.getHealth();

    expect(health.status).toBe('ok');
    expect(health.service).toBe('backend');
    expect(typeof health.timestamp).toBe('string');
    expect(health.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });

  it('returns ok liveness payload', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    const controller = moduleRef.get(HealthController);
    const liveness = controller.getLiveness();

    expect(liveness.status).toBe('ok');
  });

  it('returns ok readiness payload', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    const controller = moduleRef.get(HealthController);
    const readiness = controller.getReadiness();

    expect(readiness.status).toBe('ok');
    expect(readiness.checks.app).toBe('ok');
  });
});
