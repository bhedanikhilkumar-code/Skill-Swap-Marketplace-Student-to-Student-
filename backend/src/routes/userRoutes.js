import { Router } from 'express';
import { getUser, me, searchUsers, updateMe } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

const r = Router();
r.use(auth);
r.get('/me', me);
r.patch('/me', updateMe);
r.get('/search', searchUsers);
r.get('/:id', getUser);
export default r;
