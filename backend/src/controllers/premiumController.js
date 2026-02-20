import User from '../models/User.js';
import { fail, success } from '../utils/response.js';
import { sendBoostActivatedPush } from '../services/notificationService.js';

export const activatePremium = async (req, res) => {
  const targetUserId = req.body.userId || req.user.id;
  const user = await User.findByIdAndUpdate(
    targetUserId,
    { isPremium: true, premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), boostCredits: 3 },
    { new: true }
  );
  if (!user) return fail(res, 'User not found', null, 404);
  return success(res, user, 'Premium activated');
};

export const boostProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return fail(res, 'User not found', null, 404);
  if (!user.isPremium || (user.premiumUntil && user.premiumUntil < new Date())) return fail(res, 'Premium plan is not active', null, 400);
  if ((user.boostCredits || 0) < 1) return fail(res, 'No boost credits left', null, 400);
  user.boostCredits -= 1;
  user.boostedUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await user.save();
  await sendBoostActivatedPush(user);
  return success(res, user, 'Profile boosted');
};
