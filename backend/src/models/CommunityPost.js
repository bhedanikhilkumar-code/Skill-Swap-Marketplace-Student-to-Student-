import mongoose from 'mongoose';

const communityPostSchema = new mongoose.Schema(
  {
    communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true, index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    attachments: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('CommunityPost', communityPostSchema);
