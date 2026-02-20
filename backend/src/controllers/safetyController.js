import Report from '../models/Report.js';
import User from '../models/User.js';
import { success } from '../utils/response.js';
import { computeTrustScore } from '../middlewares/rateByUser.js';

const scoreLimit = (trustScore) => {
  if (trustScore >= 50) return 20;
  if (trustScore >= 25) return 10;
  return 5;
};

export const reportUser = async (req, res) => {
  const report = await Report.create({ reporterId: req.user.id, reportedUserId: req.body.reportedUserId, reason: req.body.reason });
  return success(res, report, 'Report submitted', 201);
};

export const blockUser = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { blockedUsers: req.body.userId } });
  return success(res, null, 'User blocked');
};

export const unblockUser = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $pull: { blockedUsers: req.body.userId } });
  return success(res, null, 'User unblocked');
};

export const getLimits = async (req, res) => {
  const user = await User.findById(req.user.id);
  const today = new Date().toISOString().slice(0, 10);
  if (user.dailySwapUsageDate !== today) {
    user.dailySwapUsageDate = today;
    user.dailySwapUsage = 0;
  }
  user.trustScore = computeTrustScore(user);
  const limit = scoreLimit(user.trustScore);
  await user.save();
  return success(res, { trustScore: user.trustScore, dailySwapLimit: limit, dailySwapUsed: user.dailySwapUsage, remaining: Math.max(0, limit - user.dailySwapUsage) });
};
