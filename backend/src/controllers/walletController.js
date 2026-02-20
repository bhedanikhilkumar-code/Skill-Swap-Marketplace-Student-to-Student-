import User from '../models/User.js';
import { fail, success } from '../utils/response.js';

export const walletMe = async (req, res) => {
  const me = await User.findById(req.user.id).select('walletBalanceMinutes walletLockedMinutes boostCredits');
  const availableMinutes = (me.walletBalanceMinutes || 0) - (me.walletLockedMinutes || 0);
  return success(res, { ...me.toObject(), availableMinutes });
};

export const grantWallet = async (req, res) => {
  const minutes = Number(req.body.minutes || 0);
  if (minutes <= 0) return fail(res, 'minutes must be > 0', null, 400);
  const targetId = req.body.userId || req.user.id;
  const user = await User.findByIdAndUpdate(targetId, { $inc: { walletBalanceMinutes: minutes } }, { new: true });
  return success(res, user, 'Wallet granted');
};

export const lockWalletInternal = async ({ userIds = [], minutes }) => {
  for (const userId of userIds) {
    const user = await User.findById(userId);
    const available = (user.walletBalanceMinutes || 0) - (user.walletLockedMinutes || 0);
    if (available < minutes) throw new Error(`Insufficient wallet credits for user ${userId}`);
  }
  await User.updateMany({ _id: { $in: userIds } }, { $inc: { walletLockedMinutes: minutes } });
};

export const settleWalletInternal = async ({ userIds = [], minutes }) => {
  await User.updateMany({ _id: { $in: userIds } }, { $inc: { walletLockedMinutes: -minutes } });
};

export const lockWalletApi = async (req, res) => {
  await lockWalletInternal({ userIds: req.body.userIds || [], minutes: Number(req.body.minutes || 0) });
  return success(res, null, 'Wallet locked');
};

export const settleWalletApi = async (req, res) => {
  await settleWalletInternal({ userIds: req.body.userIds || [], minutes: Number(req.body.minutes || 0) });
  return success(res, null, 'Wallet settled');
};
