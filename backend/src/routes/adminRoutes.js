import { Router } from 'express';
import { banUser, listReports, shadowbanUser, warnUser } from '../controllers/adminController.js';
import { auth, requireAdmin } from '../middlewares/auth.js';

const r = Router();
r.use(auth, requireAdmin);
r.get('/reports', listReports);
r.patch('/users/:id/ban', banUser);
r.patch('/users/:id/warn', warnUser);
r.patch('/users/:id/shadowban', shadowbanUser);

export default r;
