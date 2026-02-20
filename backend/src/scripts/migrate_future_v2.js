import { connectDb } from '../config/db.js';
import User from '../models/User.js';
import Swap from '../models/Swap.js';
import Session from '../models/Session.js';

await connectDb();

await User.updateMany(
  {},
  {
    $set: {
      walletBalanceMinutes: 300,
      walletLockedMinutes: 0,
      trustScore: 0,
      dailySwapUsage: 0,
      dailySwapUsageDate: '',
      githubUsername: '',
      referralRewardGranted: false,
      referralStats: { invites: 0, successful: 0 }
    }
  }
);

const users = await User.find({});
for (const user of users) {
  if (!user.referralCode) user.referralCode = `REF${user._id.toString().slice(-6).toUpperCase()}`;
  user.skillsOffered = (user.skillsOffered || []).map((s) => (typeof s === 'string' ? { name: s, level: 'BEGINNER' } : s));
  user.skillsWanted = (user.skillsWanted || []).map((s) => (typeof s === 'string' ? { name: s, levelWanted: 'ANY' } : s));
  await user.save();
}

await Swap.updateMany({}, { $set: { milestones: [] } });
await Session.updateMany({}, { $set: { strikeApplied: false } });

console.log('Migration v2 complete.');
process.exit(0);
