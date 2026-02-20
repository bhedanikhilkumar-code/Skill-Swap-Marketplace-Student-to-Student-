import Swap from '../models/Swap.js';
import User from '../models/User.js';
import { success, fail } from '../utils/response.js';
import { sendPush } from '../services/notificationService.js';

const blockedByCooldown = (user) => user?.cooldownUntil && new Date(user.cooldownUntil) > new Date();

export const createSwap = async (req, res) => {
  const me = await User.findById(req.user.id);
  if (blockedByCooldown(me)) return fail(res, 'You are in cooldown due to no-show strikes. Try again later.', null, 403);
  if (req.body.clientRequestId) {
    const existing = await Swap.findOne({ fromUser: req.user.id, clientRequestId: req.body.clientRequestId });
    if (existing) return success(res, existing, 'Idempotent swap returned', 200);
  }
  if (!req.body.requestedSkill && !req.body.requestedBundleId) return fail(res, 'Provide requestedSkill or requestedBundleId', null, 400);
  if (!req.body.offeredSkill && !req.body.offeredBundleId) return fail(res, 'Provide offeredSkill or offeredBundleId', null, 400);
  const payload = { ...req.body, fromUser: req.user.id };
  const swap = await Swap.create(payload);

  const today = new Date().toISOString().slice(0, 10);
  if (me.dailySwapUsageDate !== today) {
    me.dailySwapUsageDate = today;
    me.dailySwapUsage = 0;
  }
  me.dailySwapUsage += 1;
  await me.save();

  const toUser = await User.findById(req.body.toUser);
  await sendPush({ tokens: toUser?.deviceTokens || [], title: 'New Swap Request', body: 'You received a new swap request.' });
  return success(res, swap, 'Swap request created', 201);
};

export const inbox = async (req, res) => success(res, await Swap.find({ toUser: req.user.id }).populate('fromUser toUser', 'name avatarUrl'));
export const sent = async (req, res) => success(res, await Swap.find({ fromUser: req.user.id }).populate('fromUser toUser', 'name avatarUrl'));

export const getSwap = async (req, res) => {
  const swap = await Swap.findById(req.params.id).populate('fromUser toUser', 'name avatarUrl');
  if (!swap) return fail(res, 'Swap not found', null, 404);
  return success(res, swap);
};

export const updateStatus = async (req, res) => {
  const swap = await Swap.findById(req.params.id);
  if (!swap) return fail(res, 'Swap not found', null, 404);
  if (![swap.fromUser.toString(), swap.toUser.toString()].includes(req.user.id)) return fail(res, 'Forbidden', null, 403);
  swap.status = req.body.status;
  await swap.save();
  const target = await User.findById(swap.fromUser.toString() === req.user.id ? swap.toUser : swap.fromUser);
  await sendPush({ tokens: target?.deviceTokens || [], title: 'Swap Updated', body: `Swap status: ${swap.status}` });
  return success(res, swap, 'Swap status updated');
};
