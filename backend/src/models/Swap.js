import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema(
  {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    offeredSkill: { type: String, required: true },
    requestedSkill: { type: String, required: true },
    hoursOffered: { type: Number, required: true },
    message: String,
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'COMPLETED'],
      default: 'PENDING'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Swap', swapSchema);
