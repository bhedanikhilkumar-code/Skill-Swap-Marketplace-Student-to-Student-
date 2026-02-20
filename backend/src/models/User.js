import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema(
  {
    day: String,
    slots: [String],
    timezone: { type: String, default: 'UTC' }
  },
  { _id: false }
);

const portfolioLinkSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['GITHUB', 'BEHANCE', 'LINKEDIN', 'OTHER'], required: true },
    url: { type: String, required: true }
  },
  { _id: false }
);

const offeredSkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], default: 'BEGINNER' }
  },
  { _id: false }
);

const wantedSkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    levelWanted: { type: String, enum: ['ANY', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'], default: 'ANY' }
  },
  { _id: false }
);

const moderationSchema = new mongoose.Schema(
  {
    isBanned: { type: Boolean, default: false },
    banReason: { type: String, default: '' },
    warnedCount: { type: Number, default: 0 },
    isShadowBanned: { type: Boolean, default: false },
    updatedAt: { type: Date }
  },
  { _id: false }
);

const referralStatsSchema = new mongoose.Schema(
  {
    invites: { type: Number, default: 0 },
    successful: { type: Number, default: 0 }
  },
  { _id: false }
);

const githubSummarySchema = new mongoose.Schema(
  {
    publicRepos: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    updatedAt: { type: Date }
  },
  { _id: false }
);

const portfolioLinkSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['GITHUB', 'BEHANCE', 'LINKEDIN', 'OTHER'], required: true },
    url: { type: String, required: true }
  },
  { _id: false }
);

const offeredSkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], default: 'BEGINNER' }
  },
  { _id: false }
);

const wantedSkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    levelWanted: { type: String, enum: ['ANY', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'], default: 'ANY' }
  },
  { _id: false }
);

const moderationSchema = new mongoose.Schema(
  {
    isBanned: { type: Boolean, default: false },
    banReason: { type: String, default: '' },
    warnedCount: { type: Number, default: 0 },
    isShadowBanned: { type: Boolean, default: false },
    updatedAt: { type: Date }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    college: { type: String, default: '' },
    year: { type: String, default: '' },
    bio: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    skillsOffered: { type: [offeredSkillSchema], default: [] },
    skillsWanted: { type: [wantedSkillSchema], default: [] },
    portfolioLinks: { type: [portfolioLinkSchema], default: [] },
    availability: { type: [availabilitySchema], default: [] },
    isVerified: { type: Boolean, default: false },
    verificationStatus: { type: String, enum: ['NONE', 'PENDING', 'APPROVED', 'REJECTED'], default: 'NONE' },
    collegeEmail: { type: String, default: '' },
    verificationDocUrl: { type: String, default: '' },
    verifiedAt: { type: Date },
    ratingAverage: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    totalSwaps: { type: Number, default: 0 },
    moderation: { type: moderationSchema, default: () => ({}) },
    noShowStrikes: { type: Number, default: 0 },
    cooldownUntil: { type: Date },
    isPremium: { type: Boolean, default: false },
    premiumUntil: { type: Date },
    boostCredits: { type: Number, default: 0 },
    boostedUntil: { type: Date },
    walletBalanceMinutes: { type: Number, default: 300 },
    walletLockedMinutes: { type: Number, default: 0 },
    trustScore: { type: Number, default: 0 },
    dailySwapUsage: { type: Number, default: 0 },
    dailySwapUsageDate: { type: String, default: '' },
    githubUsername: { type: String, default: '' },
    githubLinkedAt: { type: Date },
    githubSummary: { type: githubSummarySchema, default: () => ({}) },
    referralCode: { type: String, unique: true, sparse: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    referralStats: { type: referralStatsSchema, default: () => ({}) },
    referralRewardGranted: { type: Boolean, default: false },
    refreshTokens: { type: [String], default: [] },
    blockedUsers: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    deviceTokens: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
