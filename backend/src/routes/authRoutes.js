import { Router } from 'express';
import { login, logout, refresh, register } from '../controllers/authController.js';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema, registerSchema } from '../utils/schemas.js';

const r = Router();
r.post('/register', validate(registerSchema), register);
r.post('/login', validate(loginSchema), login);
r.post('/refresh', refresh);
r.post('/logout', auth, logout);
export default r;
