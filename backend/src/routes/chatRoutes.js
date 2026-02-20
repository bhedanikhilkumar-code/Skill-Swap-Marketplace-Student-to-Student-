import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { getMessages } from '../controllers/chatController.js';

const r = Router();
r.use(auth);
r.get('/:swapId/messages', getMessages);
export default r;
