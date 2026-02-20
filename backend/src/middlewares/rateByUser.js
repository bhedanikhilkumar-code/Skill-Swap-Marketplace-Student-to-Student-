import User from '../models/User.js';
import { fail } from '../utils/response.js';

const scoreLimit = (trustScore) => {
  if (trustScore >= 50) return 20;
  if (trustScore >= 25) return 10;
  return 5;
};

export const computeTrustScore = (u) => {
  let score = 0;
  if (u.isVerified) score += 20;
  if ((u.ratingAverage || 0) >= 4.5) score += 15;
  if ((u.completionRate || 0) >= 0.8) score += 15;
  const ageDays = Math.floor((Date.now() - new Date(u.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24));
  if (ageDays >= 30) score += 10;
  score -= (u.moderation?.warnedCount || 0) * 3;
  score -= (u.noShowStrikes || 0) * 5;
  return Math.max(0, score);
};

export const requestLimiterByUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return fail(res, 'User not found', null, 404);
  const today = new Date().toISOString().slice(0, 10);
  user.trustScore = computeTrustScore(user);
  if (user.dailySwapUsageDate !== today) {
    user.dailySwapUsageDate = today;
    user.dailySwapUsage = 0;
  }
  const limit = scoreLimit(user.trustScore);
  if (user.dailySwapUsage >= limit) {
    await user.save();
    return fail(res, `Daily swap request limit reached (${limit}).`, { remaining: 0, limit }, 429);
  }
  req.userLimits = { limit, used: user.dailySwapUsage, remaining: limit - user.dailySwapUsage };
  req.userDoc = user;
  return next();
};

export const consumeSwapQuota = async (req, res, next) => {
  if (req.userDoc) {
    req.userDoc.dailySwapUsage += 1;
    await req.userDoc.save();
  }
  return next();
};
