import { Router } from 'express';
import { createSwap, getSwap, inbox, sent, updateStatus } from '../controllers/swapController.js';
import { auth, requireActiveUser } from '../middlewares/auth.js';
import { requestLimiterByUser } from '../middlewares/rateByUser.js';
import { validate } from '../middlewares/validate.js';
import { swapSchema } from '../utils/schemas.js';

const r = Router();
r.use(auth, requireActiveUser);
r.post('/', requestLimiterByUser, validate(swapSchema), createSwap);
r.post('/', validate(swapSchema), createSwap);
r.get('/inbox', inbox);
r.get('/sent', sent);
r.get('/:id', getSwap);
r.patch('/:id/status', updateStatus);
export default r;
