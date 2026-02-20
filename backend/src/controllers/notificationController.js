import User from '../models/User.js';
import { success } from '../utils/response.js';

export const saveDeviceToken = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { deviceTokens: req.body.token } });
  return success(res, null, 'Device token saved');
};
