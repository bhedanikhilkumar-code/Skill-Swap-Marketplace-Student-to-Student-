import Session from '../models/Session.js';
import Swap from '../models/Swap.js';
import User from '../models/User.js';
import { success, fail } from '../utils/response.js';
import { sendCooldownAppliedPush, sendNoShowReportedPush, sendPush } from '../services/notificationService.js';
import { lockWalletInternal, settleWalletInternal } from './walletController.js';
import { rewardSuccessfulReferral } from './referralController.js';

const blockedByCooldown = (user) => user?.cooldownUntil && new Date(user.cooldownUntil) > new Date();

export const createSession = async (req, res) => {
  const me = await User.findById(req.user.id);
  if (blockedByCooldown(me)) return fail(res, 'You are in cooldown due to no-show strikes. Try again later.', null, 403);
  const swap = await Swap.findById(req.body.swapId);
  if (!swap || swap.status !== 'ACCEPTED') return fail(res, 'Swap not eligible for sessions', null, 400);
  const participantIds = [swap.fromUser.toString(), swap.toUser.toString()];
  const duration = Number(req.body.durationMinutes || 0);
  if (duration <= 0) return fail(res, 'durationMinutes should be > 0', null, 400);
  try {
    await lockWalletInternal({ userIds: participantIds, minutes: duration });
  } catch (e) {
    return fail(res, 'Insufficient wallet credits to schedule this session', { detail: e.message }, 400);
  }
  const session = await Session.create(req.body);
  const users = await User.find({ _id: { $in: participantIds } });
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

export const markAttendance = async (req, res) => {
  const { outcome } = req.body;
  if (!['COMPLETED', 'NO_SHOW_OTHER', 'CANCELLED'].includes(outcome)) return fail(res, 'Invalid attendance outcome', null, 400);
  const session = await Session.findById(req.params.id);
  if (!session) return fail(res, 'Session not found', null, 404);

  const swap = await Swap.findById(session.swapId);
  if (!swap) return fail(res, 'Swap not found', null, 404);
  const participants = [swap.fromUser.toString(), swap.toUser.toString()];
  if (!participants.includes(req.user.id)) return fail(res, 'Forbidden', null, 403);

  if (outcome === 'COMPLETED') {
    session.status = 'COMPLETED';
    await settleWalletInternal({ userIds: participants, minutes: session.durationMinutes });
    await rewardSuccessfulReferral(swap.fromUser.toString());
    await rewardSuccessfulReferral(swap.toUser.toString());
  } else if (outcome === 'CANCELLED') {
    session.status = 'CANCELLED';
    await settleWalletInternal({ userIds: participants, minutes: session.durationMinutes });
  } else if (outcome === 'CANCELLED') {
    session.status = 'CANCELLED';
  } else {
    if (session.strikeApplied) return fail(res, 'No-show already recorded for this session.', null, 409);
    const reportedUserId = swap.fromUser.toString() === req.user.id ? swap.toUser.toString() : swap.fromUser.toString();
    const reportedUser = await User.findById(reportedUserId);
    if (!reportedUser) return fail(res, 'Reported user not found', null, 404);
    session.status = swap.fromUser.toString() === req.user.id ? 'NO_SHOW_B' : 'NO_SHOW_A';
    session.strikeApplied = true;
    reportedUser.noShowStrikes = Math.min(999, (reportedUser.noShowStrikes || 0) + 1);
    if (reportedUser.noShowStrikes >= 3) {
      reportedUser.cooldownUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await sendCooldownAppliedPush(reportedUser);
    }
    await reportedUser.save();
    await sendNoShowReportedPush(reportedUser);
  }

  session.attendanceMarkedByUserId = req.user.id;
  await session.save();
  return success(res, session, 'Attendance updated');
};
