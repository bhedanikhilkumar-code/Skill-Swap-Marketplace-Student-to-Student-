import Message from '../models/Message.js';
import Swap from '../models/Swap.js';
import User from '../models/User.js';
import { success, fail } from '../utils/response.js';

export const getMessages = async (req, res) => {
  const me = await User.findById(req.user.id).select('moderation');
  if (me?.moderation?.isBanned) return fail(res, 'Account is banned. Please contact support.', null, 403);
  const swap = await Swap.findById(req.params.swapId);
  if (!swap) return fail(res, 'Swap not found', null, 404);
  if (swap.status !== 'ACCEPTED' && swap.status !== 'COMPLETED') return fail(res, 'Chat unavailable for this swap status', null, 403);
  if (![swap.fromUser.toString(), swap.toUser.toString()].includes(req.user.id)) return fail(res, 'Forbidden', null, 403);
  const messages = await Message.find({ swapId: req.params.swapId }).sort({ createdAt: 1 });
  return success(res, messages);
};
