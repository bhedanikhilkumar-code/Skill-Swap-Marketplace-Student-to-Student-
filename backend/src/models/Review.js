import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    swapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Swap', required: true },
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    revieweeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    text: String
  },
  { timestamps: true }
);

reviewSchema.index({ swapId: 1, reviewerId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
