import cloudinary from '../config/cloudinary.js';
import User from '../models/User.js';
import { success } from '../utils/response.js';

export const uploadAvatar = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, { folder: 'skill-swap/avatars' });
  await User.findByIdAndUpdate(req.user.id, { avatarUrl: result.secure_url });
  return success(res, { avatarUrl: result.secure_url }, 'Avatar uploaded');
};
