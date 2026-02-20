import cloudinary from '../config/cloudinary.js';
import Dispute from '../models/Dispute.js';
import Session from '../models/Session.js';
import Swap from '../models/Swap.js';
import User from '../models/User.js';
import { fail, success } from '../utils/response.js';

export const createDispute = async (req, res) => {
  const session = await Session.findById(req.body.sessionId);
  if (!session) return fail(res, 'Session not found', null, 404);
  const swap = await Swap.findById(session.swapId);
  if (!swap) return fail(res, 'Swap not found', null, 404);
  const users = [swap.fromUser.toString(), swap.toUser.toString()];
  if (!users.includes(req.user.id)) return fail(res, 'Forbidden', null, 403);
  const againstUserId = users.find((id) => id !== req.user.id);
  let evidenceUrls = req.body.evidenceUrls || [];
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'skill-swap/disputes' });
    evidenceUrls = [...evidenceUrls, result.secure_url];
  }
  const dispute = await Dispute.create({
    sessionId: session._id,
    createdBy: req.user.id,
    againstUserId,
    reason: req.body.reason,
    evidenceUrls,
    auditLog: [{ action: 'CREATED', by: req.user.id, note: 'Dispute opened' }]
  });
  return success(res, dispute, 'Dispute raised', 201);
};

export const myDisputes = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const items = await Dispute.find({ $or: [{ createdBy: req.user.id }, { againstUserId: req.user.id }] })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  return success(res, { items, page: Number(page), limit: Number(limit) });
};

export const adminDisputes = async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const items = await Dispute.find({ ...(status ? { status } : {}) }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
  return success(res, { items, page: Number(page), limit: Number(limit) });
};

export const resolveDispute = async (req, res) => {
  const dispute = await Dispute.findById(req.params.id);
  if (!dispute) return fail(res, 'Dispute not found', null, 404);
  dispute.verdict = req.body.verdict;
  dispute.adminNotes = req.body.adminNotes || '';
  dispute.status = req.body.verdict === 'NO_ACTION' ? 'REJECTED' : 'RESOLVED';
  dispute.auditLog.push({ action: 'RESOLVED', by: req.user.id, note: `${dispute.verdict}: ${dispute.adminNotes}` });

  if (dispute.verdict === 'STRIKE_REVERSED') {
    const user = await User.findById(dispute.againstUserId);
    if (user) {
      user.noShowStrikes = Math.max(0, (user.noShowStrikes || 0) - 1);
      if (user.noShowStrikes < 3) user.cooldownUntil = undefined;
      await user.save();
    }
  }

  await dispute.save();
  return success(res, dispute, 'Dispute resolved');
};
