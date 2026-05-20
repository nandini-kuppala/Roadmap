'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import StudentProgressCard from '@/components/StudentProgressCard';

interface Student {
  _id: string;
  name: string;
  email: string;
  college?: string;
  targetRole?: string;
  profilePicture?: string;
  currentDay: number;
  completedDays: number;
  progressPercent: number;
  streak: number;
  xp: number;
  lastActiveDate?: string;
  enrolledAt: string;
}

export default function AdminStudentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'lastActive' | 'streak'>('progress');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    if (status === 'authenticated' && (session?.user as { role?: string })?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === 'authenticated' && (session?.user as { role?: string })?.role === 'admin') {
      fetch('/api/students')
        .then((res) => res.json())
        .then((data) => setStudents(data.students || []))
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [status, session]);

  const filtered = students
    .filter((s) => {
      const q = search.toLowerCase();
      return (
        !search ||
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.college?.toLowerCase().includes(q) ||
        s.targetRole?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'progress') return b.progressPercent - a.progressPercent;
      if (sortBy === 'streak') return b.streak - a.streak;
      if (sortBy === 'lastActive') {
        const aDate = a.lastActiveDate ? new Date(a.lastActiveDate).getTime() : 0;
        const bDate = b.lastActiveDate ? new Date(b.lastActiveDate).getTime() : 0;
        return bDate - aDate;
      }
      return 0;
    });

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <div className="w-64 bg-surface border-r border-border" />
        <div className="flex-1 flex items-center justify-center">
          <svg className="w-8 h-8 animate-spin text-accent" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary">Students</h1>
            <p className="text-text-secondary mt-1">{students.length} students enrolled</p>
          </div>

          {/* Filters */}
          <div className="bg-surface border border-border rounded-xl p-4 mb-6 flex gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-xl pl-10 pr-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent text-sm transition-colors"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-surface-2 border border-border text-text-secondary text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
            >
              <option value="progress">Sort by Progress</option>
              <option value="name">Sort by Name</option>
              <option value="lastActive">Sort by Last Active</option>
              <option value="streak">Sort by Streak</option>
            </select>
          </div>

          {/* Student Grid */}
          {filtered.length === 0 ? (
            <div className="bg-surface border border-border rounded-xl p-12 text-center">
              <p className="text-text-secondary">
                {search ? 'No students match your search' : 'No students enrolled yet'}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((student) => (
                <StudentProgressCard key={student._id} student={student} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
