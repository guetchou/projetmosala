import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app';

let sandboxToken = null;

describe('API DEMO avancée', () => {
  it('crée une sandbox', async () => {
    const res = await request(app).post('/admin/demo/sandbox');
    expect(res.status).toBe(200);
    expect(res.body.sandbox).toMatch(/^demo_user_/);
    sandboxToken = res.body.token;
  });

  it('route les requêtes vers la sandbox', async () => {
    const res = await request(app)
      .get('/api/jobs')
      .set('X-DEMO-SANDBOX', sandboxToken);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('simule une mutation en sandbox', async () => {
    const res = await request(app)
      .post('/api/jobs')
      .set('X-DEMO-SANDBOX', sandboxToken)
      .send({ title: 'Test', company: 'Demo', location: 'Test', type: 'CDI' });
    expect(res.status).toBe(200);
    expect(res.body.demo).toBe(true);
  });

  it('supprime la sandbox', async () => {
    const res = await request(app).delete(`/admin/demo/sandbox/${sandboxToken}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toMatch(/^demo_user_/);
  });

  it('lance un scénario guidé', async () => {
    const res = await request(app)
      .post('/admin/demo/scenario/1')
      .set('X-DEMO-MODE', 'true');
    expect(res.status).toBe(200);
    expect(res.body.demo).toBe(true);
  });
}); 