import User from '../models/User.js';
import { success, fail } from '../utils/response.js';
import { calcMatchScore } from '../utils/matchScore.js';

const publicFields = '-passwordHash -refreshTokens -deviceTokens';

const rankUsers = (viewer, users) =>
  users
    .map((u) => {
      const { matchScore, reasons } = calcMatchScore(viewer, u);
      return { ...u.toObject(), matchScore, reasons };
    })
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      const aBoost = a.boostedUntil && new Date(a.boostedUntil) > new Date() ? 1 : 0;
      const bBoost = b.boostedUntil && new Date(b.boostedUntil) > new Date() ? 1 : 0;
      if (b.isVerified !== a.isVerified) return Number(b.isVerified) - Number(a.isVerified);
      if (bBoost !== aBoost) return bBoost - aBoost;
      return (b.ratingAverage || 0) - (a.ratingAverage || 0);
    });

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select(publicFields);
  return success(res, user);
};

export const updateMe = async (req, res) => {
  const allowed = ['name', 'college', 'year', 'bio', 'skillsOffered', 'skillsWanted', 'availability', 'portfolioLinks'];
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
    'moderation.isBanned': { $ne: true },
    ...(college ? { college } : {}),
    ...(skillTag ? { $or: [{ 'skillsOffered.name': skillTag }, { 'skillsWanted.name': skillTag }] } : {})
  };
  const users = await User.find(query).select(publicFields).skip((page - 1) * limit).limit(Number(limit));
  return success(res, { items: rankUsers(viewer, users), page: Number(page), limit: Number(limit) });
};

export const recommendedUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const viewer = await User.findById(req.user.id);
  const blocked = viewer.blockedUsers || [];
  const users = await User.find({ _id: { $nin: [req.user.id, ...blocked] }, 'moderation.isBanned': { $ne: true } })
    .select(publicFields)
    .limit(Number(limit) * 4);
  const ranked = rankUsers(viewer, users);
  const start = (Number(page) - 1) * Number(limit);
  return success(res, { items: ranked.slice(start, start + Number(limit)), page: Number(page), limit: Number(limit) });
};
