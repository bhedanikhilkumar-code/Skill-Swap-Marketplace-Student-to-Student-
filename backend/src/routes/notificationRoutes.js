import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { saveDeviceToken } from '../controllers/notificationController.js';

const r = Router();
r.use(auth);
r.post('/token', saveDeviceToken);
export default r;
