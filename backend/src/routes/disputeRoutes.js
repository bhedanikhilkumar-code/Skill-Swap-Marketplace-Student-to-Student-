import { Router } from 'express';
import multer from 'multer';
import { auth, requireAdmin } from '../middlewares/auth.js';
import { adminDisputes, createDispute, myDisputes, resolveDispute } from '../controllers/disputeController.js';

const upload = multer({ dest: 'tmp/' });
const r = Router();
r.use(auth);
r.post('/', upload.single('evidence'), createDispute);
r.get('/me', myDisputes);
r.get('/admin', requireAdmin, adminDisputes);
r.patch('/admin/:id/resolve', requireAdmin, resolveDispute);

export default r;
