import request from 'supertest';
import app from '../src/app.js';

describe('Verification routes', () => {
  it('should require auth for verification status', async () => {
    const res = await request(app).get('/api/verification/me');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('should require auth for verification request', async () => {
    const res = await request(app).post('/api/verification/request').send({ collegeEmail: 'a@college.edu' });
    expect(res.status).toBe(401);
  });
});
