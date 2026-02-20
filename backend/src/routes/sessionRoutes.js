import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { createSession, upcoming, updateSession } from '../controllers/sessionController.js';
import { validate } from '../middlewares/validate.js';
import { sessionSchema } from '../utils/schemas.js';

const r = Router();
r.use(auth);
r.post('/', validate(sessionSchema), createSession);
r.get('/upcoming', upcoming);
r.patch('/:id', updateSession);
export default r;
