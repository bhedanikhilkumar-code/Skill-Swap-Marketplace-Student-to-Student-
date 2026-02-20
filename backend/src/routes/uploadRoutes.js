import { Router } from 'express';
import multer from 'multer';
import { auth } from '../middlewares/auth.js';
import { uploadAvatar } from '../controllers/uploadController.js';

const upload = multer({ dest: 'tmp/' });
const r = Router();
r.post('/avatar', auth, upload.single('avatar'), uploadAvatar);
export default r;
