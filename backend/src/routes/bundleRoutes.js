import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { createBundle, getBundle, listBundles } from '../controllers/bundleController.js';

const r = Router();
r.use(auth);
r.post('/', createBundle);
r.get('/', listBundles);
r.get('/:id', getBundle);

export default r;
