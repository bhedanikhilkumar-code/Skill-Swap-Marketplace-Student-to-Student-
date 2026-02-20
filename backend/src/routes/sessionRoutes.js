import { Router } from 'express';
import { auth, requireActiveUser } from '../middlewares/auth.js';
import { createSession, markAttendance, upcoming, updateSession } from '../controllers/sessionController.js';
import { validate } from '../middlewares/validate.js';
import { sessionSchema } from '../utils/schemas.js';

const r = Router();
r.use(auth, requireActiveUser);
r.post('/', validate(sessionSchema), createSession);
r.get('/upcoming', upcoming);
r.patch('/:id', updateSession);
r.patch('/:id/attendance', markAttendance);
export default r;
