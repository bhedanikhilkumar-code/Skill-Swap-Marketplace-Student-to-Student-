import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    swapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Swap', required: true },
    text: { type: String, required: true },
    readBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model('Message', messageSchema);
