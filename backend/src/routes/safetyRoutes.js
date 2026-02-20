import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { blockUser, reportUser, unblockUser } from '../controllers/safetyController.js';

const r = Router();
r.use(auth);
r.post('/reports', reportUser);
r.post('/blocks', blockUser);
r.delete('/blocks', unblockUser);
export default r;
