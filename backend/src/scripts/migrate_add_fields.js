import { connectDb } from '../config/db.js';
import User from '../models/User.js';
import Session from '../models/Session.js';

await connectDb();

await User.updateMany(
  {},
  {
    $set: {
      role: 'USER',
      isVerified: false,
      verificationStatus: 'NONE',
      collegeEmail: '',
      verificationDocUrl: '',
      moderation: { isBanned: false, banReason: '', warnedCount: 0, isShadowBanned: false, updatedAt: new Date() },
      noShowStrikes: 0,
      isPremium: false,
      boostCredits: 0,
      portfolioLinks: []
    }
  }
);

const users = await User.find({});
for (const user of users) {
  user.skillsOffered = (user.skillsOffered || []).map((s) => (typeof s === 'string' ? { name: s, level: 'BEGINNER' } : s));
  user.skillsWanted = (user.skillsWanted || []).map((s) => (typeof s === 'string' ? { name: s, levelWanted: 'ANY' } : s));
  await user.save();
}

await Session.updateMany(
  {},
  {
    $set: {
      status: 'SCHEDULED',
      strikeApplied: false
    },
    $unset: {
      attendanceMarkedByUserId: ''
    }
  }
);

console.log('Migration complete: users and sessions upgraded with new fields.');
process.exit(0);
