import { Router } from 'express';
import { auth, requireActiveUser } from '../middlewares/auth.js';
import { getMessages } from '../controllers/chatController.js';

const r = Router();
r.use(auth, requireActiveUser);
r.get('/:swapId/messages', getMessages);
export default r;
