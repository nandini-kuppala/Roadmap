'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';

interface StudentSummary {
  _id: string;
  name: string;
  email: string;
  currentDay: number;
  completedDays: number;
  progressPercent: number;
  streak: number;
  xp: number;
  lastActiveDate?: string;
  enrolledAt: string;
  college?: string;
  targetRole?: string;
  profilePicture?: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    const user = session?.user as { role?: string } | undefined;
    if (status === 'authenticated' && user?.role !== 'admin') {
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

  const totalStudents = students.length;
  const avgProgress = totalStudents > 0 ? Math.round(students.reduce((acc, s) => acc + s.progressPercent, 0) / totalStudents) : 0;
  const activeToday = students.filter((s) => {
    if (!s.lastActiveDate) return false;
    const last = new Date(s.lastActiveDate);
    const today = new Date();
    return last.toDateString() === today.toDateString();
  }).length;
  const completedAll = students.filter((s) => s.completedDays >= 60).length;

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
            <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
            <p className="text-text-secondary mt-1">Overview of all students in the batch</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Students', value: totalStudents, icon: '👥', color: 'text-accent' },
              { label: 'Avg Progress', value: `${avgProgress}%`, icon: '📊', color: 'text-blue-400' },
              { label: 'Active Today', value: activeToday, icon: '🟢', color: 'text-success' },
              { label: 'Completed All 60', value: completedAll, icon: '🏆', color: 'text-yellow-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface border border-border rounded-xl p-5">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { href: '/admin/students', label: 'Manage Students', icon: '👥', desc: 'View all students, progress bars, activity' },
              { href: '/admin/resources', label: 'Manage Resources', icon: '📚', desc: 'Add and edit learning materials' },
              { href: '/admin/chat', label: 'Chat with Students', icon: '💬', desc: 'Send messages, answer doubts' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-surface border border-border rounded-xl p-5 hover:border-purple-500/40 transition-all group"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-text-primary group-hover:text-purple-400 transition-colors">{item.label}</h3>
                <p className="text-text-muted text-xs mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>

          {/* Recent students */}
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-text-primary">Recent Students</h2>
              <Link href="/admin/students" className="text-sm text-accent hover:text-accent-light transition-colors">
                View all →
              </Link>
            </div>
            <div className="divide-y divide-border">
              {students.slice(0, 5).map((student) => (
                <Link
                  key={student._id}
                  href={`/admin/students/${student._id}`}
                  className="flex items-center gap-4 p-4 hover:bg-surface-2 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 overflow-hidden">
                    {student.profilePicture ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={student.profilePicture} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      student.name.slice(0, 1).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-text-primary font-medium text-sm truncate">{student.name}</p>
                      <span className="text-text-muted text-xs flex-shrink-0">Day {student.currentDay}/60</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1 flex-1 bg-surface-3 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${student.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-muted flex-shrink-0">{student.progressPercent}%</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-xs text-orange-400">
                      <span>🔥</span>
                      <span>{student.streak}d</span>
                    </div>
                  </div>
                </Link>
              ))}
              {students.length === 0 && (
                <div className="p-8 text-center text-text-muted text-sm">
                  No students enrolled yet
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
