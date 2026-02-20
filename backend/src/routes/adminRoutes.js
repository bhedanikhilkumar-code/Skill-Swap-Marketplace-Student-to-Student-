import { Router } from 'express';
import { banUser, listReports, shadowbanUser, warnUser } from '../controllers/adminController.js';
import { adminDisputes, resolveDispute } from '../controllers/disputeController.js';
import { auth, requireAdmin } from '../middlewares/auth.js';

const r = Router();
r.use(auth, requireAdmin);
r.get('/reports', listReports);
r.patch('/users/:id/ban', banUser);
r.patch('/users/:id/warn', warnUser);
r.patch('/users/:id/shadowban', shadowbanUser);
r.get('/disputes', adminDisputes);
r.patch('/disputes/:id/resolve', resolveDispute);

export default r;
