import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { applyReferral, referralMe } from '../controllers/referralController.js';

const r = Router();
r.use(auth);
r.get('/me', referralMe);
r.post('/apply', applyReferral);

export default r;
