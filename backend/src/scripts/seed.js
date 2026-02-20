import bcrypt from 'bcryptjs';
import { connectDb } from '../config/db.js';
import User from '../models/User.js';

const skills = ['Math', 'Physics', 'Coding', 'Design', 'Guitar', 'Public Speaking', 'UI/UX', 'Video Editing'];
const colleges = ['Stanford', 'MIT', 'Harvard', 'UCLA', 'NYU'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickMany = (arr, count) => [...new Set(Array.from({ length: count }, () => pick(arr)))];

const offered = (arr) => arr.map((name, idx) => ({ name, level: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'][idx % 3] }));
const wanted = (arr) => arr.map((name, idx) => ({ name, levelWanted: ['ANY', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'][idx % 4] }));

await connectDb();
await User.deleteMany({ email: /demo\d+@|admin\d+@/ });

for (let i = 1; i <= 2; i += 1) {
  await User.create({
    name: `Admin ${i}`,
    email: `admin${i}@student.edu`,
    passwordHash: await bcrypt.hash('password123', 10),
    role: 'ADMIN',
    college: pick(colleges),
    isVerified: true,
    verificationStatus: 'APPROVED',
    verifiedAt: new Date()
  });
}

for (let i = 1; i <= 10; i += 1) {
  const offeredSkills = pickMany(skills, 3);
  const wantedSkills = pickMany(skills, 3);
  await User.create({
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
    noShowStrikes: i === 9 ? 3 : i === 8 ? 2 : 0,
    cooldownUntil: i === 9 ? new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) : undefined
  });
}

console.log('Seeded demo users including admins, verified, premium, and strike scenarios');
process.exit(0);
