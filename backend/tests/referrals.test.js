import request from 'supertest';
import app from '../src/app.js';

describe('Referral routes', () => {
  it('should require auth for referral me', async () => {
    const res = await request(app).get('/api/referrals/me');
    expect(res.status).toBe(401);
  });

  it('should require auth for apply referral', async () => {
    const res = await request(app).post('/api/referrals/apply').send({ code: 'ABC123' });
    expect(res.status).toBe(401);
  });
});
