import * as fs from 'fs';
import * as path from 'path';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placement-platform';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'student' },
  profilePicture: { type: String, default: '' },
  bio: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  college: { type: String, default: '' },
  targetRole: { type: String, default: '' },
  startDate: { type: Date, default: () => new Date() },
  enrolledAt: { type: Date, default: () => new Date() },
  currentDay: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActiveDate: Date,
}, { timestamps: true });

const User = mongoose.models?.User || mongoose.model('User', UserSchema);

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected!');

  // Create admin user
  const adminEmail = 'admin@placement.com';
  const adminPassword = 'Admin@123';

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log('Admin user already exists:', adminEmail);
  } else {
    const hashedPassword = await bcryptjs.hash(adminPassword, 12);
    await User.create({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      bio: 'Placement coaching admin',
      startDate: new Date(),
      enrolledAt: new Date(),
      currentDay: 1,
      xp: 0,
      streak: 0,
    });
    console.log('Admin user created:');
    console.log('  Email:', adminEmail);
    console.log('  Password:', adminPassword);
  }

  // Create a sample student
  const studentEmail = 'student@test.com';
  const existingStudent = await User.findOne({ email: studentEmail });

  if (!existingStudent) {
    const hashedPassword = await bcryptjs.hash('Student@123', 12);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 5); // Started 5 days ago

    await User.create({
      name: 'Rahul Sharma',
      email: studentEmail,
      password: hashedPassword,
      role: 'student',
      college: 'VIT Vellore',
      targetRole: 'SDE-1',
      bio: 'Passionate about backend development and system design',
      githubUrl: 'https://github.com/rahulsharma',
      linkedinUrl: 'https://linkedin.com/in/rahulsharma',
      startDate,
      enrolledAt: new Date(),
      currentDay: 6,
      xp: 400,
      streak: 5,
      lastActiveDate: new Date(),
    });
    console.log('\nSample student created:');
    console.log('  Email:', studentEmail);
    console.log('  Password: Student@123');
    console.log('  Current Day: 6');
  } else {
    console.log('Sample student already exists:', studentEmail);
  }

  await mongoose.disconnect();
  console.log('\nSeed complete!');
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
