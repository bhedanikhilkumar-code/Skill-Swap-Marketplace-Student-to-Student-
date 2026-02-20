import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { createReview, getUserReviews } from '../controllers/reviewController.js';

const r = Router();
r.use(auth);
r.post('/', createReview);
r.get('/user/:userId', getUserReviews);
export default r;
