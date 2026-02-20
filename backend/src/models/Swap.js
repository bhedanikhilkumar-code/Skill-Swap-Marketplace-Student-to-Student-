import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    done: { type: Boolean, default: false }
  },
  { _id: false }
);

const swapSchema = new mongoose.Schema(
  {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    offeredSkill: { type: String, default: '' },
    requestedSkill: { type: String, default: '' },
    offeredBundleId: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillBundle' },
    requestedBundleId: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillBundle' },
    hoursOffered: { type: Number, required: true },
    message: String,
    milestones: { type: [milestoneSchema], default: [] },
    clientRequestId: { type: String, index: true },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'COMPLETED'],
      default: 'PENDING'
    }
  },
  { timestamps: true }
);

swapSchema.index({ fromUser: 1, clientRequestId: 1 }, { unique: true, sparse: true });

export default mongoose.model('Swap', swapSchema);
