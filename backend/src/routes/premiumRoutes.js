import { Router } from 'express';
import { activatePremium, boostProfile } from '../controllers/premiumController.js';
import { auth, requireAdmin } from '../middlewares/auth.js';

const r = Router();
r.use(auth);
r.post('/activate', requireAdmin, activatePremium);
r.post('/boost-profile', boostProfile);
export default r;
