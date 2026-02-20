import request from 'supertest';
import app from '../src/app.js';

describe('Wallet routes', () => {
  it('should require auth on wallet me', async () => {
    const res = await request(app).get('/api/wallet/me');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
