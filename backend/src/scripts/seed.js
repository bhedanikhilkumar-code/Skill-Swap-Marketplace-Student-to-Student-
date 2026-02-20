import bcrypt from 'bcryptjs';
import { connectDb } from '../config/db.js';
import User from '../models/User.js';

const skills = ['Math', 'Physics', 'Coding', 'Design', 'Guitar', 'Public Speaking', 'UI/UX', 'Video Editing'];
const colleges = ['Stanford', 'MIT', 'Harvard', 'UCLA', 'NYU'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickMany = (arr, count) => [...new Set(Array.from({ length: count }, () => pick(arr)))];

await connectDb();
await User.deleteMany({ email: /demo\d+@/ });

for (let i = 1; i <= 10; i += 1) {
  await User.create({
    name: `Demo User ${i}`,
    email: `demo${i}@student.edu`,
    passwordHash: await bcrypt.hash('password123', 10),
    college: pick(colleges),
    year: `${1 + (i % 4)}`,
    bio: 'Student eager to swap skills.',
    skillsOffered: pickMany(skills, 3),
    skillsWanted: pickMany(skills, 3),
    collegeVerified: true
  });
}

console.log('Seeded 10 demo users');
process.exit(0);
