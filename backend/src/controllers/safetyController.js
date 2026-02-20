import Report from '../models/Report.js';
import User from '../models/User.js';
import { success } from '../utils/response.js';

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
