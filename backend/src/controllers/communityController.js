import Community from '../models/Community.js';
import CommunityMember from '../models/CommunityMember.js';
import CommunityPost from '../models/CommunityPost.js';
import { fail, success } from '../utils/response.js';

const canManage = async (communityId, userId) => {
  const membership = await CommunityMember.findOne({ communityId, userId, joinStatus: 'APPROVED' });
  return membership && ['ADMIN', 'MODERATOR'].includes(membership.role);
};

export const createCommunity = async (req, res) => {
  const c = await Community.create({ ...req.body, createdBy: req.user.id });
  await CommunityMember.create({ communityId: c._id, userId: req.user.id, role: 'ADMIN', joinStatus: 'APPROVED' });
  return success(res, c, 'Community created', 201);
};

export const listCommunities = async (req, res) => {
  const { college, q, page = 1, limit = 20 } = req.query;
  const query = { ...(college ? { college } : {}), ...(q ? { name: { $regex: q, $options: 'i' } } : {}) };
  const items = await Community.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
  return success(res, { items, page: Number(page), limit: Number(limit) });
};

export const joinCommunity = async (req, res) => {
  const community = await Community.findById(req.params.id);
  if (!community) return fail(res, 'Community not found', null, 404);
  const joinStatus = community.isPrivate ? 'PENDING' : 'APPROVED';
  const membership = await CommunityMember.findOneAndUpdate(
    { communityId: community._id, userId: req.user.id },
    { communityId: community._id, userId: req.user.id, joinStatus },
    { new: true, upsert: true }
  );
  return success(res, membership, joinStatus === 'APPROVED' ? 'Joined community' : 'Join request submitted');
};

export const updateMemberRole = async (req, res) => {
  const authorized = await canManage(req.params.id, req.user.id);
  if (!authorized) return fail(res, 'Forbidden', null, 403);
  const member = await CommunityMember.findOneAndUpdate(
    { communityId: req.params.id, userId: req.params.userId },
    { role: req.body.role, ...(req.body.joinStatus ? { joinStatus: req.body.joinStatus } : {}) },
    { new: true }
  );
  if (!member) return fail(res, 'Community member not found', null, 404);
  return success(res, member, 'Member updated');
};

export const createPost = async (req, res) => {
  const membership = await CommunityMember.findOne({ communityId: req.params.id, userId: req.user.id, joinStatus: 'APPROVED' });
  if (!membership) return fail(res, 'Join community first', null, 403);
  const post = await CommunityPost.create({ communityId: req.params.id, createdBy: req.user.id, text: req.body.text, attachments: req.body.attachments || [] });
  return success(res, post, 'Post created', 201);
};

export const listPosts = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const items = await CommunityPost.find({ communityId: req.params.id })
    .populate('createdBy', 'name avatarUrl isVerified isPremium')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  return success(res, { items, page: Number(page), limit: Number(limit) });
};
