import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    note: { type: String, default: '' },
    at: { type: Date, default: Date.now }
  },
  { _id: false }
);

const disputeSchema = new mongoose.Schema(
  {
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true, index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    againstUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    evidenceUrls: { type: [String], default: [] },
    status: { type: String, enum: ['OPEN', 'RESOLVED', 'REJECTED'], default: 'OPEN' },
    adminNotes: { type: String, default: '' },
    verdict: { type: String, enum: ['STRIKE_APPLIED', 'STRIKE_REVERSED', 'NO_ACTION'], default: 'NO_ACTION' },
    auditLog: { type: [auditSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Dispute', disputeSchema);
