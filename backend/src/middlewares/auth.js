import { verifyAccessToken } from '../utils/tokens.js';
import { fail } from '../utils/response.js';
import User from '../models/User.js';

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return fail(res, 'Unauthorized', null, 401);
  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    return fail(res, 'Invalid token', null, 401);
  }
};

export const requireActiveUser = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('moderation');
  if (user?.moderation?.isBanned) return fail(res, 'Account is banned. Please contact support.', null, 403);
  return next();
};

export const requireAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('role moderation');
  if (user?.moderation?.isBanned) return fail(res, 'Account is banned. Please contact support.', null, 403);
  if (!user || user.role !== 'ADMIN') return fail(res, 'Admin access required', null, 403);
  return next();
};
