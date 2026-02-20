import cloudinary from '../config/cloudinary.js';
import User from '../models/User.js';
import { fail, success } from '../utils/response.js';
import { sendVerificationStatusPush } from '../services/notificationService.js';

export const requestVerification = async (req, res) => {
  const { collegeEmail } = req.body;
  if (!collegeEmail && !req.file) return fail(res, 'Provide collegeEmail or document file', null, 400);
  let verificationDocUrl = '';
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'skill-swap/verification' });
    verificationDocUrl = result.secure_url;
  }
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      verificationStatus: 'PENDING',
      isVerified: false,
      ...(collegeEmail ? { collegeEmail } : {}),
      ...(verificationDocUrl ? { verificationDocUrl } : {})
    },
    { new: true }
  );
  return success(res, user, 'Verification request submitted');
};

export const getMyVerification = async (req, res) => {
  const user = await User.findById(req.user.id).select('isVerified verificationStatus collegeEmail verificationDocUrl verifiedAt');
  return success(res, user);
};

export const approveVerification = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { isVerified: true, verificationStatus: 'APPROVED', verifiedAt: new Date() },
    { new: true }
  );
  if (!user) return fail(res, 'User not found', null, 404);
  await sendVerificationStatusPush(user, 'APPROVED');
  return success(res, user, 'Verification approved');
};

export const rejectVerification = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { isVerified: false, verificationStatus: 'REJECTED' },
    { new: true }
  );
  if (!user) return fail(res, 'User not found', null, 404);
  await sendVerificationStatusPush(user, 'REJECTED');
  return success(res, user, 'Verification rejected');
};
