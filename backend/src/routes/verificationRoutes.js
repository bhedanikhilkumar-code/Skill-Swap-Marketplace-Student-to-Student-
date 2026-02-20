import { Router } from 'express';
import multer from 'multer';
import { approveVerification, getMyVerification, rejectVerification, requestVerification } from '../controllers/verificationController.js';
import { auth, requireAdmin } from '../middlewares/auth.js';

const upload = multer({ dest: 'tmp/' });
const r = Router();
r.use(auth);
r.post('/request', upload.single('document'), requestVerification);
r.get('/me', getMyVerification);
r.patch('/:userId/approve', requireAdmin, approveVerification);
r.patch('/:userId/reject', requireAdmin, rejectVerification);

export default r;
