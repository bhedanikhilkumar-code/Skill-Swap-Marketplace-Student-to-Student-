import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { githubCallback, githubStart } from '../controllers/oauthController.js';

const r = Router();
r.get('/github/start', auth, githubStart);
r.get('/github/callback', githubCallback);

export default r;
