import request from 'supertest';
import app from '../src/app.js';

describe('Auth health checks', () => {
  it('should return 422 on invalid register payload', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'bad' });
    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });
});
