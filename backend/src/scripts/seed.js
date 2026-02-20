import bcrypt from 'bcryptjs';
import { connectDb } from '../config/db.js';
import User from '../models/User.js';
import Community from '../models/Community.js';
import CommunityMember from '../models/CommunityMember.js';
import SkillBundle from '../models/SkillBundle.js';

const skills = ['Math', 'Physics', 'Coding', 'Design', 'Guitar', 'Public Speaking', 'UI/UX', 'Video Editing'];
const colleges = ['Stanford', 'MIT', 'Harvard', 'UCLA', 'NYU'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickMany = (arr, count) => [...new Set(Array.from({ length: count }, () => pick(arr)))];
const offered = (arr) => arr.map((name, idx) => ({ name, level: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'][idx % 3] }));
const wanted = (arr) => arr.map((name, idx) => ({ name, levelWanted: ['ANY', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'][idx % 4] }));

await connectDb();
await User.deleteMany({ email: /demo\d+@|admin\d+@/ });
await Community.deleteMany({});
await CommunityMember.deleteMany({});
await SkillBundle.deleteMany({});

const admins = [];
for (let i = 1; i <= 2; i += 1) {
  const admin = await User.create({
    name: `Admin ${i}`,
    email: `admin${i}@student.edu`,
    passwordHash: await bcrypt.hash('password123', 10),
    role: 'ADMIN',
    college: pick(colleges),
    isVerified: true,
    verificationStatus: 'APPROVED',
    verifiedAt: new Date(),
    referralCode: `ADMIN${i}REF`,
    walletBalanceMinutes: 1000
  });
  admins.push(admin);
}

const users = [];
for (let i = 1; i <= 15; i += 1) {
  const offeredSkills = pickMany(skills, 3);
  const wantedSkills = pickMany(skills, 3);
  const referredBy = i > 10 ? admins[0]._id : undefined;
  const user = await User.create({
    name: `Demo User ${i}`,
    email: `demo${i}@student.edu`,
    passwordHash: await bcrypt.hash('password123', 10),
    role: 'USER',
    college: pick(colleges),
    year: `${1 + (i % 4)}`,
    bio: 'Student eager to swap skills.',
    skillsOffered: offered(offeredSkills),
    skillsWanted: wanted(wantedSkills),
    portfolioLinks: [{ type: 'GITHUB', url: `https://github.com/demo${i}` }],
    isVerified: i % 2 === 0,
    verificationStatus: i % 2 === 0 ? 'APPROVED' : 'NONE',
    verifiedAt: i % 2 === 0 ? new Date() : undefined,
    isPremium: i <= 3,
    premiumUntil: i <= 3 ? new Date(Date.now() + 20 * 24 * 60 * 60 * 1000) : undefined,
    boostCredits: i <= 3 ? 2 : 0,
    noShowStrikes: i === 14 ? 3 : i === 13 ? 2 : 0,
    cooldownUntil: i === 14 ? new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) : undefined,
    referralCode: `USER${i}REF`,
    referredBy,
    walletBalanceMinutes: 300 + i * 10
  });
  users.push(user);
}

admins[0].referralStats = { invites: 5, successful: 2 };
await admins[0].save();

for (let i = 1; i <= 5; i += 1) {
  await SkillBundle.create({
    name: `Bundle ${i}`,
    description: 'Curated learning path bundle',
    skillsIncluded: offered(pickMany(skills, 3)),
    createdBy: admins[0]._id,
    isPublic: true
  });
}

for (let i = 1; i <= 3; i += 1) {
  const c = await Community.create({
    name: `Community ${i}`,
    college: colleges[i - 1],
    description: 'College skill circle',
    isPrivate: i === 3,
    createdBy: admins[0]._id
  });
  await CommunityMember.create({ communityId: c._id, userId: admins[0]._id, role: 'ADMIN', joinStatus: 'APPROVED' });
  await CommunityMember.create({ communityId: c._id, userId: users[i]._id, role: 'MEMBER', joinStatus: c.isPrivate ? 'PENDING' : 'APPROVED' });
}

console.log('Seeded 2 admins, 15 users, 3 communities, and 5 bundles with wallet/referral data');
process.exit(0);
