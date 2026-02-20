import mongoose from 'mongoose';

const communityMemberSchema = new mongoose.Schema(
  {
    communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    role: { type: String, enum: ['MEMBER', 'MODERATOR', 'ADMIN'], default: 'MEMBER' },
    joinStatus: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'APPROVED' }
  },
  { timestamps: true }
);

communityMemberSchema.index({ communityId: 1, userId: 1 }, { unique: true });

export default mongoose.model('CommunityMember', communityMemberSchema);
