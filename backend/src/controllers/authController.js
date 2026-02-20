import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokens.js';
import { success, fail } from '../utils/response.js';

const tokenPayload = (u) => ({ id: u._id.toString(), email: u.email, role: u.role });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return fail(res, 'Email already in use', null, 409);
  const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 10) });
  return success(res, { id: user._id, email: user.email }, 'Registered', 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return fail(res, 'Invalid credentials', null, 401);
  if (user?.moderation?.isBanned) return fail(res, 'Account is banned. Please contact support.', null, 403);
  const accessToken = signAccessToken(tokenPayload(user));
  const refreshToken = signRefreshToken(tokenPayload(user));
  user.refreshTokens.push(refreshToken);
  await user.save();
  return success(res, { accessToken, refreshToken, userId: user._id, role: user.role }, 'Logged in');
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return fail(res, 'Missing refresh token', null, 400);
  const payload = verifyRefreshToken(refreshToken);
  const user = await User.findById(payload.id);
  if (!user || !user.refreshTokens.includes(refreshToken)) return fail(res, 'Invalid refresh token', null, 401);
  if (user?.moderation?.isBanned) return fail(res, 'Account is banned. Please contact support.', null, 403);
  const accessToken = signAccessToken(tokenPayload(user));
  return success(res, { accessToken }, 'Token refreshed');
};

export const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    await User.updateOne({ _id: req.user.id }, { $pull: { refreshTokens: refreshToken } });
  }
  return success(res, null, 'Logged out');
};
