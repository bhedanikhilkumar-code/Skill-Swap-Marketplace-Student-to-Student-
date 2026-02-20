import User from '../models/User.js';
import { fail, success } from '../utils/response.js';

export const referralMe = async (req, res) => {
  const me = await User.findById(req.user.id).select('referralCode referredBy referralStats referralRewardGranted boostCredits walletBalanceMinutes');
  return success(res, me);
};

export const applyReferral = async (req, res) => {
  const code = (req.body.code || '').trim().toUpperCase();
  const me = await User.findById(req.user.id);
  if (!code) return fail(res, 'Referral code is required', null, 400);
  if (me.referredBy) return fail(res, 'Referral already applied', null, 409);
  const referrer = await User.findOne({ referralCode: code });
  if (!referrer || referrer._id.toString() === req.user.id) return fail(res, 'Invalid referral code', null, 404);
  me.referredBy = referrer._id;
  referrer.referralStats.invites = (referrer.referralStats.invites || 0) + 1;
  await me.save();
  await referrer.save();
  return success(res, null, 'Referral applied');
};

export const rewardSuccessfulReferral = async (userId) => {
  const user = await User.findById(userId);
  if (!user || !user.referredBy || user.referralRewardGranted) return;
  user.referralRewardGranted = true;
  await user.save();
  const referrer = await User.findById(user.referredBy);
  if (!referrer) return;
  referrer.referralStats.successful = (referrer.referralStats.successful || 0) + 1;
  referrer.boostCredits = (referrer.boostCredits || 0) + 1;
  referrer.walletBalanceMinutes = (referrer.walletBalanceMinutes || 0) + 60;
  await referrer.save();
};
