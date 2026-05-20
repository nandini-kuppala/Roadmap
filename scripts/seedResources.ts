import * as fs from 'fs';
import * as path from 'path';
import mongoose from 'mongoose';

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

const ResourceSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: { type: String, enum: ['video', 'article', 'tool', 'file'] },
  category: String,
  description: { type: String, default: '' },
  addedBy: mongoose.Schema.Types.ObjectId,
  thumbnail: { type: String, default: '' },
}, { timestamps: true });

const UserSchema = new mongoose.Schema({ email: String, role: String });

const Resource = mongoose.models?.Resource || mongoose.model('Resource', ResourceSchema);
const User = mongoose.models?.User || mongoose.model('User', UserSchema);

const resources = [
  // ─── DSA ───────────────────────────────────────────────────
  {
    title: 'DSA Lecture Materials – Trees & Hierarchical Orders (UWaterloo)',
    url: 'https://ece.uwaterloo.ca/~dwharder/aads/Lecture_materials/#trees-and-hierarchical-orders',
    type: 'article',
    category: 'DSA',
    description: 'University of Waterloo advanced data structures lecture notes covering trees and hierarchical orders.',
  },
  {
    title: 'Striver\'s A2Z DSA Sheet',
    url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
    type: 'article',
    category: 'DSA',
    description: 'The most comprehensive DSA sheet covering all patterns from basics to advanced.',
  },
  {
    title: 'NeetCode 150 – Roadmap',
    url: 'https://neetcode.io/roadmap',
    type: 'article',
    category: 'DSA',
    description: 'Curated 150 LeetCode problems with video solutions, organized by pattern.',
  },
  {
    title: 'Abdul Bari Algorithms – YouTube Playlist',
    url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
    type: 'video',
    category: 'DSA',
    description: 'In-depth algorithm lectures by Abdul Bari — best for understanding time complexity and recursion.',
  },
  {
    title: 'Aditya Verma DP Playlist',
    url: 'https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go',
    type: 'video',
    category: 'DSA',
    description: 'The gold standard for learning Dynamic Programming patterns for interviews.',
  },
  {
    title: 'LeetCode Patterns Cheat Sheet',
    url: 'https://seanprashad.com/leetcode-patterns/',
    type: 'article',
    category: 'DSA',
    description: 'Visual cheat sheet categorizing LeetCode problems by pattern. Great for revision.',
  },

  // ─── OOP ───────────────────────────────────────────────────
  {
    title: 'OOP Practice – HackerRank Classes (Level 1)',
    url: 'https://www.hackerrank.com/domains/cpp/classes/difficulty:true/page:1',
    type: 'tool',
    category: 'OOP',
    description: 'Level 1: Sample problems to start implementing code using classes in C++.',
  },
  {
    title: 'OOP Practice – Classes & Objects (Level 2)',
    url: 'https://www.codesdope.com/practice/cpp-classes-and-objects/',
    type: 'article',
    category: 'OOP',
    description: 'Level 2: Implementing different types of classes and OOP-related problems.',
  },
  {
    title: 'OOP From Basics to Advanced – GitHub (Level 3)',
    url: 'https://github.com/vineethm1627/OOP',
    type: 'article',
    category: 'OOP',
    description: 'Level 3: Comprehensive OOP resource from basics to advanced concepts with examples.',
  },
  {
    title: 'OOP Interview Questions – InterviewBit',
    url: 'https://www.interviewbit.com/oops-interview-questions/',
    type: 'article',
    category: 'OOP',
    description: 'Top OOP interview questions covering encapsulation, inheritance, polymorphism, and abstraction.',
  },
  {
    title: 'OOP Concepts – GeeksForGeeks',
    url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/',
    type: 'article',
    category: 'OOP',
    description: 'Detailed coverage of all OOP concepts with examples in Java.',
  },

  // ─── DBMS ──────────────────────────────────────────────────
  {
    title: 'DBMS PDF – Google Drive',
    url: 'https://drive.google.com/file/d/113TTrx-L1BDaWIu37rv5w7jf93yNHTwB/view?usp=sharing',
    type: 'file',
    category: 'DBMS',
    description: 'Complete DBMS notes PDF covering all concepts from basics to advanced.',
  },
  {
    title: 'DBMS SQL Queries – InterviewBit (Level 1)',
    url: 'https://www.interviewbit.com/courses/databases/sql-queries/',
    type: 'article',
    category: 'DBMS',
    description: 'Level 1: InterviewBit basic definitions and SQL queries for DBMS interviews.',
  },
  {
    title: 'Advanced DBMS Questions – QuizGecko (Level 2)',
    url: 'https://quizgecko.com/discover/pets/advanced-database-management-systems',
    type: 'article',
    category: 'DBMS',
    description: 'Level 2: Theoretical and real-world oriented DBMS questions.',
  },
  {
    title: 'DBMS Lectures – UC Berkeley (Level 3)',
    url: 'https://archive.org/details/ucberkeley-webcast-PL-XXv-cvA_iBVK2QzAV-R7NMA1ZkaiR2y',
    type: 'video',
    category: 'DBMS',
    description: 'Level 3: Full DBMS lecture series from UC Berkeley — best in-depth resource.',
  },
  {
    title: 'DBMS Interview Questions – InterviewBit',
    url: 'https://www.interviewbit.com/dbms-interview-questions/',
    type: 'article',
    category: 'DBMS',
    description: 'Most frequently asked DBMS interview questions with detailed answers.',
  },
  {
    title: 'SQL Tutorial – W3Schools',
    url: 'https://www.w3schools.com/sql/',
    type: 'article',
    category: 'DBMS',
    description: 'Quick SQL reference and practice for interview preparation.',
  },

  // ─── OS ────────────────────────────────────────────────────
  {
    title: 'OS PDF 1 – Bedtime Stories (Google Drive)',
    url: 'https://drive.google.com/file/d/1gQVbf3Cvm-TPcSOXesnWHAzCJvp4M7o8/view?usp=sharing',
    type: 'file',
    category: 'Operating Systems',
    description: 'OS notes PDF 1 — clear and beginner-friendly coverage of core OS concepts.',
  },
  {
    title: 'OS PDF 2 – Google Drive',
    url: 'https://drive.google.com/file/d/1N7xgk15GF6jFpAnU2ahIbsVAcVNPNBnw/view?usp=sharing',
    type: 'file',
    category: 'Operating Systems',
    description: 'OS notes PDF 2 — continued coverage of processes, memory, and scheduling.',
  },
  {
    title: 'OS Bedtime Stories Folder – Google Drive',
    url: 'https://drive.google.com/drive/folders/1p8OqE9cAJfIXHV5gqfL8UskS_taYheo1?usp=sharing',
    type: 'file',
    category: 'Operating Systems',
    description: 'Level 1: Full folder of OS PDFs from bedtime stories series.',
  },
  {
    title: 'OS Interview Questions – InterviewBit (Level 2)',
    url: 'https://www.interviewbit.com/operating-system-interview-questions/',
    type: 'article',
    category: 'Operating Systems',
    description: 'Level 2: Top OS interview questions covering processes, threads, memory management, and deadlocks.',
  },
  {
    title: 'OSTEP – Operating Systems: Three Easy Pieces (Level 3)',
    url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
    type: 'article',
    category: 'Operating Systems',
    description: 'Level 3: The best free OS textbook — covers virtualization, concurrency, and persistence in depth.',
  },
  {
    title: 'Gate Smashers OS Playlist – YouTube',
    url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p',
    type: 'video',
    category: 'Operating Systems',
    description: 'Highly recommended OS video series for GATE and placement exams.',
  },

  // ─── Computer Networks ──────────────────────────────────────
  {
    title: 'CN Interview Questions – InterviewBit (Level 1)',
    url: 'https://www.interviewbit.com/networking-interview-questions/',
    type: 'article',
    category: 'Computer Networks',
    description: 'Level 1: Top networking interview questions covering OSI model, TCP/IP, DNS, HTTP, and more.',
  },
  {
    title: 'CN PDFs – Google Drive (Level 2)',
    url: 'https://drive.google.com/drive/folders/14Nd88dPcfaMD5i-suLG_ZjWY8OJunzra?usp=sharing',
    type: 'file',
    category: 'Computer Networks',
    description: 'Level 2: Two comprehensive CN PDFs covering core networking concepts.',
  },
  {
    title: 'CN Advanced Problems – Google Drive (Level 3)',
    url: 'https://drive.google.com/drive/folders/11L6deCfgLvDMbsmuK53CfcssDcoeZFqk?usp=sharing',
    type: 'file',
    category: 'Computer Networks',
    description: 'Level 3: Advanced problem statements for computer networks.',
  },
  {
    title: 'CN Additional Resources – Google Drive (Level 4)',
    url: 'https://drive.google.com/drive/folders/1bLDOTeC36KR0Xio8vYUzuea4fX8rbcrg?usp=sharing',
    type: 'file',
    category: 'Computer Networks',
    description: 'Level 4: Additional CN resources and materials.',
  },
  {
    title: 'Gate Smashers CN Playlist – YouTube',
    url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p',
    type: 'video',
    category: 'Computer Networks',
    description: 'Comprehensive CN video lectures for placement preparation.',
  },
  {
    title: 'Computer Networks – GeeksForGeeks',
    url: 'https://www.geeksforgeeks.org/computer-network-tutorials/',
    type: 'article',
    category: 'Computer Networks',
    description: 'Complete CN tutorial covering all topics from basics to advanced with diagrams.',
  },

  // ─── Aptitude ───────────────────────────────────────────────
  {
    title: 'CareerRide Aptitude Playlists – YouTube',
    url: 'https://www.youtube.com/@CareerRideOfficial/playlists',
    type: 'video',
    category: 'Aptitude',
    description: 'Full aptitude video series covering quantitative, logical reasoning, and verbal ability.',
  },
  {
    title: 'IndiaBIX Aptitude Questions',
    url: 'https://www.indiabix.com/',
    type: 'tool',
    category: 'Aptitude',
    description: 'Practice aptitude questions with explanations — widely used for campus placement prep.',
  },
  {
    title: 'Aptitude Questions – GeeksForGeeks',
    url: 'https://www.geeksforgeeks.org/aptitude-questions-and-answers/',
    type: 'article',
    category: 'Aptitude',
    description: 'Topic-wise aptitude questions with solutions for placement exams.',
  },

  // ─── System Design ──────────────────────────────────────────
  {
    title: 'System Design Primer – GitHub',
    url: 'https://github.com/donnemartin/system-design-primer',
    type: 'article',
    category: 'System Design',
    description: 'The most starred system design resource on GitHub. Covers scalability, caching, databases, and more.',
  },
  {
    title: 'Gaurav Sen System Design – YouTube',
    url: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX',
    type: 'video',
    category: 'System Design',
    description: 'Best YouTube playlist for system design interviews — covers HLD from scratch.',
  },
  {
    title: 'ByteByteGo System Design Newsletter',
    url: 'https://bytebytego.com/',
    type: 'article',
    category: 'System Design',
    description: 'Visual system design explanations used by top engineers at FAANG companies.',
  },

  // ─── Interview Prep ─────────────────────────────────────────
  {
    title: 'InterviewBit CS Fundamentals – Full Course',
    url: 'https://www.interviewbit.com/courses/programming/',
    type: 'article',
    category: 'Interview Prep',
    description: 'Structured programming and CS fundamentals course designed specifically for product-based company interviews.',
  },
  {
    title: 'GeeksForGeeks Interview Preparation',
    url: 'https://www.geeksforgeeks.org/interview-preparation-for-software-developer/',
    type: 'article',
    category: 'Interview Prep',
    description: 'Complete interview prep roadmap with topic-wise questions and company-specific sets.',
  },
  {
    title: 'TechieDelight Interview Questions',
    url: 'https://www.techiedelight.com/',
    type: 'article',
    category: 'Interview Prep',
    description: 'Curated coding interview problems with clean, well-explained solutions.',
  },
  {
    title: 'Pramp – Mock Interviews (Free)',
    url: 'https://www.pramp.com/',
    type: 'tool',
    category: 'Interview Prep',
    description: 'Free peer-to-peer mock technical interviews. Practice with real interviewers.',
  },
];

async function seedResources() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected!');

  const admin = await User.findOne({ role: 'admin' });
  if (!admin) {
    console.error('No admin user found. Run the main seed script first.');
    process.exit(1);
  }

  let added = 0;
  let skipped = 0;

  for (const r of resources) {
    const existing = await Resource.findOne({ url: r.url });
    if (existing) {
      skipped++;
      continue;
    }
    await Resource.create({ ...r, addedBy: admin._id });
    added++;
    console.log(`  ✓ ${r.title}`);
  }

  console.log(`\nDone! Added: ${added}, Skipped (already exists): ${skipped}`);
  await mongoose.disconnect();
}

seedResources().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
