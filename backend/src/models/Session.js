import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    swapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Swap', required: true },
    scheduledAt: { type: Date, required: true },
    durationMinutes: { type: Number, required: true },
    mode: { type: String, enum: ['online', 'offline'], required: true },
    notes: String,
    status: { type: String, enum: ['upcoming', 'attended', 'completed'], default: 'upcoming' }
  },
  { timestamps: true }
);

export default mongoose.model('Session', sessionSchema);
