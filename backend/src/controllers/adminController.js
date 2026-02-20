import Report from '../models/Report.js';
import User from '../models/User.js';
import { fail, success } from '../utils/response.js';

export const listReports = async (req, res) => {
  const { page = 1, limit = 20, status, reason } = req.query;
  const query = { ...(status ? { status } : {}), ...(reason ? { reason } : {}) };
  const items = await Report.find(query)
    .populate('reporterId reportedUserId', 'name email role moderation')
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));
  return success(res, { items, page: Number(page), limit: Number(limit) });
};

export const banUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { moderation: { isBanned: true, banReason: req.body.reason || 'Policy violation', warnedCount: 0, isShadowBanned: false, updatedAt: new Date() } },
    { new: true }
  );
  if (!user) return fail(res, 'User not found', null, 404);
  return success(res, user, 'User banned');
};

export const warnUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return fail(res, 'User not found', null, 404);
  user.moderation.warnedCount = (user.moderation.warnedCount || 0) + 1;
  user.moderation.updatedAt = new Date();
  await user.save();
  return success(res, user, 'User warned');
};

export const shadowbanUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return fail(res, 'User not found', null, 404);
  user.moderation.isShadowBanned = true;
  user.moderation.updatedAt = new Date();
  await user.save();
  return success(res, user, 'User shadowbanned');
};
