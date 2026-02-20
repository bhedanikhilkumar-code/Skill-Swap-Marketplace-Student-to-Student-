import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { commonSlots, sessionIcs } from '../controllers/schedulingController.js';

const r = Router();
r.use(auth);
r.get('/common-slots', commonSlots);
r.get('/sessions/:id/ics', sessionIcs);

export default r;
