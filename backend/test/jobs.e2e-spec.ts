import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('JobsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/jobs (GET) retourne des jobs mockés', async () => {
    const res = await request(app.getHttpServer()).get('/jobs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('title');
  });

  it('/jobs (POST) simule une création en mode DEMO', async () => {
    const res = await request(app.getHttpServer())
      .post('/jobs')
      .send({ title: 'Test', company: 'Demo', location: 'Test', type: 'CDI' });
    expect(res.status).toBe(201);
    expect(res.body.demo).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
}); 