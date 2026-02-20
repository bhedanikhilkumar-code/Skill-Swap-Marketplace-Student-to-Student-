import request from 'supertest';
import app from '../src/app.js';

describe('No-show attendance routes', () => {
  it('should require auth for attendance update', async () => {
    const res = await request(app).patch('/api/sessions/session-id/attendance').send({ outcome: 'NO_SHOW_OTHER' });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
