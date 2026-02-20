import request from 'supertest';
import app from '../src/app.js';

describe('Dispute routes', () => {
  it('should require auth for create dispute', async () => {
    const res = await request(app).post('/api/disputes').send({ sessionId: 'x', reason: 'No show' });
    expect(res.status).toBe(401);
  });

  it('should require auth for my disputes', async () => {
    const res = await request(app).get('/api/disputes/me');
    expect(res.status).toBe(401);
  });
});
