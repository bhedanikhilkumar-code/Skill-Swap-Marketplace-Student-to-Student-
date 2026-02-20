import Session from '../models/Session.js';
import Swap from '../models/Swap.js';
import User from '../models/User.js';
import { success, fail } from '../utils/response.js';
import { sendPush } from '../services/notificationService.js';

export const createSession = async (req, res) => {
  const swap = await Swap.findById(req.body.swapId);
  if (!swap || swap.status !== 'ACCEPTED') return fail(res, 'Swap not eligible for sessions', null, 400);
  const session = await Session.create(req.body);
  const users = await User.find({ _id: { $in: [swap.fromUser, swap.toUser] } });
  await sendPush({ tokens: users.flatMap((u) => u.deviceTokens), title: 'Session Scheduled', body: 'A new swap session has been created.' });
  return success(res, session, 'Session created', 201);
};

export const upcoming = async (req, res) => {
  const swaps = await Swap.find({ $or: [{ fromUser: req.user.id }, { toUser: req.user.id }] }).select('_id');
  const sessions = await Session.find({ swapId: { $in: swaps.map((s) => s._id) }, scheduledAt: { $gte: new Date() } });
  return success(res, sessions);
};

export const updateSession = async (req, res) => {
  const session = await Session.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  return success(res, session, 'Session updated');
};
