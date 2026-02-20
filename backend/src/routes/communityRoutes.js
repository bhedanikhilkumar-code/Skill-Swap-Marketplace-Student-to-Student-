import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { createCommunity, createPost, joinCommunity, listCommunities, listPosts, updateMemberRole } from '../controllers/communityController.js';

const r = Router();
r.use(auth);
r.post('/', createCommunity);
r.get('/', listCommunities);
r.post('/:id/join', joinCommunity);
r.patch('/:id/members/:userId/role', updateMemberRole);
r.post('/:id/posts', createPost);
r.get('/:id/posts', listPosts);

export default r;
