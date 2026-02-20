import User from '../models/User.js';
import { success, fail } from '../utils/response.js';
import { calcMatchScore } from '../utils/matchScore.js';

const publicFields = '-passwordHash -refreshTokens -deviceTokens';

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select(publicFields);
  return success(res, user);
};

export const updateMe = async (req, res) => {
  const allowed = ['name', 'college', 'year', 'bio', 'skillsOffered', 'skillsWanted', 'availability', 'collegeVerified'];
  const patch = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
  const user = await User.findByIdAndUpdate(req.user.id, patch, { new: true }).select(publicFields);
  return success(res, user, 'Profile updated');
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select(publicFields);
  if (!user) return fail(res, 'User not found', null, 404);
  return success(res, user);
};

export const searchUsers = async (req, res) => {
  const { skillTag, college, minRating = 0, page = 1, limit = 10 } = req.query;
  const viewer = await User.findById(req.user.id);
  const blocked = viewer.blockedUsers || [];
  const query = {
    _id: { $nin: [req.user.id, ...blocked] },
    ratingAverage: { $gte: Number(minRating) },
    ...(college ? { college } : {}),
    ...(skillTag ? { $or: [{ skillsOffered: skillTag }, { skillsWanted: skillTag }] } : {})
  };
  const users = await User.find(query).select(publicFields).skip((page - 1) * limit).limit(Number(limit));
  const data = users.map((u) => ({ ...u.toObject(), matchScore: calcMatchScore(viewer, u) })).sort((a, b) => b.matchScore - a.matchScore);
  return success(res, { items: data, page: Number(page), limit: Number(limit) });
};
