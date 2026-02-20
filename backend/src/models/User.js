import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema(
  {
    day: String,
    slots: [String]
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    college: { type: String, default: '' },
    year: { type: String, default: '' },
    bio: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    skillsOffered: { type: [String], default: [] },
    skillsWanted: { type: [String], default: [] },
    availability: { type: [availabilitySchema], default: [] },
    collegeVerified: { type: Boolean, default: false },
    ratingAverage: { type: Number, default: 0 },
    totalSwaps: { type: Number, default: 0 },
    refreshTokens: { type: [String], default: [] },
    blockedUsers: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    deviceTokens: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
