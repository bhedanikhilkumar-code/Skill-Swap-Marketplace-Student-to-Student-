import { verifyAccessToken } from '../utils/tokens.js';
import { fail } from '../utils/response.js';

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
